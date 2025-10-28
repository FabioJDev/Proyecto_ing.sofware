package com.camaleonbodega.repository;

import com.camaleonbodega.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para proveedores.
 */
@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
