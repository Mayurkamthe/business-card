package com.digitalcard.controller;

import com.digitalcard.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AnalyticsController {

    @Autowired private AnalyticsService analyticsService;

    @PostMapping("/public/track/view/{slug}")
    public ResponseEntity<Void> trackView(@PathVariable String slug) {
        analyticsService.trackView(slug);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/public/track/click/{slug}/{type}")
    public ResponseEntity<Void> trackClick(@PathVariable String slug, @PathVariable String type) {
        analyticsService.trackClick(slug, type);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/analytics/{cardId}")
    public ResponseEntity<Map<String, Object>> getAnalytics(@PathVariable Long cardId, Authentication auth) {
        return ResponseEntity.ok(analyticsService.getCardAnalytics(cardId, auth.getName()));
    }
}
