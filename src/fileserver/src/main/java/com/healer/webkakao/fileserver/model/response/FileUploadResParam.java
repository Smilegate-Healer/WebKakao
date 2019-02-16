package com.healer.webkakao.fileserver.model.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FileUploadResParam {
  private String uploadUrl;
}
