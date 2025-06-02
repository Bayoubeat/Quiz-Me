package com.ajuarez.quizbackend.repository;

import com.ajuarez.quizbackend.model.RefreshToken;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenHash(String refreshToken);
    Optional<RefreshToken> findByJti(String jti);

    @Transactional
    @Modifying
    @Query("DELETE FROM RefreshToken t WHERE t.revoked = true OR t.expiryDate < :now")
    int deleteByRevokedTrueOrExpiryDateBefore(@Param("now") LocalDateTime now);

}
