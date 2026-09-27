package ru.strukovd.fluentway.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WordDto {
    private Long id;
    private String key;

    @NotNull(message = "Word is required")
    private String word;
//    private translation jsonb
}
