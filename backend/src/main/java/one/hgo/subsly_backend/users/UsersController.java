package one.hgo.subsly_backend.users;

import one.hgo.subsly_backend.users.dtos.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsersController {

    @GetMapping
    public ResponseEntity<UserDetails> getUsers() {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ResponseEntity.ok(user);
    }
}
