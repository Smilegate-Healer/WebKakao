import {
  observable, action, computed
} from 'mobx'

export default class View {
  // TODO: Define more views
  views = {
    friendList: "FriendList",
    chatroomList: "ChatroomList",
    option: "Option",
    chatList: "ChatList",
    emptyChatList: "EmptyChatList",
    settings: "Settings"
    
  }

  @observable leftView = "ChatroomList"
  @observable rightView = "ChatList"
  /**
   * TODO: Define which views want to show
   */
  @observable modalView = ""
  /**
   * TODO: The index or id of the chatroom
   */
  // @observable selectedChatroom = null
  @observable selectedChatroom = null

  constructor(root) {
    this.root = root
  }

  /**
   *  Show friend list  
   */
  @action showFriendsList = () => {
    this.leftView = this.views.friendList
  }

  /**
   *  Show chatroom list 
   */
  @action showChatroomList = () => {
    this.leftView = this.views.chatroomList
  }

  /**
   *  Show option
   */
  @action showOption = () => {
    this.leftView = this.views.option
  }

  /**
   * Show the selected chatroom
   * 
   * TODO: idx or id
   * currently idx
   */
  @action showChatroom = (chatroomIdx) => {
    console.debug("Set chatroom to " + chatroomIdx)
    this.rightView = this.views.chatList
    this.selectedChatroom = chatroomIdx
  }

  /**
   * Hide the chatroom
   */
  @action hideChatroom = () => {
    this.rightView = this.views.emptyChatList
    this.selectedChatroom = null
  }

  /**
   * Show the settings
   */
  @action showSettings = () => { 
    this.rightView = this.views.settings
    this.selectedChatroom = null
  }

  
}