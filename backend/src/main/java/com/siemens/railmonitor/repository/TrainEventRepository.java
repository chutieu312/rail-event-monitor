package com.siemens.railmonitor.repository;

import com.siemens.railmonitor.domain.TrainEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainEventRepository extends JpaRepository<TrainEvent, Long> {
    List<TrainEvent> findTop50ByOrderByCreatedAtDesc();
}
