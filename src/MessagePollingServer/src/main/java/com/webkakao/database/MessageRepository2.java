package com.webkakao.database;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.webkakao.model.database.mongo.Msg;

public interface MessageRepository2 extends MongoRepository<Msg, String> {
	
//	public MongoObject findByFirstName(String firstName);
    public List<Msg> findAll();
 
}