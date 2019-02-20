package com.healer.webkakao.chatting.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

@Component
@Slf4j
public class StompUnSubscribeEventListener implements ApplicationListener<SessionUnsubscribeEvent> {
  @Override
  public void onApplicationEvent(SessionUnsubscribeEvent event) {
    log.debug("Unsubscription");
    log.debug(event.toString());
  }
}
