package com.webkakao.model.database.mongo;

import java.util.List;

import com.webkakao.model.database.Message;

public class MongoObject {
	
	private String _id;
	private List<Message> data;
	private long first_message_idx;
	private long last_message_idx;
	private String sur_id;
	private String pre_id;
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public List<Message> getData() {
		return data;
	}
	public void setData(List<Message> data) {
		this.data = data;
	}
	public long getFirst_message_idx() {
		return first_message_idx;
	}
	public void setFirst_message_idx(long first_message_idx) {
		this.first_message_idx = first_message_idx;
	}
	public long getLast_message_idx() {
		return last_message_idx;
	}
	public void setLast_message_idx(long last_message_idx) {
		this.last_message_idx = last_message_idx;
	}
	public String getSur_id() {
		return sur_id;
	}
	public void setSur_id(String sur_id) {
		this.sur_id = sur_id;
	}
	public String getPre_id() {
		return pre_id;
	}
	public void setPre_id(String pre_id) {
		this.pre_id = pre_id;
	}
	
	

}
