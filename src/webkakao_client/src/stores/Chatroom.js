import { observable, action, reaction } from "mobx";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import ChatroomNameFormatter from "../utils/ChatroomNameFormatter";
import axios from 'axios'

export default class Chatroom {
  constructor(root) {
    this.root = root;
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
  @observable chatroomList = null;
  @observable isLoading = false;
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
  @observable chats = {};

  @observable stompClient = null;
  stompSubscription = null;

  /**
   * Boolean
   * if the socket is connected to the server
   * then true
   * else false
   *
   */
  @observable isConnected = false;

  /**
   * Booelan
   * if the socket is connecting to the Server
   * then true
   * else false
   */
  @observable isConnecting = false;

  /**
   * Polling canceler
   */
  @observable pollingCanceler = null

  /**
   * set chatroom list chatroom list
   *
   * Using axious
   */
  @action
  initChatroomList = data => {
    // TODO: set chatroom list
    this.chatroomList = data;
    this.chatroomList = this.root.chatroom.chatroomListSort();
  };

  /**
   * Update the whole chatroom list
   *
   * Using long polling
   */
  @action updateWholeChatroomList = () => {
    const chatroomIdxList = this.root.chatroom.getChatroomIdxList();
    if(this.pollingCanceler === null) {
      this.pollingCanceler = axios.CancelToken.source()
    }

    this.root.user.authorizedAxios
      .post("http://localhost:8082/message/longpolling", {
        user_idx: this.root.user.userInfo.user_idx,
        rooms: chatroomIdxList,
      }, {
        cancelToken: this.pollingCanceler.token
      })
      .then(res => {
        if (res.data.resultCode === 0) {
          // alert(res.data.chatroom_idx + ' : ' + res.data.last_msg_idx + ' : ' + res.data.last_msg);
          this.updatePollingdata(res.data);
        }
        return this.root.chatroom.updateWholeChatroomList();
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => this.updateWholeChatroomList(), 10000);
        // return this.root.chatroom.updateWholeChatroomList();
      });
  };

  @action cancelPolling = () => {
    if(this.pollingCanceler) {
      this.pollingCanceler.cancel()
    }

    this.pollingCanceler = null
  }

  /**
   * update polling data
   *
   */
  @action updatePollingdata = data => {
    if (data.msg_type === "m") {
      for (var i = 0; i < this.chatroomList.length; i++) {
        if (this.chatroomList[i].chatroom_idx === data.chatroom_idx) {
          this.chatroomList[i].last_msg_idx = data.last_msg_idx;
          this.chatroomList[i].last_msg = data.last_msg;
          this.chatroomList[i].timestamp = data.timestamp;
          if (
            this.chatroomList[i].chatroom_idx ===
            this.root.view.selectedChatroom
          ) {
            this.chatroomList[i].last_read_msg_idx = data.last_msg_idx;
          }
        }
      }
    } else if (data.msg_type === "i") {
      const chatroom_idx = this.getChatroomIdx(data.chatroom_idx);
      if (chatroom_idx >= 0) {
        const userList = data.user_list;
        const invitedUsers = data.last_msg.trim().split(" ");
        this.chatroomList[chatroom_idx].timestamp = data.timestamp;
        this.chatroomList[chatroom_idx].last_msg_idx = data.last_msg_idx;
        this.chatroomList[chatroom_idx].last_read_msg_idx = data.last_msg_idx;
        for (var j = 0; j < invitedUsers.length; j++) {
          for (var i = 0; i < userList.length; i++) {
            const idx = +invitedUsers[j];
            if (userList[i].user_idx === idx) {
              this.chatroomList[chatroom_idx].user_list.push(userList[i]);
            }
          }
        }
      } else {
        this.chatroomList.push(data.chatroom_info);
        for (var i = 0; i < this.chatroomList.length; i++) {
          if (this.chatroomList[i].chatroom_idx === data.chatroom_idx) {
            for (var j = 0; j < data.chatroom_info.user_list.length; j++) {
              if (
                data.chatroom_info.user_list[j].user_idx ===
                this.root.user.userInfo.user_idx
              ) {
                this.chatroomList[i].user_list.splice(j, 1);
              }
            }
          }
        }
      }
      const chatroomIdx = this.getChatroomIdx(data.chatroom_idx);
      const users = data.last_msg.trim().split("/");
      const names = users[1].trim();
      if (this.chatroomList[chatroomIdx]) {
        this.chatroomList[chatroomIdx].last_msg =
          names + "님이 초대되었습니다.";
      }
    } else if (data.msg_type === "e") {
      if (this.root.user.userInfo.user_idx !== data.sender) {
        const chatroom_idx = this.getChatroomIdx(data.chatroom_idx);
        this.chatroomList[chatroom_idx].timestamp = data.timestamp;
        this.chatroomList[chatroom_idx].last_msg_idx = data.last_msg_idx;
        this.chatroomList[chatroom_idx].last_msg =
          data.last_msg + "님이 퇴장하였습니다.";
        this.chatroomList[chatroom_idx].last_read_msg_idx = data.last_msg_idx;
        const userList = this.chatroomList[chatroom_idx].user_list;
        for (var i = 0; i < userList.length; i++) {
          if (userList[i].user_idx === data.sender) {
            userList.splice(i, 1);
            break;
          }
        }
      }
    }
    this.chatroomList = this.root.chatroom.chatroomListSort();
    if (
      this.root.view.selectedChatroom !== data.chatroom_idx &&
      data.msg_type === "m"
    ) {
      this.root.view.showPollingMessage(data);
    }
  };

