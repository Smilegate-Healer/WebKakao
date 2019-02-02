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
  @observable pollingAxios = null

  @observable isLogin = false
  @observable userInfo = dummyUser
  @observable friendList = []

  interval = null

  constructor(root) {
    // from index
    this.root = root;
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

    this.pollingAxios = axios.create({
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
    // debugger;
    this.authorizedAxios.post("http://localhost:8081/api/friend/list", { // TODO: REST???
      user_idx: 1
    }).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.initFriendList(res.data.param.list)
      }
    }).catch(err => console.error(err))
  }

  @action getChatroomList = () => {
    // debugger;
    this.authorizedAxios.post('http://localhost:8081/api/chatroom/list', {
      user_idx: 1
    }).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.root.chatroom.initChatroomList(res.data.param.list)

        this.polling1();

      }
    }).catch(err => console.error(err))
  }

  polling1(data) {
      this.pollingAxios.post("http://localhost:8082/message/longpolling", { 
        user_idx: 1,
        rooms: [1]
      }).then(res => {
        // alert(res.data.chatroom_idx + ' : ' + res.data.last_msg_idx + ' : ' + res.data.last_msg);
        this.root.chatroom.updateWholeChatroomList(res.data);
        this.polling2();
      }).catch(err => {
        console.error(err);
        this.polling2();
      })
  }

  polling2(data) {
      this.pollingAxios.post("http://localhost:8082/message/longpolling", { 
        user_idx: 1,
        rooms: [1]
      }).then(res => {
        // alert(res.data.chatroom_idx + ' : ' + res.data.last_msg_idx + ' : ' + res.data.last_msg);
        this.root.chatroom.updateWholeChatroomList(res.data);
        this.polling1();
      }).catch(err => {
        console.error(err);
        this.polling1();
      })
  }
}
