package com.webkakao.api.model.request;

import java.util.List;

public class RequestChatroomWithUsers {

	private long chatroom_idx;
	private long from_user_idx;
	private List<Long> to_user_idx;
	private String msg_object_id;

	public long getFrom_user_idx() {
		return from_user_idx;
	}

	public void setFrom_user_idx(long from_user_idx) {
		this.from_user_idx = from_user_idx;
	}

	public String getMsg_object_id() {
		return msg_object_id;
	}

	public void setMsg_object_id(String msg_object_id) {
		this.msg_object_id = msg_object_id;
	}

	public List<Long> getTo_user_idx() {
		return to_user_idx;
	}

	public void setTo_user_idx(List<Long> to_user_idx) {
		this.to_user_idx = to_user_idx;
	}

	public long getChatroom_idx() {
		return chatroom_idx;
	}

	public void setChatroom_idx(long chatroom_idx) {
		this.chatroom_idx = chatroom_idx;
	}

}
