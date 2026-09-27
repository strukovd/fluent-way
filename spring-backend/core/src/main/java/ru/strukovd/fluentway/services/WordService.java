package ru.strukovd.fluentway.services;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.strukovd.fluentway.dtos.WordDto;
import ru.strukovd.fluentway.entities.WordEntity;
import ru.strukovd.fluentway.mappers.WordMapper;
import ru.strukovd.fluentway.repositories.WordRepository;

@Service
@Getter
@RequiredArgsConstructor
public class WordService {
	private final WordRepository wordRepository;
	private final WordMapper wordMapper;

	public Page<WordDto> getList(Pageable pageable) {
		Page<WordEntity> wordList = wordRepository.findAll(pageable);

		return wordList
			.map(wordMapper::toDto);
	}

	public void save(WordDto body) {
		WordEntity entity = wordMapper.toEntityForCreate(body);
		wordRepository.save(entity);
	}
}
