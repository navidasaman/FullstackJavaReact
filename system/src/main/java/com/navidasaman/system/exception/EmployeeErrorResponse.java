package com.navidasaman.system.exception;

import java.time.LocalDateTime;

public class EmployeeErrorResponse extends Exception {

    private int status;
    private String message;
    private LocalDateTime timestamp;

    public EmployeeErrorResponse(int status, String message, LocalDateTime timestamp) {
        super(message);
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }

    public EmployeeErrorResponse() {

    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}