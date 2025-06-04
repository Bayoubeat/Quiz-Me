package com.ajuarez.quizbackend.dto.quiz;

import lombok.Data;

import java.util.List;

@Data
public class QuizSearchingInfoResponseDto {
    private List<String> creators;
    private List<String> categories;
    private List<String> difficulties;
}
