package com.webkakao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MessagePollingServerApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(MessagePollingServerApplication.class, args);
	}

}

