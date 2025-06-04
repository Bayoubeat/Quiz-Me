package com.ajuarez.quizbackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Difficulty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long difficultyId;

    @Column(unique = true)
    private String difficultyName;
}
