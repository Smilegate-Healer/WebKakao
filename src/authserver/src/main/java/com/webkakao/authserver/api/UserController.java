package com.webkakao.authserver.api;

import com.webkakao.authserver.model.DefaultRes;
import com.webkakao.authserver.dto.User;
import com.webkakao.authserver.model.SignUpReq;
import com.webkakao.authserver.service.UserService;
import com.webkakao.authserver.utils.ResponseMessage;
import com.webkakao.authserver.utils.StatusCode;
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
    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody final SignUpReq signUpReq){
        try{
            return new ResponseEntity<>(userService.save(signUpReq), HttpStatus.OK);
        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
