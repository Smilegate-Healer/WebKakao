package com.healer.webkakao.chatting.database;

import com.healer.webkakao.chatting.model.mysql.Chatroom;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ChatroomMapper {
  public void updateObjectIdAndLastMsgIdx(Chatroom chatroom);
}
