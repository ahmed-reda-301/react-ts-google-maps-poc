import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import GuideLayout from './components/layout/GuideLayout';
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
import BasicComponentsDemo from './pages/BasicComponentsDemo';
import CustomComponentsDemo from './pages/CustomComponentsDemo';
import ComponentsIndex from './pages/components-guide/ComponentsIndex';
import GoogleMapGuide from './pages/components-guide/GoogleMapGuide';
import MarkerGuide from './pages/components-guide/MarkerGuide';
import InfoWindowGuide from './pages/components-guide/InfoWindowGuide';
import PolylineGuide from './pages/components-guide/PolylineGuide';
import PolygonGuide from './pages/components-guide/PolygonGuide';
import CircleGuide from './pages/components-guide/CircleGuide';
import RectangleGuide from './pages/components-guide/RectangleGuide';
import TestGuide from './pages/components-guide/TestGuide';
import SimpleTestGuide from './pages/components-guide/SimpleTestGuide';
import './App.css';

/**
 * Main App component with routing
 */
const App: FC = () => {
  return (
    <Router>
      <Routes>
        {/* Regular pages with Layout */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/basic-map" element={<Layout><BasicMapPage /></Layout>} />
        <Route path="/custom-markers" element={<Layout><CustomMarkersPage /></Layout>} />
        <Route path="/info-windows" element={<Layout><InfoWindowsPage /></Layout>} />
        <Route path="/polylines" element={<Layout><PolylinesPage /></Layout>} />
        <Route path="/polygons" element={<Layout><PolygonsPage /></Layout>} />
        <Route path="/geolocation" element={<Layout><GeolocationPage /></Layout>} />
        <Route path="/directions" element={<Layout><DirectionsPage /></Layout>} />
        <Route path="/entry-points" element={<Layout><EntryPointsPage /></Layout>} />
        <Route path="/trip-tracking" element={<Layout><TripTrackingPage /></Layout>} />
        <Route path="/basic-components-demo" element={<Layout><BasicComponentsDemo /></Layout>} />
        <Route path="/custom-components-demo" element={<Layout><CustomComponentsDemo /></Layout>} />
        
        {/* Guide pages with GuideLayout (full screen) */}
        <Route path="/components-guide" element={<GuideLayout><ComponentsIndex /></GuideLayout>} />
        <Route path="/components-guide/google-map" element={<GuideLayout><GoogleMapGuide /></GuideLayout>} />
        <Route path="/components-guide/marker" element={<GuideLayout><MarkerGuide /></GuideLayout>} />
        <Route path="/components-guide/info-window" element={<GuideLayout><InfoWindowGuide /></GuideLayout>} />
        <Route path="/components-guide/polyline" element={<GuideLayout><PolylineGuide /></GuideLayout>} />
        <Route path="/components-guide/polygon" element={<GuideLayout><PolygonGuide /></GuideLayout>} />
        <Route path="/components-guide/circle" element={<GuideLayout><CircleGuide /></GuideLayout>} />
        <Route path="/components-guide/rectangle" element={<GuideLayout><RectangleGuide /></GuideLayout>} />
        
        {/* Test pages */}
        <Route path="/test-guide" element={<GuideLayout><TestGuide /></GuideLayout>} />
        <Route path="/simple-test" element={<GuideLayout><SimpleTestGuide /></GuideLayout>} />
      </Routes>
    </Router>
  );
};

export default App;