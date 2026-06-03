package com.sikjipsa.app.domain.event;

import com.sikjipsa.app.domain.plant.Plant;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "plant_event")
public class PlantEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "plant_id", nullable = false)
    private Plant plant;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false, length = 30)
    private PlantEventType eventType;

    @Column(name = "custom_title", length = 80)
    private String customTitle;

    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;

    @Column(length = 2000)
    private String memo;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected PlantEvent() {
    }

    public PlantEvent(Plant plant, PlantEventType eventType, String customTitle, LocalDate eventDate, String memo) {
        this.plant = plant;
        this.eventType = eventType;
        this.customTitle = customTitle;
        this.eventDate = eventDate;
        this.memo = memo;
    }

    @PrePersist
    void prePersist() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = Instant.now();
    }

    public void update(PlantEventType eventType, String customTitle, LocalDate eventDate, String memo) {
        this.eventType = eventType;
        this.customTitle = customTitle;
        this.eventDate = eventDate;
        this.memo = memo;
    }

    public Long getId() { return id; }
    public Plant getPlant() { return plant; }
    public PlantEventType getEventType() { return eventType; }
    public String getCustomTitle() { return customTitle; }
    public LocalDate getEventDate() { return eventDate; }
    public String getMemo() { return memo; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
