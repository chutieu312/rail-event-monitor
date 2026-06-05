package com.siemens.railmonitor;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(title = "Rail Event Monitor API", version = "v1"),
        security = @SecurityRequirement(name = "bearerAuth")
)
public class RailEventMonitorApplication {

    public static void main(String[] args) {
        SpringApplication.run(RailEventMonitorApplication.class, args);
    }
}
