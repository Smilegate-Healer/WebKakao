package com.webkakao.api.database;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.webkakao.api.model.FriendInfo;
import com.webkakao.api.model.request.RequestFriend;
import com.webkakao.api.model.request.UpdateFriendStatus;
import com.webkakao.api.model.response.GetUserInfoParam;
import com.webkakao.api.model.response.RequestFriendParam;
import com.webkakao.api.model.response.SearchFriendParam;

@Mapper
public interface FriendMapper {

	public void insertFriend(RequestFriend param);

	public RequestFriendParam getFriendInfo(long to_user_idx);

	public SearchFriendParam searchFriend(String value);

	public GetUserInfoParam getUserInfo(long user_idx);

	public void updateFriendStatus(UpdateFriendStatus param);

	public List<FriendInfo> getFriendList(long user_idx);
	
}
