package com.webkakao.database;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.webkakao.model.database.mongo.MongoObject;

public interface MessageRepository extends MongoRepository<MongoObject, String> {
	
//	public MongoObject findByFirstName(String firstName);
    public List<MongoObject> findAll();
 
}