import { observable, action, reaction, computed} from 'mobx'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

const dummy = [
  {
    "chatroom_idx": 1,
    "start_msg_idx": 1,
    "last_msg_idx": 15,
    "last_read_msg_idx": 15,
    "user_list": [
      {
        "chatroom_idx": 1,
        "user_idx": 2,
        "name": "조영호",
        "profile_img": "base64",
        "start_msg_idx": 10,
        "last_read_msg_idx": 10
      },
      {
        "chatroom_idx": 1,
        "user_idx": 3,
        "name": "정명지",
        "profile_img": "base64",
        "start_msg_idx": 5,
        "last_read_msg_idx": 1
      }
    ]
  },
  {
    "chatroom_idx": 4,
    "start_msg_idx": 0,
    "last_msg_idx": 0,
    "last_read_msg_idx": 0,
    "user_list": [
      {
        "chatroom_idx": 4,
        "user_idx": 2,
        "name": "조영호",
        "profile_img": "base64",
        "start_msg_idx": 0,
        "last_read_msg_idx": 0
      },
    ]
  }
]

const dummyChats = [
  {
    sender: 2,
    msg: "첫번째 메시지 입니다",
    msg_type: "m",
    timestamp: "1234",
    msg_idx: "1"
  },
  {
    sender: 3,
    msg: "두번쨰 메시지 입니다",
    msg_type: "m",
    msg_idx: "2",
    timestamp: "1235"
  }
] 

const dummyChats2 = [
  {
    sender: 2,
    msg: "세번째 메시지 입니다",
    msg_type: "m",
    timestamp: "1234",
    msg_idx: "1"
  },
  {
    sender: 3,
    msg: "네번째 메시지 입니다",
    msg_type: "m",
    msg_idx: "2",
    timestamp: "1235"
  } 
]


export default class Chatroom {
  constructor(root) {
    this.root = root
  }


  /**
   * Array of json object
   * 
   * name: the name of chatroom
   * latestMsg: the latest message of chatroom
   * logo: the logo of chatroom which is bas64 format
   * date: the date of the latest message
   * readMsgIdx: the last index user read
   * lastMsgIdx: the last index of the chatroom
   * chats: the array of the message chatroom has
   * joinMembers: the array of join members
   * 
   * 
   *
   */
  @observable chatroomList = dummy
  @observable pollingAxios = null
  @observable chatroomAxios = null

  /**
   * 
   * Chat Object
   * chatroomid: [chats]
   * 
   * sender: the sender of this message
   * img: TODO: base64 or the index of the array of images locally stored
   * msg: the message
   * time: the time of the chat
   */
  @observable chats = {
    1: dummyChats,
    4: dummyChats2
  }

  @observable stompClient = null

  /**
   * Boolean 
   * if the socket is connected to the server
   * then true
   * else false
   * 
   */
  @observable isConnected = false

  /**
   * set chatroom list chatroom list 
   * 
   * Using axious
   */
  @action
  initChatroomList = (data) => {
    // TODO: set chatroom list
    this.chatroomList = data;
  }

  /**
   * Update the whole chatroom list 
   * 
   * Using long polling
   */
  @action updateWholeChatroomList = () => {
    this.pollingAxios.post("http://localhost:8082/message/longpolling", { 
        user_idx: 1,
        rooms: [1]
      }).then(res => {
        if(res.data.resultCode === 0) {
          // alert(res.data.chatroom_idx + ' : ' + res.data.last_msg_idx + ' : ' + res.data.last_msg);
          this.updatePollingdata(res.data);
        }
        return this.root.chatroom.updateWholeChatroomList();
      }).catch(err => {
        console.log(err);
        setTimeout(() => this.updateWholeChatroomList(), 10000)
        // return this.root.chatroom.updateWholeChatroomList();
      })
  }

/**
   * Delete the chatroom 
   * 
   * Both the local and the server or just on local or server
   */
  @action updatePollingdata = (data) => {
    // debugger;
    for(var i=0; i<this.chatroomList.length; i++) {
      if(this.chatroomList[i].chatroom_idx === data.chatroom_idx) {
        this.chatroomList[i].last_msg_idx = data.last_msg_idx;
        this.chatroomList[i].last_msg = data.last_msg;
        this.chatroomList[i].timestamp = data.timestamp;
      }
    }
  }


  /**
   * Delete the chatroom 
   * 
   * Both the local and the server or just on local or server
   */
  @action deleteChatroom = () => {
    // TODO: Delete the chatroom
  }

  /**
   * Update a chatroom
   * 
   */
  @action updateChatroom = () => {
    // TODO: update the chatroom 
  }

  /**
   * Connect the chatroom with Websocket
   */
  @action openChatroom = (chatroomId) => {
    // TODO: Open the web socket for the chatroom
    this.stompClient = Stomp.over(new SockJS("/gs-guide-websocket"))         

    this.stompClient.connect({}, frame => {
      console.log("Successfully Connected")
      console.log(frame)
      this.isConnected = true
      this.stompClient.subscribe("/topic/chatroom/" + chatroomId, msg => {
        this.chats[chatroomId].push(JSON.parse(msg.body))
        console.log(msg)
      })
    }, err => {
      console.error(err)
    })
  }

  /**
   * Leave the Chatroom
   */
  @action leaveChatroom = () => {
    if(this.stompClient === null || this.isConnected === false) return
    console.log("Disconnecting from the chatroom server")
    this.stompClient.disconnect(() => {
      console.log("Successfully disconnected")
      this.stompClient = null
      this.isConnected = false
    })
  }

  /**
   * Send a chat
   */
  @action sendChat = (chatroomId, content) => {
    if(this.stompClient === null || this.isConnected === false) {
      console.error("No valid connection between server and client")
      this.stompClient = null
      this.isConnected = false
      return 
    }

    this.stompClient.send("/chatroom/" + chatroomId, JSON.stringify(content))
  }
  
}
