import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Módulo que muestra todas las alertas de bajo stock generadas por el backend.
 */
function AlertModule() {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    cargarAlertas();
  }, []);

  const cargarAlertas = async () => {
    try {
      const res = await axios.get('/api/alertas');
      setAlertas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Alertas de bajo stock</h2>
      {alertas.length === 0 ? (
        <p>No hay alertas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Mensaje</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {alertas.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.producto.nombre}</td>
                <td>{a.mensaje}</td>
                <td>{new Date(a.fecha).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AlertModule;