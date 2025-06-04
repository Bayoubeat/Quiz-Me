package com.ajuarez.quizbackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(unique = true)
    private String categoryName;
}
