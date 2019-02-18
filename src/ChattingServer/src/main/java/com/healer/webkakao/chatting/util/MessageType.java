package com.healer.webkakao.chatting.util;

import lombok.Getter;
import lombok.Setter;

@Getter
public enum MessageType {
  m("message"), p("photo"), v("video"), f("file");

  final private String type;

  MessageType(String type) {
    this.type = type;
  }
}
