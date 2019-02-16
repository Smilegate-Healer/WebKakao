package com.healer.webkakao.fileserver.model;

import lombok.*;
import sun.java2d.cmm.Profile;

import javax.websocket.server.ServerEndpoint;
import java.security.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileModel {

  private long id;
  private long user_idx;
  private String url;
  private long timestamp;
  private boolean state;
}
