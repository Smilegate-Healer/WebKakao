package com.healer.webkakao.chatting.util;

import lombok.Getter;
import lombok.Setter;

@Getter
public enum MessageType {
  m("message"), p("photo"), v("video"), f("file"), i("invite"), e("exit");

  final private String type;

  MessageType(String type) {
    this.type = type;
  }
}
