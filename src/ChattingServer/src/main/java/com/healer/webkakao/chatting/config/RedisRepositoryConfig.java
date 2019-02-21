package com.healer.webkakao.chatting.config;


import com.healer.webkakao.chatting.service.RedisListenerService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@EnableRedisRepositories
public class RedisRepositoryConfig {

  @Value("${spring.redis.host}")
  private String redisHost;

  @Value("${spring.redis.port}")
  private int redisPort;

  @Bean
  public RedisConnectionFactory redisConnectionFactory() {
    return new LettuceConnectionFactory(redisHost, redisPort);
  }

  @Bean
  public RedisTemplate<?, ?> redisTemplate() {
    RedisTemplate<byte[], byte[]> redisTemplate = new RedisTemplate<>();
    redisTemplate.setConnectionFactory(redisConnectionFactory());
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    redisTemplate.setValueSerializer(new StringRedisSerializer());
    redisTemplate.setHashKeySerializer(new StringRedisSerializer());
    redisTemplate.setHashValueSerializer(new StringRedisSerializer());
    return redisTemplate;
  }

  @Bean
  public MessageListenerAdapter messageListenerAdapter(RedisListenerService redisListenerService) {
    return new MessageListenerAdapter(redisListenerService);
  }

  @Bean
  public RedisMessageListenerContainer redisContainer(RedisListenerService redisListenerService) {
    RedisMessageListenerContainer container =
            new RedisMessageListenerContainer();
    container.setConnectionFactory(redisConnectionFactory());
    container.addMessageListener(messageListenerAdapter(redisListenerService), pTopic());
    return container;

  }

  @Bean
  public ChannelTopic topic() {
    return new ChannelTopic("chatroom");
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
