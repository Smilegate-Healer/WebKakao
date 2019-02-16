package com.healer.webkakao.fileserver.service;
import com.healer.webkakao.fileserver.model.FileModel;
import com.healer.webkakao.fileserver.model.request.FileUploadCompleteReqModel;
import com.healer.webkakao.fileserver.model.request.FileUploadReqModel;
import com.healer.webkakao.fileserver.response.wrapper.APIResponseWrapper;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

public interface FileService {

  String UPLOAD_FOLDER = "/Users/zeroho/Downloads/temp/";

  APIResponseWrapper uploadRequest(FileUploadReqModel req);

  APIResponseWrapper uploadRequestComplete(long fileId, FileUploadCompleteReqModel req);

  APIResponseWrapper saveFile(long fileId, MultipartFile req);

  ResponseEntity<Resource> downloadFile(long fileId);

  Path getPath(FileModel fileModel);


}
