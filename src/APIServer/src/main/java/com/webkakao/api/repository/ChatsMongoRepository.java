package com.webkakao.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.webkakao.api.model.ChatsModel;


@Repository
public interface ChatsMongoRepository extends MongoRepository<ChatsModel, String> {

}
