package ru.strukovd.fluentway.mappers;

import org.mapstruct.Mapper;
import ru.strukovd.fluentway.dtos.WordDto;
import ru.strukovd.fluentway.entities.WordEntity;

@Mapper(componentModel = "spring")
public interface WordMapper {
    public WordDto toDto(WordEntity wordEntity);
    public WordEntity toEntity(WordDto wordDto);
}
