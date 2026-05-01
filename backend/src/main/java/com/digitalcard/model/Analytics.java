package com.digitalcard.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "analytics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Analytics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", nullable = false)
    private Card card;

    @Column(name = "event_date")
    private LocalDate eventDate = LocalDate.now();

    @Column(name = "view_count")
    private int viewCount = 0;

    @Column(name = "whatsapp_clicks")
    private int whatsappClicks = 0;

    @Column(name = "phone_clicks")
    private int phoneClicks = 0;

    @Column(name = "link_clicks")
    private int linkClicks = 0;
}
