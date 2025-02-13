package com.reciplorer.backend.dto.responses;

public record RefreshTokenResponse(String refreshToken,String accessToken,long refreshTokenExpiresAt,long accessTokenExpiresAt) {
}
