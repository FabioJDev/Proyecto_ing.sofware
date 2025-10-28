import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Módulo para el rol Administrador.  CRUD de productos y proveedores + listados.
 */
function AdminModule() {
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [nombreP, setNombreP] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [umbral, setUmbral] = useState('');
  const [proveedorId, setProveedorId] = useState('');
  const [nombreProv, setNombreProv] = useState('');
  const [contactoProv, setContactoProv] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => { cargarDatos(); }, []);

  const cargarDatos = async () => {
    try {
      const prodRes = await axios.get('/api/productos');
      setProductos(prodRes.data);
      const provRes = await axios.get('/api/proveedores');
      setProveedores(provRes.data);
      const ventasRes = await axios.get('/api/ventas');
      setVentas(ventasRes.data);
    } catch (err) { console.error(err); }
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    if (!nombreP || !precio || !cantidad) {
      setMensaje('Debe completar nombre, precio y cantidad.');
      return;
    }
    try {
      await axios.post('/api/productos', {
        nombre: nombreP,
        categoria: categoria,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad, 10),
        stockThreshold: umbral ? parseInt(umbral, 10) : null,
        proveedor: proveedorId ? { id: parseInt(proveedorId, 10) } : null
      });
      setMensaje('Producto agregado con éxito.');
      setNombreP(''); setCategoria(''); setPrecio(''); setCantidad(''); setUmbral(''); setProveedorId('');
      cargarDatos();
    } catch (err) { console.error(err); setMensaje('Error al agregar producto.'); }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try { await axios.delete(`/api/productos/${id}`); setMensaje('Producto eliminado.'); cargarDatos(); }
    catch (err) { console.error(err); setMensaje('Error al eliminar producto.'); }
  };

  const agregarProveedor = async (e) => {
    e.preventDefault();
    if (!nombreProv) { setMensaje('Debe introducir el nombre del proveedor.'); return; }
    try {
      await axios.post('/api/proveedores', { nombre: nombreProv, contacto: contactoProv });
      setMensaje('Proveedor agregado con éxito.');
      setNombreProv(''); setContactoProv('');
      cargarDatos();
    } catch (err) { console.error(err); setMensaje('Error al agregar proveedor.'); }
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Módulo Administrador</h2>
      {mensaje && <div className={mensaje.includes('éxito') ? 'success' : 'alert'}>{mensaje}</div>}

      <section style={{ marginBottom: 20 }}>
        <h3>Productos</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Umbral</th>
              <th>Proveedor</th>
              <th>Acciones</th>
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
                <td>{p.stockThreshold ?? '-'}</td>
                <td>{p.proveedor ? p.proveedor.nombre : '-'}</td>
                <td>
                  <button onClick={() => eliminarProducto(p.id)} style={{ backgroundColor: '#e74c3c' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>Agregar producto</h4>
        <form onSubmit={agregarProducto}>
          <input type="text" placeholder="Nombre" value={nombreP} onChange={(e) => setNombreP(e.target.value)} />
          <input type="text" placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          <input type="number" step="0.01" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          <input type="number" placeholder="Umbral de alerta" value={umbral} onChange={(e) => setUmbral(e.target.value)} />
          <select value={proveedorId} onChange={(e) => setProveedorId(e.target.value)}>
            <option value="">Proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>{prov.nombre}</option>
            ))}
          </select>
          <button type="submit">Agregar</button>
        </form>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h3>Proveedores</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((pr) => (
              <tr key={pr.id}>
                <td>{pr.id}</td>
                <td>{pr.nombre}</td>
                <td>{pr.contacto}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>Agregar proveedor</h4>
        <form onSubmit={agregarProveedor}>
          <input type="text" placeholder="Nombre" value={nombreProv} onChange={(e) => setNombreProv(e.target.value)} />
          <input type="text" placeholder="Contacto" value={contactoProv} onChange={(e) => setContactoProv(e.target.value)} />
          <button type="submit">Agregar</button>
        </form>
      </section>

      <section>
        <h3>Historial de ventas</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{new Date(v.fecha).toLocaleString()}</td>
                <td>{v.producto.nombre}</td>
                <td>{v.cantidad}</td>
                <td>${v.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminModule;