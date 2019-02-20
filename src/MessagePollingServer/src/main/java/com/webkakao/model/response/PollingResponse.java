package com.webkakao.model.response;

import java.util.List;

import com.webkakao.model.ChatroomUserList;

public class PollingResponse {

	private int resultCode;
	private long chatroom_idx;
	private long last_msg_idx;
	private String last_msg;
	private long timestamp;
	private long sender;
	private String msg_type;
	private Object chatroom_info;
	private List<ChatroomUserList> user_list;
	private String names;

	public String getNames() {
		return names;
	}

	public void setNames(String names) {
		this.names = names;
	}

	public String getMsg_type() {
		return msg_type;
	}

	public List<ChatroomUserList> getUser_list() {
		return user_list;
	}

	public void setUser_list(List<ChatroomUserList> user_list) {
		this.user_list = user_list;
	}

	public Object getChatroom_info() {
		return chatroom_info;
	}

	public void setChatroom_info(Object chatroom_info) {
		this.chatroom_info = chatroom_info;
	}

	public void setMsg_type(String msg_type) {
		this.msg_type = msg_type;
	}

	public long getSender() {
		return sender;
	}

	public void setSender(long sender) {
		this.sender = sender;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public int getResultCode() {
		return resultCode;
	}

	public void setResultCode(int resultCode) {
		this.resultCode = resultCode;
	}

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
