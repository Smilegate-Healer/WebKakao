package com.healer.webkakao.fileserver.model;

import lombok.Data;

@Data
public class FileModel {
  private long file_idx;
  private long sender_idx;
  private long chatroom_idx;
  private long msg_idx;
  private String timestamp;
  private String data_url;
  private boolean uploaded;
  private String origin_name;
}
