package com.webkakao.api.model.request;

public class CheckOutChatroom {

	private long user_idx;
	private long chatroom_idx;

	public long getUser_idx() {
		return user_idx;
	}

	public void setUser_idx(long user_idx) {
		this.user_idx = user_idx;
	}

	public long getChatroom_idx() {
		return chatroom_idx;
	}

	public void setChatroom_idx(long chatroom_idx) {
		this.chatroom_idx = chatroom_idx;
	}

}
