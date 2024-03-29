package com.webkakao.api.model.response;

public class RequestChatroomParam {

	private long chatroom_idx;
	private long start_msg_idx;
	private long last_msg_idx;
	private long last_read_msg_idx;
	private String chatroom_name;
	private String logo;
	private String last_msg;
	private long timestamp;

	public long getChatroom_idx() {
		return chatroom_idx;
	}

	public void setChatroom_idx(long chatroom_idx) {
		this.chatroom_idx = chatroom_idx;
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

	public long getLast_read_msg_idx() {
		return last_read_msg_idx;
	}

	public void setLast_read_msg_idx(long last_read_msg_idx) {
		this.last_read_msg_idx = last_read_msg_idx;
	}

	public String getChatroom_name() {
		return chatroom_name;
	}

	public void setChatroom_name(String chatroom_name) {
		this.chatroom_name = chatroom_name;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getLast_msg() {
		return last_msg;
	}

	public void setLast_msg(String last_msg) {
		this.last_msg = last_msg;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

}
