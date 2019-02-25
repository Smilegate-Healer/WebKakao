import { observable, action } from 'mobx';
import axios from 'axios'

export default class User {
  _domain = "http://localhost"
  _axiosHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

  @observable authorizedAxios = null
  @observable friendAxios = null

  @observable isLogin = false;  
  @observable userInfo = null
  @observable friendList = null

  @observable searchUser = null;
  @observable userDetail = null;

  interval = null

  constructor(root) {
    this.root = root;
  }

  @action
  initFriendList = (data) => {
    this.friendList = data;
  }

  @action signIn = (data) => {
    return new Promise((resolve, reject) => {
      axios.post("/auth/signin", data).then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
          this.userInfo = res.data.param;
          sessionStorage.setItem("user", JSON.stringify(this.userInfo))
          resolve(true)
          this.doAfterSignIn()
        } else if(res.data.resultCode === 100) {
          resolve(true)
        }
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }

  @action doAfterSignIn = () => {
    this.authorizedAxios = axios.create({
      // baseURL: "http://localhost",
      timeout: 30000,
      headers: {
        ...this._axiosHeaders,
        "access_token": this.userInfo.access_token
      }
    })
    this.getFriendList()
    this.getChatroomList()
    this.root.connectToChattingServer()
  }

  @action signUp = (data) => {
    console.debug(data)
    return new Promise((resolve, reject) => {
      axios.post("/auth/signup", data).then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
          resolve()
        }
      }).catch(err => {
        console.error(err)
        reject()
      })
    })
  }

  @action resetPassword = (data) => {
    return new Promise((resolve, reject) => {
      axios.post("/auth/password/reset", data)
      .then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
          resolve()
        } else {
          reject();
        }
      })
      .catch(err => {console.error(err);
        reject()})
    })
  }

  @action changePassword = (password) => {
    debugger;
    const data = {
      email: this.userInfo.email,
      name: this.userInfo.name, 
      password: password
    }
    return new Promise((resolve, reject) => {
      this.authorizedAxios.post("/auth/password/change", data)
      .then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
          resolve()
        } else {
          reject();
        }
      })
      .catch(err => {console.error(err);
        reject()})
    })
  }

  @action logout = () => {
    this.authorizedAxios = null;
    this.isLogin = false;
    this.userInfo = null;
    this.friendList = null;
    this.root.chatroomList = []
    this.root.chats = {}
    this.root.chatroom.unsubscribeChatroom()
    this.root.chatroom.closeSocket()
    this.root.chatroom.pollingCanceler.cancel()
    this.root.chatroom.pollingCanceler = null

    sessionStorage.clear()
  }

  @action getFriendList = () => {
    this.authorizedAxios.post("/api/friend/list", { 
      user_idx: this.userInfo.user_idx
    })
      .then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
          this.initFriendList(res.data.param.list)
        }
      })
      .catch(err => console.error(err))
  }

  @action getChatroomList = () => {
    this.authorizedAxios.post('/api/chatroom/list', {
      user_idx: this.userInfo.user_idx
    })
      .then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
          this.root.chatroom.initChatroomList(res.data.param.list)
          this.root.chatroom.updateWholeChatroomList();
        }
      })
      .catch(err => console.error(err))
  }

  /**
   * request friend 
   * 
   * Using axious
   * param : {
   *  from_user_idx : data,
   *  to_user_idx : data
   * }
   */
  @action
  requestFriend = (data) => {
    this.authorizedAxios.post("/api/friend/request", data)
      .then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
          this.addUserList(res.data.param);
          this.root.view.hideUserSearchModal();
          this.root.view.hideUserInfoModal();
          this.root.user.removeUserInfo();
        }
      })
      .catch(err => console.error(err))
  }

  /**
   * update friends info
   * 
   * Using axious
   * param : {  
   *  from_user_idx: 1,
   *  to_user_idx: 2,
   *  state: 2
   *  }
   */
  @action
  updateFriend = (data) => {
    this.authorizedAxios.post("/api/friend/status", data)
      .then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
          this.initFriendList(res.data.param.list)
        }
      })
      .catch(err => console.error(err))
  }

  /**
   * search friend by email
   * 
   * Using axious
   * param : { 
   *  user_email: email
   * }
   */
  @action
  searchFriend = (data) => {
    this.authorizedAxios.post("/api/friend/search", data)
      .then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
          this.searchUser = res.data.param;
        } else if (res.data.resultCode === 102) {
          this.searchUser = 'Invalid User';
        }
      })
      .catch(err => console.error(err))
  }

  @action
  removeSearchUser = () => {
    this.searchUser = null;
  }

  /**
   * get user info by user_idx
   * 
   * Using axious
   * param : { 
   *  user_idx: idx
   * }
   */
  @action
  getUserInfo = (data) => {
    this.authorizedAxios.post("/api/user/info", data)
      .then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
          this.userDetail = res.data.param;
          this.root.view.showUserInfoModal();
        }
      })
      .catch(err => console.error(err))
  }

  @action
  removeUserInfo = () => {
    this.userDetail = null;
  }

  @action
  getFriendByIdx = (idx) => {
    return this.friendList[idx].user_idx;
  }

  @action
  getFriendByUserIdx = (user_idx) => {
    for (var i = 0; i < this.friendList.length; i++) {
      if (this.friendList[i].user_idx === user_idx)
        return this.friendList[i];
    }
  }

  @action
  getFriendNameByUserIdx = (user_idx) => {
    const found = this.friendList.find((friend) => {
      return friend.user_idx === user_idx
    })
    return found ? found.name : "null"
  }

  @action
  getNameOnChatroom = (user_idx) => {
    const chatroomList = this.root.chatroom.chatroomList;
    for (var i = 0; i < chatroomList.length; i++) {
      if (chatroomList[i].chatroom_idx === this.root.view.selectedChatroom) {
        if (!chatroomList[i].user_list) {
          return '대화상대 없음';
        }
        for (var j = 0; j < chatroomList[i].user_list.length; j++) {
          if (chatroomList[i].user_list[j].user_idx === user_idx)
            return chatroomList[i].user_list[j].name;
        }
      }

      for (var i = 0; i < this.friendList.length; i++) {
        if (this.friendList[i].user_idx === user_idx)
          return this.friendList[i].name;
      }

      if (user_idx === this.userInfo.user_idx) {
        return this.userInfo.name;
      } else {
        return '알 수 없음'
      }
    }
  }

  @action
  getUserIdx = () => {
    return this.userInfo.user_idx;
  }

  @action
  isFriend = () => {
    if (this.userDetail) {
      for (var i = 0; i < this.friendList.length; i++) {
        if (this.friendList[i].user_idx === this.userDetail.user_idx)
          return true;
      }
      return false;
    }
  }

  addUserList = (data) => {
    this.friendList.push(data);
  }

  @action
  showAllFriendList = () => {
    for (var i = 0; i < this.friendList.length; i++) {
      this.friendList[i].hide = false;
    }
  }

  @action
  uploadNewProfileImage = (image) => {
    return new Promise((resolve, reject) => {
      console.log(image)
      var formData = new FormData()
      formData.append("file", image)

      this.authorizedAxios.post("/profile/new/" + this.userInfo.user_idx, 
        formData, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res)
          resolve()
        })
        .catch(err => {
          console.error(err)
          reject()
        })
    })
  }

  @action getUserName = (user_idx) => {
    for(var i=0; i<this.friendList.length; i++) {
      if(this.friendList[i].user_idx === user_idx) {
        return this.friendList[i].name;
      }
    }
  }
}
