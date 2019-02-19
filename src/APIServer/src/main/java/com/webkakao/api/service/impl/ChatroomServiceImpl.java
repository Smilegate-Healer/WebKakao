package com.webkakao.api.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.webkakao.api.database.ChatroomMapper;
import com.webkakao.api.model.ChatModel;
import com.webkakao.api.model.ChatroomInfo;
import com.webkakao.api.model.ChatroomUserList;
import com.webkakao.api.model.ChatsModel;
import com.webkakao.api.model.request.CheckInChatroom;
import com.webkakao.api.model.request.CheckInChatroomByUserList;
import com.webkakao.api.model.request.CheckOutChatroom;
import com.webkakao.api.model.request.GetChatroomList;
import com.webkakao.api.model.request.GetChatroomMessage;
import com.webkakao.api.model.request.RenameChatroom;
import com.webkakao.api.model.request.RequestChatroom;
import com.webkakao.api.model.request.RequestChatroomWithUsers;
import com.webkakao.api.model.request.UpdateChatroomName;
import com.webkakao.api.model.response.CheckInChatroomByUserListParam;
import com.webkakao.api.model.response.GetChatroomListParam;
import com.webkakao.api.model.response.GetChatroomMessageParam;
import com.webkakao.api.model.response.RenameChatroomParam;
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

	@Transactional
	@Override
	public APIResponseWrapper requestChatroom(RequestChatroom param) {

		APIResponseWrapper wrapper = createWrapper();
		RequestChatroomParam resultParam = null;

		try {

			// create new chatsmodel object
			ChatsModel nextChats = ChatsModel.builder().pre_id("null").build();

			String object_id = mongoRepository.insert(nextChats).get_id();

			param.setMsg_object_id(object_id);
			chatroomMapper.insertChatroom(param);

			Map<String, Object> map = new HashMap<String, Object>();

			map.put("chatroom_idx", param.getChatroom_idx());
			map.put("user_idx", param.getFrom_user_idx());
			map.put("last_read_msg_idx", 0);
			map.put("start_msg_idx", 0);

			chatroomMapper.checkInChatroom(map);

			resultParam = chatroomMapper.getChatroomInfo(param.getChatroom_idx());
			map.put("user_idx", param.getTo_user_idx());

			chatroomMapper.checkInChatroom(map);

			// insert redis chatroomInfo
			redisService.addNewChatroom(param.getChatroom_idx(), object_id);

		} catch (Exception e) {
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			wrapper.setResultCode(111);
			wrapper.setMessage("Insert Error");
			return wrapper;
		}

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
			map.put("user_idx", param.getTo_user_idx());
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

	@Transactional
	@Override
	public APIResponseWrapper getChatroomList(GetChatroomList param) {

		APIResponseWrapper wrapper = createWrapper();

		List<ChatroomInfo> list = chatroomMapper.getChatroomList(param);
		GetChatroomListParam resultParam = new GetChatroomListParam();
		resultParam.setList(list);

		List<ChatroomUserList> user_list = chatroomMapper.getChatroomUserList(param.getUser_idx());
		resultParam.setChatroomUserList(user_list, param.getUser_idx());

		// TODO: Get Last Msg
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

		List<ChatModel> redisData = redisService.getChatroomMessage(param.getChatroom_idx());
		String object_id = chatroomMapper.getMongoObjectId(param.getChatroom_idx());

		List<ChatModel> messages = new ArrayList<ChatModel>();

		if (param.getLast_read_msg_idx() == 0) {
			Optional<ChatsModel> mongoModelOptional = mongoRepository.findById(object_id);
			ChatsModel mongoModel = mongoModelOptional.get();
			List<ChatModel> mongoData = mongoModel.getData();
			if (mongoData != null)
				messages.addAll(0, mongoData);
			object_id = mongoModel.getPre_id();
		} else {
			while (true) {

				Optional<ChatsModel> mongoModelOptional = mongoRepository.findById(object_id);
				ChatsModel mongoModel = mongoModelOptional.get();
				List<ChatModel> mongoData = mongoModel.getData();
				if (mongoData != null)
					messages.addAll(0, mongoData);
				object_id = mongoModel.getPre_id();

				if (mongoData == null || param.getLast_read_msg_idx() > mongoData.get(0).getMsg_idx()) {
					break;
				}

			}
		}

		if (messages.size() > 0) {
			messages.addAll(redisData);
			resultParam.setData(messages);
		} else {
			resultParam.setData(redisData);
		}

		resultParam.setPre_object_id(object_id);

		if (resultParam.getData() != null && resultParam.getData().size() > 0) {
			long last_read_msg_idx = resultParam.getData().get(resultParam.getData().size() - 1).getMsg_idx();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("chatroom_idx", param.getChatroom_idx());
			map.put("user_idx", param.getUser_idx());
			map.put("last_read_msg_idx", last_read_msg_idx);
			chatroomMapper.updateLastReadMsgIdx(map);
		}

		wrapper.setParam(resultParam);

		return wrapper;
	}

	@Override
	public APIResponseWrapper getChatroomScrollMessage(GetChatroomMessage param) {

		APIResponseWrapper wrapper = createWrapper();

		GetChatroomMessageParam resultParam = new GetChatroomMessageParam();

		if (param.getObject_id() == null) {

			List<ChatModel> redisData = redisService.getChatroomMessage(param.getChatroom_idx());
			String object_id = chatroomMapper.getMongoObjectId(param.getChatroom_idx());

			Optional<ChatsModel> mongoModelOptional = mongoRepository.findById(object_id);
			ChatsModel mongoModel = mongoModelOptional.get();
			List<ChatModel> mongoData = mongoModel.getData();

			if (mongoData != null) {
				mongoData.addAll(redisData);
				resultParam.setData(mongoData);
			} else {
				resultParam.setData(redisData);
			}

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

	@Override
	public APIResponseWrapper updateChatroomName(UpdateChatroomName param) {

		APIResponseWrapper wrapper = createWrapper();

		chatroomMapper.updateChatroomName(param);

		return wrapper;

	}

	@Override
	public APIResponseWrapper checkInChatroomByUserList(CheckInChatroomByUserList param) {

		APIResponseWrapper wrapper = createWrapper();

		long last_msg_idx = redisService.getLastMsgIdx(param.getChatroom_idx());

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("last_read_msg_idx", last_msg_idx);
		map.put("chatroom_idx", param.getChatroom_idx());
		map.put("start_msg_idx", last_msg_idx);
		try {
			for (int i = 0; i < param.getTo_user_list().size(); i++) {
				map.put("user_idx", param.getTo_user_list().get(i).getTo_user_idx());
				chatroomMapper.checkInChatroom(map);
			}
		} catch (Exception e) {
			wrapper.setResultCode(111);
			wrapper.setMessage("Insert Error");
			return wrapper;
		}
		CheckInChatroomByUserListParam resultParam = new CheckInChatroomByUserListParam();
		resultParam.setLast_read_msg_idx(last_msg_idx);
		resultParam.setStart_msg_idx(last_msg_idx);
		wrapper.setParam(resultParam);

		return wrapper;
	}

	@Override
	public APIResponseWrapper renameChatroom(RenameChatroom param) {

		APIResponseWrapper wrapper = createWrapper();

		chatroomMapper.renameChatroom(param);

		RenameChatroomParam resultParam = new RenameChatroomParam();
		resultParam.setChatroom_idx(param.getChatroom_idx());
		resultParam.setChatroom_name(param.getChatroom_name());

		wrapper.setParam(resultParam);

		return wrapper;
	}

	@Override
	public APIResponseWrapper requestChatroomWithUsers(RequestChatroomWithUsers param) {
		APIResponseWrapper wrapper = createWrapper();
		RequestChatroomParam resultParam = null;

		try {

			// create new chatsmodel object
			ChatsModel nextChats = ChatsModel.builder().pre_id("null").build();

			String object_id = mongoRepository.insert(nextChats).get_id();

			param.setMsg_object_id(object_id);
			chatroomMapper.insertChatroomWithUsers(param);

			Map<String, Object> map = new HashMap<String, Object>();

			map.put("chatroom_idx", param.getChatroom_idx());
			map.put("user_idx", param.getFrom_user_idx());
			map.put("last_read_msg_idx", 0);
			map.put("start_msg_idx", 0);

			chatroomMapper.checkInChatroom(map);

			resultParam = chatroomMapper.getChatroomInfo(param.getChatroom_idx());

			for (int i = 0; i < param.getTo_user_idx().size(); i++) {
				map.put("user_idx", param.getTo_user_idx().get(i));
				chatroomMapper.checkInChatroom(map);
			}

			// insert redis chatroomInfo
			redisService.addNewChatroom(param.getChatroom_idx(), object_id);

		} catch (Exception e) {
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			wrapper.setResultCode(111);
			wrapper.setMessage("Insert Error");
			return wrapper;
		}

		wrapper.setParam(resultParam);

		return wrapper;
	}

}
