package com.webkakao.auth.model.util;

import com.webkakao.auth.model.UserInfo;
import com.webkakao.auth.model.response.ResponseUserInfo;

public class UserInfoTransUtil {
	
	public ResponseUserInfo changeModel(UserInfo userInfo, String access_token) {
		ResponseUserInfo rUserInfo = new ResponseUserInfo();
		rUserInfo.setAccess_token(access_token);
		rUserInfo.setEmail(userInfo.getEmail());
		rUserInfo.setId(userInfo.getId());
		rUserInfo.setName(userInfo.getName());
		rUserInfo.setUser_type(userInfo.getUser_type());
		return rUserInfo;
	}

//	public RedisUserInfo responseToRedis(ResponseUserInfo responseUserInfo) {
//		RedisUserInfo redisUserInfo = new RedisUserInfo();
//		redisUserInfo.setIp(ip);
//		return redisUserInfo;
//	}

}
