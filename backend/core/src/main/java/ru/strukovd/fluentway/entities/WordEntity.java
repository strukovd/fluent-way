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

    /*
    insertable = false (говорит Hibernate не вставлять это поле, а база сама подставит now())
    updatable = false — чтобы Hibernate не пытался обновить это поле
    */
    @Column(name = "created", insertable = false, updatable = false, columnDefinition = "timestamp default now()")
    private LocalDateTime created;
}