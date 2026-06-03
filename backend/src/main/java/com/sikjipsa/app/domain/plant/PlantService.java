package com.sikjipsa.app.domain.plant;

import com.sikjipsa.app.domain.event.PlantEventRepository;
import com.sikjipsa.app.domain.event.PlantEventType;
import com.sikjipsa.app.domain.event.dto.PlantEventResponse;
import com.sikjipsa.app.domain.photo.PlantPhotoRepository;
import com.sikjipsa.app.domain.photo.dto.PlantPhotoResponse;
import com.sikjipsa.app.domain.plant.dto.PlantCreateRequest;
import com.sikjipsa.app.domain.plant.dto.PlantDetailResponse;
import com.sikjipsa.app.domain.plant.dto.PlantListResponse;
import com.sikjipsa.app.domain.plant.dto.PlantUpdateRequest;
import com.sikjipsa.app.global.error.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class PlantService {

    private final PlantRepository plantRepository;
    private final PlantEventRepository eventRepository;
    private final PlantPhotoRepository photoRepository;

    public PlantService(PlantRepository plantRepository, PlantEventRepository eventRepository, PlantPhotoRepository photoRepository) {
        this.plantRepository = plantRepository;
        this.eventRepository = eventRepository;
        this.photoRepository = photoRepository;
    }

    public List<PlantListResponse> findAll() {
        return plantRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toListResponse)
                .toList();
    }

    public PlantDetailResponse findDetail(Long plantId) {
        Plant plant = findPlant(plantId);
        return toDetailResponse(plant);
    }

    @Transactional
    public Long create(PlantCreateRequest request) {
        Plant plant = new Plant(
                request.name(),
                request.speciesName(),
                request.nickname(),
                request.acquiredDate(),
                request.coverPhotoUrl(),
                request.memo()
        );
        return plantRepository.save(plant).getId();
    }

    @Transactional
    public void update(Long plantId, PlantUpdateRequest request) {
        Plant plant = findPlant(plantId);
        plant.update(
                request.name(),
                request.speciesName(),
                request.nickname(),
                request.acquiredDate(),
                request.coverPhotoUrl(),
                request.memo()
        );
    }

    @Transactional
    public void delete(Long plantId) {
        Plant plant = findPlant(plantId);
        photoRepository.deleteByPlantId(plantId);
        eventRepository.deleteByPlantId(plantId);
        plantRepository.delete(plant);
    }

    public Plant findPlant(Long plantId) {
        return plantRepository.findById(plantId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "PLANT_NOT_FOUND", "Plant not found."));
    }

    private PlantListResponse toListResponse(Plant plant) {
        LocalDate lastWateredAt = lastEventDate(plant.getId(), PlantEventType.WATERING);
        LocalDate latestEventAt = eventRepository.findFirstByPlantIdOrderByEventDateDescCreatedAtDesc(plant.getId())
                .map(event -> event.getEventDate())
                .orElse(null);
        return new PlantListResponse(
                plant.getId(),
                plant.getName(),
                plant.getSpeciesName(),
                plant.getNickname(),
                plant.getCoverPhotoUrl(),
                lastWateredAt,
                latestEventAt,
                photoRepository.countByPlantId(plant.getId()),
                plant.getCreatedAt(),
                plant.getUpdatedAt()
        );
    }

    private PlantDetailResponse toDetailResponse(Plant plant) {
        Long plantId = plant.getId();
        PlantDetailResponse.PlantSummary summary = new PlantDetailResponse.PlantSummary(
                lastEventDate(plantId, PlantEventType.WATERING),
                lastEventDate(plantId, PlantEventType.NUTRIENT),
                lastEventDate(plantId, PlantEventType.REPOTTING),
                lastEventDate(plantId, PlantEventType.PRUNING),
                eventRepository.findFirstByPlantIdOrderByEventDateDescCreatedAtDesc(plantId).map(event -> event.getEventDate()).orElse(null),
                eventRepository.countByPlantId(plantId),
                photoRepository.countByPlantId(plantId)
        );
        return new PlantDetailResponse(
                plant.getId(),
                plant.getName(),
                plant.getSpeciesName(),
                plant.getNickname(),
                plant.getAcquiredDate(),
                plant.getCoverPhotoUrl(),
                plant.getMemo(),
                summary,
                eventRepository.findTop5ByPlantIdOrderByEventDateDescCreatedAtDesc(plantId).stream().map(PlantEventResponse::from).toList(),
                photoRepository.findTop6ByPlantIdOrderByTakenAtDescCreatedAtDesc(plantId).stream().map(PlantPhotoResponse::from).toList(),
                plant.getCreatedAt(),
                plant.getUpdatedAt()
        );
    }

    private LocalDate lastEventDate(Long plantId, PlantEventType type) {
        return eventRepository.findFirstByPlantIdAndEventTypeOrderByEventDateDescCreatedAtDesc(plantId, type)
                .map(event -> event.getEventDate())
                .orElse(null);
    }
}
