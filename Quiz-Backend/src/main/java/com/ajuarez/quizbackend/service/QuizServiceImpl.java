package com.ajuarez.quizbackend.service;

import com.ajuarez.quizbackend.context.QuizMapperContext;
import com.ajuarez.quizbackend.dto.quiz.MultipleQuizCreationRequestDto;
import com.ajuarez.quizbackend.dto.quiz.QuizCreationRequestDto;
import com.ajuarez.quizbackend.dto.quiz.QuizDetailResponseDto;
import com.ajuarez.quizbackend.dto.quiz.QuizSummaryResponseDto;
import com.ajuarez.quizbackend.mapper.QuizMapper;
import com.ajuarez.quizbackend.model.Option;
import com.ajuarez.quizbackend.model.Question;
import com.ajuarez.quizbackend.model.Quiz;
import com.ajuarez.quizbackend.model.User;
import com.ajuarez.quizbackend.repository.QuizAttemptRepository;
import com.ajuarez.quizbackend.repository.QuizRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuizMapper quizMapper;
    private final QuizAttemptRepository quizAttemptRepository;

    @Transactional
    @Override
    public Quiz createQuiz(QuizCreationRequestDto dto, User creator) {

        Quiz quiz = quizMapper.toQuiz(dto);
        quiz.setDifficulty(dto.getDifficulty());
        quiz.setTitle(dto.getTitle());
        quiz.setCategory(dto.getCategory());
        quiz.setCreatedBy(creator);

        List<Question> questions = new ArrayList<>();

        for (QuizCreationRequestDto.QuestionDto questionDto : dto.getQuestions()) {
            Question question = new Question();
            question.setText(questionDto.getText());
            question.setCorrectOptionIndex(questionDto.getCorrectOptionIndex());
            question.setQuiz(quiz);

            List<Option> options = questionDto.getOptions().stream()
                    .map(text -> {
                        Option option = new Option();
                        option.setText(text);
                        option.setQuestion(question);
                        return option;
                    }).collect(Collectors.toList());

            question.setOptions(options);
            questions.add(question);

        }

        quiz.setQuestions(questions);
        return quizRepository.save(quiz);
    }

    @Override
    public void createMultipleQuizzes(MultipleQuizCreationRequestDto dto, User user) {
        if (!user.getRoles().contains("ROLE_ADMIN")) {
            throw new RuntimeException("Only admins can add multiple quizzes");
        }
        for (QuizCreationRequestDto quizDto : dto.getQuizzes()) {
            createQuiz(quizDto, user);
        }
    }


    @Override
    public List<QuizSummaryResponseDto> searchQuizzes(String title, String category, String difficulty, String createdBy, Sort sort, User user) {
        List<Quiz> results = quizRepository.searchByFilters(
                title != null ? title : "",
                category != null ? category : "",
                difficulty != null ? difficulty : "",
                createdBy != null ? createdBy : "",
                sort
        );

        QuizMapperContext context;
        if (user != null) {
            context = new QuizMapperContext(quizAttemptRepository, user.getUserId());
        } else {
            context = null;
        }

        return results.stream()
                .map(quiz -> quizMapper.toSummaryDto(quiz, context))
                .toList();
    }


    @Override
    public QuizDetailResponseDto getQuizById(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        QuizDetailResponseDto dto = quizMapper.toDetailDto(quiz);
        return dto;
    }

    @Override
    public void deleteQuiz(Long quizId, User currentUser) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (!currentUser.getRoles().contains("ROLE_ADMIN") && !quiz.getCreatedBy().getUserId().equals(currentUser.getUserId())) {
            throw new RuntimeException("You are not authorized to delete this quiz");
        }

        quizRepository.delete(quiz);
    }

    @Override
    public void deleteQuizzes(List<Long> quizIds, User currentUser) {
        for (Long id : quizIds) {
            deleteQuiz(id, currentUser); // Leverage the single quiz deletion logic
        }
    }

    @Override
    public List<String> getAllUniqueCategories() {
        return quizRepository.findAllUniqueCategories();
    }

    @Override
    public List<String> getAllUniqueDifficulties() {
        return quizRepository.findAllUniqueDifficulties();
    }

    @Override
    public List<String> getAllUniqueCreators() {
        return quizRepository.findAllUniqueCreators();
    }

}

