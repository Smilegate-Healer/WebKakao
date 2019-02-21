package com.healer.webkakao.chatting.listener;

import com.healer.webkakao.chatting.service.ChatroomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
@Slf4j
public class StompSubscribeEventListener implements ApplicationListener<SessionSubscribeEvent> {

  @Autowired
  private ChatroomService chatroomService;

  @Override
  public void onApplicationEvent(SessionSubscribeEvent event) {
    log.debug("New subscribe");
    log.debug(event.toString());
//    chatroomService.subscribe(event);
  }
}
