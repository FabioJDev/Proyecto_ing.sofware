package com.camaleonbodega.service;

import com.camaleonbodega.entity.Alert;
import com.camaleonbodega.entity.Product;
import com.camaleonbodega.repository.AlertRepository;
import com.camaleonbodega.repository.ProductRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Servicio que encapsula la lógica de negocio asociada a la gestión de productos
 * y el control de inventario.  Se comunica con el repositorio y genera
 * alertas automáticamente cuando el stock cae por debajo del umbral definido.
 */
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final AlertRepository alertRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, AlertRepository alertRepository) {
        this.productRepository = productRepository;
        this.alertRepository = alertRepository;
    }

    /**
     * Devuelve la lista completa de productos.
     */
    public List<Product> listAll() {
        return productRepository.findAll();
    }

    /**
     * Recupera un producto por su identificador.
     */
    public Product getById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    /**
     * Guarda un nuevo producto y comprueba si ya está por debajo del umbral.
     */
    @Transactional
    public Product save(Product product) {
        Product saved = productRepository.save(product);
        checkAndCreateAlert(saved);
        return saved;
    }

    /**
     * Actualiza un producto existente.
     */
    @Transactional
    public Product update(Long id, Product updated) {
        Optional<Product> opt = productRepository.findById(id);
        if (opt.isEmpty()) {
            return null;
        }
        Product existing = opt.get();
        existing.setNombre(updated.getNombre());
        existing.setCategoria(updated.getCategoria());
        existing.setPrecio(updated.getPrecio());
        existing.setCantidad(updated.getCantidad());
        existing.setStockThreshold(updated.getStockThreshold());
        existing.setProveedor(updated.getProveedor());
        Product saved = productRepository.save(existing);
        checkAndCreateAlert(saved);
        return saved;
    }

    /**
     * Elimina un producto por id.
     */
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    /**
     * Ajusta la cantidad disponible de un producto.  Puede ser un número
     * negativo (venta) o positivo (ingreso).  Si el nuevo stock es menor al
     * umbral, se registra una alerta.
     */
    @Transactional
    public Product adjustQuantity(Long id, int delta) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return null;
        }
        int newQty = product.getCantidad() + delta;
        product.setCantidad(Math.max(newQty, 0));
        Product saved = productRepository.save(product);
        checkAndCreateAlert(saved);
        return saved;
    }

    /**
     * Comprueba si el stock del producto está por debajo del umbral y genera
     * una alerta si es necesario.
     */
    private void checkAndCreateAlert(Product product) {
        if (product.getStockThreshold() != null && product.getCantidad() != null
                && product.getCantidad() <= product.getStockThreshold()) {
            // Crear una alerta solo si no existe una alerta reciente para este producto
            Alert alert = new Alert(product,
                    "Stock bajo para el producto: " + product.getNombre(),
                    LocalDateTime.now());
            alertRepository.save(alert);
        }
    }
}
