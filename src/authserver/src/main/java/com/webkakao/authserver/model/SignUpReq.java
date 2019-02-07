package com.webkakao.authserver.model;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.io.Serializable;

@Slf4j
@Data
public class SignUpReq implements Serializable {


    private static final long serialVersionUID = -6189884772893940104L;
    private String user_idx;
    private String email;
    private String password;
    private String name;


    public boolean existsByEmail(){
        if(email == null) return false;
        return true;
    }

    public boolean existsByPassword(){
        if(password == null) return false;
        return true;
    }

    public boolean existsByName() {
        if(name == null) return false;
        return true;
    }


    public boolean checkProperties() {
        if(!existsByEmail()) return false;
        if(!existsByPassword()) return false;
        if(!existsByName()) return false;
        return true;
    }

}
