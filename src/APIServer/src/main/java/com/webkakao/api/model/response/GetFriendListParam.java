package com.webkakao.api.model.response;

import java.util.List;

import com.webkakao.api.model.FriendInfo;

public class GetFriendListParam {

	private List<FriendInfo> list;

	public List<FriendInfo> getList() {
		return list;
	}

	public void setList(List<FriendInfo> list) {
		this.list = list;
	}

}
