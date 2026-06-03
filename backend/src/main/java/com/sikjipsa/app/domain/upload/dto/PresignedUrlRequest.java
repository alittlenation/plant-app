package com.sikjipsa.app.domain.upload.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PresignedUrlRequest(
        @NotBlank @Size(max = 120) String fileName,
        @NotBlank @Size(max = 120) String contentType
) {
}
