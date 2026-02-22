package one.hgo.subsly_backend.subscriptions.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubscriptionDetails {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private String name;
    private Float amount;
    private Integer renewsEvery;
    private String serviceUrl;
}
