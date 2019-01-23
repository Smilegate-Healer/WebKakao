package com.webkakao.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.webkakao.api.model.Chatroom;
import com.webkakao.api.model.request.ChatRoomList;
import com.webkakao.api.model.response.GetChatroomListResponse;
import com.webkakao.api.response.wrapper.APIResponseWrapper;

@Controller
@CrossOrigin
@RequestMapping("/api/chatroom") 
public class FriendController {

	@RequestMapping(value = "/request", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> test(@RequestBody ChatRoomList requestBody) {
		
		APIResponseWrapper response = new APIResponseWrapper();
		response.setResultCode(0);
		
		GetChatroomListResponse param = new GetChatroomListResponse();
		List<Chatroom> list = new ArrayList<Chatroom>();
		Chatroom room = new Chatroom();
		room.setChatroom_idx(1l);
		room.setLast_read_msg_idx(10l);
		room.setStart_msg_idx(1l);
		list.add(room);
		param.setList(list);
		response.setParam(param);
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
}
