package com.webkakao.authserver.mapper;

import com.webkakao.authserver.dto.User;
import com.webkakao.authserver.model.SignUpReq;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {
    /**
     * 회원가입
     *
     * @param signUpReq 회원 가입 정보
     */
    @Insert("INSERT INTO user(email, password, name) values(#{email}, #{password}, #{name})")
    @Options(useGeneratedKeys = true, keyProperty = "user_idx")
    void save(final SignUpReq signUpReq);

    /**
     * 이메일로 회원 조회, 이메일 중복확인
     *
     * @param email
     * @return User
     */
    @Select("SELECT * FROM user WHERE email=#{email}")
    User findByEmail(@Param("email") final String email);

    /**
     * 로그인
     *
     * @param email     이메일
     * @param password  비밀번호
     * @return User
     */
    @Select("SLECT * FROM user WHERE email=#{email} AND password=#{password}")
    User findByEmailAndPassword(@Param("emial") final String email, @Param("password") final String password);

    /**
     * idx값으로 회원찾기
     *
     * @param userIdx
     * @return
     */
    @Select("SELECT * FROM user WHERE user_idx=#{user_idx}")
    User findByUserIdx(@Param("user_idx") final int userIdx);
}
