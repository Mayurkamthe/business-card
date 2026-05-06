package com.digitalcard.dto;

import lombok.Data;
import java.util.List;

@Data
public class CardDTO {
    private Long id;
    private String title;
    private String slug;
    private String theme;
    private String phone;
    private String whatsapp;
    private String email;
    private String website;
    private String address;
    private String mapLink;
    private String logoUrl;
    private String tagline;
    private String instagram;
    private String facebook;
    private String twitter;
    private String linkedin;
    private String youtube;
    private boolean published;
    private List<SectionDTO> sections;

    @Data
    public static class SectionDTO {
        private Long id;
        private String type;
        private String title;
        private String content;
        private int sortOrder;
    }
}
