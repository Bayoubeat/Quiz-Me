package com.ajuarez.quizbackend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponseDto {
    private String accessToken;

    private String refreshToken;

    private String username;

    private String displayName;

    private List<String> roles;
}