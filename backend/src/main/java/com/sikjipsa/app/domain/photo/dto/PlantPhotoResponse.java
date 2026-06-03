package com.sikjipsa.app.domain.photo.dto;

import com.sikjipsa.app.domain.photo.PlantPhoto;

import java.time.Instant;
import java.time.LocalDate;

public record PlantPhotoResponse(
        Long id,
        Long plantId,
        Long eventId,
        String photoUrl,
        LocalDate takenAt,
        String memo,
        Integer sortOrder,
        Instant createdAt,
        Instant updatedAt
) {
    public static PlantPhotoResponse from(PlantPhoto photo) {
        return new PlantPhotoResponse(
                photo.getId(),
                photo.getPlant().getId(),
                photo.getEvent() == null ? null : photo.getEvent().getId(),
                photo.getPhotoUrl(),
                photo.getTakenAt(),
                photo.getMemo(),
                photo.getSortOrder(),
                photo.getCreatedAt(),
                photo.getUpdatedAt()
        );
    }
}
