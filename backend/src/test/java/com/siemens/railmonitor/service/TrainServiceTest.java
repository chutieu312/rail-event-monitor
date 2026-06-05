package com.siemens.railmonitor.service;

import com.siemens.railmonitor.domain.Train;
import com.siemens.railmonitor.repository.TrainRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TrainServiceTest {

    @Mock
    private TrainRepository trainRepository;

    @InjectMocks
    private TrainService trainService;

    @Test
    void findAllReturnsRepositoryData() {
        Train train = new Train();
        train.setTrainCode("TR-1001");
        train.setRoute("Jacksonville -> Pittsburgh");
        train.setStatus("ON_TIME");

        when(trainRepository.findAll()).thenReturn(List.of(train));

        List<Train> results = trainService.findAll();

        assertThat(results).hasSize(1);
        assertThat(results.get(0).getTrainCode()).isEqualTo("TR-1001");
    }
}
