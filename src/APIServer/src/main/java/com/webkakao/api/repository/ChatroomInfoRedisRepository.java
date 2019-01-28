package com.webkakao.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.webkakao.api.model.redis.ChatroomInfoModel;

@Repository
public interface  ChatroomInfoRedisRepository extends CrudRepository<ChatroomInfoModel, Long>  {

}
