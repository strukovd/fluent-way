package ru.strukovd.fluentway.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.strukovd.fluentway.dtos.WordDto;
import ru.strukovd.fluentway.entities.WordEntity;

@Mapper(componentModel = "spring")
public interface WordMapper {
    public WordDto toDto(WordEntity wordEntity);
    public WordEntity toEntity(WordDto wordDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "created", ignore = true)
    public WordEntity toEntityForCreate(WordDto dto);

    @Mapping(target = "created", ignore = true)
    public WordEntity toEntityForUpdate(WordDto dto);
}
