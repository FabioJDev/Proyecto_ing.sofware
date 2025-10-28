package com.camaleonbodega.repository;

import com.camaleonbodega.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para alertas de inventario bajo.
 */
@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
}
