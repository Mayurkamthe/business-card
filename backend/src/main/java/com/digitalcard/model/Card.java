package com.digitalcard.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "cards")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(unique = true, nullable = false)
    private String slug;

    private String theme = "modern";

    // Contact Info
    private String phone;
    private String whatsapp;
    private String email;
    private String website;
    private String address;
    private String mapLink;
    private String logoUrl;
    private String tagline;

    // Social Links
    private String instagram;
    private String facebook;
    private String twitter;
    private String linkedin;
    private String youtube;

    @Column(name = "is_published")
    private boolean published = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
