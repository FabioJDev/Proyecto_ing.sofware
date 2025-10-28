import React, { useEffect, useState } from 'react';
import { FaBoxOpen, FaShoppingCart, FaDollarSign, FaUserTie } from 'react-icons/fa';
import axios from 'axios';

/**
 * Dashboard con métricas clave.
 */
const Home = () => {
  const [metrics, setMetrics] = useState({
    productos: 0,
    ventasMes: 0,
    inventarioValor: 0,
    proveedores: 0
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [prod, prov, ventas] = await Promise.all([
          axios.get('/api/productos'),
          axios.get('/api/proveedores'),
          axios.get('/api/ventas')
        ]);
        const productos = prod.data.length;
        const proveedores = prov.data.length;
        const ventasMes = ventas.data.filter((v) => {
          const d = new Date(v.fecha);
          const now = new Date();
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).length;
        const inventarioValor = prod.data.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
        setMetrics({ productos, ventasMes, inventarioValor, proveedores });
      } catch (e) {
        // Si falla, mantenemos ceros para no romper UI
      }
    };
    load();
  }, []);

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Dashboard</h2>
      <div className="cb-cards">
        <div className="cb-card">
          <div className="icon"><FaBoxOpen /></div>
          <p className="title">Productos</p>
          <p className="value">{metrics.productos}</p>
        </div>
        <div className="cb-card">
          <div className="icon"><FaShoppingCart /></div>
          <p className="title">Ventas del mes</p>
          <p className="value green">{metrics.ventasMes}</p>
        </div>
        <div className="cb-card">
          <div className="icon"><FaDollarSign /></div>
          <p className="title">Valor del inventario</p>
          <p className="value">${metrics.inventarioValor.toFixed(2)}</p>
        </div>
        <div className="cb-card">
          <div className="icon"><FaUserTie /></div>
          <p className="title">Proveedores</p>
          <p className="value">{metrics.proveedores}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;