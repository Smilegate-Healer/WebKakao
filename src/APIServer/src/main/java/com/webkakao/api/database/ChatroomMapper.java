package com.webkakao.api.database;

import java.util.List;
import java.util.Map;

import com.webkakao.api.model.ChatroomInfo;
import com.webkakao.api.model.request.CheckInChatroom;
import com.webkakao.api.model.request.GetChatroomList;
import com.webkakao.api.model.request.RequestChatroom;

public interface ChatroomMapper {

	public void insertChatroom(RequestChatroom param);

	public void checkInChatroom(Map<String, Object> map);

	public void checkInCheckroom(CheckInChatroom param);

	public long getLastMsgIdx(long chatroom_idx);

	public List<ChatroomInfo> getChatroomList(GetChatroomList param);

}
