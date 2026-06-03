package com.sikjipsa.app.domain.upload.dto;

public record UploadCompleteResponse(
        String objectKey,
        String photoUrl,
        String contentType,
        Long sizeBytes
) {
}
