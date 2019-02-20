package com.webkakao.database;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.webkakao.model.ChatroomInfo;
import com.webkakao.model.ChatroomUserList;

@Mapper
public interface ChatroomMapper {

	ChatroomInfo getChatroomInfo(Map<String, Object> map);
	
	List<ChatroomUserList> getChatroomUserList(long chatroom_idx);

	String getUserName(long user_idx);

}
