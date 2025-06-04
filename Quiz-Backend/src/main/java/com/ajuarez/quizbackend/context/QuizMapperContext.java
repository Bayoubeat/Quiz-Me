package com.ajuarez.quizbackend.context;

import com.ajuarez.quizbackend.repository.QuizAttemptRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuizMapperContext {
    private final QuizAttemptRepository quizAttemptRepository;
    private final Long userId;
}
