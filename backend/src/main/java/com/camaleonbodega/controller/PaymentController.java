package com.camaleonbodega.controller;

import com.camaleonbodega.entity.Payment;
import com.camaleonbodega.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para pagos.  Permite listar y registrar pagos para ventas.
 */
@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "*")
public class PaymentController {
    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public List<Payment> listAll() {
        return paymentService.listAll();
    }

    @PostMapping
    public Payment registerPayment(@RequestBody PaymentRequest request) {
        return paymentService.registerPayment(request.getSaleId(), request.getMonto());
    }

    public static class PaymentRequest {
        private Long saleId;
        private Double monto;

        public Long getSaleId() {
            return saleId;
        }

        public void setSaleId(Long saleId) {
            this.saleId = saleId;
        }

        public Double getMonto() {
            return monto;
        }

        public void setMonto(Double monto) {
            this.monto = monto;
        }
    }
}
