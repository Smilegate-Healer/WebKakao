package com.webkakao.authserver.model;

import lombok.Data;

@Data
public class LoginReq {
    private String email;
    private String password;
}
