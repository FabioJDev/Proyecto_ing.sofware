package com.camaleonbodega.repository;

import com.camaleonbodega.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio de acceso a datos para la entidad Product.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNombreContainingIgnoreCase(String nombre);
}
