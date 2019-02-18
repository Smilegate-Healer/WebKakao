import UserStore from './User';
import Chatroom from './Chatroom';
import View from './View';
import { reaction } from 'mobx';

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
      if(selectedChatroom !== null) {
        this.chatroom.moveToAnother(selectedChatroom)
        this.chatroom.getChatroomMessage(selectedChatroom)
      } else {
        this.chatroom.unsubscribeChatroom()
      }
    })

    /**
     * Reaction to the connection status
     * 
     * It will be occured when the status turns from true to false
     */
    reaction(() => this.chatroom.isConnected, isConnected => {
      if(isConnected === false)  {
        console.debug("Chatting server connection broken")
        this.connecToChattingServer()
      }
    })
  }

  /**
   * Connect to the Chatting server 
   * until the connection is established
   */
  connecToChattingServer = () => {
    console.debug("Connect to the Chatting server")
    this.chatroom.openSocket()
      .then(() => {
        if(this.view.selectedChatroom !== null) {
          this.chatroom.moveToAnother(this.view.selectedChatroom)
        } else {
          this.chatroom.unsubscribeChatroom()
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