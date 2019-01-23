package com.webkakao.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.webkakao.api.model.request.GetFriendList;
import com.webkakao.api.model.request.GetUserInfo;
import com.webkakao.api.model.request.RequestFriend;
import com.webkakao.api.model.request.SearchFriend;
import com.webkakao.api.model.request.UpdateFriendStatus;
import com.webkakao.api.response.wrapper.APIResponseWrapper;
import com.webkakao.api.service.FriendService;

@Controller
@CrossOrigin
@RequestMapping(value = {"/api/friend", "/api/user"}) 
public class FriendController {
	
	@Autowired
	private FriendService friendService;

	@RequestMapping(value = "/request", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> requestFriend(@RequestBody RequestFriend param) {
		
		APIResponseWrapper response = friendService.requestFriend(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> searchFriend(@RequestBody SearchFriend param) {
		
		APIResponseWrapper response = friendService.searchFriend(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/info", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> getUserInfo(@RequestBody GetUserInfo param) {
		
		APIResponseWrapper response = friendService.getUserInfo(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/info", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> updateFriendStatus(@RequestBody UpdateFriendStatus param) {
		
		APIResponseWrapper response = friendService.updateFriendStatus(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> getFriendList(@RequestBody GetFriendList param) {
		
		APIResponseWrapper response = friendService.getFriendList(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	
}
