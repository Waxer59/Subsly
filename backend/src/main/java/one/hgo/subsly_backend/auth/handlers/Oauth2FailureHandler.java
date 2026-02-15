package one.hgo.subsly_backend.auth.handlers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class Oauth2FailureHandler implements AuthenticationFailureHandler {

    @Value("${frontend.url}")
    private String FRONTEND_URL;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        System.out.println("Authentication Failure");
        response.sendRedirect(FRONTEND_URL + "?auth_error=true");
    }
}
