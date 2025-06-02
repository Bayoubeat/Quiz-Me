package com.ajuarez.quizbackend.dto.quiz;

import jakarta.validation.Valid;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class MultipleQuizCreationRequestDto {
    @Valid
    private List<QuizCreationRequestDto> quizzes;
}
