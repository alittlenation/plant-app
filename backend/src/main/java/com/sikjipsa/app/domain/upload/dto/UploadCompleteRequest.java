package com.sikjipsa.app.domain.upload.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UploadCompleteRequest(
        @NotBlank @Size(max = 500) String objectKey,
        @NotBlank @Size(max = 120) String contentType,
        @NotNull Long sizeBytes
) {
}
