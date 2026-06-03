package com.sikjipsa.app.domain.plant.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record PlantUpdateRequest(
        @NotBlank @Size(max = 80) String name,
        @Size(max = 120) String speciesName,
        @Size(max = 80) String nickname,
        LocalDate acquiredDate,
        @Size(max = 1000) String coverPhotoUrl,
        @Size(max = 2000) String memo
) {
}
