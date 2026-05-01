package com.digitalcard.repository;

import com.digitalcard.model.Section;
import com.digitalcard.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SectionRepository extends JpaRepository<Section, Long> {
    List<Section> findByCardOrderBySortOrderAsc(Card card);
    void deleteByCard(Card card);
}
