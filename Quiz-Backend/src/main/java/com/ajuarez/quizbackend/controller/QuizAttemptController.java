package com.ajuarez.quizbackend.controller;

import com.ajuarez.quizbackend.dto.quizAttempt.QuizAttemptHistoryResponseDto;
import com.ajuarez.quizbackend.dto.quizAttempt.QuizAttemptRequestDto;
import com.ajuarez.quizbackend.dto.quizAttempt.QuizAttemptResponseDto;
import com.ajuarez.quizbackend.model.User;
import com.ajuarez.quizbackend.repository.UserRepository;
import com.ajuarez.quizbackend.service.QuizAttemptService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attempts")
@RequiredArgsConstructor
public class QuizAttemptController {

    private final QuizAttemptService quizAttemptService;
    private final UserRepository userRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitAttempt(
            @RequestBody @Valid QuizAttemptRequestDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = null;
        if (userDetails != null) {
            user = userRepository.findByUsername(userDetails.getUsername().toUpperCase()).orElse(null);
        }

        QuizAttemptResponseDto response = quizAttemptService.submitAttempt(dto, user);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/history")
    public ResponseEntity<?> searchAttempts(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername().toUpperCase()).orElseThrow();
        QuizAttemptHistoryResponseDto response = quizAttemptService.searchAttempts(user);
        return ResponseEntity.ok(response);
    }
}