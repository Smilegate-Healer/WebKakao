package com.webkakao.api.model.response;

public class RenameChatroomParam {

	private long chatroom_idx;
	private String chatroom_name;

	public long getChatroom_idx() {
		return chatroom_idx;
	}

	public void setChatroom_idx(long chatroom_idx) {
		this.chatroom_idx = chatroom_idx;
	}

	public String getChatroom_name() {
		return chatroom_name;
	}

	public void setChatroom_name(String chatroom_name) {
		this.chatroom_name = chatroom_name;
	}
	
}
