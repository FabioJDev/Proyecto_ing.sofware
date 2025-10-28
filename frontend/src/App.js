import React, { useState } from 'react';
import VendedorModule from './components/VendedorModule';
import CajeroModule from './components/CajeroModule';
import AdminModule from './components/AdminModule';
import ProveedorModule from './components/ProveedorModule';
import AlertModule from './components/AlertModule';
import Home from './components/Home';

/**
 * Componente principal de la aplicación.  Muestra un menú de navegación
 * superior y carga los distintos módulos según la selección del usuario.
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
    <div>
      <header>
        <h1>Camaleon Bodega</h1>
        <nav>
          <button onClick={() => setActive('home')}>Inicio</button>
          <button onClick={() => setActive('vendedor')}>Vendedor</button>
          <button onClick={() => setActive('cajero')}>Cajero</button>
          <button onClick={() => setActive('admin')}>Administrador</button>
          <button onClick={() => setActive('proveedor')}>Proveedor</button>
          <button onClick={() => setActive('alertas')}>Alertas</button>
        </nav>
      </header>
      <main>
        {renderModule()}
      </main>
    </div>
  );
}

export default App;
