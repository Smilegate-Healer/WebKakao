package com.webkakao.contorller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.async.DeferredResult;

import com.webkakao.model.request.PollingRequest;
import com.webkakao.model.response.PollingResponse;
import com.webkakao.service.PollingService;

@CrossOrigin
@RequestMapping("/message")
@Controller
public class MessagePollingController {

	@Autowired
	private PollingService pollingService;
	
	@RequestMapping(value = "/polling", method = RequestMethod.POST)
	public ResponseEntity<PollingResponse> checkInChatroom(@RequestBody PollingRequest param) {
		
		PollingResponse response = pollingService.msgPolling(param);
		
		return new ResponseEntity<PollingResponse>(response, HttpStatus.OK);
		
	}
	
	 @RequestMapping(value = "/longpolling", method = RequestMethod.POST)
	  public DeferredResult<PollingResponse> readTests() {
		 
	    final DeferredResult<PollingResponse> result = new DeferredResult<>();
	    
	    return result;
	    
	 }
	
}
