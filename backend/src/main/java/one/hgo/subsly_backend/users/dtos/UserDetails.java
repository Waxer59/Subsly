package one.hgo.subsly_backend.users.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDetails {
    private Long id;
    private String username;
    private String profile_picture;
}
