# WebKakao API Document
 - WebKakao 프로젝트의 API 문서입니다.
 - Test Server Prefix URL : http://localhost:8080/
 - Service Server Prefix URL : 

<br/>

## Common Response Data Type
#### Specification

| Param Key Name | Value Type | Description        | Required |
|----------------|------------|--------------------|----------|
| result_code    | int        | 결과 코드            | y        |
| message        | String(?)  | 결과에 대한 메세지     | y        |
| param          |      -     | API에 따른 Parameter | y        |

  
  
#### Response Data Example
```
{  
   "result_code":0,
   "message":"success",
   "param":{  
      ...   
   }
}
```

<br/>
<br/>


## 1. REQUEST FRIEND
  - 친구 요청 API 입니다.
  

| URL | /api/friend/request |
|-----|---------------------|

### 1.1 RequestBody  
  
#### 1.1.1 Specification
| Key Name       | Value Type | Description                 | Required |
|----------------|------------|-----------------------------|----------|
| from_user_idx  | long       | 친구 요청자의 유저 인덱스   | y        |
| to_user_idx    | long       | 상대방의 유저 인덱스        | y        |
  
  
#### 1.1.2 Request Example
```
{  
   "from_user_idx":1,
   "to_user_idx":1
}
```

<br/>

### 1.2 ResponseBody  
  
#### 1.2.1 Param Specification
| Param Key Name | Value Type | Description                  | Required |
|----------------|------------|------------------------------|----------|
| user_idx       | long       | 상대방의 유저 인덱스         | y        |
| user_name      | String(?)  | 상대방의 이름                | y        |
| profile_img    | String(?)  | 상대방의 프로필 사진(base64) | y        |
| status_msg     | String(?)  | 상대방의 상태 메세지         | y        |
  
  
#### 1.2.2 Response Example
```
{  
   "resultCode":0,
   "message":"success",
   "param":{  
      "user_idx":1,
      "user_name":"홍성문",
      "profile_img":"base64",
      "status_msg":"상태메세지"
   }
}
```
  
  <br/>
  <br/>
  
## 2. SEARCH FRIEND
  - 친구 찾기 API 입니다.
  
| URL | /api/friend/search |
|-----|---------------------|

### 2.1 RequestBody  
  
#### 2.1.1 Specification
| Key Name       | Value Type | Description      | Required |
|----------------|------------|------------------|----------|
| user_email     | String(?)  |  상대방의 이메일 | y        |
  
  
#### 2.1.2 Request Example
```
{  
   "user_email": "hsm63746244@gmail.com"
}
```

<br/>

### 2.2 ResponseBody  
  
#### 2.2.1 Param Specification
| Param Key Name | Value Type | Description                  | Required |
|----------------|------------|------------------------------|----------|
| user_idx       | long       | 상대방의 유저 인덱스         | y        |
| user_name      | String(?)  | 상대방의 이름                | y        |
| profile_img    | String(?)  | 상대방의 프로필 사진(base64) | y        |
| status_msg     | String(?)  | 상대방의 상태 메세지         | y        |
  
  
#### 2.2.2 Response Example
```
{  
   "resultCode":0,
   "message":"success",
   "param":{  
      "user_idx":1,
      "user_name":"홍성문",
      "profile_img":"base64",
      "status_msg":"상태메세지"
   }
}
```
  
  <br/>
  <br/>

## 3. GET FRIEND INFO
  - 친구의 상세 정보를 요청하는 API 입니다.

| URL | /api/friend/info    |
|-----|---------------------|

### 3.1 RequestBody  
  
#### 3.1.1 Specification
| Key Name       | Value Type | Description             | Required |
|----------------|------------|-------------------------|----------|
| user_idx       | long       |  상대방의 유저 인덱스   | y        |
  
  
#### 3.1.2 Request Example
```
{  
   "user_idx":1
}
```

<br/>

### 3.2 ResponseBody  
  
#### 3.2.1 Param Specification
| Param Key Name | Value Type | Description                         | Required |
|----------------|------------|-------------------------------------|----------|
| background_img | String     | 상대방의 사용자 배경 이미지(Base64) | y        |

  
#### 3.2.2 Response Example
```
{  
   "resultCode":0,
   "message":"success",
   "param":{  
      "background_img":"base64"
   }
}
```
  
  <br/>
  <br/>
  
## 4. UPDATE FRIEND STATUS
  - 친구의 상태를 수정하는 API입니다.
  
| URL | /api/friend/status  |
|-----|---------------------|

### 4.1 RequestBody  
  
#### 4.1.1 Specification
| Key Name       | Value Type | Description             | Required |
|----------------|------------|-------------------------|----------|
| user_idx       | long       |  상대방의 유저 인덱스   | y        |
| state          | int        |  요청 친구 상태         | y        |
  - state -> 0 = 숨김/차단 해제,  1 = 숨김  , 2 = 차단
  

#### 4.1.2 Request Example
```
{  
   "user_idx":1,
   "state":2
}
```

<br/>

### 4.2 ResponseBody  
  
#### 4.2.1 Param Specification
| Param Key Name | Value Type | Description                         | Required |
|----------------|------------|-------------------------------------|----------|
|  -   |         -   |              -                       |    -      |
  
#### 4.2.2 Response Example
```
{  
   "resultCode":0,
   "message":"success"
}
```
  
  <br/>
  <br/>
  
  
