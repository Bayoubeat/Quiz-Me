package com.ajuarez.quizbackend.service;

import com.ajuarez.quizbackend.context.QuizMapperContext;
import com.ajuarez.quizbackend.dto.quiz.*;
import com.ajuarez.quizbackend.mapper.QuizMapper;
import com.ajuarez.quizbackend.model.*;
import com.ajuarez.quizbackend.repository.*;
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
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final DifficultyRepository difficultyRepository;

    @Transactional
    @Override
    public Quiz createQuiz(QuizCreationRequestDto dto, User creator) {
        Category category;
        Difficulty difficulty;

        if (creator.getRoles().contains("ROLE_ADMIN")) {
            category = categoryRepository.findByCategoryName(dto.getCategory())
                    .orElseGet(() -> {
                        Category newCategory = new Category();
                        newCategory.setCategoryName(dto.getCategory());
                        return categoryRepository.save(newCategory);
                    });

            difficulty = difficultyRepository.findByDifficultyName(dto.getDifficulty())
                    .orElseGet(() -> {
                        Difficulty newDifficulty = new Difficulty();
                        newDifficulty.setDifficultyName(dto.getDifficulty());
                        return difficultyRepository.save(newDifficulty);
                    });
        } else {
            category = categoryRepository.findByCategoryName(dto.getCategory())
                    .orElseThrow(() -> new RuntimeException("Category not found: " + dto.getCategory()));

            difficulty = difficultyRepository.findByDifficultyName(dto.getDifficulty())
                    .orElseThrow(() -> new RuntimeException("Difficulty not found: " + dto.getDifficulty()));
        }


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
            deleteQuiz(id, currentUser);
        }
    }

    @Override
    public QuizSearchingInfoResponseDto getQuizSearchingInfo() {
        List<User> users = userRepository.findAll();
        List<Category> categories = categoryRepository.findAll();
        List<Difficulty> difficulty = difficultyRepository.findAll();

        QuizSearchingInfoResponseDto dto = quizMapper.toSearchingInfoDto(users, categories, difficulty);

        return dto;
    }

    @Override
    public void createCategory(QuizCategoryCreationRequestDto dto, User user) {
        if (!user.getRoles().contains("ROLE_ADMIN")) {
            throw new RuntimeException("Only admins can add categories");
        }

        Category newCategory = new Category();
        newCategory.setCategoryName(dto.getCategoryName());

        categoryRepository.save(newCategory);
    }

    @Override
    public void createDifficulty(QuizDifficultyCreationRequestDto dto, User user) {
        if (!user.getRoles().contains("ROLE_ADMIN")) {
            throw new RuntimeException("Only admins can add difficulties");
        }

        Difficulty newDifficulty = new Difficulty();
        newDifficulty.setDifficultyName(dto.getDifficultyName());

        difficultyRepository.save(newDifficulty);
    }

    @Override
    public void createMultipleCategory(MultiCategoryRequestDTo dto, User creator) {
        if (!creator.getRoles().contains("ROLE_ADMIN")) {
            throw new RuntimeException("Only admins can add difficulties");
        }

        for (QuizCategoryCreationRequestDto catDto : dto.getCategoryList()) {
            createCategory(catDto, creator);
        }
    }

    @Override
    public void createMultipleDifficulty(MultiDifficultyRequestDto dto, User creator) {
        if (!creator.getRoles().contains("ROLE_ADMIN")) {
            throw new RuntimeException("Only admins can add difficulties");
        }

        for (QuizDifficultyCreationRequestDto difDto : dto.getDifficultyList()) {
            createDifficulty(difDto, creator);
        }
    }
}

