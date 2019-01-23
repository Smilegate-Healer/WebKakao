package com.webkakao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.webkakao.database.MessageRepository;
import com.webkakao.database.MessageRepository2;
import com.webkakao.model.database.mongo.MongoObject;
import com.webkakao.model.database.mongo.Msg;

@SpringBootApplication
public class MessagePollingServerApplication implements CommandLineRunner{
	
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private MessageRepository2 messageRepository2;

	public static void main(String[] args) {
		SpringApplication.run(MessagePollingServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		Optional<MongoObject> mongoObject = messageRepository.findById("5c46ba507d152a16a7d5dfb3");
		Optional<Msg> msg = messageRepository2.findById("5c46ba507d152a16a7d5dfb3");
		List<MongoObject> list = messageRepository.findAll();
		MongoObject o = mongoObject.get();
		Msg o2 = msg.get();
		messageRepository.findAll();
		
		System.out.println(mongoObject);
	}

	
}

