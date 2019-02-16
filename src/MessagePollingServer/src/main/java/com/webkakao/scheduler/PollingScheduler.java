package com.webkakao.scheduler;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.async.DeferredResult;

import com.webkakao.model.request.PollingRequest;
import com.webkakao.model.response.PollingResponse;
import com.webkakao.redis.RedisService;
import com.webkakao.service.PollingService;

@Component
public class PollingScheduler {
	
	public static final ConcurrentHashMap<Long, List<DeferredResult<PollingResponse>>> map = new ConcurrentHashMap<>();
	
	@Autowired
	private PollingService pollingService;

	@Autowired
	private RedisService redisService;
	
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
