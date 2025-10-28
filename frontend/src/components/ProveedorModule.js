import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Módulo para el rol de Proveedor.  Muestra solicitudes y permite registrar entregas.
 */
function ProveedorModule() {
  const [productosBajos, setProductosBajos] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => { obtenerProductosBajos(); }, []);

  const obtenerProductosBajos = async () => {
    try {
      const res = await axios.get('/api/productos');
      const bajos = res.data.filter((p) => p.stockThreshold != null && p.cantidad <= p.stockThreshold);
      setProductosBajos(bajos);
    } catch (err) { console.error(err); }
  };

  const reabastecer = async (e) => {
    e.preventDefault();
    if (!productoId || !cantidad) { setMensaje('Debe seleccionar un producto y cantidad.'); return; }
    try {
      const prodRes = await axios.get(`/api/productos/${productoId}`);
      const prod = prodRes.data;
      const nuevaCantidad = prod.cantidad + parseInt(cantidad, 10);
      const actualizado = { ...prod, cantidad: nuevaCantidad };
      await axios.put(`/api/productos/${productoId}`, actualizado);
      setMensaje('Entrega registrada con éxito.');
      setProductoId('');
      setCantidad('');
      obtenerProductosBajos();
    } catch (err) { console.error(err); setMensaje('Error al registrar entrega.'); }
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Módulo Proveedor</h2>
      {mensaje && <div className={mensaje.includes('éxito') ? 'success' : 'alert'}>{mensaje}</div>}

      <section style={{ marginBottom: 16 }}>
        <h3>Solicitudes de reabastecimiento</h3>
        {productosBajos.length === 0 ? (
          <p>No hay solicitudes pendientes.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Cantidad actual</th>
                <th>Umbral</th>
              </tr>
            </thead>
            <tbody>
              {productosBajos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.cantidad}</td>
                  <td>{p.stockThreshold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h3>Registrar entrega</h3>
        <form onSubmit={reabastecer}>
          <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
            <option value="">Seleccione producto</option>
            {productosBajos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
          <input type="number" min="1" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          <button type="submit">Registrar entrega</button>
        </form>
      </section>
    </div>
  );
}

export default ProveedorModule;