package com.sikjipsa.app.domain.upload;

import com.sikjipsa.app.domain.upload.dto.PresignedUrlResponse;
import com.sikjipsa.app.domain.upload.dto.UploadCompleteResponse;

public interface StorageService {

    PresignedUrlResponse createUploadUrl(String fileName, String contentType);

    UploadCompleteResponse complete(String objectKey, String contentType, Long sizeBytes);
}
