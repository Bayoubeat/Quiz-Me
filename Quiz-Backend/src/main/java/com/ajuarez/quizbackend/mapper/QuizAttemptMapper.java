package com.ajuarez.quizbackend.mapper;

import com.ajuarez.quizbackend.dto.quizAttempt.QuizAttemptResponseDto;
import com.ajuarez.quizbackend.model.QuizAttempt;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuizAttemptMapper {

    QuizAttemptResponseDto toResponseDto(QuizAttempt attempt);
}
