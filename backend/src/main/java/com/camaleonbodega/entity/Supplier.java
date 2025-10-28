package com.camaleonbodega.entity;

import jakarta.persistence.*;

/**
 * Entidad que representa a un proveedor.  Contiene su nombre y datos de contacto.
 */
@Entity
@Table(name = "proveedores")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private String contacto;

    public Supplier() {
    }

    public Supplier(String nombre, String contacto) {
        this.nombre = nombre;
        this.contacto = contacto;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getContacto() {
        return contacto;
    }

    public void setContacto(String contacto) {
        this.contacto = contacto;
    }
}
