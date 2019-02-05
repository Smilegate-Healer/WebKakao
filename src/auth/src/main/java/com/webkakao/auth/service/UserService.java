package com.webkakao.auth.service;

import com.webkakao.auth.model.DefaultRes;
import com.webkakao.auth.model.SignUpReq;

public interface UserService {
    DefaultRes save(final SignUpReq signUpReq);
}
