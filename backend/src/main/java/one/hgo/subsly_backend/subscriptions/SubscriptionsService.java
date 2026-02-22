package one.hgo.subsly_backend.subscriptions;

import one.hgo.subsly_backend.subscriptions.dto.SubscriptionDetails;
import one.hgo.subsly_backend.subscriptions.entities.SubscriptionsEntity;
import one.hgo.subsly_backend.subscriptions.repositories.SubscriptionsRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionsService {

    @Autowired
    private SubscriptionsRespository subscriptionsRespository;

    public Optional<List<SubscriptionDetails>> getAllSubscriptionDetails(Long user_id) {
        Optional<List<SubscriptionsEntity>> subscriptionsEntity = this.subscriptionsRespository.findAllByUser_Id(user_id);
        Optional<List<SubscriptionDetails>> subscriptionDetails = Optional.empty();

        if (subscriptionsEntity.isPresent()) {
            subscriptionDetails = Optional.of(subscriptionsEntity.get().stream().map(this::mapToSubscriptionDetails).toList());
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

    public Optional<SubscriptionDetails> updateSubscriptionDetails(Long id, Long userId, SubscriptionDetails subscriptionDetails) {
        Optional<SubscriptionDetails> subscriptionDetailsOptional = getSubscriptionDetails(id, userId);
        Optional<SubscriptionDetails> updatedSubscription = Optional.empty();

        if (subscriptionDetailsOptional.isPresent()) {
            SubscriptionsEntity subscriptionsEntity = mapToSubscriptionEntity(subscriptionDetails);
            subscriptionsEntity.setId(id);
            this.subscriptionsRespository.save(subscriptionsEntity);
        }

        return updatedSubscription;
    }

    public void deleteSubscription(Long id, Long userId) {
        this.subscriptionsRespository.deleteByIdAndUser_Id(id, userId);
    }

    private SubscriptionDetails mapToSubscriptionDetails(SubscriptionsEntity subscriptionsEntity) {
        return SubscriptionDetails.builder()
                .id(subscriptionsEntity.getId())
                .subscriptionAmount(subscriptionsEntity.getSubscriptionAmount())
                .subscriptionName(subscriptionsEntity.getSubscriptionName())
                .renewsEvery(subscriptionsEntity.getRenewsEvery())
                .serviceUrl(subscriptionsEntity.getServiceUrl())
                .build();
    }

    private SubscriptionsEntity mapToSubscriptionEntity(SubscriptionDetails subscriptionDetails) {
        return SubscriptionsEntity.builder()
                .id(subscriptionDetails.getId())
                .subscriptionName(subscriptionDetails.getSubscriptionName())
                .subscriptionAmount(subscriptionDetails.getSubscriptionAmount())
                .serviceUrl(subscriptionDetails.getServiceUrl())
                .renewsEvery(subscriptionDetails.getRenewsEvery())
                .build();
    }
}
