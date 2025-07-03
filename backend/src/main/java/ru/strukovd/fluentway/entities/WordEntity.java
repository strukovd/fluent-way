package ru.strukovd.fluentway.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "words")
@Data
public class WordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String key;

    @Column(nullable = false)
    private String word;

//    private String imageUrl;
//
//    private String audioUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}