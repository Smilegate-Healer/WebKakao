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

  @observable isLogin = true  // test
  @observable userInfo = dummyUser
  @observable friendList = [] 

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
      baseURL: this._domain,
      timeout: 1000,
      headers: {
        ...this._axiosHeaders, // TODO: right??
        "Authorization": `Bearer` + this.userInfo.token
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
    this.authorizedAxios.post("/api/friend/list", { // TODO: REST???
      user_idx: 1
    }).then(res => {
      console.log(res)
      if(res.data.resultCode === 0) {
        this.initFriendList(res.data.param.list)
      }
    }).catch(err => console.error(err))
  }

  @action getChatroomList = () => {
    this.authorizedAxios.post('/api/chatroom/list', {
      user_idx: 1
    }).then(res => {
      console.log(res)
      if(res.data.resultCode === 0) {
        this.root.chatroom.initChatroomList(res.data.param.list)
      }
    }).catch(err => console.error(err))
  }
}
