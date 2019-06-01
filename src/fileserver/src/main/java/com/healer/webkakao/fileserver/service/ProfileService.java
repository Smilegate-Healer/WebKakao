package com.healer.webkakao.fileserver.service;

import com.healer.webkakao.fileserver.response.wrapper.APIResponseWrapper;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {

  APIResponseWrapper saveProfileImageAndUpdate(long userId, MultipartFile image);

  ResponseEntity<Resource> getProfileImage(long userId);

  ResponseEntity<Resource> getProfileImageById(long profileId);

  ResponseEntity<Resource> getImageRes(String url);

  APIResponseWrapper getProfilesList(long userId);


}
