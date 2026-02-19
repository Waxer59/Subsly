package one.hgo.subsly_backend.subscriptions;

import one.hgo.subsly_backend.subscriptions.dto.SubscriptionDetails;
import one.hgo.subsly_backend.users.dtos.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
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

    @DeleteMapping("/{id}")
    public ResponseEntity deleteSubscription(@PathVariable Long id) {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<SubscriptionDetails> subscriptionDetails = this.subscriptionsService.getSubscriptionDetails(id, user.getId());

        return subscriptionDetails.map(se -> {
            this.subscriptionsService.deleteSubscription(id, user.getId());
            return ResponseEntity.noContent().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
