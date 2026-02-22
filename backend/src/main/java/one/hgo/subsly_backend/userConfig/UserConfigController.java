package one.hgo.subsly_backend.userConfig;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(
            summary = "Initializes the user config",
            description = "When the user logs in for the first time, we must migrate their local config to the newly created account. This endpoint performs this task."
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "204", description = "Config migrated successfully"),
                    @ApiResponse(responseCode = "400", description = "The user already have a config, unable to migrate this config")
            }
    )
    @PostMapping("/initialize")
    public ResponseEntity<String> initialize(@RequestBody UserConfigDetails userConfigDetailsBody) {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        this.userConfigService.initializeConfig(user.getId(), userConfigDetailsBody);

        return ResponseEntity.noContent().build();
    }
}
