package one.hgo.subsly_backend.users.repositories;

import one.hgo.subsly_backend.users.entities.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<UsersEntity, Long> {
    Optional<UsersEntity> findByEmail(String email);

    Optional<UsersEntity> findFirstByGithubIdOrGoogleId(String githubId, String googleId);
}
