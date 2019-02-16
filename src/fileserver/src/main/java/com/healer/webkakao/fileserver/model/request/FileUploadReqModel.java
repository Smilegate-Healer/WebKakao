package com.healer.webkakao.fileserver.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FileUploadReqModel {
  private long file_idx;
  private long sender_idx;
  private long chatroom_idx;
  private String fileType;
  private String data_url;
  private String origin_name;
}
