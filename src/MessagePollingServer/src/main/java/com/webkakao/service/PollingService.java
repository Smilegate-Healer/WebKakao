package com.webkakao.service;

import com.webkakao.model.request.PollingRequest;
import com.webkakao.model.response.PollingResponse;

public interface PollingService {

	PollingResponse msgPolling(PollingRequest param);

}

