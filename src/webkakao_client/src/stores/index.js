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
      if(selectedChatroom !== null) this.chatroom.getChatroomMessage(selectedChatroom)


      this.chatroom.openSocket()
        .then(() => {
          if(selectedChatroom !== null) 
            this.chatroom.moveToAnother(selectedChatroom)
          else 
            this.chatroom.stompSubscription.unsubcribe()
        })
        .catch(() => {
          console.error("ERROR while opening socket")
        })
    })
  }
}

export default RootStore;