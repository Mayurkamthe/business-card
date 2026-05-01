package com.digitalcard.service;

import com.digitalcard.dto.CardDTO;
import com.digitalcard.model.*;
import com.digitalcard.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.text.Normalizer;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class CardService {

    @Autowired private CardRepository cardRepository;
    @Autowired private SectionRepository sectionRepository;
    @Autowired private UserRepository userRepository;

    public List<CardDTO> getUserCards(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return cardRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public CardDTO createCard(String email, CardDTO dto) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Card card = new Card();
        card.setUser(user);
        mapDTOToCard(dto, card);
        card.setSlug(generateSlug(dto.getTitle(), user.getName()));
        Card saved = cardRepository.save(card);
        saveSections(dto.getSections(), saved);
        return toDTO(saved);
    }

    @Transactional
    public CardDTO updateCard(Long cardId, String email, CardDTO dto) {
        Card card = cardRepository.findById(cardId).orElseThrow();
        if (!card.getUser().getEmail().equals(email)) throw new RuntimeException("Unauthorized");
        mapDTOToCard(dto, card);
        Card saved = cardRepository.save(card);
        sectionRepository.deleteByCard(saved);
        saveSections(dto.getSections(), saved);
        return toDTO(saved);
    }

    @Transactional
    public void deleteCard(Long cardId, String email) {
        Card card = cardRepository.findById(cardId).orElseThrow();
        if (!card.getUser().getEmail().equals(email)) throw new RuntimeException("Unauthorized");
        sectionRepository.deleteByCard(card);
        cardRepository.delete(card);
    }

    public CardDTO getPublicCard(String slug) {
        Card card = cardRepository.findBySlug(slug).orElseThrow();
        return toDTO(card);
    }

    private void mapDTOToCard(CardDTO dto, Card card) {
        if (dto.getTitle() != null) card.setTitle(dto.getTitle());
        if (dto.getTheme() != null) card.setTheme(dto.getTheme());
        if (dto.getPhone() != null) card.setPhone(dto.getPhone());
        if (dto.getWhatsapp() != null) card.setWhatsapp(dto.getWhatsapp());
        if (dto.getEmail() != null) card.setEmail(dto.getEmail());
        if (dto.getWebsite() != null) card.setWebsite(dto.getWebsite());
        if (dto.getAddress() != null) card.setAddress(dto.getAddress());
        if (dto.getMapLink() != null) card.setMapLink(dto.getMapLink());
        if (dto.getLogoUrl() != null) card.setLogoUrl(dto.getLogoUrl());
        if (dto.getTagline() != null) card.setTagline(dto.getTagline());
        if (dto.getInstagram() != null) card.setInstagram(dto.getInstagram());
        if (dto.getFacebook() != null) card.setFacebook(dto.getFacebook());
        if (dto.getTwitter() != null) card.setTwitter(dto.getTwitter());
        if (dto.getLinkedin() != null) card.setLinkedin(dto.getLinkedin());
        if (dto.getYoutube() != null) card.setYoutube(dto.getYoutube());
        card.setPublished(dto.isPublished());
    }

    private void saveSections(List<CardDTO.SectionDTO> sections, Card card) {
        if (sections == null) return;
        for (int i = 0; i < sections.size(); i++) {
            CardDTO.SectionDTO s = sections.get(i);
            Section section = new Section();
            section.setCard(card);
            section.setType(s.getType());
            section.setTitle(s.getTitle());
            section.setContent(s.getContent());
            section.setSortOrder(i);
            sectionRepository.save(section);
        }
    }

    private String generateSlug(String title, String name) {
        String base = (title != null ? title : name).toLowerCase();
        base = Normalizer.normalize(base, Normalizer.Form.NFD);
        base = Pattern.compile("[^a-z0-9\\s-]").matcher(base).replaceAll("");
        base = base.trim().replaceAll("\\s+", "-");
        String slug = base;
        int counter = 1;
        while (cardRepository.existsBySlug(slug)) {
            slug = base + "-" + counter++;
        }
        return slug;
    }

    public CardDTO toDTO(Card card) {
        CardDTO dto = new CardDTO();
        dto.setId(card.getId());
        dto.setTitle(card.getTitle());
        dto.setSlug(card.getSlug());
        dto.setTheme(card.getTheme());
        dto.setPhone(card.getPhone());
        dto.setWhatsapp(card.getWhatsapp());
        dto.setEmail(card.getEmail());
        dto.setWebsite(card.getWebsite());
        dto.setAddress(card.getAddress());
        dto.setMapLink(card.getMapLink());
        dto.setLogoUrl(card.getLogoUrl());
        dto.setTagline(card.getTagline());
        dto.setInstagram(card.getInstagram());
        dto.setFacebook(card.getFacebook());
        dto.setTwitter(card.getTwitter());
        dto.setLinkedin(card.getLinkedin());
        dto.setYoutube(card.getYoutube());
        dto.setPublished(card.isPublished());
        List<Section> sections = sectionRepository.findByCardOrderBySortOrderAsc(card);
        dto.setSections(sections.stream().map(s -> {
            CardDTO.SectionDTO sd = new CardDTO.SectionDTO();
            sd.setId(s.getId());
            sd.setType(s.getType());
            sd.setTitle(s.getTitle());
            sd.setContent(s.getContent());
            sd.setSortOrder(s.getSortOrder());
            return sd;
        }).collect(Collectors.toList()));
        return dto;
    }
}
