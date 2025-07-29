import React, { useState } from 'react';
import { LoadScript, GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { Button, Card, InfoBox, CodeBlock } from '../components/ui';
import { LatLng } from '../types/common/LatLng';

const containerStyle = {
  width: '100%',
  height: '500px',
};

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
        { lat: 30.0444, lng: 31.2357 }, // Khan El Khalili
        { lat: 30.0626, lng: 31.2497 }, // Citadel
        { lat: 30.0131, lng: 31.2089 }, // Egyptian Museum
        { lat: 30.0275, lng: 31.2357 }, // Tahrir Square
        { lat: 30.0444, lng: 31.2357 }  // Back to start
      ],
      color: '#FF0000',
      strokeWeight: 4,
      description: 'A tour through Cairo\'s most famous historical sites'
    },
    {
      id: 'route2',
      name: 'Nile Corniche Route',
      path: [
        { lat: 30.0131, lng: 31.2089 },
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
        { lat: 30.0444, lng: 31.2357 }  // Downtown
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
    <div style={{ padding: '20px' }}>
      <h1>Polylines & Routes Demo</h1>
      <p>This page demonstrates how to implement polylines for showing routes, paths, and custom drawings on maps.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <Card>
          <h3>Route Selection</h3>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="route-select" style={{ display: 'block', marginBottom: '5px' }}>
              Select Route:
            </label>
            <select
              id="route-select"
              value={selectedRouteId}
              onChange={(e) => setSelectedRouteId(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            >
              {routes.map(route => (
                <option key={route.id} value={route.id}>{route.name}</option>
              ))}
            </select>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
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
        </Card>

        <Card>
          <h3>Custom Drawing</h3>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ fontSize: '14px', margin: '0 0 10px 0' }}>
              Draw your own route by clicking on the map
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
                Clear
              </Button>
            </div>
          </div>
          
          {customPath.length > 0 && (
            <div style={{ fontSize: '14px', color: '#666' }}>
              <p><strong>Custom Route:</strong></p>
              <p>Points: {customPath.length}</p>
              <p>Distance: {calculateDistance(customPath)}</p>
            </div>
          )}
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

      <div style={{ height: '500px', marginBottom: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 30.0444, lng: 31.2357 }}
            zoom={12}
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
                  url: index === 0 ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' : 
                       index === selectedRoute.path.length - 1 ? 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' :
                       'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                  scaledSize: new google.maps.Size(32, 32)
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
                  url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
                  scaledSize: new google.maps.Size(24, 24)
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      <Card>
        <h3>Implementation Code</h3>
        <CodeBlock language="tsx">
{`// Polyline Component Usage
import Polyline from '../components/maps/Polyline';

// In your component
const routePath = [
  { lat: 30.0444, lng: 31.2357 },
  { lat: 30.0626, lng: 31.2497 },
  { lat: 30.0131, lng: 31.2089 }
];

<GoogleMap center={{lat: 30.0444, lng: 31.2357}} zoom={12}>
  <Polyline
    path={routePath}
    strokeColor="#FF0000"
    strokeWeight={4}
    strokeOpacity={0.8}
  />
</GoogleMap>`}
        </CodeBlock>
      </Card>

      <Card>
        <h3>Features Demonstrated</h3>
        <ul>
          <li><strong>Multiple Routes:</strong> Switch between predefined routes</li>
          <li><strong>Custom Drawing:</strong> Click to create custom routes</li>
          <li><strong>Route Markers:</strong> Start, end, and waypoint markers</li>
          <li><strong>Distance Calculation:</strong> Approximate route distances</li>
          <li><strong>Visual Styling:</strong> Different colors and stroke weights</li>
          <li><strong>Interactive Controls:</strong> Toggle markers and drawing modes</li>
        </ul>
      </Card>
    </div>
  );
};

export default PolylinesPage;