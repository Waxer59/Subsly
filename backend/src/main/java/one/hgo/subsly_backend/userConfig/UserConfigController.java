package one.hgo.subsly_backend.userConfig;

import one.hgo.subsly_backend.userConfig.dtos.UserConfigDetails;
import one.hgo.subsly_backend.users.dtos.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user-config")
public class UserConfigController {

    @Autowired
    private UserConfigService userConfigService;

    @GetMapping
    public ResponseEntity<UserConfigDetails> getUserConfig() {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<UserConfigDetails> userConfigDetails = this.userConfigService.getUserConfigDetails(user.getId());

        return userConfigDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PutMapping
    public ResponseEntity<UserConfigDetails> updateUserConfig(@RequestBody UserConfigDetails userConfigDetailsBody) {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserConfigDetails userConfigDetails = this.userConfigService.updateOrCreateUserConfigDetails(user.getId(), userConfigDetailsBody);

        return ResponseEntity.ok(userConfigDetails);
    }
}
