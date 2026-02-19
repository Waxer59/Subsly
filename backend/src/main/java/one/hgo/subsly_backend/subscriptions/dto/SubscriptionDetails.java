package one.hgo.subsly_backend.subscriptions.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubscriptionDetails {
    private Long id;
    private String subscriptionName;
    private Float subscriptionAmount;
    private Integer renewsEvery;
    private String serviceUrl;
}
