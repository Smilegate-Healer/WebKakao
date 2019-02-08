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

  @observable leftView = this.views.friendList
  @observable menuBarIdx = 0
  @observable rightView = this.views.chatList
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
  @action showFriendsList = (idx) => {
    this.leftView = this.views.friendList
    this.menuBarIdx = idx
  }

  /**
   *  Show chatroom list 
   */
  @action showChatroomList = (idx) => {
    this.leftView = this.views.chatroomList
    this.menuBarIdx = idx
  }

  /**
   *  Show option
   */
  @action showOption = (idx) => {
    this.leftView = this.views.option
    this.menuBarIdx = idx
  }

  /**
   * Show the selected chatroom
   * 
   * TODO: idx or id
   * currently idx
   */
  @action showChatroom = (chatroomIdx) => {
    console.debug("Set chatroom to " + chatroomIdx)
    debugger
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