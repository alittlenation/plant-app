package com.sikjipsa.app.domain.upload.dto;

public record PresignedUrlResponse(
        String objectKey,
        String uploadUrl,
        String publicUrl
) {
}
