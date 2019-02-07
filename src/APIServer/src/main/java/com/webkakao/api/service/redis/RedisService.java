package com.webkakao.api.service.redis;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;
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
				.last_msg_idx(1).timestamp(new Date().getTime()).last_msg("") // start from 1
				.build();

		chatroomInfoRepository.save(chatroomInfoModel);

		return true;

	}
	
	public List<ChatModel> getChatroomMessage(long chatroom_idx) {

		List<ChatModel> data = redisTemplate.opsForList().range(chatroom_idx, 0, -1);
		List<ChatModel> newData = objectMapper.convertValue(data, new TypeReference<List<ChatModel>>(){});
		return newData;

	}

	public void getLastMsg(List<ChatroomInfo> list) {

		for (int i = 0; i < list.size(); i++) {
			Optional<ChatroomInfoModel> object = chatroomInfoRepository.findById(list.get(i).getChatroom_idx());
			if (object.isPresent()) {
				ChatroomInfoModel model = object.get();
				list.get(i).setLast_msg(model.getLast_msg());
				// TODO: Timestamp Setting
				// list.get(i).setTimestamp(model.get);
			}

			// TODO: Default Msg Setting
			else {
				list.get(i).setLast_msg("Default Msg :)");
			}
		}

	}

	

}
