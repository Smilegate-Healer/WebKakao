package com.webkakao.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webkakao.api.database.FriendMapper;
import com.webkakao.api.model.FriendInfo;
import com.webkakao.api.model.request.GetFriendList;
import com.webkakao.api.model.request.GetUserInfo;
import com.webkakao.api.model.request.RequestFriend;
import com.webkakao.api.model.request.SearchFriend;
import com.webkakao.api.model.request.UpdateFriendStatus;
import com.webkakao.api.model.response.GetFriendListParam;
import com.webkakao.api.model.response.GetUserInfoParam;
import com.webkakao.api.model.response.RequestFriendParam;
import com.webkakao.api.response.wrapper.APIResponseWrapper;
import com.webkakao.api.service.FriendService;

@Service("friendService")
public class FriendServiceImpl implements FriendService {

	@Autowired
	private FriendMapper friendMapper;

	public APIResponseWrapper createWrapper() {

		APIResponseWrapper response = new APIResponseWrapper();
		response.setResultCode(0);
		response.setMessage("success");
		return response;

	}

	@Override
	public APIResponseWrapper requestFriend(RequestFriend param) {

		APIResponseWrapper wrapper = createWrapper();
		RequestFriendParam resultParam = null;
		
		try {
			friendMapper.insertFriend(param);
			resultParam = friendMapper.getFriendInfo(param.getTo_user_idx());
			
		} catch (Exception e) {
			wrapper.setResultCode(101);
			wrapper.setMessage("Insert Error");
			return wrapper;
		}
		
		if(resultParam != null) {
			wrapper.setParam(resultParam);
		} 
		
		wrapper.setParam(resultParam);
		
		return wrapper;
		
	}

	@Override
	public APIResponseWrapper searchFriend(SearchFriend param) {
		
		APIResponseWrapper wrapper = createWrapper();

		RequestFriendParam resultParam = friendMapper.searchFriend(param.getUser_email());
		
		if(resultParam != null) {
			wrapper.setParam(resultParam);
		} else {
			wrapper.setResultCode(102);
			wrapper.setMessage("Invalid User");
		}

		return wrapper;
		
	}

	@Override
	public APIResponseWrapper getUserInfo(GetUserInfo param) {
		
		APIResponseWrapper wrapper = createWrapper();

		GetUserInfoParam resultParam = friendMapper.getUserInfo(param.getUser_idx());
		
		if(resultParam != null) {
			wrapper.setParam(resultParam);
		} else {
			wrapper.setResultCode(103);
			wrapper.setMessage("Invalid User");
		}

		return wrapper;
		
	}

	@Override
	public APIResponseWrapper updateFriendStatus(UpdateFriendStatus param) {
		
		APIResponseWrapper wrapper = createWrapper();

		friendMapper.updateFriendStatus(param);
		
		return wrapper;
		
	}

	@Override
	public APIResponseWrapper getFriendList(GetFriendList param) {
		
		APIResponseWrapper wrapper = createWrapper();

		List<FriendInfo> list = friendMapper.getFriendList(param.getUser_idx());
		
		GetFriendListParam resultParam = new GetFriendListParam(); 
		resultParam.setList(list);

		wrapper.setParam(resultParam);
		
		return wrapper;
	}

}
