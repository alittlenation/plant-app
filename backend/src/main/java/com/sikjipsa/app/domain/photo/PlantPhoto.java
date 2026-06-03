package com.sikjipsa.app.domain.photo;

import com.sikjipsa.app.domain.event.PlantEvent;
import com.sikjipsa.app.domain.plant.Plant;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "plant_photo")
public class PlantPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "plant_id", nullable = false)
    private Plant plant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private PlantEvent event;

    @Column(name = "photo_url", nullable = false, length = 1000)
    private String photoUrl;

    @Column(name = "taken_at", nullable = false)
    private LocalDate takenAt;

    @Column(length = 2000)
    private String memo;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected PlantPhoto() {
    }

    public PlantPhoto(Plant plant, PlantEvent event, String photoUrl, LocalDate takenAt, String memo, Integer sortOrder) {
        this.plant = plant;
        this.event = event;
        this.photoUrl = photoUrl;
        this.takenAt = takenAt;
        this.memo = memo;
        this.sortOrder = sortOrder;
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

    public void update(String photoUrl, LocalDate takenAt, String memo, Integer sortOrder) {
        this.photoUrl = photoUrl;
        this.takenAt = takenAt;
        this.memo = memo;
        this.sortOrder = sortOrder;
    }

    public void attachEvent(PlantEvent event) {
        this.event = event;
    }

    public Long getId() { return id; }
    public Plant getPlant() { return plant; }
    public PlantEvent getEvent() { return event; }
    public String getPhotoUrl() { return photoUrl; }
    public LocalDate getTakenAt() { return takenAt; }
    public String getMemo() { return memo; }
    public Integer getSortOrder() { return sortOrder; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
