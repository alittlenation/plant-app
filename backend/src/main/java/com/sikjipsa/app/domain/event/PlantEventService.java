package com.sikjipsa.app.domain.event;

import com.sikjipsa.app.domain.event.dto.PlantEventRequest;
import com.sikjipsa.app.domain.event.dto.PlantEventResponse;
import com.sikjipsa.app.domain.photo.PlantPhotoRepository;
import com.sikjipsa.app.domain.plant.Plant;
import com.sikjipsa.app.domain.plant.PlantService;
import com.sikjipsa.app.global.error.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class PlantEventService {

    private final PlantEventRepository eventRepository;
    private final PlantPhotoRepository photoRepository;
    private final PlantService plantService;

    public PlantEventService(PlantEventRepository eventRepository, PlantPhotoRepository photoRepository, PlantService plantService) {
        this.eventRepository = eventRepository;
        this.photoRepository = photoRepository;
        this.plantService = plantService;
    }

    public List<PlantEventResponse> findAll(Long plantId) {
        plantService.findPlant(plantId);
        return eventRepository.findByPlantIdOrderByEventDateDescCreatedAtDesc(plantId).stream()
                .map(PlantEventResponse::from)
                .toList();
    }

    @Transactional
    public Long create(Long plantId, PlantEventRequest request) {
        Plant plant = plantService.findPlant(plantId);
        validate(request);
        PlantEvent event = eventRepository.save(new PlantEvent(
                plant,
                request.eventType(),
                normalizedCustomTitle(request),
                request.eventDate(),
                request.memo()
        ));
        attachPhotos(plantId, event, request.photoIds());
        return event.getId();
    }

    @Transactional
    public void update(Long plantId, Long eventId, PlantEventRequest request) {
        validate(request);
        PlantEvent event = findEvent(plantId, eventId);
        event.update(request.eventType(), normalizedCustomTitle(request), request.eventDate(), request.memo());
        attachPhotos(plantId, event, request.photoIds());
    }

    @Transactional
    public void delete(Long plantId, Long eventId) {
        PlantEvent event = findEvent(plantId, eventId);
        eventRepository.delete(event);
    }

    private PlantEvent findEvent(Long plantId, Long eventId) {
        plantService.findPlant(plantId);
        return eventRepository.findByIdAndPlantId(eventId, plantId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "EVENT_NOT_FOUND", "Event not found."));
    }

    private void validate(PlantEventRequest request) {
        if (request.eventType() == PlantEventType.CUSTOM
                && !StringUtils.hasText(request.customTitle())
                && !StringUtils.hasText(request.memo())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_REQUEST", "Custom event requires a title or memo.");
        }
    }

    private String normalizedCustomTitle(PlantEventRequest request) {
        return request.eventType() == PlantEventType.CUSTOM ? request.customTitle() : null;
    }

    private void attachPhotos(Long plantId, PlantEvent event, List<Long> photoIds) {
        if (photoIds == null || photoIds.isEmpty()) {
            return;
        }
        for (Long photoId : photoIds) {
            photoRepository.findByIdAndPlantId(photoId, plantId).ifPresent(photo -> photo.attachEvent(event));
        }
    }
}
