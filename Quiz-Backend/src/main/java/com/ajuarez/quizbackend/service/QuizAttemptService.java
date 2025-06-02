package com.ajuarez.quizbackend.service;

import com.ajuarez.quizbackend.dto.quizAttempt.QuizAttemptHistoryResponseDto;
import com.ajuarez.quizbackend.dto.quizAttempt.QuizAttemptRequestDto;
import com.ajuarez.quizbackend.dto.quizAttempt.QuizAttemptResponseDto;
import com.ajuarez.quizbackend.model.User;
import org.springframework.stereotype.Service;

@Service
public interface QuizAttemptService {
    QuizAttemptResponseDto submitAttempt(QuizAttemptRequestDto attemptDTO, User user);
    QuizAttemptHistoryResponseDto searchAttempts(User user);
}
