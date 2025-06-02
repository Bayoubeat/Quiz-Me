package com.ajuarez.quizbackend.repository;

import com.ajuarez.quizbackend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuizQuizId(Long quizId);
}
