package com.sikjipsa.app.domain.photo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record PlantPhotoRequest(
        Long eventId,
        @NotBlank @Size(max = 1000) String photoUrl,
        @NotNull LocalDate takenAt,
        @Size(max = 2000) String memo,
        Integer sortOrder
) {
}
