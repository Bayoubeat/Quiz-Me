package com.ajuarez.quizbackend.service;

import com.ajuarez.quizbackend.dto.leaderboard.LeaderboardEntryResponseDto;
import com.ajuarez.quizbackend.repository.QuizAttemptRepository;
import com.ajuarez.quizbackend.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LeaderboardServiceImpl implements LeaderboardService {
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizRepository quizRepository;

    public LeaderboardServiceImpl(QuizAttemptRepository quizAttemptRepository, QuizRepository quizRepository) {
        this.quizAttemptRepository = quizAttemptRepository;
        this.quizRepository = quizRepository;
    }

    public List<LeaderboardEntryResponseDto> getLeaderboard() {
        List<Object[]> results = quizAttemptRepository.findMaxScoresPerUserPerQuiz();

        Map<String, Integer> userScores = new HashMap<>();
        for (Object[] row : results) {
            String username = (String) row[0];
            int score = ((Number) row[2]).intValue();
            userScores.merge(username, score, Integer::sum);
        }

        int totalQuestions = quizRepository.getTotalQuestionCount();

        return userScores.entrySet().stream()
                .map(entry -> new LeaderboardEntryResponseDto(entry.getKey(), entry.getValue(), totalQuestions))
                .sorted((a, b) -> Integer.compare(b.getTotalScore(), a.getTotalScore()))
                .toList();
    }

}
