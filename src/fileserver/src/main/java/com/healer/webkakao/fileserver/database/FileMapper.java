package com.healer.webkakao.fileserver.database;

import com.healer.webkakao.fileserver.model.FileModel;
import com.healer.webkakao.fileserver.model.request.FileUploadReqModel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface FileMapper {
  void addNew(FileUploadReqModel model);
  boolean updateUploaded(@Param("fileId") long fileId);
  FileModel getInfo(@Param("fileId") long fileId);
}
