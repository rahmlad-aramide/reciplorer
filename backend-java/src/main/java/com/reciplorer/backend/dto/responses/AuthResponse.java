package com.reciplorer.backend.dto.responses;

import java.util.UUID;

public record AuthResponse(UUID userId,String email,RefreshTokenResponse tokens) {
}
