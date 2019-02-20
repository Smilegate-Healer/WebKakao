package com.healer.webkakao.chatting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
public class RedisListenerService implements MessageListener {

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  @Override
  public void onMessage(Message message, byte[] pattern) {
    log.debug("message:" + message.toString() + " channel:" + new String(message.getChannel()) + " pattern:" + new String(pattern));
    simpMessagingTemplate.setSendTimeout(1);
    log.debug(String.valueOf(simpMessagingTemplate.getSendTimeout()));
    simpMessagingTemplate.convertAndSend("/topic/" + new String(message.getChannel()), message.toString());
  }
}
