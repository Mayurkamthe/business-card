package com.digitalcard.controller;

import com.digitalcard.dto.CardDTO;
import com.digitalcard.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CardController {

    @Autowired private CardService cardService;

    @GetMapping("/cards")
    public ResponseEntity<List<CardDTO>> getMyCards(Authentication auth) {
        return ResponseEntity.ok(cardService.getUserCards(auth.getName()));
    }

    @PostMapping("/cards")
    public ResponseEntity<CardDTO> createCard(@RequestBody CardDTO dto, Authentication auth) {
        return ResponseEntity.ok(cardService.createCard(auth.getName(), dto));
    }

    @PutMapping("/cards/{id}")
    public ResponseEntity<CardDTO> updateCard(@PathVariable Long id, @RequestBody CardDTO dto, Authentication auth) {
        return ResponseEntity.ok(cardService.updateCard(id, auth.getName(), dto));
    }

    @DeleteMapping("/cards/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id, Authentication auth) {
        cardService.deleteCard(id, auth.getName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/public/card/{slug}")
    public ResponseEntity<CardDTO> getPublicCard(@PathVariable String slug) {
        return ResponseEntity.ok(cardService.getPublicCard(slug));
    }
}
