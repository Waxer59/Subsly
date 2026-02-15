package one.hgo.subsly_backend.auth.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import one.hgo.subsly_backend.users.UsersService;
import one.hgo.subsly_backend.users.dtos.OauthUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@Service
public class CustomOauth2UsersService extends DefaultOAuth2UserService {
    @Autowired
    private UsersService usersService;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuthUser = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        if (registrationId.equals("github")) {
            String username = oAuthUser.getAttribute("login");
            String profile_picture = oAuthUser.getAttribute("avatar_url");
            String githubId = Integer.toString(oAuthUser.getAttribute("id"));

            this.usersService.findOrCreateOauthUser(OauthUserDetails.builder()
                    .username(username)
                    .profile_picture(profile_picture)
                    .githubId(githubId)
                    .email(this.getGithubUserEmail(userRequest))
                    .build());
        }

        return new DefaultOAuth2User(null, oAuthUser.getAttributes(), "id");
    }

    private String getGithubUserEmail(OAuth2UserRequest userRequest) {
        String token = userRequest.getAccessToken().getTokenValue();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.github.com/user/emails"))
                .header("Authorization", "token " + token)
                .GET()
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            List<Map<String, Object>> emails = objectMapper.readValue(
                    response.body(),
                    new TypeReference<List<Map<String, Object>>>() {
                    }
            );

            return emails.stream()
                    .filter(e -> Boolean.TRUE.equals(e.get("primary")) && Boolean.TRUE.equals(e.get("verified")))
                    .map(e -> (String) e.get("email"))
                    .findFirst()
                    .orElse(null);

        } catch (Exception _) {
        }

        return null;
    }
}
