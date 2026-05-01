package com.digitalcard.repository;

import com.digitalcard.model.Card;
import com.digitalcard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByUser(User user);
    Optional<Card> findBySlug(String slug);
    boolean existsBySlug(String slug);
    List<Card> findByUserOrderByCreatedAtDesc(User user);
}
