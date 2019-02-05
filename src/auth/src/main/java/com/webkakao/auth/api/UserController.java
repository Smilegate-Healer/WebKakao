package com.webkakao.auth.api;

import com.webkakao.auth.model.DefaultRes;
import com.webkakao.auth.dto.User;
import com.webkakao.auth.model.SignUpReq;
import com.webkakao.auth.service.UserService;
import com.webkakao.auth.utils.ResponseMessage;
import com.webkakao.auth.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    private static final DefaultRes FAIL_DEFAULT_RES = new DefaultRes(StatusCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_SERVER_ERROR);

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
    @PostMapping("")
    public ResponseEntity signUp(@RequestBody final SignUpReq signUpReq){
        try{
            return new ResponseEntity<>(userService.save(signUpReq), HttpStatus.OK);
        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
