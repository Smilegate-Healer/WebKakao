package com.webkakao.auth.service;

import com.webkakao.auth.model.response.LoginResponse;

public interface AccessTokenService {

	public LoginResponse generateToken(LoginResponse result);
	
}
