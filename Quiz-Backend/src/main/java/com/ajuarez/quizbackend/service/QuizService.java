package com.ajuarez.quizbackend.service;

import com.ajuarez.quizbackend.dto.quiz.*;
import com.ajuarez.quizbackend.model.Quiz;
import com.ajuarez.quizbackend.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuizService {
    Quiz createQuiz(QuizCreationRequestDto dto, User creator);

    void createMultipleQuizzes(MultipleQuizCreationRequestDto dto, User user);

    QuizDetailResponseDto getQuizById(Long quizId);

    List<QuizSummaryResponseDto> searchQuizzes(String title, String category, String difficulty, String createdBy, Sort sort, User user);

    void deleteQuiz(Long quizId, User currentUser);

    void deleteQuizzes(List<Long> quizIds, User currentUser);

    QuizSearchingInfoResponseDto getQuizSearchingInfo();

    void createCategory(QuizCategoryCreationRequestDto dto, User creator);

    void createDifficulty(QuizDifficultyCreationRequestDto dto, User creator);

    void createMultipleCategory(MultiCategoryRequestDTo dto, User creator);

    void createMultipleDifficulty(MultiDifficultyRequestDto dto, User creator);
}

