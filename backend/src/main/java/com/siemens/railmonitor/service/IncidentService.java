package com.siemens.railmonitor.service;

import com.siemens.railmonitor.domain.Incident;
import com.siemens.railmonitor.dto.CreateIncidentRequest;
import com.siemens.railmonitor.dto.TrainEventMessage;
import com.siemens.railmonitor.repository.IncidentRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class IncidentService {

    private static final String OPEN_STATUS = "OPEN";

    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public List<Incident> findActiveIncidents() {
        return incidentRepository.findTop10ByStatusOrderByOpenedAtDesc(OPEN_STATUS);
    }

    public Incident create(CreateIncidentRequest request) {
        Incident incident = new Incident();
        incident.setTrainCode(request.getTrainCode());
        incident.setSeverity(defaultIfBlank(request.getSeverity(), "MEDIUM"));
        incident.setSummary(request.getSummary());
        incident.setDetails(defaultIfBlank(request.getDetails(), "No additional details."));
        incident.setStatus(OPEN_STATUS);
        incident.setOpenedAt(OffsetDateTime.now());
        return incidentRepository.save(incident);
    }

    public Incident recordFromEvent(TrainEventMessage message) {
        Incident incident = new Incident();
        incident.setTrainCode(message.getTrainCode());
        incident.setSeverity(inferSeverity(message));
        incident.setSummary("Incident reported for " + message.getTrainCode());
        incident.setDetails(defaultIfBlank(message.getDetails(), "Telemetry stream reported an incident."));
        incident.setStatus(OPEN_STATUS);
        incident.setOpenedAt(OffsetDateTime.now());
        return incidentRepository.save(incident);
    }

    private String inferSeverity(TrainEventMessage message) {
        String status = message.getStatus();
        if ("MAINTENANCE".equalsIgnoreCase(status) || "DELAYED".equalsIgnoreCase(status)) {
            return "HIGH";
        }
        return "MEDIUM";
    }

    private String defaultIfBlank(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value;
    }
}
