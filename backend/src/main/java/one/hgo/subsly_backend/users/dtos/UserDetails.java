package one.hgo.subsly_backend.users.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDetails {
    private Long id;
    private String username;
    private String profile_picture;

    @JsonIgnore
    private Boolean isInitialized;
}
