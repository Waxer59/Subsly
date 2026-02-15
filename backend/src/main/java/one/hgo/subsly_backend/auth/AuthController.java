package one.hgo.subsly_backend.auth;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/login/github")
    public String loginGithub(HttpServletResponse response) throws IOException {
        response.sendRedirect("/api/oauth2/authorization/github");
        return null;
    }

    @GetMapping("/login/google")
    public String loginGoogle(HttpServletResponse response) throws IOException {
        response.sendRedirect("/api/oauth2/authorization/google");
        return null;
    }

    @GetMapping("/logout")
    public void logout(HttpServletResponse response) {
        this.authService.logout(response);
    }
}
