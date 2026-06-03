package com.sikjipsa.app.domain.plant;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantRepository extends JpaRepository<Plant, Long> {

    List<Plant> findAllByOrderByCreatedAtDesc();
}
