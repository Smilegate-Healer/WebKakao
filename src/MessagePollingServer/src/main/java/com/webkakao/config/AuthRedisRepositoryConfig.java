package com.webkakao.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericToStringSerializer;

import redis.clients.jedis.JedisPoolConfig;

@Configuration
@EnableRedisRepositories
public class AuthRedisRepositoryConfig {
	
	@Value("${spring.auth.redis.host}")
	private String redisHost;

	@Value("${spring.auth.redis.port}")
	private int redisPort;

	@Bean
	public RedisConnectionFactory authRedisConnectionFactory() {
		return new LettuceConnectionFactory(redisHost, redisPort);
	}

	@Bean
	public JedisConnectionFactory authConnectionFactory() {
		JedisConnectionFactory jedisConnectionFactory = new JedisConnectionFactory();
		jedisConnectionFactory.setHostName(redisHost);
		jedisConnectionFactory.setPort(redisPort);
		jedisConnectionFactory.setUsePool(true);
		JedisPoolConfig poolConfig = new JedisPoolConfig();
		poolConfig.setMaxTotal(1000);
		poolConfig.setBlockWhenExhausted(true);
		jedisConnectionFactory.setPoolConfig(poolConfig);
		return jedisConnectionFactory;
	}

	@Bean
	public RedisTemplate<String, Object> authRedisTemplate() {

		RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();

		redisTemplate.setKeySerializer(new GenericToStringSerializer<>(Object.class));
		redisTemplate.setValueSerializer(new GenericToStringSerializer<>(Object.class));
		redisTemplate.setConnectionFactory(authRedisConnectionFactory());
		redisTemplate.setHashValueSerializer(new GenericToStringSerializer<>(Object.class));
		redisTemplate.setHashKeySerializer(new GenericToStringSerializer<>(Object.class));
//		redisTemplate.setEnableTransactionSupport(true);
		
		return redisTemplate;

	}
	
}