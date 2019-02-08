package com.webkakao.redis;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webkakao.model.PollingData;
import com.webkakao.model.database.mongo.ChatroomInfoModel;
import com.webkakao.repository.ChatroomInfoRedisRepository;

@Transactional
@Service
public class RedisService {

	@Autowired
	private RedisTemplate<String, Object> redisTemplate;

	@Autowired
	private ChatroomInfoRedisRepository chatroomInfoRepository;

	public PollingData getPollingData(long chatroomId) {
		Optional<ChatroomInfoModel> chatroom = chatroomInfoRepository.findById(chatroomId);

		PollingData data = null;
		if (chatroom.isPresent()) {
			ChatroomInfoModel model = chatroom.get();
			data = PollingData.builder().last_msg(model.getLast_msg()).last_msg_idx(model.getLast_msg_idx()).build();
		}
		return data;
	}

}
