import UserStore from './User';
import Chatroom from './Chatroom';
import View from './View';
import { reaction, autorun } from 'mobx';

class RootStore {
  constructor() {
    this.chatroom = new Chatroom(this)
    this.user = new UserStore(this)
    this.view = new View(this)

    this.connecToChattingServer()

    /**
     * Reaction to changing selected Chatroom id
     */
    reaction(() => this.view.selectedChatroom, (selectedChatroom, pre) => {
      if(selectedChatroom !== null) {
        this.chatroom.moveToAnother(selectedChatroom)
        this.chatroom.getChatroomMessage(selectedChatroom)
      } else {
        debugger
        console.log(pre)
        this.chatroom.unsubscribeChatroom(pre.prevValue)
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

    /**
     * Reaction to user's information
     * when user's information is fully received
     * then loading is false
     */
    autorun(() => {
      const { chatroom, user } = this
      if(chatroom.chatroomList !== null && 
        user.friendList !== null &&
        user.isLogin && 
        user.userInfo !== null &&
        chatroom.isConnected) {
          this.view.isLoading = false
        } else {
          this.view.isLoading = true
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