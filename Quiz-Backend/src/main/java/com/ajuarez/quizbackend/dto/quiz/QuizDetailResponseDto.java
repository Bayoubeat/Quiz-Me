package com.ajuarez.quizbackend.dto.quiz;

import lombok.Data;

import java.util.List;

@Data
public class QuizDetailResponseDto {
    private Long quizId;
    private String title;
    private String category;
    private String difficulty;
    private List<QuestionDto> questions;

    @Data
    public static class QuestionDto {
        private Long questionId;
        private String text;
        private List<String> options;
    }
}
