package com.reciplorer.backend.models;

import com.reciplorer.backend.models.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false,unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    private boolean enabled;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role=UserRole.USER;
    @CurrentTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
