module.exports = {
  getChatroomName: (list, chatroom_name) => {
    
    if (!chatroom_name) {

      let chatroomName = '';

      for (var i = 0; i < list.length - 1; i++) {
        chatroomName += list[i].name + ', ';
      }
      chatroomName += list[list.length-1].name;
      return chatroomName;
    } else {
      return chatroom_name;
    }

  }
}