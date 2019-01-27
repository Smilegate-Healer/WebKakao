package com.healer.webkakao.chatting.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Getter
@Setter
@RedisHash("chatroomInfo")
@Builder
public class ChatroomInfoModel implements Serializable {

  @Id
  private long chatroom_id;
  private String object_id;
  private long last_msg_idx;
}
