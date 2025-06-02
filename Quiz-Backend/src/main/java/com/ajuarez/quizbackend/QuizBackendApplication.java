package com.ajuarez.quizbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableScheduling
public class QuizBackendApplication {

    public static void main(String[] args) {
        System.out.println("PORT env var: " + System.getenv("PORT"));
        System.out.println("DB_HOST env var: " + System.getenv("DB_HOST"));
        System.out.println("DB_PORT env var: " + System.getenv("DB_PORT"));
        System.out.println("DB_NAME env var: " + System.getenv("DB_NAME"));
        System.out.println("DB_USERNAME env var: " + System.getenv("DB_USERNAME"));
        System.out.println("DB_PASSWORD env var: " + System.getenv("DB_PASSWORD"));
        System.out.println("CORS_ALLOWED_ORIGINS env var: " + System.getenv("CORS_ALLOWED_ORIGINS"));
        SpringApplication.run(QuizBackendApplication.class, args);
    }
}
