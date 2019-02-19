package com.webkakao.authserver.service.impl;

import com.webkakao.authserver.dto.User;
import com.webkakao.authserver.mapper.UserMapper;
import com.webkakao.authserver.model.DefaultRes;
import com.webkakao.authserver.model.SignUpReq;
import com.webkakao.authserver.service.UserService;
import com.webkakao.authserver.utils.EncryptedPassword;
import com.webkakao.authserver.utils.ResponseMessage;
import com.webkakao.authserver.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.security.SecureRandom;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    public UserServiceImpl(final UserMapper userMapper) {
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
    public DefaultRes save(final SignUpReq signUpReq) {

        if(signUpReq.checkProperties()){
            final User user = userMapper.findByEmail(signUpReq.getEmail());

            if(user==null){
                try{
                    String rawPassword = signUpReq.getPassword();
                    String encodedPassword = new EncryptedPassword().getEncryptedPassword(rawPassword);
                    signUpReq.setPassword(encodedPassword);

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

    /**
     * user_idx로 회원조회
     *
     * @param userIdx
     * @return
     */
    @Override
    public DefaultRes<User> findByUserIdx(int userIdx) {
        //사용자 조회
        User user = userMapper.findByUserIdx(userIdx);
        if (user != null) return DefaultRes.res(StatusCode.OK, ResponseMessage.READ_USER, user);
        return DefaultRes.res(StatusCode.NOT_FOUND, ResponseMessage.NOT_FOUND_USER);

    }

    /**
     * 회원 정보 수정
     *
     * @param userIdx
     * @param signUpReq
     * @return
     */
    //이미지랑 회원상태 저장 추가하
    @Transactional
    @Override
    public DefaultRes<User> update(int userIdx, SignUpReq signUpReq) {
        User temp = findByUserIdx(userIdx).getData();
        if(temp == null)
            return DefaultRes.res(StatusCode.NOT_FOUND, ResponseMessage.NOT_FOUND_USER);

        try {
            temp.update(signUpReq);
            userMapper.update(temp);
            temp = findByUserIdx(userIdx).getData();
            return DefaultRes.res(StatusCode.OK, ResponseMessage.UPDATE_USER, temp);


        } catch (Exception e) {
            log.error(e.getMessage());
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return DefaultRes.res(StatusCode.DB_ERROR, ResponseMessage.DB_ERROR);
        }
    }

    /**
     * 회원 탈퇴
     *
     * @param userIdx
     * @return
     */
    @Override
    @Transactional
    public DefaultRes deleteByUserIdx(int userIdx) {
        final User user = userMapper.findByUserIdx(userIdx);
        if (user != null) {
            try {
                userMapper.deleteByUserIdx(userIdx);
                return DefaultRes.res(StatusCode.NO_CONTENT, ResponseMessage.DELETE_USER);
            } catch (Exception e) {
                log.error(e.getMessage());
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                return DefaultRes.res(StatusCode.DB_ERROR, ResponseMessage.DB_ERROR);
            }
        }
        return DefaultRes.res(StatusCode.NOT_FOUND, ResponseMessage.NOT_FOUND_USER);
    }
}
