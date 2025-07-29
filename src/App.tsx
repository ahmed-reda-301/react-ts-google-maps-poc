import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BasicMapPage from './pages/BasicMapPage';
import './App.css';

/**
 * Main App component with routing
 */
const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/basic-map" element={<BasicMapPage />} />
          {/* Placeholder routes for other pages */}
          <Route path="/custom-markers" element={<div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Custom Markers Page</h2>
            <p>Coming soon! This page will demonstrate custom marker implementations.</p>
          </div>} />
          <Route path="/info-windows" element={<div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Info Windows Page</h2>
            <p>Coming soon! This page will demonstrate info window implementations.</p>
          </div>} />
          <Route path="/polylines" element={<div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Polylines & Routes Page</h2>
            <p>Coming soon! This page will demonstrate polyline and route implementations.</p>
          </div>} />
          <Route path="/polygons" element={<div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Polygons & Areas Page</h2>
            <p>Coming soon! This page will demonstrate polygon and area implementations.</p>
          </div>} />
          <Route path="/geolocation" element={<div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Geolocation Page</h2>
            <p>Coming soon! This page will demonstrate geolocation implementations.</p>
          </div>} />
          <Route path="/directions" element={<div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Directions Service Page</h2>
            <p>Coming soon! This page will demonstrate directions service implementations.</p>
          </div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
