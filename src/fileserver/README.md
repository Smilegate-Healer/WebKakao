# File Server


## How to upload a file correctly
1. POST /upload
2. POST /file/{fileid}

채팅방에서 파일을 업로드하기위해 먼저 `/upload` 로 요청을 한다.
```json
{
	send_idx: 요청하는 유저의 id,
	chatroom_idx: 채팅방의 id,
	fileType: file의 타입,
	origin_name: 파일의 원래 이름	
}
```

서버는 해당 요청을 처리하고 업로드 할 수 있는 url 을 유저에게 응답한다.


