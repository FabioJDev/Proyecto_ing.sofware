-- Script SQL para crear la estructura de la base de datos Camaleon Bodega
-- y poblarla con datos de ejemplo.

DROP TABLE IF EXISTS alertas;
DROP TABLE IF EXISTS pagos;
DROP TABLE IF EXISTS ventas;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS proveedores;
DROP TABLE IF EXISTS usuarios;

-- Tabla de usuarios.  No se utiliza autenticación real, pero se deja
-- disponible para futuras ampliaciones.
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rol ENUM('ADMIN','CAJERO','VENDEDOR','PROVEEDOR') NOT NULL
);

-- Tabla de proveedores.
CREATE TABLE proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(255)
);

-- Tabla de productos.
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(100),
    precio DOUBLE NOT NULL,
    cantidad INT NOT NULL,
    stock_threshold INT,
    proveedor_id INT,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

-- Tabla de ventas.
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME,
    producto_id INT,
    cantidad INT,
    total DOUBLE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla de pagos.
CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME,
    venta_id INT,
    monto DOUBLE,
    FOREIGN KEY (venta_id) REFERENCES ventas(id)
);

-- Tabla de alertas.
CREATE TABLE alertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    mensaje VARCHAR(255),
    fecha DATETIME,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Insertar usuarios de ejemplo (no se usa autenticación).
INSERT INTO usuarios (nombre, rol) VALUES
  ('Administrador', 'ADMIN'),
  ('Cajero', 'CAJERO'),
  ('Vendedor', 'VENDEDOR'),
  ('Proveedor', 'PROVEEDOR');

-- Insertar proveedores de ejemplo.
INSERT INTO proveedores (nombre, contacto) VALUES
  ('Proveedor A', 'proveedorA@correo.com'),
  ('Proveedor B', 'proveedorB@correo.com');

-- Insertar productos de ejemplo.
INSERT INTO productos (nombre, categoria, precio, cantidad, stock_threshold, proveedor_id) VALUES
  ('Café', 'Bebidas', 10.50, 100, 10, 1),
  ('Azúcar', 'Alimentos', 3.50, 200, 20, 1),
  ('Arroz', 'Alimentos', 2.75, 50, 15, 2),
  ('Leche', 'Lácteos', 4.20, 30, 10, 2);

-- Insertar una venta y un pago de ejemplo.
INSERT INTO ventas (fecha, producto_id, cantidad, total) VALUES
  (NOW(), 1, 2, 21.0);

INSERT INTO pagos (fecha, venta_id, monto) VALUES
  (NOW(), 1, 21.0);