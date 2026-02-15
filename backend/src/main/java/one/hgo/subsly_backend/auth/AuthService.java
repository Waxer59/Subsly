package one.hgo.subsly_backend.auth;

import jakarta.servlet.http.HttpServletResponse;
import one.hgo.subsly_backend.auth.dtos.JwtAuthClaims;
import one.hgo.subsly_backend.auth.services.JwtService;
import one.hgo.subsly_backend.users.UsersService;
import one.hgo.subsly_backend.users.dtos.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    public static final String AUTH_COOKIE = "sublsy_auth";

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsersService usersService;

    public Optional<UserDetails> getUserByJwtToken(String token) {
        Optional<JwtAuthClaims> jwtAuthClaims = jwtService.decypherToken(token);

        if (jwtAuthClaims.isEmpty()) {
            return Optional.empty();
        }

        return this.usersService.loadUserById(jwtAuthClaims.get().getId());
    }

    public void setCookie(HttpServletResponse response, String token) {
        ResponseCookie responseCookie = ResponseCookie.from(AUTH_COOKIE, token)
                .httpOnly(true)
                .secure(true)
                .maxAge(60 * 60 * 24 * 30) // 30 days
                .path("/")
                .sameSite("None")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());
    }

    public void logout(HttpServletResponse response) {
        this.deleteCookie(response);
    }

    public void deleteCookie(HttpServletResponse response) {
        ResponseCookie responseCookie = ResponseCookie.from(AUTH_COOKIE, "")
                .httpOnly(true)
                .secure(true)
                .maxAge(0)
                .path("/")
                .sameSite("None")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());
    }
}
