package com.webkakao.auth.model;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.io.Serializable;

@Slf4j
@Data
public class SignUpReq implements Serializable {

    private static final long serialVersionUID = -4722182009689769770L;

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
