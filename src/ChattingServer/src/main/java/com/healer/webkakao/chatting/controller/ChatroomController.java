package com.healer.webkakao.chatting.controller;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healer.webkakao.chatting.model.ChatModel;
import com.healer.webkakao.chatting.model.ChatsModel;
import com.healer.webkakao.chatting.repository.ChatsMongoRepository;
import com.healer.webkakao.chatting.service.ChatroomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
@Slf4j
public class ChatroomController {

  private final long MAX_SIZE = 20;

  @Autowired
  private RedisTemplate redisTemplate;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ChatroomService chatroomService;

  @Autowired
  private ChatsMongoRepository chatRepository;

  @MessageMapping("/chatroom/{chatroomId}")
  public void chat(ChatModel message, @DestinationVariable long chatroomId) throws Exception {
    log.debug("Receive from a client chatroomId=" + chatroomId);

    long lastMsgIdx = chatroomService.getLastMsgIdx(chatroomId);
    if(lastMsgIdx == 0) {
      log.warn("There is no chatroomInfo by chatroomId=" + chatroomId);
      return;
    }

    message.setMsg_idx(lastMsgIdx + 1);
    // TODO: Which time do I set???
    message.setTimestamp(System.currentTimeMillis());
    chatroomService.updateLastMsg(chatroomId, lastMsgIdx + 1, message.getMsg());

    String msgStr = objectMapper.writeValueAsString(message);

    // Add the message into the List of Redis
//    log.debug("Add the message into the list of Redis");
    String chatroomIdStr = String.valueOf(chatroomId);
    redisTemplate.opsForList().rightPush(chatroomIdStr, msgStr);

    chatroomService.moveToMongo(chatroomIdStr, MAX_SIZE);

//    log.debug("Publish the message to Redis");
    redisTemplate.convertAndSend("chatroom/" + chatroomId, objectMapper.writeValueAsString(message)); // Send the content of the message using Pub/Sub
  }
}
