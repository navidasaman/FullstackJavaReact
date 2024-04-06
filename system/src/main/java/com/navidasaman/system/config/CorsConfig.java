package com.navidasaman.system.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
// To allow request from backend to frotend by adding headers through API calls
@Configuration
public class CorsConfig {
    @Value("${cors.allowedOrigins}")
    private String allowedOrigins;
    private static final Logger logger = LoggerFactory.getLogger(CorsConfig.class);

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        logger.info("Configuring CORS with allowed origins: {}", allowedOrigins);

        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Apply CORS to all endpoints
                        .allowedOrigins(allowedOrigins) // Allow localhost:3000 for dev and real domain for prod
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed methods
                        .allowedHeaders("*") // Allowed headers
                        .allowCredentials(true); // Allow credentials
            }
        };
    }
}