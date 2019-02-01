package com.webkakao.model.response;

import java.util.List;

import com.webkakao.model.PollingData;

public class PollingResponse {

	// private List<PollingData> data;
	//
	// public List<PollingData> getData() {
	// return data;
	// }
	//
	// public void setData(List<PollingData> data) {
	// this.data = data;
	// }

	private long chatroom_idx;
	private long last_msg_idx;
	private String last_msg;

	public long getChatroom_idx() {
		return chatroom_idx;
	}

	public void setChatroom_idx(long chatroom_idx) {
		this.chatroom_idx = chatroom_idx;
	}

	public long getLast_msg_idx() {
		return last_msg_idx;
	}

	public void setLast_msg_idx(long last_msg_idx) {
		this.last_msg_idx = last_msg_idx;
	}

	public String getLast_msg() {
		return last_msg;
	}

	public void setLast_msg(String last_msg) {
		this.last_msg = last_msg;
	}

}
