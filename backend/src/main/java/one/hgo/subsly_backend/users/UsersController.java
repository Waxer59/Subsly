package one.hgo.subsly_backend.users;

import at.favre.lib.crypto.bcrypt.BCrypt;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import one.hgo.subsly_backend.auth.AuthService;
import one.hgo.subsly_backend.cache_manager.CacheManagerService;
import one.hgo.subsly_backend.email_sender.EmailSenderService;
import one.hgo.subsly_backend.users.dtos.DeleteUserDetails;
import one.hgo.subsly_backend.users.dtos.UserDetails;
import one.hgo.subsly_backend.users.enums.DeleteUserState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private CacheManagerService cacheManagerService;

    @Autowired
    private AuthService authService;

    @Value("${otp.hash_cost}")
    private Integer OTP_HASH_COST;

    @GetMapping
    public ResponseEntity<UserDetails> getUsers() {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ResponseEntity.ok(user);
    }

    @DeleteMapping
    public ResponseEntity<DeleteUserDetails> deleteUsers(@RequestBody DeleteUserDetails deleteUserDetails, HttpServletResponse response, HttpSession session) {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (deleteUserDetails.getOtp() == null) {
            String otp = this.generateOTP();
            String otpHash = this.hashOTP(otp);

            try {
                emailSenderService.sendOTPEmail(user.getEmail(), otp);
                cacheManagerService.saveOTP(String.valueOf(user.getId()), otpHash);
            } catch (Exception _) {
                return ResponseEntity.internalServerError().build();
            }

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(DeleteUserDetails
                            .builder()
                            .state(DeleteUserState.SEND_OTP)
                            .build()
                    );
        }

        String cacheOtpHash = cacheManagerService.getOTP(String.valueOf(user.getId()));

        if (cacheOtpHash == null || !this.isOTPValid(deleteUserDetails.getOtp(), cacheOtpHash)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(DeleteUserDetails
                            .builder()
                            .state(DeleteUserState.FAILURE)
                            .build());
        }

        this.authService.deleteCookieAndSession(response, session);
        this.usersService.deleteUser(user.getId());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(DeleteUserDetails
                        .builder()
                        .state(DeleteUserState.SUCCESS)
                        .build());
    }

    private String generateOTP() {
        SecureRandom secureRandom = new SecureRandom();
        int number = secureRandom.nextInt(1000000);
        return String.format("%06d", number);
    }

    private String hashOTP(String otp) {
        return BCrypt.withDefaults().hashToString(OTP_HASH_COST, otp.toCharArray());
    }

    private Boolean isOTPValid(String otp, String hash) {
        return BCrypt.verifyer().verify(otp.toCharArray(), hash.toCharArray()).verified;
    }

}
