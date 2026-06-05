package com.siemens.railmonitor.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.siemens.railmonitor.domain.Incident;
import com.siemens.railmonitor.domain.Train;
import com.siemens.railmonitor.domain.TrainEvent;
import com.siemens.railmonitor.dto.TrainEventMessage;
import com.siemens.railmonitor.repository.TrainEventRepository;
import com.siemens.railmonitor.repository.TrainRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
public class EventProcessorService {

    private final TrainEventRepository trainEventRepository;
    private final TrainRepository trainRepository;
    private final IncidentService incidentService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;

    public EventProcessorService(TrainEventRepository trainEventRepository,
                                 TrainRepository trainRepository,
                                 IncidentService incidentService,
                                 SimpMessagingTemplate messagingTemplate,
                                 ObjectMapper objectMapper) {
        this.trainEventRepository = trainEventRepository;
        this.trainRepository = trainRepository;
        this.incidentService = incidentService;
        this.messagingTemplate = messagingTemplate;
        this.objectMapper = objectMapper;
    }

    public void process(TrainEventMessage message) {
        TrainEvent event = new TrainEvent();
        event.setTrainCode(message.getTrainCode());
        event.setEventType(message.getEventType());
        event.setPayload(toJson(message));
        event.setCreatedAt(OffsetDateTime.now());
        trainEventRepository.save(event);

        trainRepository.findByTrainCode(message.getTrainCode()).ifPresent(train -> {
            train.setStatus(message.getStatus());
            trainRepository.save(train);
        });

        if ("INCIDENT".equalsIgnoreCase(message.getEventType())) {
            Incident incident = incidentService.recordFromEvent(message);
            messagingTemplate.convertAndSend("/topic/incidents", incident);
        }

        messagingTemplate.convertAndSend("/topic/events", message);
    }

    private String toJson(TrainEventMessage message) {
        try {
            return objectMapper.writeValueAsString(message);
        } catch (JsonProcessingException ex) {
            throw new IllegalStateException("Unable to serialize train event", ex);
        }
    }
}
