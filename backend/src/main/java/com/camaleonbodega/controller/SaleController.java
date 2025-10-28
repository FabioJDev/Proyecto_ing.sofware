package com.camaleonbodega.controller;

import com.camaleonbodega.entity.Sale;
import com.camaleonbodega.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para ventas.  Permite registrar y listar ventas.
 */
@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "*")
public class SaleController {
    private final SaleService saleService;

    @Autowired
    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping
    public List<Sale> listAll() {
        return saleService.listAll();
    }

    /**
     * Registra una venta.  Se espera un JSON con las propiedades
     * "productId" y "cantidad".
     */
    @PostMapping
    public Sale registerSale(@RequestBody SaleRequest request) {
        return saleService.registerSale(request.getProductId(), request.getCantidad());
    }

    /**
     * Clase interna que representa el cuerpo de la petición para registrar una venta.
     */
    public static class SaleRequest {
        private Long productId;
        private int cantidad;

        public Long getProductId() {
            return productId;
        }
        public void setProductId(Long productId) {
            this.productId = productId;
        }
        public int getCantidad() {
            return cantidad;
        }
        public void setCantidad(int cantidad) {
            this.cantidad = cantidad;
        }
    }
}
