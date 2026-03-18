package com.reciplorer.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
public class RefreshTokens {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String token;
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private Users user;
    @CurrentTimestamp
    @Column(nullable = false,updatable = false)
    private LocalDateTime issuedAt;
    @Column(nullable = false)
    private LocalDateTime expiresAt;
    private boolean revoked;


}
