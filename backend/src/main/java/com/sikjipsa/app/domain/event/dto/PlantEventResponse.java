package com.sikjipsa.app.domain.event.dto;

import com.sikjipsa.app.domain.event.PlantEvent;
import com.sikjipsa.app.domain.event.PlantEventType;

import java.time.Instant;
import java.time.LocalDate;

public record PlantEventResponse(
        Long id,
        Long plantId,
        PlantEventType eventType,
        String customTitle,
        LocalDate eventDate,
        String memo,
        Instant createdAt,
        Instant updatedAt
) {
    public static PlantEventResponse from(PlantEvent event) {
        return new PlantEventResponse(
                event.getId(),
                event.getPlant().getId(),
                event.getEventType(),
                event.getCustomTitle(),
                event.getEventDate(),
                event.getMemo(),
                event.getCreatedAt(),
                event.getUpdatedAt()
        );
    }
}
