package com.ajuarez.quizbackend.mapper;

import com.ajuarez.quizbackend.context.QuizMapperContext;
import com.ajuarez.quizbackend.dto.quiz.QuizCreationRequestDto;
import com.ajuarez.quizbackend.dto.quiz.QuizDetailResponseDto;
import com.ajuarez.quizbackend.dto.quiz.QuizSummaryResponseDto;
import com.ajuarez.quizbackend.model.Option;
import com.ajuarez.quizbackend.model.Question;
import com.ajuarez.quizbackend.model.Quiz;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuizMapper {

    @Mapping(target = "questionId", ignore = true)
    @Mapping(target = "quiz", ignore = true)
    Question toQuestion(QuizCreationRequestDto.QuestionDto dto);

    @Mapping(target = "optionId", ignore = true)
    @Mapping(target = "question", ignore = true)
    Option toOption(String optionText);

    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "quizId", ignore = true)
    @Mapping(target = "questions", ignore = true)
    Quiz toQuiz(QuizCreationRequestDto dto);

    default QuizSummaryResponseDto toSummaryDto(Quiz quiz, @Context QuizMapperContext context) {
        QuizSummaryResponseDto dto = new QuizSummaryResponseDto();
        dto.setQuizId(quiz.getQuizId());
        dto.setTitle(quiz.getTitle());
        dto.setCategory(quiz.getCategory());
        dto.setDifficulty(quiz.getDifficulty());
        dto.setCreatedBy(quiz.getCreatedBy() != null ? quiz.getCreatedBy().getUsername() : null);
        dto.setTotalQuestions(quiz.getQuestions().size());

        Integer bestScore = 0;
        if (context != null) {
            bestScore = context.getQuizAttemptRepository()
                    .findBestScoreForUserAndQuiz(context.getUserId(), quiz.getQuizId());
        }

        if (bestScore == null) {
            bestScore = 0;
        }

        dto.setScore(bestScore);

        return dto;
    }


    default QuizDetailResponseDto toDetailDto(Quiz quiz) {
        QuizDetailResponseDto dto = new QuizDetailResponseDto();
        dto.setQuizId(quiz.getQuizId());
        dto.setTitle(quiz.getTitle());
        dto.setCategory(quiz.getCategory());
        dto.setDifficulty(quiz.getDifficulty());

        List<QuizDetailResponseDto.QuestionDto> questions = quiz.getQuestions().stream().map(q -> {
            QuizDetailResponseDto.QuestionDto qdto = new QuizDetailResponseDto.QuestionDto();
            qdto.setQuestionId(q.getQuestionId());
            qdto.setText(q.getText());
            qdto.setOptions(q.getOptions().stream()
                    .map(Option::getText)
                    .collect(Collectors.toList()));
            return qdto;
        }).collect(Collectors.toList());

        dto.setQuestions(questions);
        return dto;
    }
}
