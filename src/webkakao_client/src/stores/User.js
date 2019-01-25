import { observable, action } from 'mobx';

export default class User {

  @observable isLogin = false
  @observable userInfo = null
  @observable friendList = [] 

  constructor(root) {
    // from index
    this.root = root;
  }

  @action
  initFriendList = (data) => {

    // TODO: set chatroom list
    this.friendList = data;

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