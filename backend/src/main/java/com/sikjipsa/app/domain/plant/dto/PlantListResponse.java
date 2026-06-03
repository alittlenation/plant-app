package com.sikjipsa.app.domain.plant.dto;

import java.time.Instant;
import java.time.LocalDate;

public record PlantListResponse(
        Long id,
        String name,
        String speciesName,
        String nickname,
        String coverPhotoUrl,
        LocalDate lastWateredAt,
        LocalDate latestEventAt,
        long photoCount,
        Instant createdAt,
        Instant updatedAt
) {
}
