package com.webkakao.authserver.api;

import com.webkakao.authserver.model.DefaultRes;
import com.webkakao.authserver.dto.User;
import com.webkakao.authserver.model.SignUpReq;
import com.webkakao.authserver.service.UserService;
import com.webkakao.authserver.utils.ResponseMessage;
import com.webkakao.authserver.utils.StatusCode;
import com.webkakao.authserver.utils.auth.Auth;
import com.webkakao.authserver.utils.auth.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    private static final DefaultRes FAIL_DEFAULT_RES = new DefaultRes(StatusCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_SERVER_ERROR);
    private static final DefaultRes UNAUTHORIZED_RES = new DefaultRes(StatusCode.UNAUTHORIZED, ResponseMessage.UNAUTHORIZED);

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    /**
     * 회원가입
     *
     * @param signUpReq
     * @return ResponseEntity
     */
    @PostMapping("signup")
    public ResponseEntity signUp(@RequestBody final SignUpReq signUpReq){
        try{
            return new ResponseEntity<>(userService.save(signUpReq), HttpStatus.OK);
        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 회원 정보 수정
     *
     * @param jwt
     * @param userIdx
     * @param signUpReq
     * @return
     */
    // 배경, 프로필 사진 추가하기
    @Auth
    @PutMapping("/{userIdx}")
    public ResponseEntity updateUser(
            @RequestHeader("Authorization") final String jwt,
            @PathVariable final int userIdx,
            final SignUpReq signUpReq
    ) {
        try {
            final int tokenValue = JwtUtils.decode(jwt).getUser_idx();
            if (tokenValue == userIdx)
                return new ResponseEntity<>(userService.update(userIdx, signUpReq), HttpStatus.OK);
            return new ResponseEntity<>(UNAUTHORIZED_RES, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 회원 탈퇴
     *
     * @param jwt
     * @param userIdx
     * @return
     */
    @DeleteMapping("/{userIdx}")
    public ResponseEntity deleteUser(@RequestHeader("Authorization") final String jwt, @PathVariable final int userIdx) {
        try {
            final int tokenValue = JwtUtils.decode(jwt).getUser_idx();
            if (tokenValue == userIdx) return new ResponseEntity<>(userService.deleteByUserIdx(userIdx), HttpStatus.OK);
            return new ResponseEntity<>(UNAUTHORIZED_RES, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
