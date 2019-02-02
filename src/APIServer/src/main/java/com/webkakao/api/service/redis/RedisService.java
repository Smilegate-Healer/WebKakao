package com.webkakao.api.service.redis;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.webkakao.api.model.ChatroomInfo;
import com.webkakao.api.model.ChatroomUserList;
import com.webkakao.api.model.redis.ChatroomInfoModel;
import com.webkakao.api.repository.ChatroomInfoRedisRepository;

@Service
public class RedisService {

	public static final String REDIS_KEY = "chatroomInfo";

	@Autowired
	private ChatroomInfoRedisRepository chatroomInfoRepository;

	@Autowired
	private RedisTemplate redisTemplate;

	// @Autowired
	// private ObjectMapper objectMapper;

	// @Autowired
	// private RedisTemplate<String, Object> redisTemplate;

	//
	public boolean addNewChatroom(long chatroomId, String objectId) {

		if (chatroomInfoRepository.existsById(chatroomId))
			return false;

		ChatroomInfoModel chatroomInfoModel = ChatroomInfoModel.builder().chatroom_id(chatroomId).object_id(objectId)
				.last_msg_idx(1) // start from 1
				.build();

		chatroomInfoRepository.save(chatroomInfoModel);

		return true;

	}

	public void createChatroomInfo() {

		HashOperations<String, String, String> hash = redisTemplate.opsForHash();

		Map<String, String> map = new HashMap<>();
		// map.put(Long.toString(1l), "5c46bd387d152a16a7d5dfb7");
		hash.putAll("chatroomInfo", map);

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

	// public void insertMessage(Message message, Long chatroom_idx) {
	//
	// HashOperations<String, String, String> idx_hash =
	// redisTemplate.opsForHash();
	//
	// HashOperations<String, String, List> msg_hash =
	// redisTemplate.opsForHash();
	//
	// String id = idx_hash.get("chatroomInfo", Long.toString(chatroom_idx));
	// List<Message> msg = msg_hash.get(id, "msg");
	// if(msg == null) {
	// msg = new ArrayList<Message>();
	// msg.add(message);
	// } else {
	// msg.add(message);
	// }
	// Map<String, List> map = new HashMap<>();
	// map.put("msg", msg);
	// msg_hash.putAll(id, map);
	//
	// }

	// public void insertToken(String access_token, RedisUserInfo redisUserInfo)
	// {
	// HashOperations<String, String, String> hash = redisTemplate.opsForHash();
	//
	// Map<String, String> map = new HashMap<>();
	// map.put("ip",redisUserInfo.getIp());
	// map.put("timeStamp", redisUserInfo.getTimestamp());
	// map.put("user_type", redisUserInfo.getUser_type());
	//
	// hash.putAll(access_token, map);
	// // Redis키 만료시간 설
	// redisTemplate.expire(access_token, 600L, TimeUnit.SECONDS);
	//
	// System.out.println(access_token + " : " + hash.entries(access_token));
	//
	// }
	//
	// public Map<String, String> getUserInfo(String access_token) {
	//
	// HashOperations<String, String, String> hash = redisTemplate.opsForHash();
	// Map<String, String> map = hash.entries(access_token);
	// System.out.println(access_token + " : " + map);
	//
	// return map;
	// }

}
