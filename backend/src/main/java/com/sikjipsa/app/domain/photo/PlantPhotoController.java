package com.sikjipsa.app.domain.photo;

import com.sikjipsa.app.domain.photo.dto.PlantPhotoRequest;
import com.sikjipsa.app.domain.photo.dto.PlantPhotoResponse;
import com.sikjipsa.app.global.response.CreatedResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/plants/{plantId}/photos")
public class PlantPhotoController {

    private final PlantPhotoService photoService;

    public PlantPhotoController(PlantPhotoService photoService) {
        this.photoService = photoService;
    }

    @GetMapping
    List<PlantPhotoResponse> findAll(@PathVariable Long plantId) {
        return photoService.findAll(plantId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    CreatedResponse create(@PathVariable Long plantId, @Valid @RequestBody PlantPhotoRequest request) {
        return new CreatedResponse(photoService.create(plantId, request));
    }

    @PatchMapping("/{photoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void update(@PathVariable Long plantId, @PathVariable Long photoId, @Valid @RequestBody PlantPhotoRequest request) {
        photoService.update(plantId, photoId, request);
    }

    @DeleteMapping("/{photoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long plantId, @PathVariable Long photoId) {
        photoService.delete(plantId, photoId);
    }
}
