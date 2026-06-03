package com.sikjipsa.app.domain.upload;

import com.sikjipsa.app.domain.upload.dto.PresignedUrlRequest;
import com.sikjipsa.app.domain.upload.dto.PresignedUrlResponse;
import com.sikjipsa.app.domain.upload.dto.UploadCompleteRequest;
import com.sikjipsa.app.domain.upload.dto.UploadCompleteResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/uploads")
public class UploadController {

    private final StorageService storageService;

    public UploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/presigned-url")
    PresignedUrlResponse createPresignedUrl(@Valid @RequestBody PresignedUrlRequest request) {
        return storageService.createUploadUrl(request.fileName(), request.contentType());
    }

    @PostMapping("/complete")
    UploadCompleteResponse complete(@Valid @RequestBody UploadCompleteRequest request) {
        return storageService.complete(request.objectKey(), request.contentType(), request.sizeBytes());
    }
}
