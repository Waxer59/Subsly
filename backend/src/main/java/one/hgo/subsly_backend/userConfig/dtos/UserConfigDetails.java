package one.hgo.subsly_backend.userConfig.dtos;

import lombok.Builder;
import lombok.Data;
import one.hgo.subsly_backend.userConfig.enums.CurrenciesEnum;

@Data
@Builder
public class UserConfigDetails {
    private CurrenciesEnum currency;
}
