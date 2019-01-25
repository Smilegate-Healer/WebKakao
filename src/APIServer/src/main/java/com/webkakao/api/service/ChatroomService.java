package com.webkakao.api.service;

import com.webkakao.api.model.request.CheckInChatroom;
import com.webkakao.api.model.request.CheckOutChatroom;
import com.webkakao.api.model.request.GetChatroomList;
import com.webkakao.api.model.request.RequestChatroom;
import com.webkakao.api.response.wrapper.APIResponseWrapper;

public interface ChatroomService {

	APIResponseWrapper requestChatroom(RequestChatroom param);

	APIResponseWrapper checkInChatroom(CheckInChatroom param);

	APIResponseWrapper getChatroomList(GetChatroomList param);

	APIResponseWrapper checkOutChatroom(CheckOutChatroom param);

}
