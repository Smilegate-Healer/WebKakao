package com.webkakao.model.database;

import java.util.Date;

public class Message {

	private long sender;
	private long date;
	private String msg;
	private char msg_type;

	public long getSender() {
		return sender;
	}

	public void setSender(long sender) {
		this.sender = sender;
	}

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public char getMsg_type() {
		return msg_type;
	}

	public void setMsg_type(char msg_type) {
		this.msg_type = msg_type;
	}

}
