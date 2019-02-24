package com.healer.webkakao.chatting.config;


import com.healer.webkakao.chatting.service.RedisListenerService;
import org.redisson.Redisson;
import org.redisson.spring.data.connection.RedissonConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EnableRedisRepositories
@EnableTransactionManagement
public class RedisRepositoryConfig {

  @Value("${spring.redis.host}")
  private String redisHost;

  @Value("${spring.redis.port}")
  private int redisPort;

//  @Bean
//  public RedisConnectionFactory redisConnectionFactory() {
//    return new LettuceConnectionFactory(redisHost, redisPort);
//  }
//
//  @Bean
//  public RedissonConnectionFactory redissonConnectionFactory() {
//    return new RedissonConnectionFactory();
//  }


  @Bean
  public RedisTemplate<?, ?> redisTemplate(RedissonConnectionFactory redissonConnectionFactory) {
    RedisTemplate<byte[], byte[]> redisTemplate = new RedisTemplate<>();
    redisTemplate.setConnectionFactory(redissonConnectionFactory);
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    redisTemplate.setValueSerializer(new StringRedisSerializer());
    redisTemplate.setHashKeySerializer(new StringRedisSerializer());
    redisTemplate.setHashValueSerializer(new StringRedisSerializer());
    redisTemplate.setEnableTransactionSupport(true);
    redisTemplate.afterPropertiesSet();
    return redisTemplate;
  }

  @Bean
  public MessageListenerAdapter messageListenerAdapter(RedisListenerService redisListenerService) {
    return new MessageListenerAdapter(redisListenerService);
  }

  @Bean
  public RedisMessageListenerContainer redisContainer(RedisListenerService redisListenerService, RedissonConnectionFactory redissonConnectionFactory) {
    RedisMessageListenerContainer container =
            new RedisMessageListenerContainer();
    container.setConnectionFactory(redissonConnectionFactory);
    container.addMessageListener(messageListenerAdapter(redisListenerService), pTopic());
    return container;
  }


  /**
   * Make a Pattern topic for chatrooms
   *
   * @return PatternTopic
   */
  @Bean
  public PatternTopic pTopic() {
    // Chatroom pattren
    // chatroom/{chatroomid}
    return new PatternTopic("chatroom/*");
  }



}
