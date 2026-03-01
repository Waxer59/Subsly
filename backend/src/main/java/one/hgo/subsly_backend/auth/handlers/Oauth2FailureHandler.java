package one.hgo.subsly_backend.auth.handlers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import one.hgo.subsly_backend.auth.enums.PlatformEnum;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class Oauth2FailureHandler implements AuthenticationFailureHandler {

    @Value("${frontend.url}")
    private String FRONTEND_URL;

    @Value("${chrome-extension.id}")
    private String CHROME_EXTENSION_ID;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        PlatformEnum platform = (PlatformEnum) request.getSession().getAttribute("platform");
        String redirectUrl = FRONTEND_URL;

        if (platform.equals(PlatformEnum.CHROME_EXTENSION)) {
            redirectUrl = "https://" + CHROME_EXTENSION_ID + ".chromiumapp.org";
        }

        response.sendRedirect(redirectUrl + "?auth_error=true");
    }
}
