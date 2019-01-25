package com.healer.webkakao.chatting.model;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NON_PRIVATE)
public class ChatModel {
  @JsonProperty("userId")
  private String userId;

  @JsonProperty("msg")
  private String msg;

  @JsonProperty("type")
  private String type;

  /**
   * {
   *    userId: userid,
   *    msg: string type message,
   *    type: file, image, plain, ...
   * }
   */
}
