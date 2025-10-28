import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Módulo para el rol de Vendedor.  Permite consultar el stock
 * en tiempo real y registrar ventas.  Al registrar una venta se
 * descuenta automáticamente del inventario y se muestra un mensaje.
 */
function VendedorModule() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await axios.get('/api/productos');
      setProductos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const registrarVenta = async (e) => {
    e.preventDefault();
    if (!selectedProduct || cantidad <= 0) {
      setMensaje('Debe seleccionar un producto y una cantidad válida.');
      return;
    }
    try {
      const res = await axios.post('/api/ventas', {
        productId: parseInt(selectedProduct, 10),
        cantidad: parseInt(cantidad, 10)
      });
      if (res.data) {
        setMensaje('Venta registrada con éxito.');
        // recargar productos para ver stock actualizado
        cargarProductos();
      } else {
        setMensaje('No fue posible registrar la venta (stock insuficiente).');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Ocurrió un error al registrar la venta.');
    }
  };

  return (
    <div>
      <h2>Módulo Vendedor</h2>
      {mensaje && <div className={mensaje.includes('éxito') ? 'success' : 'alert'}>{mensaje}</div>}
      <h3>Listado de productos</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>${p.precio.toFixed(2)}</td>
              <td>{p.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Registrar venta</h3>
      <form onSubmit={registrarVenta}>
        <label>
          Producto:
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Seleccione...</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} (Stock: {p.cantidad})
              </option>
            ))}
          </select>
        </label>
        <label>
          Cantidad:
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </label>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default VendedorModule;