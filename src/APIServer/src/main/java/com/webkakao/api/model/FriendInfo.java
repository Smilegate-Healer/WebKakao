package com.webkakao.api.model;

public class FriendInfo {

	private long user_idx;
	private String name;
	private long profile_img;
	private String status_msg;

	public long getUser_idx() {
		return user_idx;
	}

	public void setUser_idx(long user_idx) {
		this.user_idx = user_idx;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getProfile_img() {
		return profile_img;
	}

	public void setProfile_img(long profile_img) {
		this.profile_img = profile_img;
	}

	public String getStatus_msg() {
		return status_msg;
	}

	public void setStatus_msg(String status_msg) {
		this.status_msg = status_msg;
	}

}
