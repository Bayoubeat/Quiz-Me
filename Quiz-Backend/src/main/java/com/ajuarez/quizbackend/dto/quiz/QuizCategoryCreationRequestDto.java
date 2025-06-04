package com.ajuarez.quizbackend.dto.quiz;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuizCategoryCreationRequestDto {
    private String categoryName;
}
