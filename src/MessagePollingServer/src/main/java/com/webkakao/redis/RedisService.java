package com.webkakao.redis;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webkakao.model.database.Message;

@Transactional
@Service
public class RedisService {

	@Autowired
	private RedisTemplate<String, Object> redisTemplate;

	public void testInit() {
		HashOperations<String, String, String> hash = redisTemplate.opsForHash();

		Map<String, String> map = new HashMap<>();
		map.put(Long.toString(1l), "5c46bd387d152a16a7d5dfb7");
		hash.putAll("chatroomInfo", map);
		// Redis키 만료시간 설
		// redisTemplate.expire("chatroomInfo", 600L, TimeUnit.SECONDS);

	}

	public void insertMessage(Message message, Long chatroom_idx) {
		
		HashOperations<String, String, String> idx_hash = redisTemplate.opsForHash();
		
		HashOperations<String, String, List> msg_hash = redisTemplate.opsForHash();
		
		String id = idx_hash.get("chatroomInfo", Long.toString(chatroom_idx));
		List<Message> msg = msg_hash.get(id, "msg");
		if(msg == null) {
			msg = new ArrayList<Message>();
			msg.add(message);
		} else {
			msg.add(message);
		}
		Map<String, List> map = new HashMap<>();
		map.put("msg", msg);
		msg_hash.putAll(id, map);
		
	}

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
