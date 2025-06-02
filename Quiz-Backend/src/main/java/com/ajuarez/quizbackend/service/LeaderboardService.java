package com.ajuarez.quizbackend.service;

import com.ajuarez.quizbackend.dto.leaderboard.LeaderboardEntryResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LeaderboardService {
    List<LeaderboardEntryResponseDto> getLeaderboard();
}
