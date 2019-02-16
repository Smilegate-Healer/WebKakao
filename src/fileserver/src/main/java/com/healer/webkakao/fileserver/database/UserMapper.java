package com.healer.webkakao.fileserver.database;

import com.healer.webkakao.fileserver.model.UserModel;
import org.apache.ibatis.annotations.Mapper;

@Mapper

public interface UserMapper {

  UserModel getInfo(long userId);
  void updateProfile(UserModel model);
  String getProfileUrl(long userId);
}
