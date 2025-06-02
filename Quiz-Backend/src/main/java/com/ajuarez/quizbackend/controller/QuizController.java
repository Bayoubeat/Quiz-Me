package com.ajuarez.quizbackend.controller;

import com.ajuarez.quizbackend.dto.quiz.MultipleQuizCreationRequestDto;
import com.ajuarez.quizbackend.dto.quiz.QuizCreationRequestDto;
import com.ajuarez.quizbackend.dto.quiz.QuizSummaryResponseDto;
import com.ajuarez.quizbackend.model.User;
import com.ajuarez.quizbackend.repository.UserRepository;
import com.ajuarez.quizbackend.service.QuizService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;
    private final UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<Void> createQuiz(@RequestBody @Valid QuizCreationRequestDto dto, @AuthenticationPrincipal UserDetails userDetails) {
        String username = StringUtils.capitalize(userDetails.getUsername());
        User user = userRepository.findByUsername(username).orElseThrow();
        quizService.createQuiz(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/create/multiple")
    public ResponseEntity<Void> createMultipleQuizzes(@RequestBody @Valid MultipleQuizCreationRequestDto dto, @AuthenticationPrincipal UserDetails userDetails) {
        String username = StringUtils.capitalize(userDetails.getUsername());
        User user = userRepository.findByUsername(username).orElseThrow();
        quizService.createMultipleQuizzes(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<QuizSummaryResponseDto>> getAllQuizzes(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String createdBy,
            @RequestParam(required = false) String sort,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User user = null;
        if (userDetails != null) {
            String username = StringUtils.capitalize(userDetails.getUsername());
            user = userRepository.findByUsername(username).orElse(null);
        }
        Sort sortMethod = Sort.by(Sort.Direction.ASC, "quizId");
        if (sort != null) {
            sortMethod = Sort.by(sort.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "quizId");
        }
        return ResponseEntity.ok(quizService.searchQuizzes(title, category, difficulty, createdBy, sortMethod, user));
    }

    @GetMapping("/fetch/{quizId}")
    public ResponseEntity<?> getQuizById(@PathVariable Long quizId) {
        return ResponseEntity.ok(quizService.getQuizById(quizId));
    }

    @DeleteMapping("delete/{quizId}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long quizId, @AuthenticationPrincipal UserDetails userDetails) {
        String username = StringUtils.capitalize(userDetails.getUsername());
        User user = userRepository.findByUsername(username).orElseThrow();
        quizService.deleteQuiz(quizId, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("delete/multi")
    public ResponseEntity<?> deleteQuizzes(@RequestBody List<Long> quizIds, @AuthenticationPrincipal UserDetails userDetails) {
        String username = StringUtils.capitalize(userDetails.getUsername());
        User user = userRepository.findByUsername(username).orElseThrow();
        quizService.deleteQuizzes(quizIds, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        return ResponseEntity.ok(quizService.getAllUniqueCategories());
    }

    @GetMapping("/difficulties")
    public ResponseEntity<List<String>> getAllDifficulties() {
        return ResponseEntity.ok(quizService.getAllUniqueDifficulties());
    }

    @GetMapping("/creators")
    public ResponseEntity<List<String>> getAllCreators() {
        return ResponseEntity.ok(quizService.getAllUniqueCreators());
    }


}
