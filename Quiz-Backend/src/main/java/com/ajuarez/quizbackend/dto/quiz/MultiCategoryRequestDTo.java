package com.ajuarez.quizbackend.dto.quiz;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class MultiCategoryRequestDTo {
    List<QuizCategoryCreationRequestDto> categoryList;
}
