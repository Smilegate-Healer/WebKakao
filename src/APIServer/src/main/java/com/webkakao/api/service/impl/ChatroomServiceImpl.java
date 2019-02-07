package com.webkakao.api.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webkakao.api.database.ChatroomMapper;
import com.webkakao.api.model.ChatModel;
import com.webkakao.api.model.ChatroomInfo;
import com.webkakao.api.model.ChatroomUserList;
import com.webkakao.api.model.ChatsModel;
import com.webkakao.api.model.request.CheckInChatroom;
import com.webkakao.api.model.request.CheckOutChatroom;
import com.webkakao.api.model.request.GetChatroomList;
import com.webkakao.api.model.request.GetChatroomMessage;
import com.webkakao.api.model.request.RequestChatroom;
import com.webkakao.api.model.response.GetChatroomListParam;
import com.webkakao.api.model.response.GetChatroomMessageParam;
import com.webkakao.api.model.response.RequestChatroomParam;
import com.webkakao.api.repository.ChatsMongoRepository;
import com.webkakao.api.response.wrapper.APIResponseWrapper;
import com.webkakao.api.service.ChatroomService;
import com.webkakao.api.service.redis.RedisService;

@Service("chatroomService")
public class ChatroomServiceImpl implements ChatroomService {

	@Autowired
	private ChatroomMapper chatroomMapper;

	@Autowired
	private RedisService redisService;

	@Autowired
	private ChatsMongoRepository mongoRepository;

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
			
			//create new chatsmodel object
			ChatsModel nextChats = ChatsModel.builder()
	                .pre_id("null")
	                .build();
			String object_id = mongoRepository.insert(nextChats).get_id();
			param.setMsg_object_id(object_id);
			chatroomMapper.insertChatroom(param);

			Map<String, Object> map = new HashMap<String, Object>();

			map.put("chatroom_idx", param.getChatroom_idx());
			map.put("user_idx", param.getFrom_user_idx());
			map.put("last_read_msg_idx", 0);
			map.put("start_msg_idx", 0);

			chatroomMapper.checkInChatroom(map);

			map.put("user_idx", param.getTo_user_idx());

			chatroomMapper.checkInChatroom(map);
			
			//insert redis chatroomInfo
			redisService.addNewChatroom(param.getChatroom_idx(), object_id);

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

		List<ChatroomUserList> user_list = chatroomMapper.getChatroomUserList(param.getUser_idx());
		resultParam.setChatroomUserList(user_list, param.getUser_idx());

		//TODO: Get Last Msg 
		redisService.getLastMsg(list);
		
		wrapper.setParam(resultParam);

		return wrapper;

	}

	@Override
	public APIResponseWrapper checkOutChatroom(CheckOutChatroom param) {

		APIResponseWrapper wrapper = createWrapper();

		chatroomMapper.checkOutChatroom(param);

		return wrapper;

	}

	@Override
	public APIResponseWrapper getChatroomMessage(GetChatroomMessage param) {
		
		APIResponseWrapper wrapper = createWrapper();
		
		GetChatroomMessageParam resultParam = new GetChatroomMessageParam();

		if(param.getObject_id() == null) {
			
			List<ChatModel> redisData = redisService.getChatroomMessage(param.getChatroom_idx());
			String object_id = chatroomMapper.getMongoObjectId(param.getChatroom_idx());
			
			Optional<ChatsModel> mongoModelOptional = mongoRepository.findById(object_id);
			ChatsModel mongoModel = mongoModelOptional.get();
			List<ChatModel> mongoData = mongoModel.getData();
			
			mongoData.addAll(redisData);
		
			resultParam.setData(mongoData);
			resultParam.setPre_object_id(mongoModel.getPre_id());
			
		} else {
			
			Optional<ChatsModel> mongoModelOptional = mongoRepository.findById(param.getObject_id());
			ChatsModel mongoModel = mongoModelOptional.get();
			List<ChatModel> mongoData = mongoModel.getData();
			
			resultParam.setData(mongoData);
			resultParam.setPre_object_id(mongoModel.getPre_id());
			
		}
		
		wrapper.setParam(resultParam);

		return wrapper;
	}

}
