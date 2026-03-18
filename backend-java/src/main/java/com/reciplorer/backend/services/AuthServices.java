package com.reciplorer.backend.services;

import com.reciplorer.backend.dto.requests.LoginRequest;
import com.reciplorer.backend.dto.responses.AuthResponse;
import org.springframework.stereotype.Service;

@Service
public interface AuthServices {
    AuthResponse register(LoginRequest request);
    AuthResponse login(LoginRequest request);
}
