package com.healer.webkakao.chatting.model.mysql;

import lombok.Builder;

@Builder
public class Chatroom {
  private long chatroom_idx;
  private String msg_object_id;
  private long last_msg_idx;
}
