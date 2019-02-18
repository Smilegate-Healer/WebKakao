package com.webkakao.auth.service.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.webkakao.auth.database.UserMapper;
import com.webkakao.auth.model.RedisUserInfo;
import com.webkakao.auth.model.UserCheck;
import com.webkakao.auth.model.request.PasswordReset;
import com.webkakao.auth.model.request.SignIn;
import com.webkakao.auth.model.request.SignUp;
import com.webkakao.auth.model.response.LoginResponse;
import com.webkakao.auth.model.response.wrapper.AuthResponseWrapper;
import com.webkakao.auth.model.util.CryptoUtil;
import com.webkakao.auth.model.util.MailSendUtil;
import com.webkakao.auth.redis.RedisService;
import com.webkakao.auth.service.AccessTokenService;
import com.webkakao.auth.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired(required = true)
	private UserMapper userMapper;

	@Autowired
	private RedisService redisService;

	@Autowired
	private AccessTokenService accessTokenService;

	@Autowired
	private JavaMailSender javaMailSender;

	private CryptoUtil cryptoUtil = new CryptoUtil();

	@Override
	public AuthResponseWrapper signIn(SignIn param, String ip) {

		AuthResponseWrapper wrapper = createWrapper();

		LoginResponse result = userMapper.getUserByEmail(param.getEmail());
		if (result != null) {
			String encPasswd = cryptoUtil.sha256(result.getSalt() + param.getPassword());
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

	@Override
	public AuthResponseWrapper signUp(SignUp param) {

		AuthResponseWrapper wrapper = createWrapper();

		String user = userMapper.duplicatieCheck(param.getEmail());

		if (user == null) {
			String salt = cryptoUtil.randomKey(10);
			param.setSalt(salt);
			String encPasswd = cryptoUtil.sha256(salt + param.getPassword());
			param.setPassword(encPasswd);
			userMapper.insertUser(param);

			return wrapper;
		}

		wrapper.setMessage("Insert Error");
		wrapper.setResultCode(100);

		return wrapper;

	}

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

	@Override
	public AuthResponseWrapper passwordReset(PasswordReset param) {

		AuthResponseWrapper wrapper = createWrapper();
		
		UserCheck user = userMapper.userCheck(param);

		if(user != null) {
			MailSendUtil mailSendUti = new MailSendUtil();
			mailSendUti.setJavaMailSender(javaMailSender);
			String tmpPasswd = cryptoUtil.randomKey(10);
	
			String salt = cryptoUtil.randomKey(10);
			String encPasswd = cryptoUtil.sha256(salt + tmpPasswd);
	
			param.setSalt(salt);
			param.setPassword(encPasswd);
	
			userMapper.passwordReset(param);
			
			mailSendUti.sendSimpleMessage(param.getEmail(), "[Webkakao] Password Reset Infomation", "Your new password is \"" + tmpPasswd + "\"\n"
					+ "I recommend that you change your password after login to the homepage.");
			
		} else {
			wrapper.setResultCode(100);
			wrapper.setMessage("not match information");
		}

		return wrapper;

	}

}
