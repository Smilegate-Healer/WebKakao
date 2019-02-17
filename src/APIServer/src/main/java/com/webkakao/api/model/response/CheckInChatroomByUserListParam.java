package com.webkakao.api.model.response;

public class CheckInChatroomByUserListParam {

	private long last_read_msg_idx;
	private long start_msg_idx;
	
	public long getLast_read_msg_idx() {
		return last_read_msg_idx;
	}
	public void setLast_read_msg_idx(long last_read_msg_idx) {
		this.last_read_msg_idx = last_read_msg_idx;
	}
	public long getStart_msg_idx() {
		return start_msg_idx;
	}
	public void setStart_msg_idx(long start_msg_idx) {
		this.start_msg_idx = start_msg_idx;
	}
	
}
