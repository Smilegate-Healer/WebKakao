import { observable, action} from 'mobx'

export default class Chatroom {
  constructor(root) {
    this.root = root
  }

  /**
   * Array of json object
   * 
   * name: the name of chatroom
   * latestMsg: the latest message of chatroom
   * logo: the logo of chatroom which is bas64 format
   * date: the date of the latest message
   * readMsgIdx: the last index user read
   * lastMsgIdx: the last index of the chatroom
   * chats: the array of the message chatroom has
   * joinMembers: the array of join members
   * 
   * 
   * Chat Object
   * 
   * sender: the sender of this message
   * img: TODO: base64 or the index of the array of images locally stored
   * msg: the message
   * time: the time of the chat
   *
   */
  @observable chatroomList = []

  /**
   * Update the whole chatroom list 
   * 
   * Using long polling
   */
  @action updateWholeChatroomList = () => {
    // TODO: long polling  
  }


  /**
   * Delete the chatroom 
   * 
   * Both the local and the server or just on local or server
   */
  @action deleteChatroom = () => {
    // TODO: Delete the chatroom
  }

  /**
   * Update a chatroom
   * 
   */
  @action updateChatroom = () => {
    // TODO: update the chatroom 
  }

  /**
   * Connect the chatroom with Websocket
   */
  @action openChatroom = () => {
    // TODO: Open the web socket for the chatroom
  }

  /**
   * Send a chat
   * TODO: chatroom idx or id
   */
  @action sendChat = (whichChatroom) => {
    // TODO: send a chat through websocket
    // if success => add to the chatList in the chatroomList
  }
}