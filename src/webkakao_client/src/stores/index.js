import UserStore from './User';
import Chatroom from './Chatroom';
import View from './View';
import { autorun, reaction } from 'mobx';

class RootStore {
  constructor() {
    this.chatroom = new Chatroom(this)
    this.user = new UserStore(this)
    this.view = new View(this)

    this.connecToChattingServer()

    /**
     * Reaction to changing selected Chatroom id
     */
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

    /**
     * Reaction to the connection status
     * 
     * It will be occured when the status turns from true to false
     */
    reaction(() => this.chatroom.isConnected, isConnected => {
      console.debug("Chatting server connection broken")
      if(isConnected === false) 
        this.connecToChattingServer()
    })
  }


  connecToChattingServer = () => {
    console.debug("Connect to the Chatting server")
    this.chatroom.openSocket()
      .then(() => {
        if(this.view.selectedChatroom !== null) {
          this.chatroom.moveToAnother(this.view.selectedChatroom)
        } else if(this.chatroom.stompSubscription !== null) {
          this.chatroom.stompSubscription.unsubcribe()
        } 
      })
      .catch(() => {
        console.error("ERROR: cannot open socket")
        console.debug("Retry")
        setTimeout(() => this.connecToChattingServer(), 5000)
      })
  }
}

export default RootStore;