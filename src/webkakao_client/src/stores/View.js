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
  @observable rightView = null
  @observable notificationDOMRef = null;
  @observable notificationId = null;
  @observable notificationChatroomIdx = null;
  @observable userInfoModal = false;
  @observable userSearchModal = false;
  
  /**
   * TODO: Define which views want to show
   */
  @observable modalView = ""
  /**
   * TODO: The index or id of the chatroom
   */
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

  @action showPollingMessage = (message) => {
    const senderName = this.root.chatroom.getNameByChatroomUserList(message);
    let msg = message.last_msg;
    if(msg.length > 30) {
      msg = msg.substring(0, 30).concat("...");
    }
    this.root.view.notificationDOMRef.current.removeNotification(this.root.view.notificationId);
    this.root.view.notificationChatroomIdx = message.chatroom_idx;
    this.root.view.notificationId = this.root.view.notificationDOMRef.current.addNotification({
      title: senderName,
      message: msg,
      type: "info",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 4000 },
      width: 250,
      dismissable: { 
        click: true,
        touch: true
      },
      touchSlidingBack: {
        duration: 600,
        cubicBezier: "ease-in",
        delay: 0
      },
    
      touchSlidingExit: {
        swipe: {
          duration: 300,
          cubicBezier: "ease-in",
          delay: 0,
        },
        fade: {
          duration: 300,
          cubicBezier: "ease-in",
          delay: 0
        }
      },
      slidingExit: {
        duration: 100,
        cubicBezier: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        delay: 0
      }
    });
  }

  @action getNotificationChatroomIdx() {
    return this.root.view.notificationChatroomIdx;
  }

  @action showUserInfoModal = () => {
    this.root.view.userInfoModal = true;
  }

  @action hideUserInfoModal = () => { 
    this.root.view.userInfoModal = false;
  }

  @action showUserSearchModal = () => { 
    this.root.view.userSearchModal = true;
  }

  @action hideUserSearchModal = () => { 
    this.root.view.userSearchModal = false;
  }
}