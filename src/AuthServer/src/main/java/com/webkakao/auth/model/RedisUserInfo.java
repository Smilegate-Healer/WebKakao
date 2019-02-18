package com.webkakao.auth.model;

import java.util.Date;

public class RedisUserInfo {
	
	private String ip;
	
	private Long timestamp;
	
	private String user_type;
	
	public String getUser_type() {
		return user_type;
	}

	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}

	public RedisUserInfo() {
		timestamp = new Date().getTime();
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getTimestamp() {
		return Long.toString(timestamp);
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}
	
}
