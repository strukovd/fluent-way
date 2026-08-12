package ru.strukovd.fluentway.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Date;

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

	@Column
	private String definition; // Определение слова на английском языке

	private example
	private synonyms
	private antonyms
	private pronunciation
	private level
	private frequency
	private tags
	private last_reviewed
	private score
	private image_url
	private audio_url

    /*
    insertable = false (говорит Hibernate не вставлять это поле, а база сама подставит now())
    updatable = false — чтобы Hibernate не пытался обновить это поле
    */
	@Column(name = "created", insertable = false, updatable = false, columnDefinition = "timestamp default now()")
	private LocalDateTime created;

	private String created_by;
	private String display_name;
	private String password;

	private Date removed;
	private String removed_by;
	private Date updated;
	private updated_by
	private images_prompts
}