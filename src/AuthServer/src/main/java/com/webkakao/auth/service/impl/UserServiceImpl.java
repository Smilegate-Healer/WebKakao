package com.webkakao.auth.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.webkakao.auth.database.UserMapper;
import com.webkakao.auth.model.RedisUserInfo;
import com.webkakao.auth.model.request.Login;
import com.webkakao.auth.model.response.LoginResponse;
import com.webkakao.auth.model.response.wrapper.AuthResponseWrapper;
import com.webkakao.auth.model.util.CryptoUtil;
import com.webkakao.auth.redis.RedisService;
import com.webkakao.auth.service.AccessTokenService;
import com.webkakao.auth.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired(required=true)
	private UserMapper userMapper;
	
	@Autowired
	private RedisService redisService;
	
	@Autowired
	private AccessTokenService accessTokenService;
	
	@Autowired
	private JavaMailSender javaMailSender;

	private CryptoUtil cryptoUtil = new CryptoUtil();

	@Override
	public AuthResponseWrapper login(Login loginInfo, String ip) {

		AuthResponseWrapper wrapper = createWrapper();

		LoginResponse result = userMapper.getUserByEmail(loginInfo.getEmail());
		if (result != null) {
			String encPasswd = cryptoUtil.sha256(result.getSalt() + loginInfo.getPassword());
			if (result.getPassword().equals(encPasswd)) {
				LoginResponse response = accessTokenService.generateToken(result);
				RedisUserInfo redisUserInfo = new RedisUserInfo();
				redisUserInfo.setIp(ip);
				redisUserInfo.setUser_type(response.getUser_type());
				// TODO: Redis에 데이터 추가
				redisService.insertToken(response.getAccess_token(), redisUserInfo);
				wrapper.setParam(response);
			} else {
				wrapper.setResultCode(100);
				wrapper.setMessage("Passwords do not match");
			}
		} else {
			wrapper.setResultCode(100);
			wrapper.setMessage("Invalid Email");
		}

		return wrapper;

	}

	private AuthResponseWrapper createWrapper() {
		AuthResponseWrapper wrapper = new AuthResponseWrapper();
		wrapper.setResultCode(0);
		wrapper.setMessage("success");
		return wrapper;
	}

	// @Override
	// public UserInfo join(UserInfo userInfo) {
	//
	// UserInfo result = userMapper.getUserByID(userInfo.getId());
	//
	// if (result == null) {
	// String salt = cryptoUtil.randomKey(10);
	// String encPasswd = cryptoUtil.sha256(salt + userInfo.getPassword());
	// userInfo.setSalt(salt);
	// userInfo.setPassword(encPasswd);
	// userMapper.insertUser(userInfo);
	//
	// return userInfo;
	// }
	// return null;
	// }
	//
	// @Override
	// public boolean userInfoCheck(UserInfo userInfo) {
	//
	// String passwd = userMapper.getPassword(userInfo);
	//
	// if (passwd == null)
	// return false;
	// return true;
	//
	// }
	//
	// @Override
	// public String resetPassword(UserInfo userInfo) {
	//
	// MailSendUtil mailSendUti = new MailSendUtil();
	// mailSendUti.setJavaMailSender(javaMailSender);
	// String tmpPasswd = cryptoUtil.randomKey(10);
	//
	// mailSendUti.sendSimpleMessage(userInfo.getEmail(), "Password", "Your new
	// password is \"" + tmpPasswd + "\"\n"
	// + "I recommend that you change your password after login to the
	// homepage.");
	//
	// String salt = cryptoUtil.randomKey(10);
	// String encPasswd = cryptoUtil.sha256(salt + tmpPasswd);
	//
	// HashMap<String, String> map = new HashMap<String, String>();
	// map.put("id", userInfo.getId());
	// map.put("salt", salt);
	// map.put("password", encPasswd);
	//
	// userMapper.resetPassword(map);
	//
	// return tmpPasswd;
	//
	// }

}
