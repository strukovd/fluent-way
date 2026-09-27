package ru.strukovd.fluentway.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.strukovd.fluentway.entities.WordEntity;

@Repository
public interface WordRepository extends JpaRepository<WordEntity, Long> {
}
