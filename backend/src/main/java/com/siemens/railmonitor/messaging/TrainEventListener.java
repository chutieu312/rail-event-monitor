package com.siemens.railmonitor.messaging;

import com.siemens.railmonitor.dto.TrainEventMessage;
import com.siemens.railmonitor.service.EventProcessorService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class TrainEventListener {

    private final EventProcessorService eventProcessorService;

    public TrainEventListener(EventProcessorService eventProcessorService) {
        this.eventProcessorService = eventProcessorService;
    }

    @RabbitListener(queues = "${app.messaging.queue}")
    public void consume(TrainEventMessage message) {
        eventProcessorService.process(message);
    }
}
