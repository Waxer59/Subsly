package one.hgo.subsly_backend.auth;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import one.hgo.subsly_backend.auth.enums.PlatformEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/login/github")
    public String loginGithub(HttpServletResponse response, @RequestParam(required = false) PlatformEnum platform, HttpSession session) throws IOException {
        if (platform == null) platform = PlatformEnum.WEB;

        session.setAttribute("platform", platform);
        response.sendRedirect("/api/oauth2/authorization/github");
        return null;
    }

    @GetMapping("/login/google")
    public String loginGoogle(HttpServletResponse response, @RequestParam(required = false) PlatformEnum platform, HttpSession session) throws IOException {
        if (platform == null) platform = PlatformEnum.WEB;

        session.setAttribute("platform", platform);
        response.sendRedirect("/api/oauth2/authorization/google");
        return null;
    }

    @PostMapping("/logout")
    public void logout(HttpServletResponse response) {
        this.authService.logout(response);
    }
}
