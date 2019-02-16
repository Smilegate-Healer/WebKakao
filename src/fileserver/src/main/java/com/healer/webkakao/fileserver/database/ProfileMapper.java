package com.healer.webkakao.fileserver.database;

import com.healer.webkakao.fileserver.model.ProfileModel;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProfileMapper {

  void addNew(ProfileModel model);
  List<ProfileModel> getProfileList(long userId);
  ProfileModel getInfo(long profileId);
}
