package com.webkakao.api.model.request;

public class RequestChatroom {

	private long chatroom_idx;
	private long from_user_idx;
	private long to_user_idx;

	public long getFrom_user_idx() {
		return from_user_idx;
	}

	public void setFrom_user_idx(long from_user_idx) {
		this.from_user_idx = from_user_idx;
	}

	public long getTo_user_idx() {
		return to_user_idx;
	}

	public void setTo_user_idx(long to_user_idx) {
		this.to_user_idx = to_user_idx;
	}

	public long getChatroom_idx() {
		return chatroom_idx;
	}

	public void setChatroom_idx(long chatroom_idx) {
		this.chatroom_idx = chatroom_idx;
	}

}
