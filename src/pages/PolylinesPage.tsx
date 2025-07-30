import React, { useState } from 'react';
import { Polyline, Marker } from '@react-google-maps/api';
import { Button, Card, InfoBox, CodeBlock } from '../components/ui';
import { PageLayout, PageSection, ControlsPanel } from '../components/layout';
import { MapContainer } from '../components/maps';
import { styles } from '../styles/pageStyles';
import { LatLng } from '../types/common/LatLng';
import { 
  EGYPT_LOCATIONS, 
  PAGE_CONTENT, 
  UI_LABELS, 
  CODE_EXAMPLES,
  MARKER_ICONS,
  INFO_MESSAGES 
} from '../constants';

interface RouteData {
  id: string;
  name: string;
  path: LatLng[];
  color: string;
  strokeWeight: number;
  description: string;
}

/**
 * Polylines Page - Demonstrates polyline implementations for routes and paths
 */
const PolylinesPage: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route1');
  const [showMarkers, setShowMarkers] = useState<boolean>(true);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [customPath, setCustomPath] = useState<LatLng[]>([]);

  const [routes] = useState<RouteData[]>([
    {
      id: 'route1',
      name: 'Cairo Historic Tour',
      path: [
        EGYPT_LOCATIONS.cairo, // Khan El Khalili
        { lat: 30.0626, lng: 31.2497 }, // Citadel
        EGYPT_LOCATIONS.giza, // Egyptian Museum
        { lat: 30.0275, lng: 31.2357 }, // Tahrir Square
        EGYPT_LOCATIONS.cairo  // Back to start
      ],
      color: '#FF0000',
      strokeWeight: 4,
      description: 'A tour through Cairo\'s most famous historical sites'
    },
    {
      id: 'route2',
      name: 'Nile Corniche Route',
      path: [
        EGYPT_LOCATIONS.giza,
        { lat: 30.0200, lng: 31.2200 },
        { lat: 30.0300, lng: 31.2300 },
        { lat: 30.0400, lng: 31.2400 },
        { lat: 30.0500, lng: 31.2500 }
      ],
      color: '#0000FF',
      strokeWeight: 3,
      description: 'A scenic route along the Nile Corniche'
    },
    {
      id: 'route3',
      name: 'Airport to Downtown',
      path: [
        { lat: 30.1219, lng: 31.4056 }, // Cairo Airport
        { lat: 30.0800, lng: 31.3500 },
        { lat: 30.0600, lng: 31.3000 },
        EGYPT_LOCATIONS.cairo  // Downtown
      ],
      color: '#00FF00',
      strokeWeight: 5,
      description: 'Direct route from Cairo International Airport to downtown'
    }
  ]);

  const selectedRoute = routes.find(route => route.id === selectedRouteId);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (isDrawing && event.latLng) {
      const newPoint = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      setCustomPath([...customPath, newPoint]);
    }
  };

  const clearCustomPath = () => {
    setCustomPath([]);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const startDrawing = () => {
    setIsDrawing(true);
    setCustomPath([]);
  };

  const calculateDistance = (path: LatLng[]): string => {
    if (path.length < 2) return '0 km';
    
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];
      
      // Simple distance calculation (not accurate for long distances)
      const R = 6371; // Earth's radius in km
      const dLat = (to.lat - from.lat) * Math.PI / 180;
      const dLng = (to.lng - from.lng) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      totalDistance += R * c;
    }
    
    return `${totalDistance.toFixed(2)} km`;
  };

  return (
    <PageLayout
      title={PAGE_CONTENT.polylines.title}
      subtitle={PAGE_CONTENT.polylines.subtitle}
    >
      {/* Controls Section */}
      <PageSection>
        <div style={styles.cards.twoColumn}>
          <Card title="Route Selection" padding="lg">
            <div style={styles.forms.container}>
              <div style={styles.forms.group}>
                <label style={styles.forms.label} htmlFor="route-select">
                  Select Route:
                </label>
                <select
                  id="route-select"
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  {routes.map(route => (
                    <option key={route.id} value={route.id}>{route.name}</option>
                  ))}
                </select>
              </div>
              
              <div style={styles.forms.group}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={showMarkers}
                    onChange={(e) => setShowMarkers(e.target.checked)}
                  />
                  Show Route Markers
                </label>
              </div>

              {selectedRoute && (
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <p><strong>Description:</strong> {selectedRoute.description}</p>
                  <p><strong>Distance:</strong> {calculateDistance(selectedRoute.path)}</p>
                  <p><strong>Points:</strong> {selectedRoute.path.length}</p>
                </div>
              )}
            </div>
          </Card>

          <Card title="Custom Drawing" padding="lg">
            <div style={styles.forms.container}>
              <p style={{ fontSize: '14px', margin: '0 0 10px 0' }}>
                Draw your own route by clicking on the map
              </p>
              <ControlsPanel layout="flex" gap="sm" marginBottom={false}>
                <Button 
                  onClick={startDrawing} 
                  disabled={isDrawing}
                  variant={isDrawing ? 'secondary' : 'primary'}
                >
                  {isDrawing ? 'Drawing...' : 'Start Drawing'}
                </Button>
                <Button onClick={finishDrawing} disabled={!isDrawing}>
                  Finish
                </Button>
                <Button onClick={clearCustomPath} variant="secondary">
                  {UI_LABELS.clear}
                </Button>
              </ControlsPanel>
              
              {customPath.length > 0 && (
                <div style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                  <p><strong>Custom Route:</strong></p>
                  <p>Points: {customPath.length}</p>
                  <p>Distance: {calculateDistance(customPath)}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <InfoBox variant={isDrawing ? 'warning' : 'info'}>
          {isDrawing ? (
            <>
              <strong>Drawing Mode Active:</strong> Click on the map to add points to your custom route.
            </>
          ) : (
            <>
              <strong>Route Display:</strong> Viewing {selectedRoute?.name}. Toggle drawing mode to create custom routes.
            </>
          )}
        </InfoBox>
      </PageSection>

      {/* Map Section */}
      <PageSection title="🗺️ Interactive Route Map">
        <MapContainer
          center={EGYPT_LOCATIONS.cairo}
          zoom={12}
          height="medium"
          onClick={handleMapClick}
        >
          {/* Selected Route Polyline */}
          {selectedRoute && (
            <Polyline
              path={selectedRoute.path}
              options={{
                strokeColor: selectedRoute.color,
                strokeWeight: selectedRoute.strokeWeight,
                strokeOpacity: 0.8,
              }}
            />
          )}

          {/* Custom Path Polyline */}
          {customPath.length > 1 && (
            <Polyline
              path={customPath}
              options={{
                strokeColor: "#FF00FF",
                strokeWeight: 3,
                strokeOpacity: 0.8,
              }}
            />
          )}

          {/* Route Markers */}
          {showMarkers && selectedRoute && selectedRoute.path.map((point, index) => (
            <Marker
              key={`route-${selectedRoute.id}-${index}`}
              position={point}
              title={`${selectedRoute.name} - Point ${index + 1}`}
              icon={{
                url: index === 0 ? MARKER_ICONS.start : 
                     index === selectedRoute.path.length - 1 ? MARKER_ICONS.end :
                     MARKER_ICONS.waypoint,
                scaledSize: typeof google !== 'undefined' ? new google.maps.Size(32, 32) : undefined
              }}
            />
          ))}

          {/* Custom Path Markers */}
          {customPath.map((point, index) => (
            <Marker
              key={`custom-${index}`}
              position={point}
              title={`Custom Point ${index + 1}`}
              icon={{
                url: MARKER_ICONS.purple,
                scaledSize: typeof google !== 'undefined' ? new google.maps.Size(24, 24) : undefined
              }}
            />
          ))}
        </MapContainer>
      </PageSection>

      {/* Implementation Section */}
      <PageSection title="💻 Implementation Code">
        <Card title="Polyline Component Usage" padding="lg" style={styles.utils.marginBottom.lg}>
          <CodeBlock language="tsx" showCopy>
            {CODE_EXAMPLES.polylineUsage}
          </CodeBlock>
        </Card>
      </PageSection>

      {/* Features Section */}
      <PageSection title="✨ Features Demonstrated" marginBottom={false}>
        <Card title="Key Features" padding="lg">
          <ul style={styles.lists.styled}>
            <li><strong>Multiple Routes:</strong> Switch between predefined routes</li>
            <li><strong>Custom Drawing:</strong> Click to create custom routes</li>
            <li><strong>Route Markers:</strong> Start, end, and waypoint markers</li>
            <li><strong>Distance Calculation:</strong> Approximate route distances</li>
            <li><strong>Visual Styling:</strong> Different colors and stroke weights</li>
            <li><strong>Interactive Controls:</strong> Toggle markers and drawing modes</li>
          </ul>
        </Card>
      </PageSection>
    </PageLayout>
  );
};

export default PolylinesPage;