package one.hgo.subsly_backend.auth.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import one.hgo.subsly_backend.auth.dtos.JwtAuthClaims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String JWT_SECRET;

    @Value("${jwt.expiration}")
    private Long JWT_EXPIRATION;

    public String generateToken(JwtAuthClaims claims) {
        Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);

        return JWT.create()
                .withClaim("id", claims.getId())
                .withExpiresAt(Date.from(Instant.now().plusSeconds(JWT_EXPIRATION)))
                .withIssuedAt(Date.from(Instant.now()))
                .sign(algorithm);
    }

    public Optional<JwtAuthClaims> decypherToken(String token) {
        try {
            DecodedJWT decodedJWT = JWT.decode(token);
            JwtAuthClaims jwtAuthClaims = JwtAuthClaims.builder()
                    .id(decodedJWT.getClaim("id").asLong())
                    .build();

            return Optional.of(jwtAuthClaims);
        } catch (JWTDecodeException e) {
            return Optional.empty();
        }
    }
}
