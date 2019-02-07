import UserStore from './User';
import Chatroom from './Chatroom';
import View from './View';
import { autorun, reaction } from 'mobx';

class RootStore {
  constructor() {
    this.chatroom = new Chatroom(this)
    this.user = new UserStore(this)
    this.view = new View(this)

    reaction(() => this.view.selectedChatroom, selectedChatroom => {
      this.chatroom.leaveChatroom()
      if(selectedChatroom !== null) {
        this.chatroom.openChatroom(selectedChatroom)
      }
    })
  }
}

export default RootStore;