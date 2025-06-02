package com.ajuarez.quizbackend.service;

import com.ajuarez.quizbackend.dto.auth.AuthenticationRequestDto;
import com.ajuarez.quizbackend.dto.auth.AuthenticationResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {
    AuthenticationResponseDto register(AuthenticationRequestDto request);

    AuthenticationResponseDto authenticate(AuthenticationRequestDto request);

    AuthenticationResponseDto refreshToken(String refreshToken);
}