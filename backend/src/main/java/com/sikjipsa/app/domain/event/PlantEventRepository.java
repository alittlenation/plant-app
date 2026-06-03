package com.sikjipsa.app.domain.event;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PlantEventRepository extends JpaRepository<PlantEvent, Long> {

    List<PlantEvent> findByPlantIdOrderByEventDateDescCreatedAtDesc(Long plantId);

    List<PlantEvent> findTop5ByPlantIdOrderByEventDateDescCreatedAtDesc(Long plantId);

    Optional<PlantEvent> findByIdAndPlantId(Long id, Long plantId);

    Optional<PlantEvent> findFirstByPlantIdAndEventTypeOrderByEventDateDescCreatedAtDesc(Long plantId, PlantEventType eventType);

    Optional<PlantEvent> findFirstByPlantIdOrderByEventDateDescCreatedAtDesc(Long plantId);

    long countByPlantId(Long plantId);

    void deleteByPlantId(Long plantId);
}
