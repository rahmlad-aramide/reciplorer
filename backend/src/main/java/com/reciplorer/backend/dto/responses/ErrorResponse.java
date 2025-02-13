package com.reciplorer.backend.dto.responses;

public record ErrorResponse(int code, String message,long timestamp) {
}
