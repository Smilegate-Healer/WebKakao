package com.webkakao.model.response;

import java.util.List;

import com.webkakao.model.PollingData;

public class PollingResponse {
	
	private List<PollingData> data;

	public List<PollingData> getData() {
		return data;
	}

	public void setData(List<PollingData> data) {
		this.data = data;
	}
	
}
