package com.siemens.railmonitor.controller;

import com.siemens.railmonitor.domain.TrainEvent;
import com.siemens.railmonitor.repository.TrainEventRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final TrainEventRepository trainEventRepository;

    public EventController(TrainEventRepository trainEventRepository) {
        this.trainEventRepository = trainEventRepository;
    }

    @GetMapping
    public List<TrainEvent> latestEvents() {
        return trainEventRepository.findTop50ByOrderByCreatedAtDesc();
    }
}
