import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation menu items
 */
const navigationItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/basic-map', label: 'Basic Map', icon: '🗺️' },
  { path: '/custom-markers', label: 'Custom Markers', icon: '📍' },
  { path: '/info-windows', label: 'Info Windows', icon: '💬' },
  { path: '/polylines', label: 'Polylines & Routes', icon: '🛣️' },
  { path: '/polygons', label: 'Polygons & Areas', icon: '🔷' },
  { path: '/geolocation', label: 'Geolocation', icon: '📍' },
  { path: '/directions', label: 'Directions', icon: '🧭' },
  { path: '/entry-points', label: 'Entry Points', icon: '🏭' },
  { path: '/trip-tracking', label: 'Trip Tracking', icon: '🚛' },
];

/**
 * Header component with navigation
 */
const Header: FC = () => {
  const location = useLocation();

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "100%",
    margin: '0 auto',
    padding: '0 20px',
  };

  const topBarStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    overflowX: 'auto',
    padding: '10px 0',
    gap: '5px',
  };

  const navItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    textDecoration: 'none',
    color: 'rgba(255,255,255,0.8)',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    fontWeight: '500',
  };

  const activeNavItemStyle: React.CSSProperties = {
    ...navItemStyle,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
  };

  const infoStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        {/* Top Bar */}
        <div style={topBarStyle}>
          <Link to="/" style={logoStyle}>
            <span>🗺️</span>
            <span>React Google Maps POC</span>
          </Link>
          <div style={infoStyle}>
            TypeScript + Google Maps Integration
          </div>
        </div>

        {/* Navigation */}
        <nav style={navStyle}>
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={location.pathname === item.path ? activeNavItemStyle : navItemStyle}
              onMouseOver={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseOut={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;