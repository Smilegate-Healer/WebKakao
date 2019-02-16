package com.webkakao.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import com.webkakao.model.response.PollingResponse;

@Service("responseManagementService")
public class ResponseManagementService {

	public static final ConcurrentHashMap<Long, List<DeferredResult<PollingResponse>>> map = new ConcurrentHashMap<>();

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

//	public void removeDeferredResult(long chatroom) {
//		
//		List<DeferredResult<PollingResponse>> list = map.get(chatroom);
//		
//		for(int i=0; i<)
//	}
}
