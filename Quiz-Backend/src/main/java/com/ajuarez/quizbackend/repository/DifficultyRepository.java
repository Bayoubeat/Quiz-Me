package com.ajuarez.quizbackend.repository;

import com.ajuarez.quizbackend.model.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DifficultyRepository extends JpaRepository<Difficulty, Long> {
    Optional<Difficulty> findByDifficultyName(String difficultyName);
}
