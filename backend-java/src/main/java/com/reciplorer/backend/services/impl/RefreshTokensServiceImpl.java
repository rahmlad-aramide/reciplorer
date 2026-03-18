package com.reciplorer.backend.services.impl;

import com.reciplorer.backend.dto.responses.RefreshTokenResponse;
import com.reciplorer.backend.exceptions.CustomNotFound;
import com.reciplorer.backend.exceptions.UserNotFound;
import com.reciplorer.backend.models.RefreshTokens;
import com.reciplorer.backend.models.Users;
import com.reciplorer.backend.repositories.RefreshTokensRepositories;
import com.reciplorer.backend.repositories.UserRepositories;
import com.reciplorer.backend.services.JwtService;
import com.reciplorer.backend.services.RefreshTokensService;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

@Service
public class RefreshTokensServiceImpl implements RefreshTokensService {

    private final UserRepositories userRepositories;
    private final JwtService jwtService;
    private final RefreshTokensRepositories refreshTokensRepositories;

    public RefreshTokensServiceImpl(UserRepositories userRepositories, JwtService jwtService, RefreshTokensRepositories refreshTokensRepositories) {
        this.userRepositories = userRepositories;
        this.jwtService = jwtService;
        this.refreshTokensRepositories = refreshTokensRepositories;
    }

    @Override
    public void saveRefreshToken(String token, Users user) {
        RefreshTokens refreshTokens = new RefreshTokens();
        refreshTokens.setToken(token);
        refreshTokens.setUser(user);
        refreshTokens.setIssuedAt(LocalDateTime.now());
        refreshTokens.setExpiresAt(LocalDateTime.now().plusMonths(6));
        refreshTokens.setRevoked(false);
        refreshTokensRepositories.save(refreshTokens);

    }

    @Override
    public boolean isRefreshTokenValid(String token) {
        Optional<RefreshTokens> refreshTokens = refreshTokensRepositories.findByToken(token);
        return refreshTokens.isPresent() && !refreshTokens.get().isRevoked()&&refreshTokens.get().getExpiresAt().isAfter(LocalDateTime.now());
    }

    @Override
    public void deleteRefreshToken(String email) {
        RefreshTokens refreshTokens = refreshTokensRepositories.findByUserEmail(email).orElseThrow(()->new CustomNotFound("Token not found for this email"));
        refreshTokensRepositories.delete(refreshTokens);
    }

    @Override
    public RefreshTokenResponse getRefreshTokens(String accessToken) {
        String email = jwtService.extractEmail(accessToken);
        RefreshTokens refreshTokens = refreshTokensRepositories.findByUserEmail(email).orElseThrow(()->new CustomNotFound("No token found for this user"));
        if (!isRefreshTokenValid(refreshTokens.getToken())) {
            throw new CustomNotFound("Invalid or expired refresh token");
        }
        long accessTokenExpiresAt = calculateExpiresIn(jwtService.tokenExpirationDate(accessToken));
        long refreshTokenExpiresAt = calculateExpiresIn(jwtService.tokenExpirationDate(refreshTokens.getToken()));
        return new RefreshTokenResponse(refreshTokens.getToken(),accessToken,refreshTokenExpiresAt,accessTokenExpiresAt);
    }

    @Override
    public RefreshTokenResponse generateRefreshTokens(String email) {
        if(email == null || email.isEmpty()) {
            throw new CustomNotFound("Email is required");
        }
        String accessToken = jwtService.generateAccessToken(email);
        String refreshToken = jwtService.generateRefreshToken(email);
        long accessTokenExpiresAt = calculateExpiresIn(jwtService.tokenExpirationDate(accessToken));
        long refreshTokenExpiresAt = calculateExpiresIn(jwtService.tokenExpirationDate(refreshToken));
        Users user = userRepositories.findByEmail(email).orElseThrow(()->new UserNotFound("Email not found"));
        if (refreshTokensRepositories.existsByUserEmail(email)){
            RefreshTokens existingRefreshTokens = refreshTokensRepositories.findByUserEmail(email).orElseThrow();
            existingRefreshTokens.setIssuedAt(LocalDateTime.now());
            existingRefreshTokens.setExpiresAt(LocalDateTime.now().plusMonths(6));
            existingRefreshTokens.setRevoked(false);
            refreshTokensRepositories.save(existingRefreshTokens);
        }else {
            saveRefreshToken(refreshToken,user);
        }
        return new RefreshTokenResponse(refreshToken,accessToken,refreshTokenExpiresAt,accessTokenExpiresAt);

    }
    private long calculateExpiresIn(LocalDateTime date) {
        return Math.max(0,date.toEpochSecond(ZoneOffset.UTC)-LocalDateTime.now().toEpochSecond(ZoneOffset.UTC));
    }
}
