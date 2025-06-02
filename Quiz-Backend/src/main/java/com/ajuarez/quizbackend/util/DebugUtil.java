package com.ajuarez.quizbackend.util;

import com.ajuarez.quizbackend.model.Option;
import com.ajuarez.quizbackend.model.Question;
import com.ajuarez.quizbackend.model.Quiz;
import com.ajuarez.quizbackend.model.User;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DebugUtil {

    @Value("${trivia.debug:false}")
    private boolean debugEnabled;

    @PostConstruct
    public void init() {
        System.out.println("Debug mode enabled: " + debugEnabled);
    }

    public void debugOut(String message) {
        if (debugEnabled) {
            System.out.println("[DEBUG] " + message);
        }
    }

    public void debugOut(User user) {
        if (debugEnabled) {
            System.out.println("[DEBUG] User:id: " + user.getUserId());
            System.out.println("[DEBUG] User:username: " + user.getUsername());
            System.out.println("[DEBUG] User:password: " + user.getPassword());
            System.out.println("[DEBUG] User:roles: " + user.getRoles());
            System.out.println("[DEBUG] User:quizzes: " + user.getQuizzes());
            System.out.println("[DEBUG] User:attempts: " + user.getAttempts());
        }
    }

    public void debugOut(Quiz quiz) {
        if (debugEnabled) {
            System.out.println("[DEBUG] Quiz:id: " + quiz.getQuizId());
            System.out.println("[DEBUG] Quiz:title: " + quiz.getTitle());
            System.out.println("[DEBUG] Quiz:category: " + quiz.getCategory());
            System.out.println("[DEBUG] Quiz:difficulty: " + quiz.getDifficulty());
            System.out.println("[DEBUG] Quiz:createdBy: " + quiz.getCreatedBy());
        }
    }

    public void debugOut(Question question) {
        if (debugEnabled) {
            System.out.println("[DEBUG] Question:id: " + question.getQuestionId());
            System.out.println("[DEBUG] Question:text: " + question.getText());
            System.out.println("[DEBUG] Question:quiz: " + question.getQuiz());
            System.out.println("[DEBUG] Question:options: " + question.getOptions());
            System.out.println("[DEBUG] Question:correctOptionIndex: " + question.getCorrectOptionIndex());
        }
    }

    public void debugOut(Option option) {
        if (debugEnabled) {
            System.out.println("[DEBUG] Option:id: " + option.getOptionId());
            System.out.println("[DEBUG] Option:text: " + option.getText());
            System.out.println("[DEBUG] Option:question: " + option.getQuestion());
        }
    }
}
