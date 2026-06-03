package com.sikjipsa.app.domain.event.dto;

import com.sikjipsa.app.domain.event.PlantEventType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record PlantEventRequest(
        @NotNull PlantEventType eventType,
        @Size(max = 80) String customTitle,
        @NotNull LocalDate eventDate,
        @Size(max = 2000) String memo,
        List<Long> photoIds
) {
}
