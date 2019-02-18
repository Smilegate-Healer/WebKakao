package com.webkakao.auth.service;

import com.webkakao.auth.model.UserInfo;
import com.webkakao.auth.model.request.Login;
import com.webkakao.auth.model.response.wrapper.AuthResponseWrapper;

public interface UserService {

	public AuthResponseWrapper login(Login loginIngo, String ip);

//	public UserInfo join(UserInfo userInfo);
//
//	boolean userInfoCheck(UserInfo userInfo);
//
//	public String resetPassword(UserInfo userInfo);
	
}
