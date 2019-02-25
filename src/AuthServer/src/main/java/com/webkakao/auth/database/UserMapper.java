package com.webkakao.auth.database;

import org.apache.ibatis.annotations.Mapper;

import com.webkakao.auth.model.UserCheck;
import com.webkakao.auth.model.request.PasswordReset;
import com.webkakao.auth.model.request.SignUp;
import com.webkakao.auth.model.response.LoginResponse;

@Mapper
public interface UserMapper {
	
	public LoginResponse getUserByEmail(String email);

	public String duplicatieCheck(String email);

	public void insertUser(SignUp param);
	
	public void passwordReset(PasswordReset param);

	public UserCheck userCheck(PasswordReset param);

	public void updatePassword(PasswordReset param);

}
