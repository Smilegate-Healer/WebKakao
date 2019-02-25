package com.healer.webkakao.fileserver.model;

import lombok.*;

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
