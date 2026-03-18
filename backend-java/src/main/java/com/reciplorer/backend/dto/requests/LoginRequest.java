package com.reciplorer.backend.dto.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record LoginRequest(@NotNull @NotBlank(message = "Email can't be blank") String email, @NotNull @NotBlank(message = "Password field can't be blank") @Size(min = 5,message = "Password should have at least 5 characters") String password) {
}
