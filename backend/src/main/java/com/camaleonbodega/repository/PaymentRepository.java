package com.camaleonbodega.repository;

import com.camaleonbodega.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio de pagos.
 */
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
