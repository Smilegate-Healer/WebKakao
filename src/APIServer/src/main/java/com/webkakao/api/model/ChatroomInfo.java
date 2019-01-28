package com.webkakao.api.model;

import java.util.List;

public class ChatroomInfo {

	private long chatroom_idx;
	private long start_msg_idx;
	private long last_msg_idx;
	private long last_read_msg_idx;
	private String chatroom_name;
	private String logo;
	
	private List<ChatroomUserList> user_list;
	
	public ChatroomInfo() {
		this.logo = "default";
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public List<ChatroomUserList> getUser_list() {
		return user_list;
	}

	public void setUser_list(List<ChatroomUserList> user_list) {
		this.user_list = user_list;
	}

	public long getChatroom_idx() {
		return chatroom_idx;
	}

	public void setChatroom_idx(long chatroom_idx) {
		this.chatroom_idx = chatroom_idx;
	}

	public long getLast_read_msg_idx() {
		return last_read_msg_idx;
	}

	public void setLast_read_msg_idx(long last_read_msg_idx) {
		this.last_read_msg_idx = last_read_msg_idx;
	}

	public long getStart_msg_idx() {
		return start_msg_idx;
	}

	public void setStart_msg_idx(long start_msg_idx) {
		this.start_msg_idx = start_msg_idx;
	}

	public long getLast_msg_idx() {
		return last_msg_idx;
	}

	public void setLast_msg_idx(long last_msg_idx) {
		this.last_msg_idx = last_msg_idx;
	}

}
