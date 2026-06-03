package com.sikjipsa.app.domain.event;

import com.sikjipsa.app.domain.event.dto.PlantEventRequest;
import com.sikjipsa.app.domain.event.dto.PlantEventResponse;
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
@RequestMapping("/api/v1/plants/{plantId}/events")
public class PlantEventController {

    private final PlantEventService eventService;

    public PlantEventController(PlantEventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    List<PlantEventResponse> findAll(@PathVariable Long plantId) {
        return eventService.findAll(plantId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    CreatedResponse create(@PathVariable Long plantId, @Valid @RequestBody PlantEventRequest request) {
        return new CreatedResponse(eventService.create(plantId, request));
    }

    @PatchMapping("/{eventId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void update(@PathVariable Long plantId, @PathVariable Long eventId, @Valid @RequestBody PlantEventRequest request) {
        eventService.update(plantId, eventId, request);
    }

    @DeleteMapping("/{eventId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long plantId, @PathVariable Long eventId) {
        eventService.delete(plantId, eventId);
    }
}
