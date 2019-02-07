package com.webkakao.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.webkakao.model.database.mongo.ChatroomInfoModel;

@Repository
public interface  ChatroomInfoRedisRepository extends CrudRepository<ChatroomInfoModel, Long>  {

}
