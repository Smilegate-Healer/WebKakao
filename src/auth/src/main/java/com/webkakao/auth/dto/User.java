package com.webkakao.auth.dto;

import com.webkakao.auth.model.SignUpReq;
import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {

    private static final long serialVersionUID = 1352434223471861013L;

    private int user_idx;
    private String email;
    private String name;


//    public void update(final SignUpReq signUpReq) {
//        if(signUpReq.getEmail() != null) email = signUpReq.getEmail();
//        if(signUpReq.getName() != null) name = signUpReq.getName();
//    }

}
