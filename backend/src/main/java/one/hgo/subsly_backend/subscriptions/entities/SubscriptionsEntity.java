package one.hgo.subsly_backend.subscriptions.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;
import one.hgo.subsly_backend.users.entities.UsersEntity;

import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SubscriptionsEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String serviceUrl;

    @Column(nullable = false)
    private String subscriptionName;

    @Column(nullable = false)
    private Float subscriptionAmount;

    @Size(min = 1, max = 12)
    @Column(nullable = false)
    private Integer renewsEvery;

    @ManyToOne
    @JsonIgnore
    private UsersEntity user;
}
