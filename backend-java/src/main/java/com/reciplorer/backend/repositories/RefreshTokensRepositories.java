package com.reciplorer.backend.repositories;

import com.reciplorer.backend.models.RefreshTokens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokensRepositories extends JpaRepository<RefreshTokens, UUID> {
    Optional<RefreshTokens> findByToken(String token);
    Optional<RefreshTokens> findByUserEmail(String userEmail);
    boolean existsByUserEmail(String userEmail);
    void deleteByUserEmail(String userEmail);
}
