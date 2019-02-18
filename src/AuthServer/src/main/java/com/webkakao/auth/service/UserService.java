package com.webkakao.auth.service;

import com.webkakao.auth.model.request.PasswordReset;
import com.webkakao.auth.model.request.SignIn;
import com.webkakao.auth.model.request.SignUp;
import com.webkakao.auth.model.response.wrapper.AuthResponseWrapper;

public interface UserService {

	public AuthResponseWrapper signIn(SignIn param, String ip);

	public AuthResponseWrapper signUp(SignUp param);

//	boolean userInfoCheck(UserInfo param);

//	public String resetPassword(UserInfo param);

	public AuthResponseWrapper passwordReset(PasswordReset param);
	
}
