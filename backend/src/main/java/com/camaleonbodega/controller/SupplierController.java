package com.camaleonbodega.controller;

import com.camaleonbodega.entity.Supplier;
import com.camaleonbodega.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador REST para proveedores.  Proporciona endpoints para listar
 * y crear proveedores.
 */
@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "*")
public class SupplierController {
    private final SupplierService supplierService;

    @Autowired
    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping
    public List<Supplier> listAll() {
        return supplierService.listAll();
    }

    @PostMapping
    public Supplier create(@RequestBody Supplier supplier) {
        return supplierService.save(supplier);
    }
}
