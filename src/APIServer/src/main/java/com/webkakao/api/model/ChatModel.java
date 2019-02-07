package com.webkakao.api.model;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NON_PRIVATE)
public class ChatModel {
  @JsonProperty("sender")
  private String sender;

  @JsonProperty("msg")
  private String msg;

  @JsonProperty("msg_type")
  private String msg_type;

  private long msg_idx = 0;
  private long timestamp = 0;

  /**
   * {
   *    userId: userid,
   *    msg: string type message,
   *    type: file, image, plain, ...
   * }
   */
}
