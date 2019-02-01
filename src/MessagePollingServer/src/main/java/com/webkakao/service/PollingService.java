package com.webkakao.service;

import java.io.IOException;

import org.springframework.web.context.request.async.DeferredResult;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.webkakao.model.request.PollingRequest;
import com.webkakao.model.response.PollingResponse;

public interface PollingService {

	PollingResponse msgPolling(PollingRequest param);
	
	void addDeferredResult(long user_idx, long[] chatrooms, DeferredResult<PollingResponse> param);

	void removeDeferredResult(long user_idx, DeferredResult<PollingResponse> param);

	void sendMessage(long chatroom_idx, String string) throws JsonParseException, JsonMappingException, IOException;

}

