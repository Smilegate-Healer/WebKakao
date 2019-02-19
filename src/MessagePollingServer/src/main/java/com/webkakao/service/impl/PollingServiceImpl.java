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
import com.webkakao.database.ChatroomMapper;
import com.webkakao.model.ChatroomInfo;
import com.webkakao.model.ChatroomUserList;
import com.webkakao.model.database.mongo.ChatModel;
import com.webkakao.model.request.PollingRequest;
import com.webkakao.model.response.PollingResponse;
import com.webkakao.redis.RedisService;
import com.webkakao.service.PollingService;

@Service("pollingService")
public class PollingServiceImpl implements PollingService {

	public static final ConcurrentHashMap<Long, List<DeferredResult<PollingResponse>>> response_map = new ConcurrentHashMap<>();
	public static final Map<Long, long[]> user_map = new HashMap<Long, long[]>();
	public static final ConcurrentHashMap<Long, DeferredResult<PollingResponse>> user_deffered_map = new ConcurrentHashMap<>(); 

	@Autowired
	private RedisService redisService;

	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private ChatroomMapper chatroomMapper;

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
		
		user_deffered_map.put(user_idx, param);

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
		response.setSender(message.getSender());
		response.setTimestamp(new Date().getTime());
		response.setMsg_type(message.getMsg_type());
		List<ChatroomUserList> user_list = null;
		if("i".equals(response.getMsg_type())) {
			user_list = chatroomMapper.getChatroomUserList(chatroom_idx);
			response.setUser_list(user_list);
		}
		
		List<DeferredResult<PollingResponse>> list = response_map.get(chatroom_idx);
		
		if (list != null) {
			for (int i = 0; i < list.size(); i++) {
				list.get(i).setResult(response);
			}
		}
		
		if("i".equals(response.getMsg_type())) {
			
			String [] users_str = response.getLast_msg().split(" ");
			long last_read_msg_idx = redisService.getLastMsgIdx(chatroom_idx);
			
			for(int i=0; i<users_str.length; i++) {
				long user_idx = Long.parseLong((users_str[i]));
				Map <String, Object> map = new HashMap<String, Object>();
				map.put("chatroom_idx", chatroom_idx);
				map.put("user_idx", user_idx);
				ChatroomInfo info = chatroomMapper.getChatroomInfo(map);
				info.setTimestamp(new Date().getTime());
				info.setLast_read_msg_idx(last_read_msg_idx - 1);
				info.setLast_msg_idx(last_read_msg_idx);
				info.setStart_msg_idx(last_read_msg_idx);
				info.setLast_msg(response.getLast_msg());
				info.setUser_list(user_list);
				response.setChatroom_info(info);
				if(user_deffered_map.get(Long.parseLong((users_str[i]))) != null) {
					user_deffered_map.get(Long.parseLong((users_str[i]))).setResult(response);
				}
			}
			
		}

	}

	@Override
	public PollingResponse msgPolling(PollingRequest param) {
		// TODO Auto-generated method stub
		return null;
	}

}
