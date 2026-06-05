package com.siemens.railmonitor.repository;

import com.siemens.railmonitor.domain.Incident;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findTop10ByStatusOrderByOpenedAtDesc(String status);
}
