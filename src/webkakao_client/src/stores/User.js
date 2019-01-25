import { observable, action } from 'mobx';

export default class User {
  @observable isLogin = false 
  @observable userInfo = dummyUser
  @observable friendList = [] 

  constructor(root) {
    // from index
    this.root = root;
  }

  @action login = () => {
    // TODO: Login logic
    // Set the user infomation
    // json object or something else

  }

  @action logout = () => {
    // TODO: logout logic
  }

  @action getFriendList = () => {
    // TODO: Get Friend list from the server
  }

  @action getChatroomList = () => {
    // TODO: Get chatroom list form the server
  }
}

const dummyUser = {
  user_idx: 2,
  name: "조영호",
  profile_img: "base64",
}