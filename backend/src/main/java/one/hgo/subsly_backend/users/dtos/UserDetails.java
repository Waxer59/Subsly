package one.hgo.subsly_backend.users.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDetails {
    private Long id;
    private String username;
    private String profile_picture;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Boolean isInitialized;
}
