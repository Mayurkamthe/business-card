package com.digitalcard.repository;

import com.digitalcard.model.Analytics;
import com.digitalcard.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, Long> {
    Optional<Analytics> findByCardAndEventDate(Card card, LocalDate date);
    List<Analytics> findByCardOrderByEventDateDesc(Card card);

    @Query("SELECT SUM(a.viewCount) FROM Analytics a WHERE a.card = :card")
    Long getTotalViews(Card card);

    @Query("SELECT SUM(a.whatsappClicks) FROM Analytics a WHERE a.card = :card")
    Long getTotalWhatsappClicks(Card card);

    @Query("SELECT SUM(a.phoneClicks) FROM Analytics a WHERE a.card = :card")
    Long getTotalPhoneClicks(Card card);

    List<Analytics> findByCardAndEventDateBetween(Card card, LocalDate start, LocalDate end);
}
