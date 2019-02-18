package com.webkakao.auth.model.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Date;
import java.util.Random;

import javax.xml.bind.DatatypeConverter;

import org.apache.tomcat.util.codec.binary.Base64;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;

public class TokenGenerateUtil {

	public String generateToken() {
		String token = null;
		SecureRandom secureRandom;
		try {
			secureRandom = SecureRandom.getInstance("SHA1PRNG");
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			secureRandom.setSeed(secureRandom.generateSeed(128));
			token = new String(digest.digest((secureRandom.nextLong() + "").getBytes()));
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return token;
	}

	public String generateToken(String username) {
		SecureRandom secureRandom = null;
		try {
			secureRandom = SecureRandom.getInstance("SHA128");
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		long longToken = Math.abs(secureRandom.nextLong());
		String random = Long.toString(longToken, 16);
		return (username + ":" + random);
	}

	public String tokenGenerate() {
		String keySource = randomKey(5) + new Date().toString() + randomKey(5);
		byte[] tokenByte = new Base64(true).encodeBase64(keySource.getBytes());
		String token = new String(tokenByte);
		return token;
	}

	public String randomKey(int length) {
		StringBuffer temp = new StringBuffer();
		Random rnd = new Random();
		for (int i = 0; i < length; i++) {
			int rIndex = rnd.nextInt(3);
			switch (rIndex) {
			case 0:
				// a-z
				temp.append((char) ((int) (rnd.nextInt(26)) + 97));
				break;
			case 1:
				// A-Z
				temp.append((char) ((int) (rnd.nextInt(26)) + 65));
				break;
			case 2:
				// 0-9
				temp.append((rnd.nextInt(10)));
				break;
			}
		}
		return temp.toString();
	}

	public String testSHA256(String str) {

		String SHA = "";
		try {
			MessageDigest sh = MessageDigest.getInstance("SHA-256");
			sh.update(str.getBytes());
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
			}
			SHA = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			SHA = null;
		}
		return SHA;

	}
	
	public String randomTokenGenerate(String input) {
	    String sha1 = null;
	    try {
	        MessageDigest msdDigest = MessageDigest.getInstance("SHA-1");
	        msdDigest.update(input.getBytes("UTF-8"), 0, input.length());
	        sha1 = DatatypeConverter.printHexBinary(msdDigest.digest());
	    } catch (UnsupportedEncodingException | NoSuchAlgorithmException e) {
	    }
	    return sha1;
	}
}
