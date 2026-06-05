package com.siemens.railmonitor.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Bean
    public Queue trainEventQueue(@Value("${app.messaging.queue}") String queueName) {
        return new Queue(queueName, true);
    }

    @Bean
    public DirectExchange trainExchange(@Value("${app.messaging.exchange}") String exchangeName) {
        return new DirectExchange(exchangeName);
    }

    @Bean
    public Binding trainBinding(Queue trainEventQueue,
                                DirectExchange trainExchange,
                                @Value("${app.messaging.routing-key}") String routingKey) {
        return BindingBuilder.bind(trainEventQueue).to(trainExchange).with(routingKey);
    }

    @Bean
    public MessageConverter jsonMessageConverter(ObjectMapper objectMapper) {
        return new Jackson2JsonMessageConverter(objectMapper);
    }
}
