package one.hgo.subsly_backend.userConfig.repositories;

import org.apache.catalina.startup.UserConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserConfigRepository extends JpaRepository<UserConfig, Long> {
}
