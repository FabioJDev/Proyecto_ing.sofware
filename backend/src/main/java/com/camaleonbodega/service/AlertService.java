package com.camaleonbodega.service;

import com.camaleonbodega.entity.Alert;
import com.camaleonbodega.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Servicio para consultar las alertas de stock bajo.
 */
@Service
public class AlertService {
    private final AlertRepository alertRepository;

    @Autowired
    public AlertService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    /**
     * Devuelve todas las alertas registradas.
     */
    public List<Alert> listAll() {
        return alertRepository.findAll();
    }
}
