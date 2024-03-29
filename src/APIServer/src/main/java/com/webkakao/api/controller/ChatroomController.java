package com.webkakao.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.webkakao.api.model.request.CheckInChatroom;
import com.webkakao.api.model.request.CheckInChatroomByUserList;
import com.webkakao.api.model.request.CheckOutChatroom;
import com.webkakao.api.model.request.GetChatroomList;
import com.webkakao.api.model.request.GetChatroomMessage;
import com.webkakao.api.model.request.RenameChatroom;
import com.webkakao.api.model.request.RequestChatroom;
import com.webkakao.api.model.request.RequestChatroomWithUsers;
import com.webkakao.api.model.request.UpdateChatroomName;
import com.webkakao.api.response.wrapper.APIResponseWrapper;
import com.webkakao.api.service.ChatroomService;

@Controller
@CrossOrigin
@RequestMapping("/api/chatroom") 
public class ChatroomController {

	@Autowired
	private ChatroomService chatroomService;
	
	@RequestMapping(value = "/request", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> requestChatroom(@RequestBody RequestChatroom param) {
		
		APIResponseWrapper response = chatroomService.requestChatroom(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/request/users", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> requestChatroomWithUsers(@RequestBody RequestChatroomWithUsers param) {
		
		APIResponseWrapper response = chatroomService.requestChatroomWithUsers(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/checkin", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> checkInChatroom(@RequestBody CheckInChatroom param) {
		
		APIResponseWrapper response = chatroomService.checkInChatroom(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/checkin/users", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> checkInChatroomByUserList(@RequestBody CheckInChatroomByUserList param) {
		
		APIResponseWrapper response = chatroomService.checkInChatroomByUserList(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/rename", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> renameChatroom(@RequestBody RenameChatroom param) {
		
		APIResponseWrapper response = chatroomService.renameChatroom(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/checkout", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> checkInChatroom(@RequestBody CheckOutChatroom param) {
		
		APIResponseWrapper response = chatroomService.checkOutChatroom(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/message", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> getChatroomMessage(@RequestBody GetChatroomMessage param) {
		
		APIResponseWrapper response = chatroomService.getChatroomMessage(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/message/scroll", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> getChatroomScroolMessage(@RequestBody GetChatroomMessage param) {
		
		APIResponseWrapper response = chatroomService.getChatroomScrollMessage(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> getChatroomList(@RequestBody GetChatroomList param) {
		
		APIResponseWrapper response = chatroomService.getChatroomList(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/name", method = RequestMethod.POST)
	public ResponseEntity<APIResponseWrapper> updateChatroomName(@RequestBody UpdateChatroomName param) {
		
		APIResponseWrapper response = chatroomService.updateChatroomName(param);
		
		return new ResponseEntity<APIResponseWrapper>(response, HttpStatus.OK);
		
	}
	
}
