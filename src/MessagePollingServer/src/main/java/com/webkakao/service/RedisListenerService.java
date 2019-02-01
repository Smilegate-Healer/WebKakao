package com.webkakao.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RedisListenerService implements MessageListener {
	
	@Autowired
	private PollingService pollingService;

	@Override
	public void onMessage(Message message, byte[] pattern) {
		log.debug("message:" + message.toString() + " channel:" + new String(message.getChannel()) + " pattern:"
				+ new String(pattern));
		long chatroom_idx = Long.parseLong(new String(message.getChannel()).split("/")[1]);
		try {
			pollingService.sendMessage(chatroom_idx, message.toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
