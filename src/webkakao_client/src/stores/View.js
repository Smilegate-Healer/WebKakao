import {
  observable, action,
} from 'mobx'
import cloneDeep from 'lodash/cloneDeep';

export default class View {
  views = {
    friendList: "FriendList",
    chatroomList: "ChatroomList",
    more: "More",
    chatList: "ChatList",
    emptyChatList: "EmptyChatList",
    settings: "Settings",
    editProfilePage: "EditProfilePage"
  }

  @observable leftView = this.views.friendList
  @observable menuBarIdx = 0
  @observable rightView = null
  @observable notificationDOMRef = null;
  @observable notificationId = null;
  @observable notificationChatroomIdx = null;
  @observable userInfoModal = false;
  @observable userSearchModal = false;
  @observable userListModal = false;
  @observable userListType = '';

  @observable isSearchBar = false;
  @observable renameChatroomModal = false;
  @observable searchTargerStr = '';
  @observable targerEmail = '';
  @observable renameChatroomTargetStr = '';

  @observable chatroomSideMenu = false;

  @observable searchUserList = null;
  @observable checkedUser = false;
  /**
   * TODO: Define which views want to show
   */
  @observable modalView = ""

  /**
   * The chatroom id
   */
  @observable selectedChatroom = null
  @observable selectedChatroomName = null

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
  @action showMore = (idx) => {
    this.leftView = this.views.more
    this.menuBarIdx = idx
  }

  /**
   * Show profile editting page
   * 
   */
  @action showEditProfile = () => {
    this.rightView = this.views.editProfilePage
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
    this.selectedChatroomName = this.root.chatroom.getChatroomName(this.selectedChatroom);
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

  @action setSelectedChatroom = (name) => {
    this.selectedChatroomName = name;
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

  @action showUserListModal = (type) => {
    this.root.view.userListModal = true;
    this.root.view.userListType = type;
    this.searchUserList = cloneDeep(this.root.user.friendList);
    if(type === 'invite'){
      let entrants;
      for(var i=0; i<this.root.chatroom.chatroomList.length; i++) {
        if(this.root.chatroom.chatroomList[i].chatroom_idx === this.root.view.selectedChatroom) {
          entrants = this.root.chatroom.chatroomList[i].user_list;
        }
      }
      debugger;
      for(var i=0; i<this.searchUserList.length; i++) {
        for(var j=0; j<entrants.length; j++) {
          if(this.searchUserList[i].user_idx === entrants[j].user_idx) {
            this.searchUserList.splice(i, 1);
          }
        }
      }
    }
  }

  @action hideUserListModal = () => { 
    this.root.view.userListModal = false;
    this.root.view.userListType = '';
    this.searchUserList = null;
  }

  @action showUserSearchModal = () => { 
    this.root.view.userSearchModal = true;
  }

  @action hideUserSearchModal = () => { 
    this.root.view.userSearchModal = false;
  }

  @action showRenameChatroomModal = () => { 
    this.root.view.renameChatroomModal = true;
  }

  @action hideRenameChatroomModal = () => { 
    this.root.view.renameChatroomModal = false;
  }

  @action showSearchBar = () => { 
    this.root.view.isSearchBar = true;
  }

  @action hideSearchBar = () => { 
    this.root.view.isSearchBar = false;
  }

  @action showChatroomSideMenu = () => { 
    this.root.view.chatroomSideMenu = true;
  }

  @action hideChatroomSideMenu = () => { 
    this.root.view.chatroomSideMenu = false;
  }

  @action
  setSearchTargerStr = (value) => {
    this.searchTargerStr = value;
  }

  @action
  setRenameChatroomTargerStr = (value) => {
    this.renameChatroomTargetStr = value;
  }

  @action
  resetSearchTargerStr = () => {
    this.searchTargerStr = '';
  }

  @action
  resetRenameChatroomTargerStr = () => {
    this.renameChatroomTargetStr = '';
  }

  @action
  setTargerEmail = (value) => {
    this.targerEmail = value;
  }

  @action
  resetTargerEmail = () => {
    this.targerEmail = '';
  }

  @action checkUserList = (user_idx) => {

    let count = 0;

    for(var i=0; i<this.searchUserList.length; i++) {
      if(this.searchUserList[i].user_idx === user_idx) {
        if(this.searchUserList[i].checked) {
          this.searchUserList[i].checked = false;
        } else {
          this.searchUserList[i].checked = true;
        }
      }
      if(this.searchUserList[i].checked) {
        count++;
      }
    }
    if(count > 0) {
      this.checkedUser = true;
    } else {
      this.checkedUser = false;
    }
  }

  @action getSelectedUserCount  = () => {
    let count = 0;
    for(var i=0; i<this.searchUserList.length; i++) {
      if(this.searchUserList[i].checked === true) {
        count++;
      } 
    }
    return count;
  }

  @action showAllSelectedUser = () => {
    for(var i=0; i<this.searchUserList.length; i++) {
      this.searchUserList[i].hide = false;
    }
  }
}