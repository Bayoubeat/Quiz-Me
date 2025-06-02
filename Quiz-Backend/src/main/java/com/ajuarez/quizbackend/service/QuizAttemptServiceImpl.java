package com.ajuarez.quizbackend.service;

import com.ajuarez.quizbackend.dto.quizAttempt.QuizAttemptHistoryResponseDto;
import com.ajuarez.quizbackend.dto.quizAttempt.QuizAttemptRequestDto;
import com.ajuarez.quizbackend.dto.quizAttempt.QuizAttemptResponseDto;
import com.ajuarez.quizbackend.model.Question;
import com.ajuarez.quizbackend.model.Quiz;
import com.ajuarez.quizbackend.model.QuizAttempt;
import com.ajuarez.quizbackend.model.User;
import com.ajuarez.quizbackend.repository.QuizAttemptRepository;
import com.ajuarez.quizbackend.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizAttemptServiceImpl implements QuizAttemptService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    @Override
    public QuizAttemptResponseDto submitAttempt(QuizAttemptRequestDto dto, User user) {
        Quiz quiz = quizRepository.findById(dto.getQuizId()).orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<Question> questions = quiz.getQuestions();
        List<Integer> userAnswers = dto.getSelectedOptionIndexes();

        if (userAnswers.size() != questions.size()) {
            throw new IllegalArgumentException("Answer count does not match number of questions.");
        }

        int score = 0;
        for (int i = 0; i < questions.size(); i++) {
            if (questions.get(i).getCorrectOptionIndex() == userAnswers.get(i)) {
                score++;
            }
        }

        LocalDateTime now = LocalDateTime.now();

        if (user != null) {
            QuizAttempt attempt = new QuizAttempt();
            attempt.setUser(user);
            attempt.setQuiz(quiz);
            attempt.setScore(score);
            attempt.setTotalQuestions(questions.size());
            attempt.setAttemptTime(now);

            quizAttemptRepository.save(attempt);
        }

        QuizAttemptResponseDto response = new QuizAttemptResponseDto();
        response.setQuizId(quiz.getQuizId());
        response.setScore(score);
        response.setTotalQuestions(questions.size());
        response.setTitle(quiz.getTitle());
        return response;
    }

    @Override
    public QuizAttemptHistoryResponseDto searchAttempts(User user) {
        List<QuizAttempt> attempts = quizAttemptRepository.findByUserOrderByAttemptTimeDesc(user);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yy HH:mm");

        List<QuizAttemptHistoryResponseDto.QuizAttemptDto> dtos = attempts.stream()
                .map(attempt -> {
                    QuizAttemptHistoryResponseDto.QuizAttemptDto dto = new QuizAttemptHistoryResponseDto.QuizAttemptDto();
                    dto.setQuizId(attempt.getQuiz().getQuizId());
                    dto.setTitle(attempt.getQuiz().getTitle());
                    dto.setCategory(attempt.getQuiz().getCategory());
                    dto.setDifficulty(attempt.getQuiz().getDifficulty());
                    dto.setCreatedBy(attempt.getQuiz().getCreatedBy().getUsername());
                    dto.setScore(attempt.getScore());
                    dto.setTotalQuestions(attempt.getTotalQuestions());

                    String formattedTime = attempt.getAttemptTime().format(formatter);
                    dto.setAttemptTime(formattedTime);

                    return dto;
                }).toList();


        QuizAttemptHistoryResponseDto response = new QuizAttemptHistoryResponseDto();
        response.setQuizAttempts(dtos);
        return response;
    }
}