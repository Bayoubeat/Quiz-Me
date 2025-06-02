package com.ajuarez.quizbackend.repository;

import com.ajuarez.quizbackend.model.QuizAttempt;
import com.ajuarez.quizbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUserOrderByAttemptTimeDesc(User user);

    @Query("SELECT qa.user.username, qa.quiz.quizId, MAX(qa.score) " +
            "FROM QuizAttempt qa " +
            "GROUP BY qa.user.username, qa.quiz.quizId")
    List<Object[]> findMaxScoresPerUserPerQuiz();

    @Query("SELECT MAX(q.score) FROM QuizAttempt q WHERE q.user.userId = :userId AND q.quiz.quizId = :quizId")
    Integer findBestScoreForUserAndQuiz(@Param("userId") Long userId, @Param("quizId") Long quizId);
}

