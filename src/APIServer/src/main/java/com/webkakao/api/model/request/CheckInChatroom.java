package com.webkakao.api.model.request;

public class CheckInChatroom {

	private long from_user_idx;
	private String from_user_name;
	private long to_user_idx;
	private String to_user_name;
	private long chatroom_idx;

	public long getFrom_user_idx() {
		return from_user_idx;
	}

	public void setFrom_user_idx(long from_user_idx) {
		this.from_user_idx = from_user_idx;
	}

	public String getFrom_user_name() {
		return from_user_name;
	}

	public void setFrom_user_name(String from_user_name) {
		this.from_user_name = from_user_name;
	}

	public long getTo_user_idx() {
		return to_user_idx;
	}

	public void setTo_user_idx(long to_user_idx) {
		this.to_user_idx = to_user_idx;
	}

	public String getTo_user_name() {
		return to_user_name;
	}

	public void setTo_user_name(String to_user_name) {
		this.to_user_name = to_user_name;
	}

	public long getChatroom_idx() {
		return chatroom_idx;
	}

	public void setChatroom_idx(long chatroom_idx) {
		this.chatroom_idx = chatroom_idx;
	}

}
