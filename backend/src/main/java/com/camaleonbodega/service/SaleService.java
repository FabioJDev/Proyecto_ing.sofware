package com.camaleonbodega.service;

import com.camaleonbodega.entity.Product;
import com.camaleonbodega.entity.Sale;
import com.camaleonbodega.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Servicio que maneja la lógica de las ventas.  Calcula el total y
 * actualiza el inventario del producto correspondiente.
 */
@Service
public class SaleService {
    private final SaleRepository saleRepository;
    private final ProductService productService;

    @Autowired
    public SaleService(SaleRepository saleRepository, ProductService productService) {
        this.saleRepository = saleRepository;
        this.productService = productService;
    }

    public List<Sale> listAll() {
        return saleRepository.findAll();
    }

    /**
     * Registra una venta.  Si el producto no existe o la cantidad es mayor al
     * stock, devuelve null.  En caso contrario, descuenta del inventario y
     * guarda la venta.
     */
    @Transactional
    public Sale registerSale(Long productId, int quantity) {
        Product product = productService.getById(productId);
        if (product == null) {
            return null;
        }
        if (quantity <= 0 || product.getCantidad() < quantity) {
            return null;
        }
        // Calcular total
        double total = product.getPrecio() * quantity;
        // Registrar la venta
        Sale sale = new Sale(LocalDateTime.now(), product, quantity, total);
        Sale savedSale = saleRepository.save(sale);
        // Descontar inventario
        productService.adjustQuantity(productId, -quantity);
        return savedSale;
    }
}
