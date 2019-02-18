package com.webkakao.auth.database;

import org.apache.ibatis.annotations.Mapper;

import com.webkakao.auth.model.response.LoginResponse;

@Mapper
public interface UserMapper {
	
	public LoginResponse getUserByEmail(String email);

//	public UserInfo getUser(String id);
//	
//	public void insertUser(UserInfo userInfo);
//	
//	public String getPassword(UserInfo userInfo);
//
//	public void resetPassword(HashMap<String, String> map);

}
