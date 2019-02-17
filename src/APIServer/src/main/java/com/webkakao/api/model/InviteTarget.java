package com.webkakao.api.model;

public class InviteTarget {

	private long to_user_idx;
	private String to_user_name;

	public long getTo_user_idx() {
		return to_user_idx;
	}

	public void setTo_user_idx(long to_user_idx) {
		this.to_user_idx = to_user_idx;
	}

	public String getTo_user_name() {
		return to_user_name;
	}

	public void setTo_user_name(String to_user_name) {
		this.to_user_name = to_user_name;
	}

}
