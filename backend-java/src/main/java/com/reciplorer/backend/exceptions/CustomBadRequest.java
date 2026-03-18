package com.reciplorer.backend.exceptions;

public class CustomBadRequest extends RuntimeException {
    public CustomBadRequest(String message) {
        super(message);
    }
}
