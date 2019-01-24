import UserStore from './User';
import Chatroom from './Chatroom';
import View from './View';

class RootStore {
  constructor() {
    this.user = new UserStore(this)
    this.chatroom = new Chatroom(this)
    this.view = new View(this)
  }
}

export default RootStore;