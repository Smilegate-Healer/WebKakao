package com.webkakao.authserver.dto;

import com.webkakao.authserver.model.SignUpReq;
import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {


    private static final long serialVersionUID = 2205190937970781636L;
    private int user_idx;
    private String email;
    private String name;
    private String profile_img;
    private String back_img;


    public void update(final SignUpReq signUpReq) {
        if(signUpReq.getEmail() != null) email = signUpReq.getEmail();
        if(signUpReq.getName() != null) name = signUpReq.getName();
    }

}
