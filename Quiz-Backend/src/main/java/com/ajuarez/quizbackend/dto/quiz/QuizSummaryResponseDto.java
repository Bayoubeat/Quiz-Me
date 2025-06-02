package com.ajuarez.quizbackend.dto.quiz;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizSummaryResponseDto {
    private Long quizId;
    private String title;
    private String category;
    private String difficulty;
    private String createdBy;
    private int score;
    private int totalQuestions;
}
