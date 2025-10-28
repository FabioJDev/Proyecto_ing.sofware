package com.camaleonbodega.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Representa el pago de una venta.  Un pago está asociado a una venta
 * (relación uno a uno) y almacena el monto pagado y la fecha.
 */
@Entity
@Table(name = "pagos")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fecha;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venta_id")
    private Sale venta;

    @Column(nullable = false)
    private Double monto;

    public Payment() {
    }

    public Payment(LocalDateTime fecha, Sale venta, Double monto) {
        this.fecha = fecha;
        this.venta = venta;
        this.monto = monto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public Sale getVenta() {
        return venta;
    }

    public void setVenta(Sale venta) {
        this.venta = venta;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }
}
