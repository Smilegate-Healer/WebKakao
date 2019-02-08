package com.webkakao.api.database;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.webkakao.api.model.ChatroomInfo;
import com.webkakao.api.model.ChatroomUserList;
import com.webkakao.api.model.request.CheckInChatroom;
import com.webkakao.api.model.request.CheckOutChatroom;
import com.webkakao.api.model.request.GetChatroomList;
import com.webkakao.api.model.request.RequestChatroom;
import com.webkakao.api.model.request.UpdateChatroomName;
import com.webkakao.api.model.response.RequestChatroomParam;

@Mapper
public interface ChatroomMapper {

	public void insertChatroom(RequestChatroom param);

	public void checkInChatroom(Map<String, Object> map);

	public void checkInCheckroom(CheckInChatroom param);

	public long getLastMsgIdx(long chatroom_idx);

	public List<ChatroomInfo> getChatroomList(GetChatroomList param);

	public void checkOutChatroom(CheckOutChatroom param);

	public List<ChatroomUserList> getChatroomUserList(long user_idx);

	public String getMongoObjectId(long chatroom_idx);

	public void updateChatroomName(UpdateChatroomName param);

	public RequestChatroomParam getChatroomInfo(long chatroom_idx);

}
