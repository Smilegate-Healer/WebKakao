import { observable, action } from 'mobx';
import axios from 'axios'

const dummyUser = {
  user_idx: 2,
  name: "조영호",
  profile_img: "base64",
  token: 'i am token'
}

export default class User {
  static _domain = "http://localhost"
  static _axiosHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

  @observable authorizedAxios = null
  @observable friendAxios = null

  @observable isLogin = true  // test
  @observable userInfo = dummyUser
  @observable friendList = []

  interval = null

  constructor(root) {
    // from index
    this.root = root;

    // TODO: test
    this.login()
  }

  @action
  initFriendList = (data) => {
    this.friendList = data;
  }

  @action login = () => {
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
      user_idx: 1
    }).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.initFriendList(res.data.param.list)
      }
    }).catch(err => console.error(err))
  }

  @action getChatroomList = () => {
    this.root.chatroom.chatroomAxios.post('http://localhost:8081/api/chatroom/list', {
      user_idx: 1
    }).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.root.chatroom.initChatroomList(res.data.param.list)
        this.root.chatroom.updateWholeChatroomList();
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
        this.initFriendList(res.data.param.list)
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
        this.initFriendList(res.data.param.list)
      }
    }).catch(err => console.error(err))
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
        this.initFriendList(res.data.param.list)
      }
    }).catch(err => console.error(err))
  }
  
}
