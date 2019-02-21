package com.healer.webkakao.chatting.controller;

import com.healer.webkakao.chatting.model.ChatModel;
import com.healer.webkakao.chatting.service.ChatroomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
public class ChatroomController {

  @Autowired
  private ChatroomService chatroomService;

  @MessageMapping("/chatroom/{chatroomId}")
  public void chat(ChatModel message, @DestinationVariable long chatroomId) throws Exception {
    chatroomService.chat(message, chatroomId);
  }

  @SubscribeMapping("/topic/chatroom/{chatroomId}")
  public ChatModel chatInit(@Header long userId, @DestinationVariable long chatroomId, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
    return chatroomService.subscribe(userId, chatroomId, simpMessageHeaderAccessor.getSessionId());
  }
}
