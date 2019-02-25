package com.healer.webkakao.fileserver.controller;

import com.healer.webkakao.fileserver.model.request.FileUploadReqModel;
import com.healer.webkakao.fileserver.response.wrapper.APIResponseWrapper;
import com.healer.webkakao.fileserver.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@Slf4j
@RequestMapping("/file")
public class FileController {

  @Autowired
  private FileService fileService;

  @RequestMapping(value = "/{fileId}", method = RequestMethod.POST)
  public APIResponseWrapper uploadSingleFile(@RequestParam("file") MultipartFile file,
                                             @PathVariable long fileId) {
    // TODO: User authentication
    return fileService.saveFile(fileId, file);
  }

  @RequestMapping(value = "/{fileId}", method = RequestMethod.GET)
  public ResponseEntity<Resource> downloadSingleFile(@PathVariable long fileId) {
    // TODO: User authentication

    return fileService.downloadFile(fileId);
  }

  @RequestMapping(method = RequestMethod.POST, value = "/upload")
  public APIResponseWrapper uploadRequest(@RequestBody FileUploadReqModel req) {
    return fileService.uploadRequest(req);
  }

}
