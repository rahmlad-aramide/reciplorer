package com.reciplorer.backend.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> handleResponse(Object response, HttpStatus status, String message) {
        Map<String, Object> responseMap = new LinkedHashMap<>();
        responseMap.put("status", status.value());
        responseMap.put("message", message);
        if(response!=null) responseMap.put("response", response);
        return new ResponseEntity<>(responseMap, status);
    }
}
