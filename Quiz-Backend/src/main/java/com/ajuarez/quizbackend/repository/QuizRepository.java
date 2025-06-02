package com.ajuarez.quizbackend.repository;

import com.ajuarez.quizbackend.model.Quiz;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    @Query("SELECT q FROM Quiz q WHERE " +
            "(:title IS NULL OR LOWER(q.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
            "(:category IS NULL OR LOWER(q.category) LIKE LOWER(CONCAT('%', :category, '%'))) AND " +
            "(:difficulty IS NULL OR LOWER(q.difficulty) LIKE LOWER(CONCAT('%', :difficulty, '%'))) AND " +
            "(:createdBy IS NULL OR LOWER(q.createdBy.username) LIKE LOWER(CONCAT('%', :createdBy, '%')))")
    List<Quiz> searchByFilters(@Param("title") String title,
                               @Param("category") String category,
                               @Param("difficulty") String difficulty,
                               @Param("createdBy") String createdBy,
                               Sort sort);

    @Query("SELECT SUM(SIZE(q.questions)) FROM Quiz q")
    int getTotalQuestionCount();

    @Query("SELECT DISTINCT q.category FROM Quiz q")
    List<String> findAllUniqueCategories();

    @Query("SELECT DISTINCT q.difficulty FROM Quiz q")
    List<String> findAllUniqueDifficulties();

    @Query("SELECT DISTINCT q.createdBy.username FROM Quiz q")
    List<String> findAllUniqueCreators();

}
