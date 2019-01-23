package com.webkakao.api.model.response;

public class SearchFriendParam {

	private long user_idx;
	private String user_name;
	private String profile_img;
	private String status_msg;
	
	public long getUser_idx() {
		return user_idx;
	}
	public void setUser_idx(long user_idx) {
		this.user_idx = user_idx;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getProfile_img() {
		return profile_img;
	}
	public void setProfile_img(String profile_img) {
		this.profile_img = profile_img;
	}
	public String getStatus_msg() {
		return status_msg;
	}
	public void setStatus_msg(String status_msg) {
		this.status_msg = status_msg;
	}
	
}
