package com.sikjipsa.app.domain.plant.dto;

import com.sikjipsa.app.domain.event.dto.PlantEventResponse;
import com.sikjipsa.app.domain.photo.dto.PlantPhotoResponse;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public record PlantDetailResponse(
        Long id,
        String name,
        String speciesName,
        String nickname,
        LocalDate acquiredDate,
        String coverPhotoUrl,
        String memo,
        PlantSummary summary,
        List<PlantEventResponse> recentEvents,
        List<PlantPhotoResponse> photos,
        Instant createdAt,
        Instant updatedAt
) {
    public record PlantSummary(
            LocalDate lastWateredAt,
            LocalDate lastNutrientAt,
            LocalDate lastRepottingAt,
            LocalDate lastPruningAt,
            LocalDate latestEventAt,
            long eventCount,
            long photoCount
    ) {
    }
}
