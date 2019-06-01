package com.healer.webkakao.fileserver.service.impl;
import com.healer.webkakao.fileserver.database.FileMapper;
import com.healer.webkakao.fileserver.model.FileModel;
import com.healer.webkakao.fileserver.model.request.FileUploadCompleteReqModel;
import com.healer.webkakao.fileserver.model.request.FileUploadReqModel;
import com.healer.webkakao.fileserver.model.response.FileUploadResParam;
import com.healer.webkakao.fileserver.response.wrapper.APIResponseWrapper;
import com.healer.webkakao.fileserver.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service("fileService")
@Slf4j
public class FileServiceImpl implements FileService {

  @Value("${directoryPath}")
  private String UPLOAD_FOLDER;

  @Autowired
  private FileMapper fileMapper;

  @Override
  public APIResponseWrapper uploadRequest(FileUploadReqModel req) {
    // insert a new file  information into mysql
    req.setData_url(req.getSender_idx() + "_" + System.currentTimeMillis());
    fileMapper.addNew(req);

    // return url
    return APIResponseWrapper.builder()
            .param(FileUploadResParam.builder()
                    .uploadUrl("/file/" + req.getFile_idx())
                    .build())
            .message("Upload request success")
            .resultCode(0)
            .build();
  }

  @Override
  public APIResponseWrapper saveFile(long fileId, MultipartFile req) {
    // Get data url
    log.debug("Get file metadata from MySQL by fileid=" + fileId);

    FileModel fileModel = fileMapper.getInfo(fileId);

    if(fileModel.isUploaded()) {
      return APIResponseWrapper.builder()
              .message("Already uploaded")
              .resultCode(1) // TODO: Define result code
              .param(null)
              .build();
    }

    // save to local
    try {
      log.debug("Get data from the file");
      byte[] data = req.getBytes();

      log.debug("Get path");
      Path path = this.getPath(fileModel);

      log.debug("Write the file at " + path.toString());
      if(!Files.exists(path.getParent())) {

        log.debug("The first file in this chatroom");
        Files.createDirectory(path.getParent());
      }

      Files.write(path, data);

      // if successfully uploaded => set uploaded to true in mysql
      fileMapper.updateUploaded(fileId);

      return APIResponseWrapper.builder()
              .resultCode(0)
              .message("Successfully upload your file")
              .param(null)
              .build();

    } catch (IOException e) {
      log.error(e.getMessage());
      return APIResponseWrapper.builder()
              .param(null)
              .message("Fail storing file in the server, IOException occured")
              .resultCode(1) // TODO: Define error codes
              .build();
    }
  }

  @Override
  public ResponseEntity<Resource> downloadFile(long fileId) {
    log.debug("Download file request fileId=" + fileId);
    FileModel fileModel = fileMapper.getInfo(fileId);

    try {
      Path path = this.getPath(fileModel);
      Resource resource = new UrlResource(path.toUri());

      if(resource.exists() == false) throw new Exception("No resource");

      String contentType = URLConnection.getFileNameMap().getContentTypeFor(fileModel.getOrigin_name());
      if(contentType == null) contentType = MediaType.MULTIPART_FORM_DATA_VALUE;


      return ResponseEntity.ok()
              .contentType(MediaType.valueOf(contentType))
              .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileModel.getOrigin_name() + "\"")
              .body(resource);

    } catch(Exception e) {
      log.error(e.getMessage());
      return ResponseEntity.ok()
              .body(null); // TODO: error response
    }
  }

  @Override
  public APIResponseWrapper uploadRequestComplete(long fileId, FileUploadCompleteReqModel req) {
    log.debug("Set file upload request complete");
    FileModel file = fileMapper.getInfo(fileId);

    if(file.isUploaded() == false) {
      log.debug("Upload complete request but the file is not wrote yet");
      return APIResponseWrapper.builder()
              .param(null)
              .resultCode(1)
              .message("The file is not completely wrote in the server")
              .build();
    }

    if(file.getMsg_idx() != 0) {
      log.debug("Already upload process is completely done but request again");
      return APIResponseWrapper.builder()
              .param(null)
              .resultCode(1) // TODO:
              .message("This upload is already completed")
              .build();
    }

//    log.debug("Update file msg idx");
//    fileMapper.updateMsgIdx(fileId, req.getMsg_idx());
    return APIResponseWrapper.builder()
            .resultCode(0)
            .param(null)
            .message("Success")
            .build();
  }

  @Override
  public Path getPath(FileModel fileModel) {
    return Paths.get(UPLOAD_FOLDER + fileModel.getChatroom_idx() + "/" + fileModel.getData_url());
  }

}
