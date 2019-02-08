package com.webkakao.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webkakao.model.database.mongo.ChatModel;
import com.webkakao.model.request.PollingRequest;
import com.webkakao.model.response.PollingResponse;
import com.webkakao.redis.RedisService;
import com.webkakao.service.PollingService;

@Service("pollingService")
public class PollingServiceImpl implements PollingService {

	public static final ConcurrentHashMap<Long, List<DeferredResult<PollingResponse>>> response_map = new ConcurrentHashMap<>();
	public static final Map<Long, long[]> user_map = new HashMap<Long, long[]>();

	@Autowired
	private RedisService redisService;

	@Autowired
	private ObjectMapper objectMapper;

	// @Override
	// public PollingResponse msgPolling(PollingRequest param) {
	//
	// PollingResponse response = new PollingResponse();
	// List<PollingData> list = new ArrayList<PollingData>();
	//
	// for (int i = 0; i < param.getRooms().length; i++) {
	// PollingData data = redisService.getPollingData(param.getRooms()[i]);
	// list.add(data);
	// }
	//
	// response.setData(list);
	//
	// return response;
	// }

	@Override
	public void addDeferredResult(long user_idx, long[] chatrooms, DeferredResult<PollingResponse> param) {

		for (int i = 0; i < chatrooms.length; i++) {
			if (response_map.get(chatrooms[i]) == null) {
				List<DeferredResult<PollingResponse>> list = Collections
						.synchronizedList(new ArrayList<DeferredResult<PollingResponse>>());
				list.add(param);
				response_map.put(chatrooms[i], list);
			} else {
				response_map.get(chatrooms[i]).add(param);
			}
		}

		user_map.put(user_idx, chatrooms);

	}

	@Override
	public void removeDeferredResult(long user_idx, DeferredResult<PollingResponse> param) {

		long chatrooms[] = user_map.get(user_idx);
		if (chatrooms != null) {
			for (int i = 0; i < chatrooms.length; i++)
				response_map.get(chatrooms[i]).remove(param);

			user_map.remove(user_idx);
		}
	}

	@Override
	public void sendMessage(long chatroom_idx, String msg)
			throws JsonParseException, JsonMappingException, IOException {

		PollingResponse response = new PollingResponse();
		response.setResultCode(0);
		response.setChatroom_idx(chatroom_idx);
		ChatModel message = objectMapper.readValue(msg, ChatModel.class);
		response.setLast_msg_idx(message.getMsg_idx());
		response.setLast_msg(message.getMsg());
		response.setTimestamp(new Date().getTime());

		List<DeferredResult<PollingResponse>> list = response_map.get(chatroom_idx);

		if (list != null) {
			for (int i = 0; i < list.size(); i++) {
				list.get(i).setResult(response);
			}
		}

	}

	@Override
	public PollingResponse msgPolling(PollingRequest param) {
		// TODO Auto-generated method stub
		return null;
	}

}
