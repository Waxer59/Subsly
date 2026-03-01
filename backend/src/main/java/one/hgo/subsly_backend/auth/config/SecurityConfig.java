package one.hgo.subsly_backend.auth.config;

import jakarta.servlet.http.HttpServletResponse;
import one.hgo.subsly_backend.auth.AuthService;
import one.hgo.subsly_backend.auth.filters.JwtAuthorizationFilter;
import one.hgo.subsly_backend.auth.handlers.Oauth2FailureHandler;
import one.hgo.subsly_backend.auth.handlers.Oauth2SuccessHandler;
import one.hgo.subsly_backend.auth.services.CustomOauth2UsersService;
import one.hgo.subsly_backend.users.UsersService;
import one.hgo.subsly_backend.users.dtos.OauthUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${frontend.url}")
    private String FRONTEND_URL;

    @Autowired
    private AuthService authService;

    @Autowired
    private UsersService usersService;

    @Autowired
    private Oauth2SuccessHandler oAuth2SuccessHandler;

    @Autowired
    private Oauth2FailureHandler oAuth2FailureHandler;

    @Autowired
    private CustomOauth2UsersService customOauth2UsersService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/api-docs/**").permitAll()
                        .requestMatchers("/", "/error", "/webjars/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2Login -> oauth2Login
                        .successHandler(this.oAuth2SuccessHandler)
                        .failureHandler(this.oAuth2FailureHandler)
                        .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                                .userService(this.customOauth2UsersService)
                                .oidcUserService(oidcUserService())
                        ))
                .addFilterBefore(jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED)))
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin(FRONTEND_URL);
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }

    @Bean
    public OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        return userRequest -> {
            OidcUser oidcUser = new OidcUserService().loadUser(userRequest);
            String registrationId = userRequest.getClientRegistration().getRegistrationId();

            if (registrationId.equals("google")) {
                String email = oidcUser.getAttribute("email");
                assert email != null;
                String userName = email.substring(0, email.indexOf("@"));
                String googleId = oidcUser.getAttribute("sub");
                String profilePicture = oidcUser.getAttribute("picture");

                this.usersService.findOrCreateOauthUser(OauthUserDetails.builder()
                        .username(userName)
                        .email(email)
                        .profile_picture(profilePicture)
                        .googleId(googleId)
                        .build());
            }

            return oidcUser;
        };
    }

    @Bean
    public JwtAuthorizationFilter jwtAuthorizationFilter() {
        return new JwtAuthorizationFilter(this.authService);
    }
}
