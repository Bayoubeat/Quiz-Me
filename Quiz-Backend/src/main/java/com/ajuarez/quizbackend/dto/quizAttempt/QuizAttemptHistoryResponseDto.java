package com.ajuarez.quizbackend.dto.quizAttempt;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class QuizAttemptHistoryResponseDto {
    private List<QuizAttemptDto> quizAttempts;

    @Data
    @NoArgsConstructor
    public static class QuizAttemptDto {
        private Long quizId;
        private String title;
        private String category;
        private String difficulty;
        private String createdBy;
        private int score;
        private int totalQuestions;
        private String attemptTime;
    }
}
