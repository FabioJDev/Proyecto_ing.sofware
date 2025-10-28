-- Proveedores
INSERT INTO proveedores (id, nombre, contacto) VALUES
  (1, 'Proveedor Alfa', 'alfa@proveedores.com'),
  (2, 'Proveedor Beta', 'beta@proveedores.com')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), contacto = VALUES(contacto);

-- Productos
INSERT INTO productos (id, nombre, categoria, precio, cantidad, stock_threshold, proveedor_id) VALUES
  (1, 'Arroz 1kg', 'Granos', 2.50, 100, 20, 1),
  (2, 'Azúcar 1kg', 'Granos', 2.20, 80, 15, 1),
  (3, 'Aceite 1L', 'Aceites', 4.80, 50, 10, 2)
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), categoria = VALUES(categoria), precio = VALUES(precio), cantidad = VALUES(cantidad), stock_threshold = VALUES(stock_threshold), proveedor_id = VALUES(proveedor_id);

