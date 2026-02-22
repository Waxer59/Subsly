package one.hgo.subsly_backend.userConfig.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;
import one.hgo.subsly_backend.userConfig.enums.CurrenciesEnum;
import one.hgo.subsly_backend.users.entities.UsersEntity;

import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserConfigEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private CurrenciesEnum currency;

    @OneToOne
    @JsonIgnore
    private UsersEntity user;
}
