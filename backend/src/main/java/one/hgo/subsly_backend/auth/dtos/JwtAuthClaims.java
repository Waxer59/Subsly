package one.hgo.subsly_backend.auth.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtAuthClaims {
    private Long id;
}
