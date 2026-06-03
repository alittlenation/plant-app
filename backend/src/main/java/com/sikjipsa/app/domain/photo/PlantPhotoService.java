package com.sikjipsa.app.domain.photo;

import com.sikjipsa.app.domain.event.PlantEvent;
import com.sikjipsa.app.domain.event.PlantEventRepository;
import com.sikjipsa.app.domain.photo.dto.PlantPhotoRequest;
import com.sikjipsa.app.domain.photo.dto.PlantPhotoResponse;
import com.sikjipsa.app.domain.plant.Plant;
import com.sikjipsa.app.domain.plant.PlantService;
import com.sikjipsa.app.global.error.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class PlantPhotoService {

    private final PlantPhotoRepository photoRepository;
    private final PlantEventRepository eventRepository;
    private final PlantService plantService;

    public PlantPhotoService(PlantPhotoRepository photoRepository, PlantEventRepository eventRepository, PlantService plantService) {
        this.photoRepository = photoRepository;
        this.eventRepository = eventRepository;
        this.plantService = plantService;
    }

    public List<PlantPhotoResponse> findAll(Long plantId) {
        plantService.findPlant(plantId);
        return photoRepository.findByPlantIdOrderByTakenAtDescCreatedAtDesc(plantId).stream()
                .map(PlantPhotoResponse::from)
                .toList();
    }

    @Transactional
    public Long create(Long plantId, PlantPhotoRequest request) {
        Plant plant = plantService.findPlant(plantId);
        PlantEvent event = resolveEvent(plantId, request.eventId());
        PlantPhoto photo = new PlantPhoto(plant, event, request.photoUrl(), request.takenAt(), request.memo(), request.sortOrder());
        return photoRepository.save(photo).getId();
    }

    @Transactional
    public void update(Long plantId, Long photoId, PlantPhotoRequest request) {
        PlantPhoto photo = findPhoto(plantId, photoId);
        photo.update(request.photoUrl(), request.takenAt(), request.memo(), request.sortOrder());
        photo.attachEvent(resolveEvent(plantId, request.eventId()));
    }

    @Transactional
    public void delete(Long plantId, Long photoId) {
        PlantPhoto photo = findPhoto(plantId, photoId);
        photoRepository.delete(photo);
    }

    private PlantPhoto findPhoto(Long plantId, Long photoId) {
        plantService.findPlant(plantId);
        return photoRepository.findByIdAndPlantId(photoId, plantId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "PHOTO_NOT_FOUND", "Photo not found."));
    }

    private PlantEvent resolveEvent(Long plantId, Long eventId) {
        if (eventId == null) {
            return null;
        }
        return eventRepository.findByIdAndPlantId(eventId, plantId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "EVENT_NOT_FOUND", "Event not found."));
    }
}
