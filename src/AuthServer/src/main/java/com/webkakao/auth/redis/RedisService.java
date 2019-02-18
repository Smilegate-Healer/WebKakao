package com.webkakao.auth.redis;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webkakao.auth.model.RedisUserInfo;

@Transactional
@Service
public class RedisService {

	@Autowired
	private RedisTemplate<String, Object> redisTemplate;

	public void insertToken(String access_token, RedisUserInfo redisUserInfo) {
		HashOperations<String, String, String> hash = redisTemplate.opsForHash();

		Map<String, String> map = new HashMap<>();
		map.put("ip",redisUserInfo.getIp());
		map.put("timeStamp", redisUserInfo.getTimestamp());
		map.put("user_type", redisUserInfo.getUser_type());
		
		hash.putAll(access_token, map);
		// Redis키 만료시간 설
		redisTemplate.expire(access_token, 600L, TimeUnit.SECONDS);

		System.out.println(access_token + " : " + hash.entries(access_token));

	}

	public Map<String, String> getUserInfo(String access_token) {

		HashOperations<String, String, String> hash = redisTemplate.opsForHash();
		Map<String, String> map = hash.entries(access_token);
		System.out.println(access_token + " : " + map);

		return map;
	}

	public void deleteExpiredToken(int sec) {
		// TODO Auto-generated method stub
		HashOperations<String, String, String> hash = redisTemplate.opsForHash();
		Set<byte[]> keys = redisTemplate.getConnectionFactory().getConnection().keys("*".getBytes());

		Iterator<byte[]> it = keys.iterator();

		while (it.hasNext()) {
			byte[] data = (byte[]) it.next();
			String access_token = new String(data, 0, data.length);
			Map<String, String> map = hash.entries(access_token);
			System.out.println(access_token);
			Long timeStamp = Long.parseLong(map.get("timeStamp"));
			Date now = new Date();
			if(now.getTime()-timeStamp > sec) {
				System.out.println("DELETE => " + access_token + " : " + map);
				hash.delete(access_token, "timeStamp");
				hash.delete(access_token, "ip");
			}
		}
	}

}