  /**
   * get chatroom name
   *
   */
  @action getChatroomName = chatroom_idx => {
    for (var i = 0; i < this.chatroomList.length; i++) {
      if (this.chatroomList[i].chatroom_idx === chatroom_idx) {
        return ChatroomNameFormatter.getChatroomName(
          this.chatroomList[i].user_list,
          this.chatroomList[i].chatroom_name
        );
      }
    }
  };

  /**
   * open chatroom
   *
   */
  @action openChatroom = to_user_idx => {
    for (var i = 0; i < this.chatroomList.length; i++) {
      if (
        this.chatroomList[i].user_list && 
        this.chatroomList[i].user_list.length === 1 &&
        this.chatroomList[i].user_list[0].user_idx === to_user_idx
      ) {
        this.root.view.showChatroom(this.chatroomList[i].chatroom_idx);
        return;
      }
    }
    const to_user_name = this.root.user.getUserName(to_user_idx);
    this.root.chatroom.requestChatroom(
      this.root.user.getUserIdx(),
      to_user_idx,
      to_user_name
    );
  };

  @action requestChatroom = (from_user_idx, to_user_idx, to_user_name) => {
    const reqData = {
      from_user_idx: from_user_idx,
      to_user_idx: to_user_idx
    };

    this.root.user.authorizedAxios
      .post("http://localhost:8081/api/chatroom/request", reqData)
      .then(res => {
        if (res.data.resultCode === 0) {
          res.data.param["user_list"] = [];
          const user_info = this.createUserInfo(
            this.root.user.getFriendByUserIdx(
              to_user_idx,
              res.data.param.chatroom_idx
            )
          );
          res.data.param.user_list.push(user_info);
          this.chatroomList.push(res.data.param);
          this.chats[res.data.param.chatroom_idx] = {};
          this.chats[res.data.param.chatroom_idx].data = [];

          this.root.view.showChatroom(res.data.param.chatroom_idx);

          this.sendChat(res.data.param.chatroom_idx, {
            sender: this.root.user.userInfo.user_idx,
            msg: to_user_idx + "/" + to_user_name,
            msg_type: "i"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  @action getChatroomScrollMessage = chatroom_idx => {
    console.debug("Get chatroom scroll message");

    let object_id = null;

    if (this.chats[chatroom_idx]) {
      object_id = this.chats[chatroom_idx].pre_object_id;
    }

    if (object_id === "null") {
      console.debug("This chats object is the first one")
      return;
    }

    const reqData = {
      chatroom_idx: chatroom_idx,
      user_idx: this.root.user.userInfo.user_idx,
      object_id: object_id
    };

    if (this.isLoading === false) {
      this.startLoading();
      return new Promise((resolve, reject) => {
        this.root.user.authorizedAxios
          .post("http://localhost:8081/api/chatroom/message/scroll", reqData)
          .then(res => {
            if (res.data.resultCode === 0) {
              resolve(res.data.param);
            } else {
              reject(res)
            }
          })
          .catch(err => {
            reject(err);
            this.endLoading();
          });
      })
      .then(param => {
        if (param.data.length > 0) {
          const first_msg_idx = this.chats[chatroom_idx].data[0].msg_idx;
          const responseMsg = param.data;
          const idxOfDuplicateStart = responseMsg.findIndex(newChat => {
            return newChat.msg_idx === first_msg_idx
          })
          
          var newChats = responseMsg
          if(idxOfDuplicateStart !== -1) {
            console.debug("start of duplicate index= " + idxOfDuplicateStart)
            newChats = responseMsg.slice(0, idxOfDuplicateStart)
          }

          this.chats[chatroom_idx].data = newChats.concat(this.chats[chatroom_idx].data)
          this.chats[chatroom_idx].pre_object_id = param.pre_object_id;
        } else {
          this.endLoading();
        }
      })
      .catch(err => {
        console.error("Can't get old messages by scrolling")
        console.error(err)
      });
    }
  };

  /**
   * get chatroom message
   *
   * Both the local and the server or just on local or server
   */
  @action getChatroomMessage = chatroom_idx => {
    let last_read_msg_idx = null;

    if (
      this.chats[chatroom_idx] &&
      this.chats[chatroom_idx].data &&
      this.chats[chatroom_idx].data.length !== 0
    ) {
      last_read_msg_idx = this.chats[chatroom_idx].data[
        this.chats[chatroom_idx].data.length - 1
      ].msg_idx;
    }
    const reqData = {
      chatroom_idx: chatroom_idx,
      user_idx: this.root.user.userInfo.user_idx,
      last_read_msg_idx: last_read_msg_idx
    };

    this.root.user.authorizedAxios
      .post("http://localhost:8081/api/chatroom/message", reqData)
      .then(res => {
        if (res.data.resultCode === 0) {
          const responseMsg = res.data.param.data;
          if (!this.chats[chatroom_idx]) {
            this.chats[chatroom_idx] = res.data.param;
          } else {
            if (res.data.param.data.length > 0) {
              for (var i = 0; i <= responseMsg.length - 1; i++) {
                if (last_read_msg_idx < responseMsg[i].msg_idx) {
                  this.chats[chatroom_idx].data.push(responseMsg[i]);
                }
              }
            }
          }
          for (var i = 0; i < this.chatroomList.length; i++) {
            if (this.chatroomList[i].chatroom_idx === chatroom_idx) {
              if (this.chats[chatroom_idx].data.length > 0) {
                this.chatroomList[i].last_read_msg_idx =
                  responseMsg[responseMsg.length - 1].msg_idx;
              }
            }
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  };


  /**
   * Establish connection to Chatting server
   */
  @action openSocket = () => {
    return new Promise((resolve, reject) => {
      if (this.stompClient !== null && this.isConnected === true) {
        resolve();
        return;
      }

      this.isConnecting = true;

      const sock = new SockJS("http://localhost:8080/chat");
      this.stompClient = Stomp.over(sock, {
        heartbeat: false
      });

      this.stompClient.connect({},
        frame => {
          console.log("Successfully Connected");
          console.log(frame);
          this.isConnected = true;
          this.isConnecting = false;
          resolve();
        },
        err => {
          console.error(err);
          this.isConnected = false;
          this.isConnecting = false;
          this.stompClient = null;
          this.stompSubscription = null;
          reject();
        }
      );
    });
  };

  /**
   * Disconnect from the Chatting server
   */
  @action closeSocket = () => {
    if (this.stompClient === null) return;
    console.log("Disconnecting from the chatroom server");
    this.stompClient.disconnect(() => {
      console.log("Successfully disconnected");
      this.stompClient = null;
      this.isConnected = false;
      this.isConnecting = false;
      this.stompSubscription = null;
    });
  };

  /**
   * Change from Chatroom A to B
   * ie. Subscription changes
   */
  @action moveToAnother = chatroomId => {
    console.log("Move to another chatroom");
    if (this.stompClient === null || this.isConnected === false) {
      console.error("No STOMP client or connection");
      this.closeSocket();
      return;
    }

    this.unsubscribeChatroom(this.root.view.selectedChatroom);

    this.stompSubscription = this.stompClient.subscribe(
      "/topic/chatroom/" + chatroomId,
      msg => {
        console.log(msg);

        if (!this.chats[chatroomId]) {
          this.chats[chatroomId] = {};
          this.chats[chatroomId].data = [];
        }

        const data = JSON.parse(msg.body);

        if (data.msg_type === "s") {
          const msg = JSON.parse(data.msg);
  
          const subscribers = msg.joining
          const lastReadMsgIdxByUsers = msg.lastReadMsgIdx

          const idxOfChatroom = this.findIdxOfChatroom(chatroomId)
          if(idxOfChatroom === -1) {
            console.error("No chatroom info in list!!")
            return
          } 
          
          for(var key in lastReadMsgIdxByUsers) {
            var idx = this.findIdxOfUser(idxOfChatroom, parseInt(key))
            if(idx === -1) {
              console.debug("no user in chatroom user list")
              continue
            }

            this.chatroomList[idxOfChatroom].user_list[idx].last_read_msg_idx
              = lastReadMsgIdxByUsers[key]
          }

          // TODO: Refactoring
          subscribers.forEach((userId) => {

            const idxOfUser = this.findIdxOfUser(idxOfChatroom, parseInt(userId))
            if(idxOfUser === -1) {
              console.debug("No user in chatroom user list")
              return
            }
            
            this.createReactionForLastReadMsgIdx(idxOfUser, idxOfChatroom)
          })

        } else if (data.msg_type === "ns") {
          const newSubUserId = parseInt(data.msg)

          const idxOfChatroom = this.findIdxOfChatroom(chatroomId)
          if(idxOfChatroom === -1) {
            console.error("No chatroom info in list!!")
            return
          }

          const idxOfUser = this.findIdxOfUser(idxOfChatroom, newSubUserId)
          if(idxOfUser === -1) {
            console.debug("No user in chatroom user list")
            return
          }

          this.createReactionForLastReadMsgIdx(idxOfUser, idxOfChatroom)

        } else if (data.msg_type === "us") {
          const unsubUserId = parseInt(data.msg)
          const idxOfChatroom2 = this.findIdxOfChatroom(chatroomId)
          if(idxOfChatroom2 === -1) {
            console.error("No chatroom info in list!!")
            return
          }

          this.chatroomList[idxOfChatroom2].lastReadReactions[unsubUserId]()
          delete this.chatroomList[idxOfChatroom2].lastReadReactions[unsubUserId]
        } else {
          this.chats[chatroomId].data.push(data);
        }
      }, {
        userId: this.root.user.userInfo.user_idx
      }
    );
  };

  /**
   * Send a chat
   */
  @action sendChat = (chatroomId, content) => {
    if (this.stompClient === null || this.isConnected === false) {
      console.error("No valid connection between server and client");
      this.stompClient = null;
      this.isConnected = false;
      return;
    }

    this.stompClient.send("/chatroom/" + chatroomId, JSON.stringify(content));
  };

  /**
   * Send a file
   *
   */
  @action sendFile = (chatroomId, file) => {
    const { authorizedAxios } = this.root.user;
    console.log(file);
    authorizedAxios
      .post("http://localhost:8083/upload", {
        sender_idx: this.root.user.userInfo.user_idx,
        chatroom_idx: chatroomId,
        fileType: "p",
        origin_name: file.name
      })
      .then(res => {
        console.log(res);
        var formData = new FormData();
        formData.append("file", file);
        const uploadUrl = res.data.param.uploadUrl;
        authorizedAxios
          .post("http://localhost:8083" + uploadUrl, formData, {
            header: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            console.log(res);

            var fileType = file.type;
            var msgType = "f";
            const slashIdx = fileType.indexOf("/");
            if (slashIdx !== -1) {
              var pre = fileType.substring(0, slashIdx);
              switch (pre) {
                case "image":
                  msgType = "p";
                  break;
                case "video":
                  msgType = "v";
                  break;
                default:
                  msgType = "f";
              }
            }

            this.sendChat(chatroomId, {
              sender: this.root.user.userInfo.user_idx,
              msg: uploadUrl + " " + file.name,
              msg_type: msgType
            });
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  };

  /**
   * Unsubscribe if subscription is not null
   */
  @action unsubscribeChatroom = (chatroomId) => {
    if (this.stompSubscription !== null) {
      this.stompSubscription.unsubscribe();
      this.stompSubscription = null;

      if(chatroomId) {
        console.debug("dispose all reaction for last read")
        let chatroomIdx = this.findIdxOfChatroom(parseInt(chatroomId))
        if(chatroomIdx === -1) {
          console.error("no chatroom in list")
          return
        }
  
        for(var key in this.chatroomList[chatroomIdx].lastReadReactions) {
          console.log(key)
          this.chatroomList[chatroomIdx].lastReadReactions[key]()
          delete this.chatroomList[chatroomIdx].lastReadReactions[key]
        }

        this.chatroomList[chatroomIdx].lastReadReactions = null
      } 
    }
  };

  @action chatroomListSort = () => {
    return this.chatroomList.slice().sort(function(a, b) {
      return a.timestamp > b.timestamp ? -1 : 1;
    });
  };

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
    for (var i = 0; i < this.chatroomList.length; i++) {
      list.push(this.chatroomList[i].chatroom_idx);
    }
    return list;
  }

  @action getNameByChatroomUserList = data => {
    for (var i = 0; i < this.chatroomList.length; i++) {
      if (this.chatroomList[i].chatroom_idx === data.chatroom_idx) {
        for (var j = 0; j < this.chatroomList[i].user_list.length; j++) {
          if (this.chatroomList[i].user_list[j].user_idx === data.sender) {
            return this.chatroomList[i].user_list[j].name;
          }
        }
      }
    }
  };

  @action
  showAllChatroomList = () => {
    for (var i = 0; i < this.chatroomList.length; i++) {
      this.chatroomList[i].hide = false;
    }
  };

  @action
  showAllChatroomList = () => {
    for (var i = 0; i < this.chatroomList.length; i++) {
      this.chatroomList[i].hide = false;
    }
  };

  @action

  @action
  getSelectedChatroomUserList = () => {
    for (var i = 0; i < this.chatroomList.length; i++) {
      if (
        this.chatroomList[i].chatroom_idx === this.root.view.selectedChatroom
      ) {
        return this.chatroomList[i].user_list;
      }
    }
  };

  @action renameChatroom = name => {
    const data = {
      chatroom_idx: this.root.view.selectedChatroom,
      chatroom_name: name
    };
    this.root.user.authorizedAxios
      .post("http://localhost:8081/api/chatroom/rename", data)
      .then(res => {
        if (res.data.resultCode === 0) {
          this.setNameChatroom(
            res.data.param.chatroom_idx,
            res.data.param.chatroom_name
          );
          this.root.view.hideRenameChatroomModal();
          this.root.view.resetRenameChatroomTargerStr();
          this.root.view.setSelectedChatroom(name);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  @action setNameChatroom = (chatroom_idx, name) => {
    for (var i = 0; i < this.chatroomList.length; i++) {
      if (this.chatroomList[i].chatroom_idx === chatroom_idx) {
        this.chatroomList[i].chatroom_name = name;
      }
    }
  };

  @action inviteChatroom = () => {
    const userList = this.root.view.searchUserList;
    const users = [];
    const userInfos = [];
    let users_idxs = "";
    let users_names = "";
    for (var i = 0; i < userList.length; i++) {
      if (userList[i].checked) {
        const user = {
          to_user_idx: userList[i].user_idx,
          to_user_name: userList[i].name
        };
        users.push(user);
        userInfos.push(userList[i]);
        users_idxs = users_idxs.concat(userList[i].user_idx + " ");
        users_names = users_names.concat(userList[i].name + " ");
      }
    }

    const reqData = {
      from_user_idx: this.root.user.userInfo.user_idx,
      from_user_name: this.root.user.userInfo.name,
      to_user_list: users,
      chatroom_idx: this.root.view.selectedChatroom
    };
    this.root.user.authorizedAxios
      .post("http://localhost:8081/api/chatroom/checkin/users", reqData)
      .then(res => {
        if (res.data.resultCode === 0) {
          const chatroomList = this.root.chatroom.chatroomList;
          for (var i = 0; i < chatroomList.length; i++) {
            if (
              chatroomList[i].chatroom_idx === this.root.view.selectedChatroom
            ) {
              for (var j = 0; j < userInfos.length; j++) {
                userInfos[j].start_msg_idx = res.data.param.start_msg_idx;
                userInfos[j].last_read_msg_idx =
                  res.data.param.last_read_msg_idx;
              }
            }
          }

          this.sendChat(this.root.view.selectedChatroom, {
            sender: this.root.user.userInfo.user_idx,
            msg: users_idxs + "/" + users_names,
            msg_type: "i"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  @action checkoutChatroom = () => {
    const reqData = {
      chatroom_idx: this.root.view.selectedChatroom,
      user_idx: this.root.user.userInfo.user_idx
    };
    this.root.user.authorizedAxios
      .post("http://localhost:8081/api/chatroom/checkout", reqData)
      .then(res => {
        if (res.data.resultCode === 0) {
          const chatroomList = this.root.chatroom.chatroomList;
          for (var i = 0; i < chatroomList.length; i++) {
            if (
              chatroomList[i].chatroom_idx === this.root.view.selectedChatroom
            ) {
              chatroomList.splice(i, 1);
            }
          }

          this.sendChat(this.root.view.selectedChatroom, {
            sender: this.root.user.userInfo.user_idx,
            msg: this.root.user.userInfo.name,
            msg_type: "e"
          });

          this.chats[this.root.view.selectedChatroom] = null;
          this.root.view.hideChatroom();
          this.unsubscribeChatroom();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  @action newChatroomWithUserList = () => {
    const users = [];
    let users_str = "";
    let user_names = "";
    const searchUserList = this.root.view.searchUserList;
    for (var i = 0; i < searchUserList.length; i++) {
      if (searchUserList[i].checked) {
        users.push(searchUserList[i].user_idx);
        users_str = users_str.concat(searchUserList[i].user_idx + " ");
        user_names = user_names.concat(searchUserList[i].name + " ");
      }
    }
    // users_str = users_str.trim();
    const reqData = {
      from_user_idx: this.root.user.userInfo.user_idx,
      to_user_idx: users
    };

    this.root.user.authorizedAxios
      .post("http://localhost:8081/api/chatroom/request/users", reqData)
      .then(res => {
        if (res.data.resultCode === 0) {
          res.data.param["user_list"] = [];
          for (var i = 0; i < searchUserList.length; i++) {
            if (searchUserList[i].checked) {
              const user_info = this.createUserInfo(
                this.root.user.getFriendByUserIdx(
                  searchUserList[i].user_idx,
                  res.data.param.chatroom_idx
                )
              );
              res.data.param.user_list.push(user_info);
            }
          }
          this.chatroomList.push(res.data.param);

          this.root.view.showChatroom(res.data.param.chatroom_idx);

          this.sendChat(res.data.param.chatroom_idx, {
            sender: this.root.user.userInfo.user_idx,
            msg: users_str + "/" + user_names,
            msg_type: "i"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  @action getChatroomIdx = chatroom_idx => {
    for (var i = 0; i < this.chatroomList.length; i++) {
      if (this.chatroomList[i].chatroom_idx === chatroom_idx) {
        return i;
      }
    }
    return -1;
  };

  @action startLoading = () => {
    this.isLoading = true;
  };

  @action setLoading = () => {
    this.isLoading = false;
    this.root.view.scrollPlus();
  };

  @action endLoading = () => {
    setTimeout(() => this.setLoading(), 700);
  };

  createReactionForLastReadMsgIdx = (idxOfUser, idxOfChatroom) => {
    if(!this.chatroomList[idxOfChatroom].lastReadReactions) {
      this.chatroomList[idxOfChatroom]["lastReadReactions"] = {}
    }

    const userId = this.chatroomList[idxOfChatroom].user_list[idxOfUser].user_idx
    const chatroomId = this.chatroomList[idxOfChatroom].chatroom_idx

    const reactNewMessage = (last_msg_idx) => {
      console.debug("read event at " + chatroomId)
      this.chatroomList[idxOfChatroom].user_list[idxOfUser].last_read_msg_idx = last_msg_idx
    } 
    
    const reactionForRead = () => reaction(() => 
      this.chatroomList[idxOfChatroom].last_msg_idx, 
      reactNewMessage
    )

    reactNewMessage(this.chatroomList[idxOfChatroom].last_msg_idx)
    
    const disposer = reactionForRead()

    this.chatroomList[idxOfChatroom].lastReadReactions = {
      ...this.chatroomList[idxOfChatroom].lastReadReactions,
      [userId]: disposer
    }
  }

  findIdxOfChatroom = (chatroomId) => this.chatroomList.findIndex(info => {
    return info.chatroom_idx === parseInt(chatroomId)
  })
  
  findIdxOfUser = (idxOfChatroom, userId) => { 
    if(this.chatroomList[idxOfChatroom].user_list) {
      return this.chatroomList[idxOfChatroom].user_list.findIndex(user => {
        return user.user_idx === userId
      })
    } else {
      return -1
    }
  } 
}
