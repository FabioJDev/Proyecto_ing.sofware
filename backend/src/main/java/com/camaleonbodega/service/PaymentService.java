package com.camaleonbodega.service;

import com.camaleonbodega.entity.Payment;
import com.camaleonbodega.entity.Sale;
import com.camaleonbodega.repository.PaymentRepository;
import com.camaleonbodega.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Servicio encargado del registro de pagos de las ventas.  Permite asociar
 * un pago a una venta existente y almacenar la fecha y el monto.
 */
@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final SaleRepository saleRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository, SaleRepository saleRepository) {
        this.paymentRepository = paymentRepository;
        this.saleRepository = saleRepository;
    }

    public List<Payment> listAll() {
        return paymentRepository.findAll();
    }

    /**
     * Registra un pago asociado a una venta.  Si la venta no existe,
     * devuelve null.
     */
    @Transactional
    public Payment registerPayment(Long saleId, Double monto) {
        Sale sale = saleRepository.findById(saleId).orElse(null);
        if (sale == null || monto == null || monto <= 0) {
            return null;
        }
        Payment payment = new Payment(LocalDateTime.now(), sale, monto);
        return paymentRepository.save(payment);
    }
}
