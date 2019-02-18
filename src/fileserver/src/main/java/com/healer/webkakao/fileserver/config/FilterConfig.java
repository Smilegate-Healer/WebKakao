package com.healer.webkakao.fileserver.config;

import com.healer.webkakao.fileserver.filter.CORSFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
	
//	@Bean
//	public FilterRegistrationBean getFilterRegistrationBean() {
//		FilterRegistrationBean registrationBean = new FilterRegistrationBean(new AuthorizationFilter());
//		return registrationBean;
//	}
	
	@Bean
	public FilterRegistrationBean getCORSFilterRegistrationBean() {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean(new CORSFilter());
		return registrationBean;
	}
	
}
