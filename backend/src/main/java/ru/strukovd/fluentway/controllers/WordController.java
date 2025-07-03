package ru.strukovd.fluentway.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.strukovd.fluentway.dtos.WordDto;
import ru.strukovd.fluentway.services.WordService;

import java.util.List;

@RestController()
@RequestMapping("/api/v1/word")
@RequiredArgsConstructor
public class WordController {
    private final WordService wordService;

    @GetMapping
    public List<String> sayHello() {
        return wordService.getList();
    }

    @PostMapping
    public String path(@RequestBody @Valid WordDto body) {
        System.out.println(body);
        return "Path!";
    }
}
