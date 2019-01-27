package com.healer.webkakao.chatting.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Document(collection = "chats")
@JsonAutoDetect
@Builder
public class ChatsModel {

  @Id
  private String _id;

  private List<ChatModel> data; // THe list of messages
  private long first_message_idx;
  private long last_message_idx;
  private String pre_id; // pre message block
  private String sur_id; // next message block
}
