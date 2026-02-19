package one.hgo.subsly_backend.subscriptions.repositories;

import one.hgo.subsly_backend.subscriptions.entities.SubscriptionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionsRespository extends JpaRepository<SubscriptionsEntity, Long> {
    Optional<SubscriptionsEntity> findByIdAndUser_Id(Long id, Long user_id);

    Optional<List<SubscriptionsEntity>> findAllUser_Id(Long id);

    void deleteByIdAndUser_Id(Long id, Long userId);
}
