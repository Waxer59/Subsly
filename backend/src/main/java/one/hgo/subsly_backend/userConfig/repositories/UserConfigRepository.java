package one.hgo.subsly_backend.userConfig.repositories;

import one.hgo.subsly_backend.userConfig.entities.UserConfigEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserConfigRepository extends JpaRepository<UserConfigEntity, Long> {
    Optional<UserConfigEntity> findFirstByUser_Id(Long userId);
}
