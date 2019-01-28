package com.webkakao.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webkakao.model.PollingData;
import com.webkakao.model.request.PollingRequest;
import com.webkakao.model.response.PollingResponse;
import com.webkakao.redis.RedisService;
import com.webkakao.service.PollingService;

@Service("pollingService")
public class PollingServiceImpl implements PollingService {

	@Autowired
	private RedisService redisService;
	
	@Override
	public PollingResponse msgPolling(PollingRequest param) {
		
		PollingResponse response = new PollingResponse();
		List<PollingData> list = new ArrayList<PollingData>();
		
		for(int i=0; i<param.getRooms().length; i++) {
			PollingData data = redisService.getPollingData(param.getRooms()[i]);
			list.add(data);
		}
		
		response.setData(list);
		
		return response;
	}

}
