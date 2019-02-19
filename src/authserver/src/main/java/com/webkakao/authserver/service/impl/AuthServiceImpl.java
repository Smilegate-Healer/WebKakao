package com.webkakao.authserver.service.impl;

import com.webkakao.authserver.dto.User;
import com.webkakao.authserver.mapper.UserMapper;
import com.webkakao.authserver.model.DefaultRes;
import com.webkakao.authserver.model.LoginReq;
import com.webkakao.authserver.service.AuthService;
import com.webkakao.authserver.utils.EncryptedPassword;
import com.webkakao.authserver.utils.ResponseMessage;
import com.webkakao.authserver.utils.StatusCode;
import com.webkakao.authserver.utils.auth.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Slf4j
@Service
public class AuthServiceImpl implements AuthService {
    private final UserMapper userMapper;

    public AuthServiceImpl(final UserMapper userMapper){ this.userMapper=userMapper; }

    @Override
    @Cacheable()
    public DefaultRes<JwtUtils.TokenRes> login(LoginReq loginReq) {
        if(loginReq.getEmail()!=null && loginReq.getPassword()!=null){
            try{
                String rawPassword = loginReq.getPassword();
                String encodedPassword = new EncryptedPassword().getEncryptedPassword(rawPassword);
                loginReq.setPassword(encodedPassword);

                final User user = userMapper.findByEmailAndPassword(loginReq.getEmail(),loginReq.getPassword());
                if(user!=null) {
                    final JwtUtils.TokenRes tokenDto = new JwtUtils.TokenRes(JwtUtils.create(user.getUser_idx()));
                    HttpHeaders httpHeaders = new HttpHeaders();
                    httpHeaders.add("token", tokenDto.getToken());
                    ResponseEntity.status(HttpStatus.OK).header(httpHeaders.toString()).build();
                    return DefaultRes.res(StatusCode.OK, ResponseMessage.LOGIN_SUCCESS, tokenDto);

                }
            }catch (Exception e) {
                log.error(e.getMessage());
                return DefaultRes.res(StatusCode.BAD_REQUEST,ResponseMessage.DB_ERROR);
            }
        }
        return DefaultRes.res(StatusCode.BAD_REQUEST, ResponseMessage.LOGIN_FAIL);
    }
}

