import { observable, action } from 'mobx';
import axios from 'axios'

const dummyUser = {
  user_idx: 2,
  name: "조영호",
  profile_img: "6",
  access_token: 'i am token',
  status_msg: "hi",
  email: "email"
}

export default class User {
  static _domain = "http://localhost"
  static _axiosHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

  @observable authorizedAxios = null
  @observable friendAxios = null

  @observable isLogin = false;  // test
  @observable userInfo = dummyUser
  @observable friendList = []

  @observable searchUser = null;
  @observable userDetail = null;

  interval = null

  constructor(root) {
    // from index
    this.root = root;
  }

  @action
  initFriendList = (data) => {
    this.friendList = data;
  }

  @action login = (data) => {
    // TODO: Login logic
    // Set the user infomation
    // json object or something else


    // if success
    this.authorizedAxios = axios.create({
      //baseURL: this._domain,
      // baseURL: "localhost:8081",
      timeout: 30000,
      headers: {
        // ...this._axiosHeaders, // TODO: right??
        "Accept": "application/json",
        "Content-Type": "application/json",
        // "Authorization": `Bearer` + this.userInfo.token
      }
    })

    this.friendAxios = axios.create({
      //baseURL: this._domain,
      // baseURL: "localhost:8081",
      timeout: 30000,
      headers: {
        // ...this._axiosHeaders, // TODO: right??
        "Accept": "application/json",
        "Content-Type": "application/json",
        // "Authorization": `Bearer` + this.userInfo.token
      }
    })

    this.root.chatroom.chatroomAxios = axios.create({
      //baseURL: this._domain,
      // baseURL: "localhost:8081",
      timeout: 30000,
      headers: {
        // ...this._axiosHeaders, // TODO: right??
        "Accept": "application/json",
        "Content-Type": "application/json",
        // "Authorization": `Bearer` + this.userInfo.token
      }
    })

    this.root.chatroom.pollingAxios = axios.create({
      //baseURL: this._domain,
      // baseURL: "localhost:8081",
      timeout: 60000,
      headers: {
        // ...this._axiosHeaders, // TODO: right??
        "Accept": "application/json",
        "Content-Type": "application/json",
        // "Authorization": `Bearer` + this.userInfo.token
      }
    })
    this.authorizedAxios.post("http://localhost:8084/auth/login", data).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.userInfo = res.data.param;
        this.getFriendList()
        this.getChatroomList()
      }
    }).catch(err => console.error(err))

  }

  @action logout = () => {
    // TODO: logout logic
    // ex)
    // go to login page


    this.authorizedAxios = null;
    this.isLogin = false;
    this.userInfo = null;
    this.friendList = [];
  }

  @action getFriendList = () => {
    this.friendAxios.post("http://localhost:8081/api/friend/list", { // TODO: REST???
      user_idx: this.userInfo.user_idx
    }).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.initFriendList(res.data.param.list)
      }
    }).catch(err => console.error(err))
  }

  @action getChatroomList = () => {
    this.root.chatroom.chatroomAxios.post('http://localhost:8081/api/chatroom/list', {
      user_idx: this.userInfo.user_idx
    }).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.root.chatroom.initChatroomList(res.data.param.list)
        this.root.chatroom.updateWholeChatroomList();
        this.isLogin = true;
      }
    }).catch(err => console.error(err))
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
    this.friendAxios.post("http://localhost:8081/api/friend/request", data).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.addUserList(res.data.param);
        this.root.view.hideUserSearchModal();
        this.root.view.hideUserInfoModal();
        this.root.user.removeUserInfo();
      }
    }).catch(err => console.error(err))
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
    this.friendAxios.post("http://localhost:8081/api/friend/status", data).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.initFriendList(res.data.param.list)
      }
    }).catch(err => console.error(err))
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
    this.friendAxios.post("http://localhost:8081/api/friend/search", data).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.searchUser = res.data.param;
      } else if (res.data.resultCode === 102) {
        this.searchUser = 'Invalid User';
      }
    }).catch(err => console.error(err))
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
    this.friendAxios.post("http://localhost:8081/api/user/info", data).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.userDetail = res.data.param;
        this.root.view.showUserInfoModal();
      }
    }).catch(err => console.error(err))
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
    for (var i = 0; i < this.friendList.length; i++) {
      if (this.friendList[i].user_idx === user_idx)
        return this.friendList[i].name;
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
    console.log(image)
    var formData = new FormData()
    formData.append("file", image)

    this.authorizedAxios.post("http://localhost:8083/profile/new/" + this.userInfo.user_idx, formData, {
      header: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }
}
