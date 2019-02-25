package com.webkakao.api.service.redis;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webkakao.api.model.ChatModel;
import com.webkakao.api.model.ChatroomInfo;
import com.webkakao.api.model.redis.ChatroomInfoModel;
import com.webkakao.api.repository.ChatroomInfoRedisRepository;

@Service
public class RedisService {

	public static final String REDIS_KEY = "chatroomInfo";

	@Autowired
	private ChatroomInfoRedisRepository chatroomInfoRepository;

	@Autowired
	private RedisTemplate redisTemplate;

	@Autowired
	private ObjectMapper objectMapper;

	// @Autowired
	// private RedisTemplate<String, Object> redisTemplate;

	//
	public boolean addNewChatroom(long chatroomId, String objectId) {

		if (chatroomInfoRepository.existsById(chatroomId))
			return false;

		ChatroomInfoModel chatroomInfoModel = ChatroomInfoModel.builder().chatroom_id(chatroomId).object_id(objectId)
				.last_msg_idx(0).timestamp(new Date().getTime()).last_msg("").build();

		chatroomInfoRepository.save(chatroomInfoModel);

		return true;

	}

	public List<ChatModel> getChatroomMessage(long chatroom_idx) {

		List<String> data = redisTemplate.opsForList().range(chatroom_idx, 0, -1);
		List<ChatModel> result = new ArrayList<>();
		try {
			for (int i = 0; i < data.size(); i++) {
				ChatModel chatModel = objectMapper.readValue(data.get(i), ChatModel.class);
				result.add(chatModel);
			}
		} catch (IOException e) {
			result.clear();
		}
		return result;

	}

	public void getLastMsg(List<ChatroomInfo> list) {

		for (int i = 0; i < list.size(); i++) {
			Optional<ChatroomInfoModel> object = chatroomInfoRepository.findById(list.get(i).getChatroom_idx());
			if (object.isPresent()) {
				ChatroomInfoModel model = object.get();
				if ("i".equals(model.getMsg_type())) {
					String[] words = model.getLast_msg().split("/");
					list.get(i).setLast_msg(words[1] + "님이 입장하였습니다.");
				} else if ("e".equals(model.getMsg_type())) {
					list.get(i).setLast_msg(model.getLast_msg() + "님이 퇴장하였습니다.");
				} else {
					list.get(i).setLast_msg(model.getLast_msg());
				}
				list.get(i).setLast_msg_idx(model.getLast_msg_idx());

				// TODO: Timestamp Setting
				list.get(i).setTimestamp(model.getTimestamp());
			}

			// TODO: Default Msg Setting
			else {
				list.get(i).setLast_msg("Default Msg :)");
			}
		}

	}

	public long getLastMsgIdx(long chatroom_idx) {

		Optional<ChatroomInfoModel> object = chatroomInfoRepository.findById(chatroom_idx);

		if (object.isPresent()) {
			ChatroomInfoModel model = object.get();
			return model.getLast_msg_idx();
		}
		return -1;
	}
	

	public long getLastMsgIdx(long chatroom_idx, long user_idx) {

		HashOperations<String, String, String> hash = redisTemplate.opsForHash();
		Map<String, String> map = hash.entries("lastRead_" + chatroom_idx);
		String idx = map.get(String.valueOf(user_idx));
		return Long.parseLong(idx);

	}

}
