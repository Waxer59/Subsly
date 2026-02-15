package one.hgo.subsly_backend.users;

import one.hgo.subsly_backend.users.dtos.OauthUserDetails;
import one.hgo.subsly_backend.users.dtos.UserDetails;
import one.hgo.subsly_backend.users.entities.UsersEntity;
import one.hgo.subsly_backend.users.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public Optional<UserDetails> loadUserById(Long id) {
        Optional<UsersEntity> userEntity = usersRepository.findById(id);
        Optional<UserDetails> userDetailsOptional = Optional.empty();

        if (userEntity.isPresent()) {
            userDetailsOptional = Optional.of(this.mapToUserDetails(userEntity.orElse(null)));
        }

        return userDetailsOptional;
    }

    public Optional<UserDetails> loadByOauthProviderId(String oauthProviderId) {
        Optional<UsersEntity> usersEntity = usersRepository.findFirstByGithubIdOrGoogleId(oauthProviderId, oauthProviderId);
        Optional<UserDetails> userDetailsOptional = Optional.empty();

        if (usersEntity.isPresent()) {
            userDetailsOptional = Optional.of(this.mapToUserDetails(usersEntity.orElse(null)));
        }

        return userDetailsOptional;
    }

    public UserDetails findOrCreateOauthUser(OauthUserDetails oauthUserDetails) {
        Optional<UsersEntity> userEntity = usersRepository.findByEmail(oauthUserDetails.getEmail());

        // In case de user is using another Oauth2 provider
        // include the user provider id in the DB.
        if (userEntity.isPresent()) {

            if (oauthUserDetails.getGithubId() != null) {
                userEntity.get().setGithubId(oauthUserDetails.getGithubId());
            }

            if (oauthUserDetails.getGoogleId() != null) {
                userEntity.get().setGoogleId(oauthUserDetails.getGoogleId());

            }

            usersRepository.save(userEntity.get());

            return mapToUserDetails(userEntity.get());
        } else {
            UsersEntity newUserEntity = UsersEntity.builder()
                    .email(oauthUserDetails.getEmail())
                    .username(oauthUserDetails.getUsername())
                    .profile_picture(oauthUserDetails.getProfile_picture())
                    .githubId(oauthUserDetails.getGithubId())
                    .googleId(oauthUserDetails.getGoogleId())
                    .build();
            usersRepository.save(newUserEntity);

            return mapToUserDetails(newUserEntity);
        }
    }

    private UserDetails mapToUserDetails(UsersEntity userDetails) {
        return UserDetails.builder()
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .profile_picture(userDetails.getProfile_picture())
                .build();
    }
}
