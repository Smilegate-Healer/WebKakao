package com.healer.webkakao.fileserver.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserModel {
  private long user_idx;
  private long profile_img;
  private long back_img;
}
