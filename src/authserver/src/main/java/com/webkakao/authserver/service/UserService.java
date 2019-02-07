package com.webkakao.authserver.service;

import com.webkakao.authserver.dto.User;
import com.webkakao.authserver.model.DefaultRes;
import com.webkakao.authserver.model.SignUpReq;

public interface UserService {
    DefaultRes save(final SignUpReq signUpReq);
    DefaultRes<User> findByUserIdx(final int userIdx);
}