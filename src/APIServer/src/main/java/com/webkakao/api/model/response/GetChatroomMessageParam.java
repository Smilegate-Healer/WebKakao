package com.webkakao.api.model.response;

import java.util.List;

import com.webkakao.api.model.ChatModel;

public class GetChatroomMessageParam {

	private List<ChatModel> data;

	private String pre_object_id;

	public List<ChatModel> getData() {
		return data;
	}

	public void setData(List<ChatModel> data) {
		this.data = data;
	}

	public String getPre_object_id() {
		return pre_object_id;
	}

	public void setPre_object_id(String pre_object_id) {
		this.pre_object_id = pre_object_id;
	}

}
