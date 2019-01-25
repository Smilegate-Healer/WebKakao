import { observable, action, computed } from 'mobx'

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
  @observable chatroomList

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

  @observable chats = {
    1: dummyChats
  }

  /**
   * Update the whole chatroom list 
   * 
   * Using long polling
   */
  @action updateWholeChatroomList = () => {
    // TODO: long polling  
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
  @action openChatroom = () => {
    // TODO: Open the web socket for the chatroom
  }

  /**
   * Send a chat
   * TODO: chatroom idx or id
   */
  @action sendChat = (whichChatroom) => {
    // TODO: send a chat through websocket
    // if success => add to the chatList in the chatroomList
  }
}

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
    user_idx: 2,
    msg: "첫번째 메시지 입니다",
    type: "plain",
  },
  {
    user_idx: 3,
    msg: "두번쨰 메시지 입니다",
    type: "plain",
  }
] 