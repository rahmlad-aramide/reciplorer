package com.reciplorer.backend.controllers;

import com.reciplorer.backend.dto.requests.LoginRequest;
import com.reciplorer.backend.dto.responses.AuthResponse;
import com.reciplorer.backend.services.AuthServices;
import com.reciplorer.backend.utils.ResponseHandler;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthServices authServices;

    public AuthController(AuthServices authServices) {
        this.authServices = authServices;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser( @RequestBody LoginRequest loginRequest,HttpServletResponse servletResponse ) {
        AuthResponse response = authServices.register(loginRequest);
        Cookies(response.tokens().refreshToken(), servletResponse);
        return ResponseHandler.handleResponse(response, HttpStatus.CREATED,"New user registered");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest,HttpServletResponse servletResponse ) {
        AuthResponse response = authServices.login(loginRequest);
        Cookies(response.tokens().refreshToken(), servletResponse);
        return ResponseHandler.handleResponse(response, HttpStatus.OK,"Login successful");
    }


    private void Cookies(String refreshToken, HttpServletResponse response) {
        Cookie cookie =  new Cookie("refreshToken",refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/api/auth/refresh");
        cookie.setMaxAge(6*30*24*60*60);
        response.addCookie(cookie);
    }
}
