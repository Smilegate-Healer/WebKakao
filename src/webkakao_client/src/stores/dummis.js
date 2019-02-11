module.exports = {
  chatroomsList: [
    {
      chatroom_idx: 1,
      start_msg_idx: 1,
      last_msg_idx: 15,
      last_read_msg_idx: 15,
      user_list: [
        {
          chatroom_idx: 1,
          user_idx: 2,
          name: "조영호",
          profile_img: "base64",
          start_msg_idx: 10,
          last_read_msg_idx: 10
        },
        {
          chatroom_idx: 1,
          user_idx: 3,
          name: "정명지",
          profile_img: "base64",
          start_msg_idx: 5,
          last_read_msg_idx: 1
        }
      ]
    },
    {
      chatroom_idx: 4,
      start_msg_idx: 0,
      last_msg_idx: 0,
      last_read_msg_idx: 0,
      user_list: [
        {
          chatroom_idx: 4,
          user_idx: 2,
          name: "조영호",
          profile_img: "base64",
          start_msg_idx: 0,
          last_read_msg_idx: 0
        }
      ]
    }
  ],
  chats: [
    {
      sender: 2,
      msg: "첫번째 메시지 입니다",
      msg_type: "m",
      timestamp: "1234",
      msg_idx: "1"
    },
    {
      sender: 3,
      msg: "두번쨰 메시지 입니다",
      msg_type: "m",
      msg_idx: "2",
      timestamp: "1235"
    }
  ]
};
