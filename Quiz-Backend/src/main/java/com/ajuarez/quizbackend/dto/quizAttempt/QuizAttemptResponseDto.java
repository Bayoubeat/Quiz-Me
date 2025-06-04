package com.ajuarez.quizbackend.dto.quizAttempt;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class QuizAttemptResponseDto {
    private Long quizId;
    private String title;
    private int score;
    private int totalQuestions;
    private List<QuizAnswersDto> answers;

    @Data
    public static class QuizAnswersDto {
        private String question;
        private String answer;
        private Boolean isCorrect;
    }
}


