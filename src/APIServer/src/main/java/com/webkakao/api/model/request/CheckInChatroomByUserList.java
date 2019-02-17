package com.webkakao.api.model.request;

import java.util.List;

import com.webkakao.api.model.InviteTarget;

public class CheckInChatroomByUserList {

	private long from_user_idx;
	private String from_user_name;
	private List<InviteTarget> to_user_list;
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

	public List<InviteTarget> getTo_user_list() {
		return to_user_list;
	}

	public void setTo_user_list(List<InviteTarget> to_user_list) {
		this.to_user_list = to_user_list;
	}

	public long getChatroom_idx() {
		return chatroom_idx;
	}

	public void setChatroom_idx(long chatroom_idx) {
		this.chatroom_idx = chatroom_idx;
	}

}
