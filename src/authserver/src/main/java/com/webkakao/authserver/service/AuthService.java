package com.webkakao.authserver.service;

import com.webkakao.authserver.model.DefaultRes;
import com.webkakao.authserver.model.LoginReq;
import com.webkakao.authserver.utils.auth.JwtUtils;

public interface AuthService {
    DefaultRes<JwtUtils.TokenRes> login(final LoginReq loginReq);
}
