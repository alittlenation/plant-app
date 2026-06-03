package com.sikjipsa.app.domain.upload;

import com.sikjipsa.app.domain.upload.dto.PresignedUrlResponse;
import com.sikjipsa.app.domain.upload.dto.UploadCompleteResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class LocalCompatibleStorageService implements StorageService {

    private final String bucket;
    private final String publicBaseUrl;

    public LocalCompatibleStorageService(
            @Value("${app.storage.bucket}") String bucket,
            @Value("${app.storage.public-base-url}") String publicBaseUrl
    ) {
        this.bucket = bucket;
        this.publicBaseUrl = publicBaseUrl;
    }

    @Override
    public PresignedUrlResponse createUploadUrl(String fileName, String contentType) {
        String extension = extension(fileName);
        String objectKey = "plants/%d-%s%s".formatted(Instant.now().toEpochMilli(), UUID.randomUUID(), extension);
        String publicUrl = "%s/%s".formatted(publicBaseUrl, objectKey);
        String uploadUrl = "http://localhost:9000/%s/%s".formatted(bucket, objectKey);
        return new PresignedUrlResponse(objectKey, uploadUrl, publicUrl);
    }

    @Override
    public UploadCompleteResponse complete(String objectKey, String contentType, Long sizeBytes) {
        return new UploadCompleteResponse(objectKey, "%s/%s".formatted(publicBaseUrl, objectKey), contentType, sizeBytes);
    }

    private String extension(String fileName) {
        int index = fileName.lastIndexOf('.');
        if (index < 0) {
            return "";
        }
        return fileName.substring(index);
    }
}
