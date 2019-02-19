package com.webkakao.api.model.request;

public class GetChatroomMessage {

	private long chatroom_idx;
	private long user_idx;
	private long last_read_msg_idx;
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

	public long getUser_idx() {
		return user_idx;
	}

	public void setUser_idx(long user_idx) {
		this.user_idx = user_idx;
	}
	
	public long getLast_read_msg_idx() {
		return last_read_msg_idx;
	}

	public void setLast_read_msg_idx(long last_read_msg_idx) {
		this.last_read_msg_idx = last_read_msg_idx;
	}

}
