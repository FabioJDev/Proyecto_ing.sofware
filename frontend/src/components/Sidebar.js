import React from 'react';
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaUserTie, FaFileAlt, FaExclamationTriangle } from 'react-icons/fa';

const navItems = [
  { key: 'home', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { key: 'admin', label: 'Productos', icon: <FaBoxOpen /> },
  { key: 'vendedor', label: 'Ventas', icon: <FaShoppingCart /> },
  { key: 'proveedor', label: 'Proveedores', icon: <FaUserTie /> },
  { key: 'cajero', label: 'Reportes', icon: <FaFileAlt /> },
  { key: 'alertas', label: 'Alertas', icon: <FaExclamationTriangle /> }
];

function Sidebar({ active, onSelect }) {
  return (
    <aside className="cb-sidebar">
      <div className="cb-logo">Camaleón Bodega</div>
      <nav className="cb-nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`cb-nav-item ${active === item.key ? 'active' : ''}`}
            onClick={() => onSelect(item.key)}
          >
            <span className="cb-nav-icon">{item.icon}</span>
            <span className="cb-nav-text">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;



