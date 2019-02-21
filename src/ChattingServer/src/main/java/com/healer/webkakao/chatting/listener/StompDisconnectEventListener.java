package com.healer.webkakao.chatting.listener;

import com.healer.webkakao.chatting.service.ChatroomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
public class StompDisconnectEventListener implements  ApplicationListener<SessionDisconnectEvent> {

  @Autowired
  private ChatroomService chatroomService;

  @Override
  public void onApplicationEvent(SessionDisconnectEvent event) {
    log.debug("Disconnection");
    log.debug(event.toString());
    chatroomService.disconnect(event);
  }
}
