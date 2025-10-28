import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Módulo para el rol de Cajero.  Permite registrar pagos de ventas.
 */
function CajeroModule() {
  const [ventas, setVentas] = useState([]);
  const [saleId, setSaleId] = useState('');
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      const res = await axios.get('/api/ventas');
      setVentas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const registrarPago = async (e) => {
    e.preventDefault();
    if (!saleId || !monto) {
      setMensaje('Debe seleccionar una venta y especificar el monto.');
      return;
    }
    try {
      const res = await axios.post('/api/pagos', {
        saleId: parseInt(saleId, 10),
        monto: parseFloat(monto)
      });
      if (res.data) {
        setMensaje('Pago registrado con éxito.');
        setSaleId('');
        setMonto('');
      } else {
        setMensaje('No fue posible registrar el pago.');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error al registrar el pago.');
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Módulo Cajero</h2>
      {mensaje && <div className={mensaje.includes('éxito') ? 'success' : 'alert'}>{mensaje}</div>}

      <section>
        <h3>Registrar pago</h3>
        <form onSubmit={registrarPago}>
          <label>
            Venta
            <select value={saleId} onChange={(e) => setSaleId(e.target.value)}>
              <option value="">Seleccione...</option>
              {ventas.map((v) => (
                <option key={v.id} value={v.id}>
                  Venta #{v.id} – {v.cantidad} × {v.producto.nombre} – Total ${v.total.toFixed(2)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Monto
            <input
              type="number"
              min="0"
              step="0.01"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </label>
          <button type="submit">Registrar</button>
        </form>
      </section>
    </div>
  );
}

export default CajeroModule;