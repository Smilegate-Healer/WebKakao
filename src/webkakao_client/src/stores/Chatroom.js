import { observable, action } from 'mobx'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import ChatroomNameFormatter from '../utils/ChatroomNameFormatter'



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
  @observable chatroomList = []
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
  @observable chats = {}

  @observable stompClient = null
  stompSubscription = null

  /**
   * Boolean 
   * if the socket is connected to the server
   * then true
   * else false
   * 
   */
  @observable isConnected = false

  /**
   * Booelan 
   * if the socket is connecting to the Server
   * then true
   * else false
   */
  @observable isConnecting = false


  /**
   * set chatroom list chatroom list 
   * 
   * Using axious
   */
  @action
  initChatroomList = (data) => {
    // TODO: set chatroom list
    this.chatroomList = data;
    this.chatroomList = this.root.chatroom.chatroomListSort();
  }

  /**
   * Update the whole chatroom list 
   * 
   * Using long polling
   */
  @action updateWholeChatroomList = () => {
    const chatroomIdxList = this.root.chatroom.getChatroomIdxList();
    this.pollingAxios.post("http://localhost:8082/message/longpolling", { 
        user_idx: 1,
        rooms: chatroomIdxList
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
   * update polling data
   * 
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
    this.chatroomList = this.root.chatroom.chatroomListSort();
    if(this.root.view.selectedChatroom !== data.chatroom_idx) {
      // this.root.view.showPollingMessage(data);
      this.root.view.showPollingMessage(data);
    }
  }

  /**
   * get chatroom name
   * 
   */
  @action getChatroomName = (chatroom_idx) => {
    // debugger;
    for(var i=0; i<this.chatroomList.length; i++) {
      if(this.chatroomList[i].chatroom_idx === chatroom_idx) {
        return ChatroomNameFormatter.getChatroomName(this.chatroomList[i].user_list, this.chatroomList[i].chatroom_name)
      }
    }
  }

  /**
   * open chatroom
   * 
   */
  @action openChatroom = (to_user_idx) => {

    for(var i=0; i<this.chatroomList.length; i++) {
      if(this.chatroomList[i].user_list.length === 1 && this.chatroomList[i].user_list[0].user_idx === to_user_idx) {
        this.root.view.showChatroom(this.chatroomList[i].chatroom_idx);
        return;
      }
    }

    this.root.chatroom.requestChatroom(this.root.user.getUserIdx(), to_user_idx);

  }

  @action requestChatroom = (from_user_idx, to_user_idx) => {
    
    const reqData = {
      from_user_idx: from_user_idx,
      to_user_idx: to_user_idx
    };

    this.chatroomAxios.post("http://localhost:8081/api/chatroom/request", reqData).then(res => {
      if(res.data.resultCode === 0) { 
        res.data.param["user_list"] = [];
        const user_info = this.createUserInfo(this.root.user.getFriendByUserIdx(to_user_idx, res.data.param.chatroom_idx));
        res.data.param.user_list.push(user_info);
        this.chatroomList.push(res.data.param);
        this.root.view.showChatroom(res.data.param.chatroom_idx);
      }
    }).catch(err => {
        console.log(err);
    })

  }

  /**
   * get chatroom message
   * 
   * Both the local and the server or just on local or server
   */
  @action getChatroomMessage = (chatroom_idx) => {

    let object_id = null;
    if(this.chats[chatroom_idx]) {
      object_id = this.chats[chatroom_idx].object_id;
    } 

    const reqData = {
      chatroom_idx : chatroom_idx,
      object_id : object_id
    }

    this.chatroomAxios.post("http://localhost:8081/api/chatroom/message", reqData).then(res => {
      if(res.data.resultCode === 0) {
        if(!this.chats[chatroom_idx]) {
          this.chats[chatroom_idx] = res.data.param;
        } else {
          if(res.data.param.data.length > 0) {
            this.chats[chatroom_idx].data.unshift(res.data.param.data);
          }
          this.chats[chatroom_idx].object_id = res.data.param.object_id;
        }
      }
    }).catch(err => {
        console.error(err);
    })
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
   * Establish connection to Chatting server
   */
  @action openSocket = () => {
    return new Promise((resolve, reject) => {
      if(this.stompClient !== null && this.isConnected === true) {
        resolve()
        return
      }

      this.isConnecting = true

      const sock = new SockJS("/gs-guide-websocket")
      this.stompClient = Stomp.over(sock)         

      this.stompClient.connect({}, frame => {
        console.log("Successfully Connected")
        console.log(frame)
        this.isConnected = true
        this.isConnecting = false
        resolve()
      }, err => {
        console.error(err)
        this.isConnected = false
        this.isConnecting = false
        this.stompClient = null
        this.stompSubscription = null
        reject()
      })
    })
  }

  /**
   * Disconnect from the Chatting server
   */
  @action closeSocket = () => {
    if(this.stompClient === null) return
    console.log("Disconnecting from the chatroom server")
    this.stompClient.disconnect(() => {
      console.log("Successfully disconnected")
      this.stompClient = null
      this.isConnected = false
      this.isConnecting = false
      this.stompSubscription = null
    })
  }

  /**
   * Change from Chatroom A to B
   * ie. Subscription changes
   */
  @action moveToAnother = (chatroomId) => {
    console.log("Move to another chatroom")
    if(this.stompClient === null || this.isConnected === false) {
      console.error("No STOMP client or connection")
      this.closeSocket()
      return
    }

    this.unsubscribeChatroom()

    this.stompSubscription = this.stompClient.subscribe("/topic/chatroom/" + chatroomId, msg => {
      this.chats[chatroomId].data.push(JSON.parse(msg.body))
      console.log(msg)
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

  /**
   * Unsubscribe if subscription is not null
   */
  @action unsubscribeChatroom = () => {
    if(this.stompSubscription !== null) {
      this.stompSubscription.unsubscribe()
      this.stompSubscription = null
    }
  }

  @action chatroomListSort = () => {
    return this.chatroomList.slice().sort(function(a, b) {
      return a.timestamp > b.timestamp ? -1 : 1;
    });
  }

  createUserInfo(user, chatroom_idx) {

    return {
      chatroom_idx: chatroom_idx,
      last_read_msg_idx: 0,
      name: user.name,
      profile_img: user.profile_img,
      start_msg_idx: 0,
      user_idx: user.user_idx
    };

  }

  getChatroomIdxList() {
    let list = [];
    for(var i=0; i<this.chatroomList.length; i++) {
      list.push(this.chatroomList[i].chatroom_idx);
    }
    return list;
  }

  
  @action getNameByChatroomUserList = (data) => {
    for(var i=0; i<this.chatroomList.length; i++) {
      if(this.chatroomList[i].chatroom_idx === data.chatroom_idx) {
        for(var j=0; j<this.chatroomList[i].user_list.length; j++) {
          if(this.chatroomList[i].user_list[j].user_idx === data.sender) {
            return this.chatroomList[i].user_list[j].name;
          }
        }
      }
    }
  }
  
}
