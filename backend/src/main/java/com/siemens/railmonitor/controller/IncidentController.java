package com.siemens.railmonitor.controller;

import com.siemens.railmonitor.domain.Incident;
import com.siemens.railmonitor.dto.CreateIncidentRequest;
import com.siemens.railmonitor.service.IncidentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {

    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @GetMapping("/active")
    public List<Incident> activeIncidents() {
        return incidentService.findActiveIncidents();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Incident createIncident(@Valid @RequestBody CreateIncidentRequest request) {
        return incidentService.create(request);
    }
}
