package com.webkakao.scheduler;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.async.DeferredResult;

import com.webkakao.model.response.PollingResponse;
import com.webkakao.redis.RedisService;

@Component
public class PollingScheduler {
	
	public static final ConcurrentHashMap<Long, List<DeferredResult<PollingResponse>>> map = new ConcurrentHashMap<>();

	@Autowired
	private RedisService redisService;
	
	@Scheduled(fixedDelay = 100000)
	public void removeExpiredURL() {
	
	}
	
	public void addDeferredResult(long[] chatrooms, DeferredResult<PollingResponse> param) {
		
		for(int i=0; i<chatrooms.length; i++) {
			if(map.get(chatrooms[i]).isEmpty()) {
				List<DeferredResult<PollingResponse>> list = new ArrayList<DeferredResult<PollingResponse>>();
				list.add(param);
				map.put(chatrooms[i], list);
			} else {
				map.get(chatrooms).add(param);
			}
		}
		
	}

}
