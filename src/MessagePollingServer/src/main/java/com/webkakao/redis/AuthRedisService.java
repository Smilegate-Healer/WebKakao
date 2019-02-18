package com.webkakao.redis;

import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class AuthRedisService {

	@Autowired
	private RedisTemplate<String, Object> authRedisTemplate;

	public boolean tokenCheck(String access_token, String ip) {

		HashOperations<String, String, String> hash = authRedisTemplate.opsForHash();
		
		Map<String, String> map = hash.entries(access_token);
		if(map != null && map.get("ip").equals(ip)) {
			authRedisTemplate.expire(access_token, 3600L, TimeUnit.SECONDS);
			return true;
		}

		return false;
		
	}

}
