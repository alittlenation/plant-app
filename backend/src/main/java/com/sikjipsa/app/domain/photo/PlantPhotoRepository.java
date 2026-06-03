package com.sikjipsa.app.domain.photo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlantPhotoRepository extends JpaRepository<PlantPhoto, Long> {

    List<PlantPhoto> findByPlantIdOrderByTakenAtDescCreatedAtDesc(Long plantId);

    List<PlantPhoto> findTop6ByPlantIdOrderByTakenAtDescCreatedAtDesc(Long plantId);

    Optional<PlantPhoto> findByIdAndPlantId(Long id, Long plantId);

    long countByPlantId(Long plantId);

    void deleteByPlantId(Long plantId);
}
