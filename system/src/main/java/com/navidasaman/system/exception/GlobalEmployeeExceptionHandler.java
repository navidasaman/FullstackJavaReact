package com.navidasaman.system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
@ControllerAdvice
public class GlobalEmployeeExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<EmployeeErrorResponse> handleEmployeeNotFoundException (EmployeeNotFoundException e) {
        EmployeeErrorResponse throwError = new EmployeeErrorResponse();

        throwError.setStatus(HttpStatus.NOT_FOUND.value());
        throwError.setMessage(e.getMessage());
        throwError.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(throwError, HttpStatus.NOT_FOUND);
    }
}