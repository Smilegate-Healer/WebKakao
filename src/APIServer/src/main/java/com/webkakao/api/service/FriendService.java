package com.webkakao.api.service;

import com.webkakao.api.model.request.GetFriendList;
import com.webkakao.api.model.request.GetUserInfo;
import com.webkakao.api.model.request.RequestFriend;
import com.webkakao.api.model.request.SearchFriend;
import com.webkakao.api.model.request.UpdateFriendStatus;
import com.webkakao.api.response.wrapper.APIResponseWrapper;

public interface FriendService {

	APIResponseWrapper requestFriend(RequestFriend param);

	APIResponseWrapper searchFriend(SearchFriend param);

	APIResponseWrapper getUserInfo(GetUserInfo param);

	APIResponseWrapper updateFriendStatus(UpdateFriendStatus param);

	APIResponseWrapper getFriendList(GetFriendList param);

}
