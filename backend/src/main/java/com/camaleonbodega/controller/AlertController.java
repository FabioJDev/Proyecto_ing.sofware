package com.camaleonbodega.controller;

import com.camaleonbodega.entity.Alert;
import com.camaleonbodega.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador REST para consultar alertas de bajo stock.
 */
@RestController
@RequestMapping("/api/alertas")
@CrossOrigin(origins = "*")
public class AlertController {
    private final AlertService alertService;

    @Autowired
    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping
    public List<Alert> listAll() {
        return alertService.listAll();
    }
}
