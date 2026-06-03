package com.sikjipsa.app.domain.plant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "plant")
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String name;

    @Column(name = "species_name", length = 120)
    private String speciesName;

    @Column(length = 80)
    private String nickname;

    @Column(name = "acquired_date")
    private LocalDate acquiredDate;

    @Column(name = "cover_photo_url", length = 1000)
    private String coverPhotoUrl;

    @Column(length = 2000)
    private String memo;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected Plant() {
    }

    public Plant(String name, String speciesName, String nickname, LocalDate acquiredDate, String coverPhotoUrl, String memo) {
        this.name = name;
        this.speciesName = speciesName;
        this.nickname = nickname;
        this.acquiredDate = acquiredDate;
        this.coverPhotoUrl = coverPhotoUrl;
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

    public void update(String name, String speciesName, String nickname, LocalDate acquiredDate, String coverPhotoUrl, String memo) {
        this.name = name;
        this.speciesName = speciesName;
        this.nickname = nickname;
        this.acquiredDate = acquiredDate;
        this.coverPhotoUrl = coverPhotoUrl;
        this.memo = memo;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getSpeciesName() { return speciesName; }
    public String getNickname() { return nickname; }
    public LocalDate getAcquiredDate() { return acquiredDate; }
    public String getCoverPhotoUrl() { return coverPhotoUrl; }
    public String getMemo() { return memo; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
