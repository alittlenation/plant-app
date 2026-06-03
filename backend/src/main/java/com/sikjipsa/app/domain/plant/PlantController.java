package com.sikjipsa.app.domain.plant;

import com.sikjipsa.app.domain.plant.dto.PlantCreateRequest;
import com.sikjipsa.app.domain.plant.dto.PlantDetailResponse;
import com.sikjipsa.app.domain.plant.dto.PlantListResponse;
import com.sikjipsa.app.domain.plant.dto.PlantUpdateRequest;
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
@RequestMapping("/api/v1/plants")
public class PlantController {

    private final PlantService plantService;

    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping
    List<PlantListResponse> findAll() {
        return plantService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    CreatedResponse create(@Valid @RequestBody PlantCreateRequest request) {
        return new CreatedResponse(plantService.create(request));
    }

    @GetMapping("/{plantId}")
    PlantDetailResponse findDetail(@PathVariable Long plantId) {
        return plantService.findDetail(plantId);
    }

    @PatchMapping("/{plantId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void update(@PathVariable Long plantId, @Valid @RequestBody PlantUpdateRequest request) {
        plantService.update(plantId, request);
    }

    @DeleteMapping("/{plantId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long plantId) {
        plantService.delete(plantId);
    }
}
