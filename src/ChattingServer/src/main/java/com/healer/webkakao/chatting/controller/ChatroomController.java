package com.healer.webkakao.chatting.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healer.webkakao.chatting.model.ChatModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
public class ChatroomController {

  @Autowired
  private RedisTemplate redisTemplate;

  @Autowired
  private ObjectMapper objectMapper;

  @MessageMapping("/chat/{chatroomId}")
  public void chat(ChatModel message, @DestinationVariable String chatroomId) throws Exception {
    log.debug(chatroomId + ":" + chatroomId + "message:" + message.getMsg());
    redisTemplate.convertAndSend("chatroom/" + chatroomId, objectMapper.writeValueAsString(message)); // Send the content of the message using Pub/Sub
  }

}
