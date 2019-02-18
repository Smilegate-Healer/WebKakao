package com.healer.webkakao.fileserver.model.request;

import lombok.Data;

@Data
public class FileUploadReqModel {
  private long file_idx;
  private long sender_idx;
  private long chatroom_idx;
  private String fileType;
  private String data_url;
  private String origin_name;
}
