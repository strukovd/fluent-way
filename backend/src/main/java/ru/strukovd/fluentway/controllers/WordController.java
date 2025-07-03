package ru.strukovd.fluentway.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import ru.strukovd.fluentway.dtos.WordDto;
import ru.strukovd.fluentway.services.WordService;

@RestController()
@RequestMapping("/api/v1/word")
@RequiredArgsConstructor
public class WordController {
	private final WordService wordService;

	@GetMapping
	public Page<WordDto> sayHello(Pageable pageable) {
		return wordService.getList(pageable);
	}

	@PostMapping
	public void save(@RequestBody @Valid WordDto body) {
		wordService.save(body);
	}
}
