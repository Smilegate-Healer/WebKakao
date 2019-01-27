package com.healer.webkakao.chatting.repository;

import com.healer.webkakao.chatting.model.ChatsModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatsMongoRepository extends MongoRepository<ChatsModel, String> {

}
