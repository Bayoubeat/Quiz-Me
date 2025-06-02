package com.ajuarez.quizbackend.dto.quizAttempt;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuizAttemptResponseDto {
    private Long quizId;
    private String title;
    private int score;
    private int totalQuestions;
}


