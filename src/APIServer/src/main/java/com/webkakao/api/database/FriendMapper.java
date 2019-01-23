package com.webkakao.api.database;

import java.util.List;

import com.webkakao.api.model.FriendInfo;
import com.webkakao.api.model.request.RequestFriend;
import com.webkakao.api.model.request.UpdateFriendStatus;
import com.webkakao.api.model.response.GetFriendListParam;
import com.webkakao.api.model.response.GetUserInfoParam;
import com.webkakao.api.model.response.RequestFriendParam;

public interface FriendMapper {

	public void insertFriend(RequestFriend param);

	public RequestFriendParam getFriendInfo(long to_user_idx);

	public RequestFriendParam searchFriend(String email);

	public GetUserInfoParam getUserInfo(long l);

	public void updateFriendStatus(UpdateFriendStatus param);

	public List<FriendInfo> getFriendList(long user_idx);
	
}
