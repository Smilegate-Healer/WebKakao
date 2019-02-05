package com.webkakao.auth.utils;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

public class EncryptedPassword {
    public static byte[] getEncryptedPassword(
            String password,
            byte[] salt,
            int iterations,
            int derivedKeyLength
    ) throws NoSuchAlgorithmException, InvalidKeySpecException {
        KeySpec spec = new PBEKeySpec(
                password.toCharArray(),
                salt,
                iterations,
                derivedKeyLength * 8
        );

        SecretKeyFactory f = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");

        return f.generateSecret(spec).getEncoded();
    }
}
