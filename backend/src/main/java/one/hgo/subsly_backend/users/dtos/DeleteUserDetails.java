package one.hgo.subsly_backend.users.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import one.hgo.subsly_backend.users.enums.DeleteUserState;

@Data
@Builder
public class DeleteUserDetails {
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String otp;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private DeleteUserState state;
}
