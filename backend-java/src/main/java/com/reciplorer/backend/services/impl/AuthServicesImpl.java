package com.reciplorer.backend.services.impl;

import com.reciplorer.backend.dto.requests.LoginRequest;
import com.reciplorer.backend.dto.responses.AuthResponse;
import com.reciplorer.backend.dto.responses.RefreshTokenResponse;
import com.reciplorer.backend.exceptions.CustomBadRequest;
import com.reciplorer.backend.exceptions.UserAlreadyExists;
import com.reciplorer.backend.exceptions.UserNotFound;
import com.reciplorer.backend.models.Users;
import com.reciplorer.backend.repositories.UserRepositories;
import com.reciplorer.backend.services.AuthServices;
import com.reciplorer.backend.services.JwtService;
import com.reciplorer.backend.services.RefreshTokensService;

import jakarta.transaction.Transactional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServicesImpl implements AuthServices {
    private final UserRepositories userRepositories;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    private final RefreshTokensService refreshTokensService;
    private final AuthenticationManager authenticationManager;

    public AuthServicesImpl(UserRepositories userRepositories, JwtService jwtService, RefreshTokensService refreshTokensService, AuthenticationManager authenticationManager) {
        this.userRepositories = userRepositories;
        this.refreshTokensService = refreshTokensService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    @Transactional
    public AuthResponse register(LoginRequest request) {
        if((request.email()==null || request.email().isEmpty())&&(request.password()==null || request.password().isEmpty())){
            throw new CustomBadRequest("Email and password are required");
        }
        if(userRepositories.findByEmail(request.email()).isPresent()){
            throw new UserAlreadyExists("Email already in use");
        }
        Users user = new Users();
        user.setEmail(request.email());
        user.setPassword(encoder.encode(request.password()));
        userRepositories.save(user);
        RefreshTokenResponse refreshTokenResponse = refreshTokensService.generateRefreshTokens(request.email());
        return new AuthResponse(user.getId(),user.getEmail(),refreshTokenResponse);

    }

    @Override
    @Transactional
    public AuthResponse login(LoginRequest request) {
        Users user = userRepositories.findByEmail(request.email()).orElseThrow(()->new UserNotFound("You are not registered, register before login"));
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(),request.password()));
            if(authentication.isAuthenticated()){
                RefreshTokenResponse response =refreshTokensService.generateRefreshTokens(request.email());
                return new  AuthResponse(user.getId(),user.getEmail(),response);
            }else {
                return new  AuthResponse(user.getId(),user.getEmail(),null);
            }

        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }
}
