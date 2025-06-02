package com.ajuarez.quizbackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshId;

    private String tokenHash;

    @ManyToOne
    private User user;

    private boolean revoked = false;

    private LocalDateTime expiryDate;

    private String jti;

}

