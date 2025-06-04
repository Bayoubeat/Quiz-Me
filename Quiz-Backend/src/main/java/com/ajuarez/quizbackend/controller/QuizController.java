package com.ajuarez.quizbackend.controller;

import com.ajuarez.quizbackend.dto.quiz.*;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;
    private final UserRepository userRepository;

    @PostMapping("/create/quiz")
    public ResponseEntity<Void> createQuiz(@RequestBody @Valid QuizCreationRequestDto dto, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername().toUpperCase()).orElseThrow();
        quizService.createQuiz(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/create/multiple")
    public ResponseEntity<Void> createMultipleQuizzes(@RequestBody @Valid MultipleQuizCreationRequestDto dto, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername().toUpperCase()).orElseThrow();
        quizService.createMultipleQuizzes(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/create/category")
    public ResponseEntity<Void> createCategory(@RequestBody @Valid QuizCategoryCreationRequestDto dto, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername().toUpperCase()).orElseThrow();
        quizService.createCategory(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/create/category/multiple")
    public ResponseEntity<Void> createCategoryMulti(@RequestBody @Valid MultiCategoryRequestDTo dto, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername().toUpperCase()).orElseThrow();
        quizService.createMultipleCategory(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/create/difficulty")
    public ResponseEntity<Void> createDifficulty(@RequestBody @Valid QuizDifficultyCreationRequestDto dto, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername().toUpperCase()).orElseThrow();
        quizService.createDifficulty(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/create/difficulty/multiple")
    public ResponseEntity<Void> createDifficultyMulti(@RequestBody @Valid MultiDifficultyRequestDto dto, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername().toUpperCase()).orElseThrow();
        quizService.createMultipleDifficulty(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @GetMapping("/fetch/{quizId}")
    public ResponseEntity<?> getQuizById(@PathVariable Long quizId) {
        return ResponseEntity.ok(quizService.getQuizById(quizId));
    }


    @DeleteMapping("delete/{quizId}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long quizId, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername().toUpperCase()).orElseThrow();
        quizService.deleteQuiz(quizId, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("delete/multi")
    public ResponseEntity<?> deleteQuizzes(@RequestBody List<Long> quizIds, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername().toUpperCase()).orElseThrow();
        quizService.deleteQuizzes(quizIds, user);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/search/all")
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
            user = userRepository.findByUsername(userDetails.getUsername().toUpperCase()).orElse(null);
        }
        Sort sortMethod = Sort.by(Sort.Direction.ASC, "quizId");
        if (sort != null) {
            sortMethod = Sort.by(sort.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "quizId");
        }
        return ResponseEntity.ok(quizService.searchQuizzes(title, category, difficulty, createdBy, sortMethod, user));
    }

    @GetMapping("/search/info")
    public ResponseEntity<QuizSearchingInfoResponseDto> getQuizSearchingInfo() {

        return ResponseEntity.ok(quizService.getQuizSearchingInfo());
    }
}
