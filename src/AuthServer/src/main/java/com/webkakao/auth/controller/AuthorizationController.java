package com.webkakao.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webkakao.auth.model.request.PasswordReset;
import com.webkakao.auth.model.request.SignIn;
import com.webkakao.auth.model.request.SignUp;
import com.webkakao.auth.model.response.wrapper.AuthResponseWrapper;
import com.webkakao.auth.model.util.IPAddressUtil;
import com.webkakao.auth.service.UserService;

@CrossOrigin
@RequestMapping("/auth")
@Controller
public class AuthorizationController {

	@Autowired
	private UserService userService;

	private IPAddressUtil ipAddressUtil = new IPAddressUtil();

	@RequestMapping("/hello")
	public @ResponseBody String hello() {
		return "Hello!";
	}

	@RequestMapping(value = "/signin", method = RequestMethod.POST)
	public ResponseEntity<AuthResponseWrapper> login(@RequestBody SignIn param) {

		String ip = ipAddressUtil.getIPAddress();

		AuthResponseWrapper result = userService.signIn(param, ip);

		return new ResponseEntity<AuthResponseWrapper>(result, HttpStatus.OK);

	}

	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public ResponseEntity<AuthResponseWrapper> reg(@RequestBody SignUp param) {

		AuthResponseWrapper result = userService.signUp(param);

		return new ResponseEntity<AuthResponseWrapper>(result, HttpStatus.OK);

	}

	@RequestMapping(value = "/password/reset", method = RequestMethod.POST)
	public ResponseEntity<AuthResponseWrapper> passwordReset(@RequestBody PasswordReset param) {

		AuthResponseWrapper result = userService.passwordReset(param);

		return new ResponseEntity<AuthResponseWrapper>(result, HttpStatus.OK);

	}

	@RequestMapping(value = "/password/change", method = RequestMethod.POST)
	public ResponseEntity<AuthResponseWrapper> passwordChange(@RequestBody PasswordReset param) {

		AuthResponseWrapper result = userService.passwordChange(param);

		return new ResponseEntity<AuthResponseWrapper>(result, HttpStatus.OK);

	}

}
