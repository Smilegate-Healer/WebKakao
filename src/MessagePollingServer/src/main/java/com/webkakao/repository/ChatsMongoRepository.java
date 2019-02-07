package com.webkakao.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.webkakao.model.database.mongo.ChatsModel;

@Repository
public interface ChatsMongoRepository extends MongoRepository<ChatsModel, String> {

}
