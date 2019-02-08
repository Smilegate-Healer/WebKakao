package com.webkakao.model.request;

public class PollingRequest {
	
	private long user_idx;
	
	public long getUser_idx() {
		return user_idx;
	}

	public void setUser_idx(long user_idx) {
		this.user_idx = user_idx;
	}

	private long[] rooms;

	public long[] getRooms() {
		return rooms;
	}

	public void setRooms(long[] rooms) {
		this.rooms = rooms;
	}

}
