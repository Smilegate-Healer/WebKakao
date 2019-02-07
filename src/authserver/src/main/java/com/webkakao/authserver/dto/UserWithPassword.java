package com.webkakao.authserver.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserWithPassword implements Serializable {


    private static final long serialVersionUID = 9008660136779557599L;
    private int user_idx;
    private String email;
    private String password;
    private String name;
}
