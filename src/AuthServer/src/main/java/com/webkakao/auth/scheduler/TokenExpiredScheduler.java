package com.webkakao.auth.scheduler;
//package com.authorization.scheduler;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import com.authorization.redis.RedisService;
//
//@Component
//public class TokenExpiredScheduler {
//
//	@Autowired
//	private RedisService redisService;
//
////	 @Scheduled(cron = "0 0 0 * * *")
//	@Scheduled(fixedDelay = 100000)
//	public void removeExpiredURL() {
//
//		redisService.deleteExpiredToken(60000);
//		
//	}
//
//}
