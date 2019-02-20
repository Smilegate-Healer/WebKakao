package com.healer.webkakao.chatting.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
public class StompDisconnectEventListener implements  ApplicationListener<SessionDisconnectEvent> {

  @Override
  public void onApplicationEvent(SessionDisconnectEvent event) {
    log.debug("Disconnection");
    log.debug(event.toString());
  }
}
