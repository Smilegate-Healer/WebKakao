package com.healer.webkakao.fileserver.response.wrapper;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class APIResponseWrapper {

  int resultCode;
  String message;
  Object param;
}
