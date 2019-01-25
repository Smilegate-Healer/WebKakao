package com.webkakao.scheduler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.webkakao.redis.RedisService;

@Component
public class TestScheduler {
	
	private Map<Long, String> chatroom = new HashMap<Long, String>();
	

	@Autowired
	private RedisService redisService;
	
	public TestScheduler() {
		
	}

//	@Scheduled(cron = "0 0 0 * * *")
	@Scheduled(fixedDelay = 100000)
	public void removeExpiredURL() {
	
	}

}
