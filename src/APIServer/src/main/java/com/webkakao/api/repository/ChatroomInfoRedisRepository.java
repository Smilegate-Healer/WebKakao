package com.webkakao.api.repository;

import org.springframework.context.annotation.AdviceMode;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.webkakao.api.model.redis.ChatroomInfoModel;

@Repository
@EnableTransactionManagement(proxyTargetClass = true, mode = AdviceMode.ASPECTJ)
public interface  ChatroomInfoRedisRepository extends CrudRepository<ChatroomInfoModel, Long>  {

}
