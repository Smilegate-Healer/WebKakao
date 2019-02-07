package com.webkakao.authserver.utils;

import org.apache.commons.codec.binary.Base64;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

public class EncryptedPassword {

    private static final int desiredKeyLen = 512;

    public static String getEncryptedPassword(
            String password,
            byte[] salt,
            int iterations,
            int derivedKeyLength
    ) throws NoSuchAlgorithmException, InvalidKeySpecException {
//        KeySpec spec = new PBEKeySpec(
//                password.toCharArray(),
//                salt,
//                iterations,
//                derivedKeyLength * 8
//        );
        if (password == null || password.length() == 0)
            throw new IllegalArgumentException("Empty passwords are not supported.");

        SecretKeyFactory f = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
        SecretKey key = f.generateSecret(new PBEKeySpec(password.toCharArray(), salt, iterations, desiredKeyLen));
        return Base64.encodeBase64String(key.getEncoded());
    }
}
