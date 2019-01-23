package com.webkakao.api.model.request;

public class UpdateFriendStatus {

	private long from_user_idx;
	private long to_user_idx;
	private int state;
	
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
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	
}
