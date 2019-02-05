package com.webkakao.auth.dto;

import java.io.Serializable;

public class UserWithPassword implements Serializable {

    private static final long serialVersionUID = 4862517386386989490L;

    private int user_idx;
    private String email;
    private String password;
    private String name;
}
