package one.hgo.subsly_backend.userConfig;

import one.hgo.subsly_backend.userConfig.dtos.UserConfigDetails;
import one.hgo.subsly_backend.userConfig.entities.UserConfigEntity;
import one.hgo.subsly_backend.userConfig.repositories.UserConfigRepository;
import one.hgo.subsly_backend.users.entities.UsersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserConfigService {

    @Autowired
    private UserConfigRepository userConfigRepository;

    public Optional<UserConfigDetails> getUserConfigDetails(Long userId) {
        Optional<UserConfigEntity> userConfigEntity = userConfigRepository.findFirstByUser_Id(userId);
        Optional<UserConfigDetails> userConfigDetails = Optional.empty();

        if (userConfigEntity.isPresent()) {
            userConfigDetails = Optional.of(mapToUserConfigDetails(userConfigEntity.get()));
        }

        return userConfigDetails;
    }

    public UserConfigDetails updateOrCreateUserConfigDetails(Long userId, UserConfigDetails userConfigDetailsUpdate) {
        UserConfigEntity userConfigEntity = mapToUserConfigEntity(userConfigDetailsUpdate);

        userConfigEntity.setUser(UsersEntity.builder()
                .id(userId)
                .build());

        userConfigRepository.save(userConfigEntity);

        return userConfigDetailsUpdate;
    }

    private UserConfigDetails mapToUserConfigDetails(UserConfigEntity userConfigDetails) {
        return UserConfigDetails.builder()
                .currency(userConfigDetails.getCurrency())
                .build();
    }

    private UserConfigEntity mapToUserConfigEntity(UserConfigDetails userConfigDetails) {
        return UserConfigEntity.builder()
                .currency(userConfigDetails.getCurrency())
                .build();
    }
}
