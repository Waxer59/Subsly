package one.hgo.subsly_backend.users.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import one.hgo.subsly_backend.subscriptions.entities.SubscriptionsEntity;
import one.hgo.subsly_backend.userConfig.entities.UserConfigEntity;

import java.io.Serializable;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UsersEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String profile_picture;

    @Column(unique = true)
    private String githubId;

    @Column(unique = true)
    private String googleId;

    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    private List<SubscriptionsEntity> subscriptions;

    @OneToOne(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    private UserConfigEntity userConfig;
}
