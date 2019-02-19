package com.webkakao.api.service;

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

public interface ChatroomService {

	APIResponseWrapper requestChatroom(RequestChatroom param);

	APIResponseWrapper checkInChatroom(CheckInChatroom param);

	APIResponseWrapper getChatroomList(GetChatroomList param);

	APIResponseWrapper checkOutChatroom(CheckOutChatroom param);

	APIResponseWrapper getChatroomMessage(GetChatroomMessage param);

	APIResponseWrapper updateChatroomName(UpdateChatroomName param);

	APIResponseWrapper checkInChatroomByUserList(CheckInChatroomByUserList param);

	APIResponseWrapper renameChatroom(RenameChatroom param);

	APIResponseWrapper requestChatroomWithUsers(RequestChatroomWithUsers param);

	APIResponseWrapper getChatroomScrollMessage(GetChatroomMessage param);

}