## 5. GET FRIEND LIST
  - 사용자의 친구 목록을 요청하는  API 입니다.
  
| URL | /api/friend/list    |
|-----|---------------------|

### 5.1 RequestBody  
  
#### 5.1.1 Specification
| Key Name       | Value Type | Description             | Required |
|----------------|------------|-------------------------|----------|
| user_idx       | long       |  상대방의 유저 인덱스   | y        |

#### 5.1.2 Request Example
```
{  
   "user_idx":1
}
```

<br/>

### 5.2 ResponseBody  
  
#### 5.2.1 Param Specification
| Param Key Name | Value Type | Description                         | Required |
|----------------|----------------------|---------------------------|----------|
| list           | List<UserInfo>       | 친구 목록 리스트          |   y      |

##### 5.2.2 UserInfo Specification
  
| UserInfo Key Name | Value Type | Description                  | Required |
|----------------|------------|------------------------------|----------|
| user_idx       | long       | 상대방의 유저 인덱스         | y        |
| user_name      | String(?)  | 상대방의 이름                | y        |
| profile_img    | String(?)  | 상대방의 프로필 사진(base64) | y        |
| status_msg     | String(?)  | 상대방의 상태 메세지         | y        |

  
  
#### 5.2.3 Response Example
```
{  
   "resultCode":0,
   "message":"success",
   "param":[  
      {  
         "user_idx":1,
         "user_name":"홍성문",
         "profile_img":"base64",
         "status_msg":"상태메세지"
      },
      {  
         "user_idx":2,
         "user_name":"조영호",
         "profile_img":"base64",
         "status_msg":"상태메세지"
      },
      ...
   ]
}
```
  
  <br/>
  <br/>
  
  
## 6. REQUEST CHATROOM
  - 채팅방 생성을 요청하는 API 입니다.
  
| URL | /api/chatroom/request |
|-----|-----------------------|

### 6.1 RequestBody  
  
#### 6.1.1 Specification
| Key Name       | Value Type | Description             | Required |
|----------------|------------|-------------------------|----------|
| from_user_idx  | long       |  요청자의 유저 인덱스   | y        |
| to_user_idx    | long       |  상대방의 유저 인덱스   | y        |

#### 6.1.2 Request Example
```
{  
   "from_user_idx":1,
   "to_user_idx":2
}
```

<br/>

### 6.2 ResponseBody  
  
#### 6.2.1 Param Specification
| Param Key Name | Value Type | Description            | Required |
|----------------|------------|------------------------|----------|
| chatroom_idx   | long       | 생성된 채팅방의 인덱스 |   y      |
  
#### 6.2.2 Response Example
```
{  
   "resultCode":0,
   "message":"success",
   "param":{  
         "chatroom_idx":1
    }
}
```
  
  <br/>
  <br/>
  
  
## 7. CHECK IN CHATROOM
  - 채팅방에 친구를 초대하는 API 입니다.
 
  
| URL | /api/chatroom/checkin |
|-----|-----------------------|

### 7.1 RequestBody  
  
#### 7.1.1 Specification
| Key Name       | Value Type | Description             | Required |
|----------------|------------|-------------------------|----------|
| from_user_idx  | long       |  요청자의 유저 인덱스   | y        |
| from_user_name | String(?)  |  요청자의 이름          | y        |
| to_user_idx    | long       |  상대방의 유저 인덱스   | y        |
| to_user_name   | String(?)  |  상대방의 이름          | y        |
| chatroom_idx   | long       |  초대할 채팅방의 인덱스 | y        |
  - API 수신 시 chat producer 로 초대정보 send 해야 합니다.
  

#### 7.1.2 Request Example
```
{  
   "from_user_idx":1,
   "from_user_name":"홍성문",
   "to_user_idx":3,
   "to_user_name":"정명지",
   "chatroom_idx":1
}
```

<br/>
### 7.2 ResponseBody  
  
#### 7.2.1 Param Specification
| Param Key Name | Value Type | Description                         | Required |
|----------------|------------|-------------------------------------|----------|
|  - |          -  |              -                       |      -    |
  
#### 7.2.2 Response Example
```
{  
   "resultCode":0,
   "message":"success"
}
```
  
  <br/>
  <br/>
  
  
## 8. CHECK OUT CHATROOM
  - 채팅방을 나가는 API 입니다.
  
  <br/>
  
| URL | /api/chatroom/checkout |
|-----|------------------------|

### 8.1 RequestBody  
  
#### 8.1.1 Specification
| Key Name       | Value Type | Description             | Required |
|----------------|------------|-------------------------|----------|
| user_idx       | long       |  요청자의 유저 인덱스   | y        |
| chatroom_idx   | long       |  나갈 채팅방의 인덱스   | y        |
  - API 수신 시 chat producer 로 초대정보 send 해야 합니다.
  

#### 8.1.2 Request Example
```
{  
   "user_idx":1,
   "chatroom_idx":1
}
```

<br/>
### 8.2 ResponseBody  
  
#### 8.2.1 Param Specification
| Param Key Name | Value Type | Description                         | Required |
|----------------|------------|-------------------------------------|----------|
| -   |       -     |     -                                |      -    |
  
#### 8.2.2 Response Example
```
{  
   "resultCode":0,
   "message":"success"
}
```
  
  <br/>
  <br/>
