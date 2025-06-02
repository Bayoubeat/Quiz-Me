package com.ajuarez.quizbackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long optionId;

    private String text;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    public Long getOptionId() {
        return optionId;
    }

    public void setOptionId(Long id) {
        this.optionId = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
}
