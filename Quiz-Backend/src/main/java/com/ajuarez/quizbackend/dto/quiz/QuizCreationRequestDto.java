package com.ajuarez.quizbackend.dto.quiz;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class QuizCreationRequestDto {
    @NotBlank
    private String title;

    @NotBlank
    private String category;

    @NotBlank
    private String difficulty;

    @Valid
    private List<QuestionDto> questions;

    @Data
    @NoArgsConstructor
    public static class QuestionDto {
        private Long questionId;

        @NotBlank
        private String text;

        @Valid
        private List<String> options;

        @Valid
        private int correctOptionIndex;

    }
}