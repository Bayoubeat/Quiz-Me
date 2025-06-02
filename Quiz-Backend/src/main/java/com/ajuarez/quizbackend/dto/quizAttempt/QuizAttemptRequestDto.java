package com.ajuarez.quizbackend.dto.quizAttempt;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter; // Lombok annotations to auto-generate getters and setters

import java.util.List;

@Data
@NoArgsConstructor
public class QuizAttemptRequestDto {
    @NotNull
    private Long quizId;

    @Valid
    private List<Integer> selectedOptionIndexes;
}