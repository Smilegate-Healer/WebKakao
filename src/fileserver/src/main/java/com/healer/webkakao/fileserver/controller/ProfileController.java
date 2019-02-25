package com.healer.webkakao.fileserver.controller;

import com.healer.webkakao.fileserver.response.wrapper.APIResponseWrapper;
import com.healer.webkakao.fileserver.service.ProfileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@RequestMapping("/profile")
public class ProfileController {

  @Autowired
  private ProfileService profileService;

  @RequestMapping(value = "/new/{userId}", method = RequestMethod.POST)
  public APIResponseWrapper addNewProfile(@RequestParam("file") MultipartFile file,
                                          @PathVariable long userId) {
    // TODO: User Authentication
    return profileService.saveProfileImageAndUpdate(userId, file);
  }

  @RequestMapping(value = "/", method = RequestMethod.GET, params = {"userId"})
  public ResponseEntity<Resource> getProfile(@RequestParam("userId") long userId) {
    return profileService.getProfileImage(userId);
  }

  @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
  public APIResponseWrapper getProfilesList(@PathVariable long userId) {
    return profileService.getProfilesList(userId);
  }

  @RequestMapping(value = "/{profileId}", method = RequestMethod.GET)
  public ResponseEntity<Resource> getProfileById(@PathVariable long profileId) {
    return profileService.getProfileImageById(profileId);
  }
}
