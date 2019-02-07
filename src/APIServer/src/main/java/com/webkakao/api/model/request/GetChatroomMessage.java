package com.webkakao.api.model.request;

public class GetChatroomMessage {
	
	private long chatroom_idx;
	private String object_id;
	public long getChatroom_idx() {
		return chatroom_idx;
	}
	public void setChatroom_idx(long chatroom_idx) {
		this.chatroom_idx = chatroom_idx;
	}
	public String getObject_id() {
		return object_id;
	}
	public void setObject_id(String object_id) {
		this.object_id = object_id;
	}

}
