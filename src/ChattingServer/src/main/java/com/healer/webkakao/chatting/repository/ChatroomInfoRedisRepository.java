package com.healer.webkakao.chatting.repository;

import com.healer.webkakao.chatting.model.ChatroomInfoModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  ChatroomInfoRedisRepository extends CrudRepository<ChatroomInfoModel, Long>  {

}
