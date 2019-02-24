package com.healer.webkakao.chatting.service;

import java.io.IOException;
import java.util.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.healer.webkakao.chatting.database.ChatroomMapper;
import com.healer.webkakao.chatting.model.mysql.Chatroom;
import com.healer.webkakao.chatting.util.MessageType;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.redisson.client.RedisClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healer.webkakao.chatting.model.ChatModel;
import com.healer.webkakao.chatting.model.ChatroomInfoModel;
import com.healer.webkakao.chatting.model.ChatsModel;
import com.healer.webkakao.chatting.repository.ChatroomInfoRedisRepository;
import com.healer.webkakao.chatting.repository.ChatsMongoRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.messaging.*;

@Service
@Slf4j
public class ChatroomService {
  private final long MAX_SIZE = 20;

  @Autowired
  private ChatroomInfoRedisRepository redisRepository;

  @Autowired
  private ChatsMongoRepository mongoRepository;

  @Autowired
  private RedisTemplate redisTemplate;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ChatroomMapper chatroomMapper;

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  @Autowired
  private RedissonClient redissonClient;


  private HashMap<String, Long> sessionidWithUserId = new HashMap<>();
  private HashMap<String, Long> sessionidWithChatroomId = new HashMap<>();

  /**
   * Update the chatroom information by chatroomId chatroomId is made by MySQL
   * objectId is made by MongoDB which is for the message block
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

  public boolean updateLastMsg(long chatroomId, long lastMsgIdx, String msg, String msg_type) {
    log.debug("Update the last message index by chatroomId=" + chatroomId);
    Optional<ChatroomInfoModel> chatroom = redisRepository.findById(chatroomId);
    if (!chatroom.isPresent()) {
      log.error("No chatroom info exist!");
      return false;
    }

    ChatroomInfoModel chatroomInfoModel = ChatroomInfoModel.builder()
            .chatroom_id(chatroomId)
            .object_id(chatroom.get().getObject_id())
            .last_msg_idx(lastMsgIdx)
            .last_msg(msg)
            .msg_type(msg_type)
            .timestamp(new Date().getTime())
            .build();

    log.debug("Save the changed chatroominfo into Redis");
    redisRepository.save(chatroomInfoModel);
    return true;
  }

  public long getLastMsgIdx(long chatroomId) {
    log.debug("Get the last message index by chatroomId=" + chatroomId);
    Optional<ChatroomInfoModel> chatroom = redisRepository.findById(chatroomId);
    return chatroom.isPresent() ? chatroom.get().getLast_msg_idx() : -1;
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
        log.debug("Get the messages from the Redis");
        List<String> strs = redisTemplate.opsForList().range(chatroomId, 0, size - 1);

        log.debug("Convert to objects");
        for (int i = 0; i < strs.size(); i++) {
          ChatModel chatModel = objectMapper.readValue(strs.get(i), ChatModel.class);
          chatModelList.add(chatModel);
        }

        // Insert new chats into Mongo
        ChatsModel nextChats = ChatsModel.builder().pre_id(chatroomInfo.getObject_id()).build();

        log.debug("Get the next objet id from Mongo");
        String surId = mongoRepository.insert(nextChats).get_id();

        // Get the existing chats from Mongo
        // It was inserted when the pre chats had been inserted
        log.debug("Gee the current document by object id where to save from Mongo");
        ChatsModel storingChats = mongoRepository.findById(chatroomInfo.getObject_id()).get();

        // Set
        storingChats.setData(chatModelList);
        storingChats.setFirst_message_idx(chatModelList.get(0).getMsg_idx());
        storingChats.setLast_message_idx(chatModelList.get(chatModelList.size() - 1).getMsg_idx());
        storingChats.setSur_id(surId);

        // Insert chats into Mongo
        log.debug("Insert chats into Mongo");
        mongoRepository.save(storingChats);

        // Update the chatroomInfo in MySQL
        log.debug("Update the chatroomInfo at MySQL");
        chatroomMapper.updateObjectIdAndLastMsgIdx(
                Chatroom.builder()
                        .chatroom_idx(chatroomInfo.getChatroom_id())
                        .last_msg_idx(storingChats.getLast_message_idx())
                        .msg_object_id(chatroomInfo.getObject_id())
                        .build()
        );

        // Update the chatroomInfo
        log.debug("Update the chatroomInfo at Redis");
        chatroomInfo.setObject_id(surId);
        chatroomInfo.setLast_msg_idx(storingChats.getLast_message_idx()); // TODO: 동기화 문제 ???
        redisRepository.save(chatroomInfo);


        // Remove the stored messages in Redis list
        log.debug("Trim the list in the Redis");
        redisTemplate.opsForList().trim(chatroomId, size, redisTemplate.opsForList().size(chatroomId)); // TODO: 동기화 문제  ???
        return true;
      } catch (IOException e) {
        log.error(e.getMessage());
        return false;
      }
    }
    return false;
  }

  public void chat(ChatModel message, long chatroomId) throws Exception {
    log.debug("Receive from a chat chatroomId=" + chatroomId);

    // TODO: Sync
    log.debug("Get lock " + this.getLockKey(chatroomId));
    RLock lock = redissonClient.getLock(this.getLockKey(chatroomId));

    log.debug("Lock " + this.getLockKey(chatroomId));
    lock.lock();
    log.debug("Locked! " + this.getLockKey(chatroomId));


    long lastMsgIdx = this.getLastMsgIdx(chatroomId);
    if (lastMsgIdx == -1) {
      log.warn("There is no chatroomInfo by chatroomId=" + chatroomId);
      lock.unlock();
      return;
    }

    log.debug("Check the message type is valid");
    MessageType.valueOf(message.getMsg_type());

    message.setMsg_idx(lastMsgIdx + 1);
    // TODO: Which time do I set???
    // TODO: what about sync time stored in Redis
    message.setTimestamp(System.currentTimeMillis());

    if(this.updateLastMsg(chatroomId, lastMsgIdx + 1, message.getMsg(), message.getMsg_type()) == false) {
      log.debug("Failed to update last msg");
      lock.unlock();
    }

    // Set the last read msg index for this user to the same with chatroom's last msg idx
    String msgStr = objectMapper.writeValueAsString(message);

    // Add the message into the List of Redis
    log.debug("Add the message into the list of Redis");
    String chatroomIdStr = String.valueOf(chatroomId);
    redisTemplate.opsForList().rightPush(chatroomIdStr, msgStr);

    this.moveToMongo(chatroomIdStr, MAX_SIZE);

    log.debug("Unlock " + this.getLockKey(chatroomId));
    lock.unlock();
    log.debug("Unlocked " + this.getLockKey(chatroomId));

    log.debug("Publish the message to Redis");
    redisTemplate.convertAndSend("chatroom/" + chatroomId, objectMapper.writeValueAsString(message)); // Send the content of the message using Pub/Sub
  }


  public ChatModel subscribe(long userId, long chatroomId, String sessionId) {
    log.debug("New subscriber=" + userId + " at " + chatroomId);
    String key = this.getJoiningKey(chatroomId);

    Set<Long> joiningMember = redisTemplate.opsForSet().members(key);
    redisTemplate.opsForSet().add(key, String.valueOf(userId));
    ChatModel ret = null;
    if (sessionidWithChatroomId.get(sessionId) == null
            || sessionidWithChatroomId.get(sessionId) == 0
            || sessionidWithChatroomId.get(sessionId) != chatroomId) {
      // New subscribe of this chatroom
      // so send all joining members list
      // and all last read msg idx by userid

      HashMap<String, Object> msg = new HashMap<>();
      msg.put("lastReadMsgIdx", redisTemplate.opsForHash().entries(this.getLastReadKey(chatroomId)));
      msg.put("joining", joiningMember);

      String msgStr = null;
      try {
        msgStr = objectMapper.writeValueAsString(msg);
      } catch (JsonProcessingException e) {
        log.error(e.getMessage());
      }

      ret = ChatModel.builder()
              .msg(msgStr)
              .msg_type("s")
              .build();
    }

    sessionidWithChatroomId.put(sessionId, chatroomId);
    sessionidWithUserId.put(sessionId, userId);

    ChatModel chat = ChatModel.builder()
            .msg_type("ns") // TODO: new subscribe type
            .msg(String.valueOf(userId))
            .build();

    try {
      redisTemplate.convertAndSend("chatroom/" + chatroomId, objectMapper.writeValueAsString(chat));
    } catch (JsonProcessingException e) {
      log.error(e.getMessage());
    }

    return ret;
  }

  public void unsubscribe(SessionUnsubscribeEvent e) {
    String key = (String) e.getMessage().getHeaders().get("simpSessionId");

    if (sessionidWithUserId.containsKey(key) && sessionidWithChatroomId.containsKey(key)) {
      long chatroomId = sessionidWithChatroomId.get(key);
      long userId = sessionidWithUserId.get(key);

      redisTemplate.opsForSet().remove(this.getJoiningKey(chatroomId), String.valueOf(userId));
      this.updateLastReadMsgIdx(chatroomId, userId);

      sessionidWithChatroomId.put(key, Long.valueOf(0));

      try {
        redisTemplate.convertAndSend("chatroom/" + chatroomId, objectMapper.writeValueAsString(ChatModel.builder()
                .msg(String.valueOf(userId))
                .msg_type("us")
                .build()));
      } catch (JsonProcessingException ex) {
        log.error(ex.getMessage());
      }
    } else {
      log.error("Request unsubscribe but no key");
    }
  }


  public void disconnect(SessionDisconnectEvent e) {
    String key = e.getSessionId();

    Long chatroomId = sessionidWithChatroomId.get(key);
    if (chatroomId == null) {
      log.error(" have to exist but not sessionId=" + key + " userId=" + sessionidWithUserId.get(key));
    } else if (chatroomId == 0) {
      log.debug("There is a user but not joining a chatroom");
    } else {
      Long userId = sessionidWithUserId.get(key);
      if (userId == null) log.error("no user found");
      else {
        this.updateLastReadMsgIdx(chatroomId, userId);

        log.debug("remove the user from Redis joining members because of disconnection");
        redisTemplate.opsForSet().remove(this.getJoiningKey(chatroomId), String.valueOf(userId));

        try {
          log.debug("Send unsub event to chatroom");
          redisTemplate.convertAndSend("chatroom/" + chatroomId, objectMapper.writeValueAsString(ChatModel.builder()
                  .msg(String.valueOf(userId))
                  .msg_type("us")
                  .build()));
        } catch (JsonProcessingException ex) {
          log.error(ex.getMessage());
        }
      }
    }

    sessionidWithUserId.remove(key);
    sessionidWithChatroomId.remove(key);
  }

  public void updateLastReadMsgIdx(long chatroomId, long userId) {
    ChatroomInfoModel info = redisRepository.findById(chatroomId).get();

    log.debug("Update last read msg idx to " + info.getLast_msg_idx() + " at chatroomId=" + chatroomId + " userId=" + userId);
    redisTemplate.opsForHash().put(this.getLastReadKey(chatroomId), String.valueOf(userId), String.valueOf(info.getLast_msg_idx()));
  }

  private String getJoiningKey(long chatroomId) {
    return "joining_" + chatroomId;
  }

  private String getLastReadKey(long chatroomId) {
    return "lastRead_" + chatroomId;
  }

  private String getLockKey(long chatroomId) { return "lock_" + chatroomId; }
}
