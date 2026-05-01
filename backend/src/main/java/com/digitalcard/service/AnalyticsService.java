package com.digitalcard.service;

import com.digitalcard.model.Analytics;
import com.digitalcard.model.Card;
import com.digitalcard.repository.AnalyticsRepository;
import com.digitalcard.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired private AnalyticsRepository analyticsRepository;
    @Autowired private CardRepository cardRepository;

    @Transactional
    public void trackView(String slug) {
        cardRepository.findBySlug(slug).ifPresent(card -> {
            Analytics analytics = getOrCreateToday(card);
            analytics.setViewCount(analytics.getViewCount() + 1);
            analyticsRepository.save(analytics);
        });
    }

    @Transactional
    public void trackClick(String slug, String type) {
        cardRepository.findBySlug(slug).ifPresent(card -> {
            Analytics analytics = getOrCreateToday(card);
            switch (type) {
                case "whatsapp" -> analytics.setWhatsappClicks(analytics.getWhatsappClicks() + 1);
                case "phone" -> analytics.setPhoneClicks(analytics.getPhoneClicks() + 1);
                default -> analytics.setLinkClicks(analytics.getLinkClicks() + 1);
            }
            analyticsRepository.save(analytics);
        });
    }

    public Map<String, Object> getCardAnalytics(Long cardId, String email) {
        Card card = cardRepository.findById(cardId).orElseThrow();
        Map<String, Object> result = new HashMap<>();
        result.put("totalViews", analyticsRepository.getTotalViews(card));
        result.put("totalWhatsappClicks", analyticsRepository.getTotalWhatsappClicks(card));
        result.put("totalPhoneClicks", analyticsRepository.getTotalPhoneClicks(card));
        result.put("last30Days", analyticsRepository.findByCardAndEventDateBetween(
                card, LocalDate.now().minusDays(30), LocalDate.now()));
        return result;
    }

    private Analytics getOrCreateToday(Card card) {
        return analyticsRepository.findByCardAndEventDate(card, LocalDate.now())
                .orElseGet(() -> {
                    Analytics a = new Analytics();
                    a.setCard(card);
                    a.setEventDate(LocalDate.now());
                    return analyticsRepository.save(a);
                });
    }
}
