import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BasicMapPage from './pages/BasicMapPage';
import CustomMarkersPage from './pages/CustomMarkersPage';
import InfoWindowsPage from './pages/InfoWindowsPage';
import PolylinesPage from './pages/PolylinesPage';
import PolygonsPage from './pages/PolygonsPage';
import GeolocationPage from './pages/GeolocationPage';
import DirectionsPage from './pages/DirectionsPage';
import EntryPointsPage from './pages/EntryPointsPage';
import TripTrackingPage from './pages/TripTrackingPage';
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
          <Route path="/custom-markers" element={<CustomMarkersPage />} />
          <Route path="/info-windows" element={<InfoWindowsPage />} />
          <Route path="/polylines" element={<PolylinesPage />} />
          <Route path="/polygons" element={<PolygonsPage />} />
          <Route path="/geolocation" element={<GeolocationPage />} />
          <Route path="/directions" element={<DirectionsPage />} />
          <Route path="/entry-points" element={<EntryPointsPage />} />
          <Route path="/trip-tracking" element={<TripTrackingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;