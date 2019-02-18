package com.webkakao.auth.model.request;

public class SignUp {

	private long user_idx;
	private String email;
	private String password;
	private String name;
	private String salt;

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public long getUser_idx() {
		return user_idx;
	}

	public void setUser_idx(long user_idx) {
		this.user_idx = user_idx;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
