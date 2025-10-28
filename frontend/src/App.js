import React, { useState } from 'react';
import VendedorModule from './components/VendedorModule';
import CajeroModule from './components/CajeroModule';
import AdminModule from './components/AdminModule';
import ProveedorModule from './components/ProveedorModule';
import AlertModule from './components/AlertModule';
import Home from './components/Home';
import Sidebar from './components/Sidebar';

/**
 * Componente principal con layout de panel lateral fijo y área de contenido.
 */
function App() {
  const [active, setActive] = useState('home');

  const renderModule = () => {
    switch (active) {
      case 'vendedor':
        return <VendedorModule />;
      case 'cajero':
        return <CajeroModule />;
      case 'admin':
        return <AdminModule />;
      case 'proveedor':
        return <ProveedorModule />;
      case 'alertas':
        return <AlertModule />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="cb-layout">
      <Sidebar active={active} onSelect={setActive} />
      <div className="cb-content">
        {renderModule()}
      </div>
    </div>
  );
}

export default App;
