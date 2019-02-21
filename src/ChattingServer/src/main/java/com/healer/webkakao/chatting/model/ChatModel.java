package com.healer.webkakao.chatting.model;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NON_PRIVATE)
@Builder
public class ChatModel {
  @JsonProperty("sender")
  private long sender;

  @JsonProperty("msg")
  private String msg;

  @JsonProperty("msg_type")
  private String msg_type;

  private long msg_idx;
  private long timestamp;

  /**
   * {
   *    userId: userid,
   *    msg: string type message,
   *    type: file, image, plain, ...
   * }
   */
}
