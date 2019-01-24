package com.webkakao.api.model;

public class ChatroomUserList {

	private long chatroom_idx;
	private long user_idx;
	private String name;
	private String profile_img;
	private long start_msg_idx;
	private long last_read_msg_idx;

	public long getChatroom_idx() {
		return chatroom_idx;
	}

	public void setChatroom_idx(long chatroom_idx) {
		this.chatroom_idx = chatroom_idx;
	}

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

	public String getProfile_img() {
		return profile_img;
	}

	public void setProfile_img(String profile_img) {
		this.profile_img = profile_img;
	}

	public long getStart_msg_idx() {
		return start_msg_idx;
	}

	public void setStart_msg_idx(long start_msg_idx) {
		this.start_msg_idx = start_msg_idx;
	}

	public long getLast_read_msg_idx() {
		return last_read_msg_idx;
	}

	public void setLast_read_msg_idx(long last_read_msg_idx) {
		this.last_read_msg_idx = last_read_msg_idx;
	}

}
