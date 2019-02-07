package com.webkakao.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PollingData {

	private long last_msg_idx;
	private String last_msg;

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
