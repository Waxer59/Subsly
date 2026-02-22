package one.hgo.subsly_backend.subscriptions;

import jakarta.transaction.Transactional;
import one.hgo.subsly_backend.subscriptions.dto.SubscriptionDetails;
import one.hgo.subsly_backend.subscriptions.entities.SubscriptionsEntity;
import one.hgo.subsly_backend.subscriptions.repositories.SubscriptionsRespository;
import one.hgo.subsly_backend.users.entities.UsersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionsService {

    @Autowired
    private SubscriptionsRespository subscriptionsRespository;

    public Optional<List<SubscriptionDetails>> getAllSubscriptionDetails(Long user_id) {
        List<SubscriptionsEntity> subscriptionsEntity = this.subscriptionsRespository.findAllByUser_Id(user_id);
        Optional<List<SubscriptionDetails>> subscriptionDetails = Optional.empty();

        if (!subscriptionsEntity.isEmpty()) {
            subscriptionDetails = Optional.of(subscriptionsEntity.stream().map(this::mapToSubscriptionDetails).toList());
        }

        return subscriptionDetails;
    }

    public Optional<SubscriptionDetails> getSubscriptionDetails(Long id, Long userId) {
        Optional<SubscriptionsEntity> subscriptionsEntity = this.subscriptionsRespository.findByIdAndUser_Id(id, userId);
        Optional<SubscriptionDetails> subscriptionDetails = Optional.empty();

        if (subscriptionsEntity.isPresent()) {
            subscriptionDetails = Optional.of(mapToSubscriptionDetails(subscriptionsEntity.get()));
        }

        return subscriptionDetails;
    }

    public SubscriptionDetails createSubscriptionDetails(Long userId, SubscriptionDetails subscriptionDetails) {
        SubscriptionsEntity subscriptionsEntity = mapToSubscriptionEntity(subscriptionDetails);

        subscriptionsEntity.setUser(
                UsersEntity.builder()
                        .id(userId)
                        .build()
        );

        SubscriptionsEntity savedSubscription = this.subscriptionsRespository.save(subscriptionsEntity);

        return mapToSubscriptionDetails(savedSubscription);
    }

    public Optional<SubscriptionDetails> updateSubscriptionDetails(Long id, Long userId, SubscriptionDetails subscriptionDetails) {
        Optional<SubscriptionDetails> subscriptionDetailsOptional = getSubscriptionDetails(id, userId);
        Optional<SubscriptionDetails> updatedSubscription = Optional.empty();

        if (subscriptionDetailsOptional.isPresent()) {
            SubscriptionsEntity subscriptionsEntity = mapToSubscriptionEntity(subscriptionDetails);
            subscriptionsEntity.setId(id);
            subscriptionsEntity.setUser(
                    UsersEntity.builder()
                            .id(userId)
                            .build()
            );
            this.subscriptionsRespository.save(subscriptionsEntity);

            updatedSubscription = Optional.of(mapToSubscriptionDetails(subscriptionsEntity));
        }

        return updatedSubscription;
    }

    @Transactional
    public void deleteSubscription(Long id, Long userId) {
        this.subscriptionsRespository.deleteByIdAndUser_Id(id, userId);
    }

    public void initializeSubscriptions(Long userId, List<SubscriptionDetails> subscriptionDetails) {
        Optional<List<SubscriptionDetails>> userSubscriptionDetails = getAllSubscriptionDetails(userId);
        List<SubscriptionsEntity> subscriptionsEntities;

        if (userSubscriptionDetails.isEmpty()) {
            subscriptionsEntities = subscriptionDetails.stream().map(
                    sd -> {
                        SubscriptionsEntity subscriptionsEntity = mapToSubscriptionEntity(sd);
                        subscriptionsEntity.setUser(
                                UsersEntity.builder()
                                        .id(userId)
                                        .build()
                        );

                        return subscriptionsEntity;
                    }
            ).toList();
            this.subscriptionsRespository.saveAll(subscriptionsEntities);
        }
    }

    private SubscriptionDetails mapToSubscriptionDetails(SubscriptionsEntity subscriptionsEntity) {
        return SubscriptionDetails.builder()
                .id(subscriptionsEntity.getId())
                .amount(subscriptionsEntity.getAmount())
                .name(subscriptionsEntity.getName())
                .renewsEvery(subscriptionsEntity.getRenewsEvery())
                .serviceUrl(subscriptionsEntity.getServiceUrl())
                .build();
    }

    private SubscriptionsEntity mapToSubscriptionEntity(SubscriptionDetails subscriptionDetails) {
        return SubscriptionsEntity.builder()
                .id(subscriptionDetails.getId())
                .name(subscriptionDetails.getName())
                .amount(subscriptionDetails.getAmount())
                .serviceUrl(subscriptionDetails.getServiceUrl())
                .renewsEvery(subscriptionDetails.getRenewsEvery())
                .build();
    }
}
