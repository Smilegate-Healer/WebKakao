package com.webkakao.api.model.response;

import java.util.List;

import com.webkakao.api.model.ChatroomInfo;

public class GetChatroomListParam {
	
	private List<ChatroomInfo> list;

	public List<ChatroomInfo> getList() {
		return list;
	}

	public void setList(List<ChatroomInfo> list) {
		this.list = list;
	}

}
