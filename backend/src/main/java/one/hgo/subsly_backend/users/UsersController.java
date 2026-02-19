package one.hgo.subsly_backend.users;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import one.hgo.subsly_backend.users.dtos.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UsersController {

    @GetMapping
    public ResponseEntity<UserDetails> getUsers() {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ResponseEntity.ok(user);
    }

    @Operation(
            summary = "Initializes the user suscriptions",
            description = "When the user logs in for the first time, we must migrate their local subscription to the newly created account. This endpoint performs this task."
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "204", description = "Subscriptions migrated successfully"),
                    @ApiResponse(responseCode = "400", description = "The user already have subscriptions, unable to migrate subscriptions")
            }
    )
    @PostMapping("/initialize")
    public ResponseEntity<String> initialize() {
        return ResponseEntity.noContent().build();
    }
}
