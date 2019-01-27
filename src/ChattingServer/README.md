# Chatting Server

WebSocket 과 Redis(Pub/Sub) 활용한 채팅 서버



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
      {chatroom_id}: {
        object_id: /* MongoDB에 저장되는 Message block 의 키 값*/,
        last_msg_idx: /*마지막으로 전달된 메시지의 인덱스 값*/
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


object_id로 key값을 하는 Redis의 List
```json
{
  {object_id}: [
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

