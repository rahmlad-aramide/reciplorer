package com.reciplorer.backend.repositories;

import com.reciplorer.backend.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepositories extends JpaRepository<Users, UUID> {

    Optional<Users> findByEmail(String email);
}
