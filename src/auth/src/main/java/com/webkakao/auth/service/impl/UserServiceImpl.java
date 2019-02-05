package com.webkakao.auth.service.impl;

import com.webkakao.auth.dto.User;
import com.webkakao.auth.mapper.UserMapper;
import com.webkakao.auth.model.DefaultRes;
import com.webkakao.auth.model.SignUpReq;
import com.webkakao.auth.service.UserService;
import com.webkakao.auth.utils.ResponseMessage;
import com.webkakao.auth.utils.StatusCode;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    /**
     * 회원가입
     *
     * @Param signUpReq 회원가입정보
     * @return DefaultRes
     */
    @Transactional
    @Override
    public DefaultRes save(SignUpReq signUpReq) {
        if(signUpReq.checkProperties()){
            final User user = userMapper.findByEmail(signUpReq.getEmail());

            if(user==null){
                try{
                    userMapper.save(signUpReq);
                    return DefaultRes.res(StatusCode.CREATED, ResponseMessage.CREATED_USER);
                }catch (Exception e) {
                    log.error(e.getMessage());
                    TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                    return DefaultRes.res(StatusCode.DB_ERROR, ResponseMessage.DB_ERROR);
                }
            }else return DefaultRes.res(StatusCode.BAD_REQUEST,ResponseMessage.ALREADY_USER);
        }

        return DefaultRes.res(StatusCode.BAD_REQUEST,ResponseMessage.FAIL_CREATED_USER);
    }
}
