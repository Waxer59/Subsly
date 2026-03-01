package one.hgo.subsly_backend.auth.handlers;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import one.hgo.subsly_backend.auth.AuthService;
import one.hgo.subsly_backend.auth.dtos.JwtAuthClaims;
import one.hgo.subsly_backend.auth.enums.PlatformEnum;
import one.hgo.subsly_backend.auth.services.JwtService;
import one.hgo.subsly_backend.users.UsersService;
import one.hgo.subsly_backend.users.dtos.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class Oauth2SuccessHandler implements AuthenticationSuccessHandler {
    @Value("${frontend.url}")
    private String FRONTEND_URL;

    @Value("${chrome-extension.id}")
    private String CHROME_EXTENSION_ID;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthService authService;

    @Autowired
    private UsersService usersService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        if (authentication.getPrincipal() instanceof OAuth2User oAuth2User) {
            String token = "";

            PlatformEnum platform = (PlatformEnum) request.getSession().getAttribute("platform");
            String redirectUrl = FRONTEND_URL;

            if (platform.equals(PlatformEnum.CHROME_EXTENSION)) {
                redirectUrl = "https://" + CHROME_EXTENSION_ID + ".chromiumapp.org";
            }

            Optional<UserDetails> userDetails = this.usersService.loadByOauthProviderId(oAuth2User.getName());

            if (userDetails.isPresent()) {
                token = this.jwtService.generateToken(JwtAuthClaims.builder()
                        .id(userDetails.get().getId())
                        .build());
            }

            if (token.isBlank()) {
                response.sendRedirect(redirectUrl + "?auth_error=true");
                return;
            }

            this.authService.setCookie(response, token);
            response.sendRedirect(redirectUrl);
        }
    }
}
