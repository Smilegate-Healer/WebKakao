package com.webkakao.api.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.webkakao.api.service.redis.AuthRedisService;
 
@Component
public class AuthorizationInterceptor extends HandlerInterceptorAdapter{
 
	@Autowired
	private AuthRedisService authRedisService;
	
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
		String ip = request.getHeader("X-FORWARDED-FOR");
		if (ip == null)
			ip = request.getRemoteAddr();
		String access_token = request.getHeader("access_token");
//        if (!authRedisService.tokenCheck(access_token, ip)){
//        	return false;
//        }
        return true;
    }

	@Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }
     
}
