package com.camaleonbodega.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entidad que registra alertas de bajo inventario.  Cada alerta referencia
 * al producto que está por debajo del umbral y almacena un mensaje y la fecha.
 */
@Entity
@Table(name = "alertas")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id")
    private Product producto;

    private String mensaje;

    private LocalDateTime fecha;

    public Alert() {
    }

    public Alert(Product producto, String mensaje, LocalDateTime fecha) {
        this.producto = producto;
        this.mensaje = mensaje;
        this.fecha = fecha;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProducto() {
        return producto;
    }

    public void setProducto(Product producto) {
        this.producto = producto;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
