package com.webkakao.api.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webkakao.api.database.ChatroomMapper;
import com.webkakao.api.model.ChatroomInfo;
import com.webkakao.api.model.request.CheckInChatroom;
import com.webkakao.api.model.request.GetChatroomList;
import com.webkakao.api.model.request.RequestChatroom;
import com.webkakao.api.model.response.GetChatroomListParam;
import com.webkakao.api.model.response.RequestChatroomParam;
import com.webkakao.api.response.wrapper.APIResponseWrapper;
import com.webkakao.api.service.ChatroomService;

@Service("chatroomService")
public class ChatroomServiceImpl implements ChatroomService {

	@Autowired
	private ChatroomMapper chatroomMapper;

	public APIResponseWrapper createWrapper() {

		APIResponseWrapper response = new APIResponseWrapper();
		response.setResultCode(0);
		response.setMessage("success");
		return response;

	}

	@Override
	public APIResponseWrapper requestChatroom(RequestChatroom param) {

		APIResponseWrapper wrapper = createWrapper();
		RequestChatroomParam resultParam = null;

		try {

			chatroomMapper.insertChatroom(param);

			Map<String, Object> map = new HashMap<String, Object>();

			map.put("chatroom_idx", param.getChatroom_idx());
			map.put("creator_idx", param.getFrom_user_idx());
			map.put("last_read_msg_idx", 0);
			map.put("start_msg_idx", 0);

			chatroomMapper.checkInChatroom(map);

		} catch (Exception e) {
			wrapper.setResultCode(111);
			wrapper.setMessage("Insert Error");
			return wrapper;
		}

		resultParam = new RequestChatroomParam();
		resultParam.setChatroom_idx(param.getChatroom_idx());

		wrapper.setParam(resultParam);

		return wrapper;
	}

	@Override
	public APIResponseWrapper checkInChatroom(CheckInChatroom param) {
		
		APIResponseWrapper wrapper = createWrapper();
		RequestChatroomParam resultParam = null;
		
		try {

			long last_msg_idx = chatroomMapper.getLastMsgIdx(param.getChatroom_idx());
			
			Map<String, Object> map = new HashMap<String, Object>();

			map.put("chatroom_idx", param.getChatroom_idx());
			map.put("creator_idx", param.getFrom_user_idx());
			map.put("last_read_msg_idx", last_msg_idx);
			map.put("start_msg_idx", last_msg_idx);

			chatroomMapper.checkInChatroom(map);

		} catch (Exception e) {
			wrapper.setResultCode(111);
			wrapper.setMessage("Insert Error");
			return wrapper;
		}

		wrapper.setParam(resultParam);

		return wrapper;
		
	}

	@Override
	public APIResponseWrapper getChatroomList(GetChatroomList param) {
		
APIResponseWrapper wrapper = createWrapper();
		
		List<ChatroomInfo> list = chatroomMapper.getChatroomList(param);

		GetChatroomListParam resultParam = new GetChatroomListParam();
		resultParam.setList(list);
		
		wrapper.setParam(resultParam);

		return wrapper;
		
	}

}
