package one.hgo.subsly_backend.users.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OauthUserDetails {
    private String username;
    private String email;
    private String profile_picture;
    private String githubId;
    private String googleId;
}
