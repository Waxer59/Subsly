package one.hgo.subsly_backend.user_config.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import one.hgo.subsly_backend.user_config.enums.CurrenciesEnum;

@Data
@Builder
public class UserConfigDetails {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private CurrenciesEnum currency;
}
