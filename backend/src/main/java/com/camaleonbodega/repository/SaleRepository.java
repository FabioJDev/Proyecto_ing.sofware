package com.camaleonbodega.repository;

import com.camaleonbodega.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio de ventas.
 */
@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
}
