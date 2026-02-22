package one.hgo.subsly_backend.userConfig;

import one.hgo.subsly_backend.users.dtos.UserDetails;
import org.apache.catalina.startup.UserConfig;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/user-config")
public class UserConfigController {
    @GetMapping
    public Optional<UserConfig> getUserConfig() {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @PutMapping
    public Optional<UserConfig> updateUserConfig() {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
