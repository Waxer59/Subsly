package one.hgo.subsly_backend.cache_manager;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import redis.clients.jedis.RedisClient;

@Configuration
public class CacheManagerConfig {

    @Value("${redis.host}")
    private String host;

    @Value("${redis.port}")
    private Integer port;

    @Value("${redis.password}")
    private String password;

    @Value("${redis.username}")
    private String username;

    @Bean
    public RedisClient redisClient() {
        return new RedisClient.Builder()
                .fromURI("redis://" + username + ":" + password + "@" + host + ":" + port)
                .build();
    }
}
