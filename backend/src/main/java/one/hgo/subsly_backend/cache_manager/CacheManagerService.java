package one.hgo.subsly_backend.cache_manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import redis.clients.jedis.RedisClient;

@Service
public class CacheManagerService {

    @Value("${otp.expires_in}")
    private Integer expiresIn;

    @Autowired
    private RedisClient redisClient;

    public void saveOTP(String userId, String otp) {
        redisClient.setex("otp:" + userId, expiresIn, otp);
    }

    public String getOTP(String userId) {
        return redisClient.get("otp:" + userId);
    }
}
