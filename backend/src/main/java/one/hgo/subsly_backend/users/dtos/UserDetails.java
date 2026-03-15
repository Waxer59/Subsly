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
    private String email;

    @JsonIgnore
    private Boolean isInitialized;
}
