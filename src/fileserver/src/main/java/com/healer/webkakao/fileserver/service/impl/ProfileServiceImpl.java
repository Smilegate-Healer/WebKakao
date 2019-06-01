package com.healer.webkakao.fileserver.service.impl;
import com.healer.webkakao.fileserver.database.ProfileMapper;
import com.healer.webkakao.fileserver.database.UserMapper;
import com.healer.webkakao.fileserver.model.ProfileModel;
import com.healer.webkakao.fileserver.model.UserModel;
import com.healer.webkakao.fileserver.response.wrapper.APIResponseWrapper;
import com.healer.webkakao.fileserver.service.ProfileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service("profileService")
@Slf4j
public class ProfileServiceImpl implements ProfileService {

  @Value("${directoryPath}/profiles")
  private String ROOT;

  @Autowired
  private ProfileMapper profileMapper;

  @Autowired
  private UserMapper userMapper;

  @Override
  public APIResponseWrapper saveProfileImageAndUpdate(long userId, MultipartFile image) {
    log.debug("Save image");

    String contentType = image.getContentType();
    if(contentType == null || !(
            contentType.equals(MediaType.IMAGE_JPEG_VALUE) ||
                    contentType.equals(MediaType.IMAGE_PNG_VALUE))) {
      return APIResponseWrapper.builder()
              .resultCode(1) // TODO: Define
              .param(null)
              .message("You can upload only JPEG or PNG")
              .build();
    }


    try {
      log.debug("Get data from the image");
      byte[] data = image.getBytes();

      log.debug("Get path");
      String url = userId + "_" +
              System.currentTimeMillis() +
              image.getOriginalFilename().substring(image.getOriginalFilename().lastIndexOf('.'));
      Path path = Paths.get(ROOT + url);
      log.debug("Write the image to " + path.toString());
      Files.write(path, data);

      ProfileModel model = ProfileModel.builder()
              .url(url)
              .user_idx(userId)
              .build();

      log.debug("Insert new profile image row in DB");
      profileMapper.addNew(model);

      log.debug("Update user profile");
      userMapper.updateProfile(UserModel.builder()
              .profile_img(model.getId())
              .user_idx(userId)
              .build());

      return APIResponseWrapper.builder()
              .message("Successfully uploaded")
              .resultCode(0)
              .param(null)
              .build();

    } catch (IOException e) {
      log.error(e.getMessage());
      return APIResponseWrapper.builder()
              .resultCode(1) // TODO:
              .param(null)
              .message("IOException")
              .build();
    } catch (NullPointerException e) {
      log.error(e.getMessage());
      return APIResponseWrapper.builder()
              .resultCode(0)
              .param(null)
              .message("NullpointerException")
              .build();
    }
  }

  @Override
  public ResponseEntity<Resource> getProfileImage(long userId) {
    log.debug("Get latest Profile image by userId=", userId);
    String profileImgUrl = userMapper.getProfileUrl(userId);

    return this.getImageRes(profileImgUrl);
  }

  public ResponseEntity<Resource> getProfileImageById(long profileId) {
    log.debug("Get a profile image by id=", profileId);
    ProfileModel profile = profileMapper.getInfo(profileId);

    return this.getImageRes(profile.getUrl());
  }

  @Override
  public ResponseEntity<Resource> getImageRes(String url) {
    try {
      Path path = Paths.get(ROOT + url);
      Resource resource = new UrlResource(path.toUri());

      if(resource.exists() == false) throw new Exception("No resource");

      return ResponseEntity.ok()
              .contentType(MediaType.valueOf(
                      URLConnection.getFileNameMap().getContentTypeFor(
                              resource.getFilename()
                      )
              ))
              .body(resource);

    } catch (Exception e) {
      log.error(e.getMessage());
      return ResponseEntity.ok()
              .body(null);
    }
  }


  @Override
  public APIResponseWrapper getProfilesList(long userId) {
    List<ProfileModel> profiles = profileMapper.getProfileList(userId);

    return APIResponseWrapper.builder()
            .param(profiles)
            .resultCode(0)
            .message("Success")
            .build();
  }


}
