package com.ajuarez.quizbackend.service;

import com.ajuarez.quizbackend.dto.auth.AuthenticationRequestDto;
import com.ajuarez.quizbackend.dto.auth.AuthenticationResponseDto;
import com.ajuarez.quizbackend.exception.UsernameAlreadyTakenException;
import com.ajuarez.quizbackend.model.RefreshToken;
import com.ajuarez.quizbackend.model.User;
import com.ajuarez.quizbackend.repository.RefreshTokenRepository;
import com.ajuarez.quizbackend.repository.UserRepository;
import com.ajuarez.quizbackend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public AuthenticationResponseDto register(AuthenticationRequestDto request) {
        String upName = request.getUsername().toUpperCase();

        if (userRepository.findByUsername(upName).isPresent()) {
            throw new UsernameAlreadyTakenException();
        }
        User user = new User();
        user.setUsername(upName);
        user.setDisplayName(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.getRoles().add("ROLE_USER");

        if (Objects.equals(user.getUsername(), "ADMIN")) {
            user.getRoles().add("ROLE_ADMIN");
        }

        userRepository.save(user);

        return generateUserTokens(user);
    }

    @Override
    public AuthenticationResponseDto authenticate(AuthenticationRequestDto request) {
        String upName = request.getUsername().toUpperCase();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        upName,
                        request.getPassword()
                )
        );
        User user = userRepository.findByUsername(upName)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return generateUserTokens(user);
    }

    @Override
    public AuthenticationResponseDto refreshToken(String refreshToken) {
        String username = jwtUtil.extractUsername(refreshToken);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String jti = jwtUtil.extractJti(refreshToken);
        RefreshToken storedToken = refreshTokenRepository.findByJti(jti)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));


        if (storedToken.isRevoked() || storedToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        storedToken.setRevoked(true);
        refreshTokenRepository.save(storedToken);

        String newJti = UUID.randomUUID().toString();
        String newAccessToken = jwtUtil.generateToken(username, newJti);
        String newRefreshToken = jwtUtil.generateRefreshToken(username, newJti);
        saveRefreshToken(user, newRefreshToken, newJti);

        return new AuthenticationResponseDto(newAccessToken, newRefreshToken, user.getUsername(), user.getDisplayName(), user.getRoles());
    }

    private AuthenticationResponseDto generateUserTokens(User user) {
        String jti = UUID.randomUUID().toString();
        String accessToken = jwtUtil.generateToken(user.getUsername(), jti);
        String refreshToken = jwtUtil.generateRefreshToken(user.getUsername(), jti);
        saveRefreshToken(user, refreshToken, jti);

        return new AuthenticationResponseDto(accessToken, refreshToken, user.getUsername(), user.getDisplayName(), user.getRoles());
    }

    private void saveRefreshToken(User user, String rawToken, String jti) {
        String hashedToken = DigestUtils.sha256Hex(rawToken);
        RefreshToken token = new RefreshToken();
        token.setTokenHash(hashedToken);
        token.setUser(user);
        token.setRevoked(false);
        token.setExpiryDate(LocalDateTime.now().plusDays(7)); // customize as needed
        token.setJti(jti);
        refreshTokenRepository.save(token);
    }
}