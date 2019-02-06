package com.healer.webkakao.chatting.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healer.webkakao.chatting.model.ChatModel;
import com.healer.webkakao.chatting.model.ChatroomInfoModel;
import com.healer.webkakao.chatting.model.ChatsModel;
import com.healer.webkakao.chatting.repository.ChatroomInfoRedisRepository;
import com.healer.webkakao.chatting.repository.ChatsMongoRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChatroomService {
	public static final String REDIS_KEY = "chatroomInfo";

	@Autowired
	private ChatroomInfoRedisRepository redisRepository;

	@Autowired
	private ChatsMongoRepository mongoRepository;

	@Autowired
	private RedisTemplate redisTemplate;

	@Autowired
	private ObjectMapper objectMapper;

	/**
	 * Update the chatroom information by chatroomId chatroomId is made by MySQL
	 * objectId is made by MongoDB which is for the message block
	 *
	 *
	 * @param chatroomId
	 * @param objectId
	 * @param lastMsgIdx
	 * @return
	 */
	public boolean update(long chatroomId, String objectId, long lastMsgIdx) {
		log.debug("Update the chatroomInfo by chatroomId=" + chatroomId);
		Optional<ChatroomInfoModel> chatroom = redisRepository.findById(chatroomId);
		if (!chatroom.isPresent()) {
			return false;
		}

		ChatroomInfoModel chatroomInfoModel = ChatroomInfoModel.builder().chatroom_id(chatroomId).object_id(objectId)
				.last_msg_idx(lastMsgIdx).build();

		log.debug("Save the chatroomInfo into Redis");
		redisRepository.save(chatroomInfoModel);
		return true;
	}

	public boolean updateLastMsg(long chatroomId, long lastMsgIdx, String msg) {
		log.debug("Update the last message index by chatroomId=" + chatroomId);
		Optional<ChatroomInfoModel> chatroom = redisRepository.findById(chatroomId);
		if (!chatroom.isPresent())
			return false;

		ChatroomInfoModel chatroomInfoModel = ChatroomInfoModel.builder().chatroom_id(chatroomId)
				.object_id(chatroom.get().getObject_id()).last_msg_idx(lastMsgIdx).last_msg(msg).timestamp(new Date().getTime()).build();

		log.debug("Save the changed chatroominfo into Redis");
		redisRepository.save(chatroomInfoModel);
		return true;
	}
	//
	// public boolean addNewChatroom(long chatroomId, long objectId) {
	// log.debug("Add a new chatroom infomation by chatroomId");
	// if(redisRepository.existsById(chatroomId)) return false;
	//
	// log.debug("The new chatroomId not existed");
	// ChatroomInfoModel chatroomInfoModel = ChatroomInfoModel.builder()
	// .chatroom_id(chatroomId)
	// .object_id(objectId)
	// .last_msg_idx(1) // start from 1
	// .build();
	//
	// log.debug("Save the new chatroom infomation into the Redis");
	// redisRepository.save(chatroomInfoModel);
	// return true;
	// }

	public long getLastMsgIdx(long chatroomId) {
		log.debug("Get the last message index by chatroomId=" + chatroomId);
		Optional<ChatroomInfoModel> chatroom = redisRepository.findById(chatroomId);
		return chatroom.isPresent() ? chatroom.get().getLast_msg_idx() : 0;
	}
	
	public String getLastMsg(long chatroomId) {
		log.debug("Get the last message index by chatroomId=" + chatroomId);
		Optional<ChatroomInfoModel> chatroom = redisRepository.findById(chatroomId);
		return chatroom.isPresent() ? chatroom.get().getLast_msg() : null;
	}

	public boolean moveToMongo(String chatroomId, final long size) {
		if (redisTemplate.opsForList().size(chatroomId) >= size) {
			log.debug("Move the messages to Mongo");

			try {
				// Get the existing ChatroomInfo
				log.debug("Get the exisiting chatroomInfo chatroomId=" + chatroomId);
				ChatroomInfoModel chatroomInfo = redisRepository.findById(Long.valueOf(chatroomId)).get();
				List<ChatModel> chatModelList = new ArrayList<>();

				// Convert String to Chatmodel
				List<String> strs = redisTemplate.opsForList().range(chatroomId, 0, size - 1);
				for (int i = 0; i < strs.size(); i++) {
					ChatModel chatModel = objectMapper.readValue(strs.get(i), ChatModel.class);
					chatModelList.add(chatModel);
				}

				// Insert new chats into Mongo
				ChatsModel nextChats = ChatsModel.builder().pre_id(chatroomInfo.getObject_id()).build();
				String surId = mongoRepository.insert(nextChats).get_id();

				// Get the existing chats from Mongo
				// It was inserted when the pre chats had been inserted
				ChatsModel storingChats = mongoRepository.findById(chatroomInfo.getObject_id()).get();

				// Set
				storingChats.setData(chatModelList);
				storingChats.setFirst_message_idx(chatModelList.get(0).getMsg_idx());
				storingChats.setLast_message_idx(chatModelList.get(chatModelList.size() - 1).getMsg_idx());
				storingChats.setSur_id(surId);

				// Insert chats into Mongo
				mongoRepository.save(storingChats);

				// Update the chatroomInfo
				chatroomInfo.setObject_id(surId);
				chatroomInfo.setLast_msg_idx(storingChats.getLast_message_idx()); // TODO:
																					// 동기화
																					// 문제
																					// ???
				redisRepository.save(chatroomInfo);

				// Remove the stored messages in Redis list
				redisTemplate.opsForList().trim(chatroomId, size, redisTemplate.opsForList().size(chatroomId)); // TODO:
																												// 동기화
																												// 문제
																												// ???
				return true;
			} catch (IOException e) {
				log.error(e.getMessage());
				return false;
			}
		}

		return false;
	}

}
