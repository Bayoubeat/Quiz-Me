package com.ajuarez.quizbackend.service;

import com.ajuarez.quizbackend.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RefreshTokenCleanupService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    public void deleteExpiredOrRevokedTokens() {
        LocalDateTime now = LocalDateTime.now();
        int deletedCount = refreshTokenRepository.deleteByRevokedTrueOrExpiryDateBefore(now);
        System.out.println("[TokenCleanup] Deleted " + deletedCount + " expired/revoked tokens.");
    }
}
