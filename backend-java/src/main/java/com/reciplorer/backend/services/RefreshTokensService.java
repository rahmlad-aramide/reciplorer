package com.reciplorer.backend.services;

import com.reciplorer.backend.dto.responses.RefreshTokenResponse;
import com.reciplorer.backend.models.Users;
import org.springframework.stereotype.Service;

@Service
public interface RefreshTokensService {
    void saveRefreshToken(String token, Users user);
    boolean isRefreshTokenValid(String token);
    void deleteRefreshToken(String token);
    RefreshTokenResponse getRefreshTokens(String accessToken);
    RefreshTokenResponse generateRefreshTokens(String email);
}
