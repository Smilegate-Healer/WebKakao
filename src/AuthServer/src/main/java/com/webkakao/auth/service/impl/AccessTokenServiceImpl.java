package com.webkakao.auth.service.impl;

import org.springframework.stereotype.Service;

import com.webkakao.auth.model.response.LoginResponse;
import com.webkakao.auth.model.response.ResponseUserInfo;
import com.webkakao.auth.model.util.TokenGenerateUtil;
import com.webkakao.auth.model.util.UserInfoTransUtil;
import com.webkakao.auth.service.AccessTokenService;

@Service("accessTokenService")
public class AccessTokenServiceImpl implements AccessTokenService {
	
	private TokenGenerateUtil tokenGenerateUtil = new TokenGenerateUtil();
	
	private UserInfoTransUtil userInfoTransUtil = new UserInfoTransUtil();

	@Override
	public LoginResponse generateToken(LoginResponse result) {
		
		String access_token = tokenGenerateUtil.tokenGenerate();
		System.out.println("access_token : " + access_token);
		result.setAccess_token(access_token);
		
		return result;
	}

}
