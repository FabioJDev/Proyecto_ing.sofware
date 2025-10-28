package com.camaleonbodega.controller;

import com.camaleonbodega.entity.Product;
import com.camaleonbodega.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador REST para operaciones sobre productos.  Expuesto bajo /api/productos.
 */
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * Obtiene todos los productos.
     */
    @GetMapping
    public List<Product> listAll() {
        return productService.listAll();
    }

    /**
     * Obtiene un producto por id.
     */
    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return productService.getById(id);
    }

    /**
     * Crea un nuevo producto.  El objeto se pasa en el cuerpo de la petición.
     */
    @PostMapping
    public Product create(@RequestBody Product product) {
        return productService.save(product);
    }

    /**
     * Actualiza un producto existente.
     */
    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) {
        return productService.update(id, product);
    }

    /**
     * Elimina un producto.
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }
}
