package one.hgo.subsly_backend.subscriptions;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import one.hgo.subsly_backend.subscriptions.dto.SubscriptionDetails;
import one.hgo.subsly_backend.users.UsersService;
import one.hgo.subsly_backend.users.dtos.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/subscriptions")
public class SubscriptionsController {

    @Autowired
    private SubscriptionsService subscriptionsService;

    @Autowired
    private UsersService usersService;

    @GetMapping
    public ResponseEntity<List<SubscriptionDetails>> getSubscriptions() {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<List<SubscriptionDetails>> subscriptionDetails = this.subscriptionsService.getAllSubscriptionDetails(user.getId());

        return subscriptionDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());

    }

    @PutMapping("/{id}")
    public ResponseEntity<SubscriptionDetails> updateSubscription(@RequestBody SubscriptionDetails subscriptionDetails, @PathVariable Long id) {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<SubscriptionDetails> updatedSubscriptionDetails = this.subscriptionsService.updateSubscriptionDetails(id, user.getId(), subscriptionDetails);

        return updatedSubscriptionDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SubscriptionDetails> createSubscription(@RequestBody SubscriptionDetails subscriptionDetails) {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        SubscriptionDetails createdSubscriptionDetails = this.subscriptionsService.createSubscriptionDetails(user.getId(), subscriptionDetails);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdSubscriptionDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteSubscription(@PathVariable Long id) {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<SubscriptionDetails> subscriptionDetails = this.subscriptionsService.getSubscriptionDetails(id, user.getId());

        return subscriptionDetails.map(se -> {
            this.subscriptionsService.deleteSubscription(id, user.getId());
            return ResponseEntity.noContent().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
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
    public ResponseEntity<String> initialize(@RequestBody List<SubscriptionDetails> subscriptions) {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user.getIsInitialized()) {
            return ResponseEntity.badRequest().build();
        }

        this.subscriptionsService.initializeSubscriptions(user.getId(), subscriptions);
        this.usersService.markUserAsInitialized(user.getId());

        return ResponseEntity.noContent().build();
    }
}
