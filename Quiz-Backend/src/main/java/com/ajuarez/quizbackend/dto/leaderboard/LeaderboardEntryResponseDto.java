package com.ajuarez.quizbackend.dto.leaderboard;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LeaderboardEntryResponseDto {
    private String username;
    private int totalScore;
    private int totalQuestions;
}
