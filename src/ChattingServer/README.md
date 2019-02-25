# Chatting Server

WebSocket 과 Redis(Pub/Sub) 활용한 채팅 서버

* STOMP over SockJs
* Redisson


## Client send a message to the server

*STOMP over SockJs(WebSocket)* 으로 

1. 클라이언트는 `/chatroom/{chatroomId}`로 메시지 규격에 맞게 전달한다.

2. 서버는 STOMP형태로  `/chatroom/{chatroomId}`로 클라이언트에서 보내는 Websocket 기반 메시지를 듣는다.

3. 서버는 받은 메시지를 Redis에 `chatroom/{chatroomId}`로 Pub한다.

4. 서버는 또한 Redis의 `chatroom/*`로 구성된 Pattern Topic을 Sub 하고 있으므로, Pub 된 메시지를 수신한다.

5. 수신한 메시지를 서버는 STOMP `/chatroom/{chatroomId}`로 내보낸다.   

6. 결과적으로 클라이언트는 메시지를 주고 받을 수 있다.


## Chatroom Info and chats in Redis

Redis에 채팅방의 정보들을 관리한다.


chatroomInfo로 key값을 하는 Redis의 HashValue
```json
{
  chatroomInfo: [
    {
      {chatroom_id}: {/Users/zeroho/Projects/Smilegate WinterDevCamp/team/WebKakao/src/fileserver/README.md
        object_id: /* MongoDB에 저장되는 Message block 의 키 값*/,
        last_msg_idx: /*마지막으로 전달된 메시지의 인덱스 값*/
        last_msg: 마지막 메시지,
        timestamp: 마지막 메시지의 업데이트 타임,
        msg_type: 메시지 타입
      }
    },
  ...
  ]
}
```
위의 구성을 항상 메모리에 유지시 4GB로 25만개의 채팅방 기본 정보 빠르게 접근 가능하다.

최적화를 위해 주기적으로 오랜시간 대화하지 않은 채팅방의 정보를 메모리에서 지우는 방법이 있으나,
메모리에서 지우지 않는 방법과 비교하여 선택한다.

object_id는 앞으로 Mongo에 메시지들을 저장할 키를 나타냄으로 
해당 id로 몽고에 접근하면 이전 키값과 외에는 기본값이 들어간다.
따라서, object_id를 Redis에서 얻고 이를 몽고로 접근하면 
빠르게 이전 메시지들을 가져올 것으로 기대된다.


chatroom_id로 key값을 하는 Redis의 List
```json
{
  [chatroom_id]: [
    {
      sender: /* 메시지의 보낸이 id */,
      msg: /* 메시지 */,
      msg_type: /* 메시지의 종류 */,
      timestamp: /* Redis의 Timestamp */   
    }
    ...
  ]
}
```
위의 채팅 기록들은 채팅방의 정보를 기록하는 것보다 많은 메모리를 차지할 것으로 예상된다.


## Message type

| Code | Description |
| --- | ------------ |
| "m" | 일반 텍스트 메시지 message |
| "p" | 사진 photo |
| "v" | 동영상 video |
| "f" | 사진 동영상 외의 파일 |
| "i" | 초대, 나가기 이벤트 |
| "s" | 실시간 채팅 요청하는 경우 |
| "ns" | 실시간 채팅중 새로운 사람이 채팅방을 읽을경우 발생하는 이벤트 |
| "us" | 실시간 채팅중 한 명이 실시간 채팅을 그만 두는 이벤트 |


## Messages

### Case 1: 실시간 채팅 요청
사용자는 *Subscribe*을 통해 선택된 채팅방의 실시간 채팅을 요청한다.
서버는 이 Subscribe 이벤트를 받으면 사용자에게 Redis에 저장된 현재 실시간 채팅중인 사용자의 목록을 전달한다.

### Case 2: 실시간 채팅 중 새로운 사용자 참여
기존의 실시간 채팅을 이용중이던 사용자는 새로운 사용자가 실시간 채팅에 참여한것이므로, *"ns"* 메시지를 전달한다.

### Case 3: 실시간 채팅 중 참여자가 나가는 경우
참여하고있던 사용자가 나갔으므로 *"us"* 메시지를 채팅방에 전달한다. 

### Case 4: 실시간 채팅 종료
이는 *Unsubscribe* 이벤트 이므로 서버는 Redis에서 참여중인 사용자 목록에서 제거하고 Case3을 발생시킨다.

### Case 5: Unsubscribe 이벤트 없는 채팅 종료
이는 Websocket 연결이 끊어진 것이므로, Case 4와 같이 동일하게 처리한다.

### Thread or Multiple Application
한 어플리케시연 내에서의 Thread 혹은 다중 어플리케이션이 Redis를 동시에 접근하는 일이 자주 발생한다.
채팅서버에서 동시에 접근하여 처리하는 경우 문제가 발생하는 지점은
*사용자로 부터 채팅을 받아 인덱스를 부여하는 과정*이다

Redis에 에 저장된 채팅방 정보 중 가장 마지막 인덱스에 +1을 하고 채팅방 정보를 업데이트하는 과정이기 때문에, 동시성이 문제가된다.

따라서 이부분에 Redisson Lock인 RLock을 사용하여 동기화 문제를 해결한다.

RLock은 key 기반으로 작동하므로, 채팅방별 key를 활용하여 lock이 일어난다. 따라서, 채팅방별로 락이 일어나기때문에 lock에 의한 전체 채팅방에 영향은 적을것으로 예상된다. 


