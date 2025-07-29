import React, { useState } from 'react';
import { LoadScript, GoogleMap, Polygon, Marker } from '@react-google-maps/api';
import { Button, Card, InfoBox, CodeBlock } from '../components/ui';
import { LatLng } from '../types/common/LatLng';

const containerStyle = {
  width: '100%',
  height: '500px',
};

interface AreaData {
  id: string;
  name: string;
  paths: LatLng[];
  fillColor: string;
  strokeColor: string;
  fillOpacity: number;
  strokeWeight: number;
  description: string;
  type: string;
}

/**
 * Polygons Page - Demonstrates polygon implementations for areas and zones
 */
const PolygonsPage: React.FC = () => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>('area1');
  const [showMarkers, setShowMarkers] = useState<boolean>(true);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [customPolygon, setCustomPolygon] = useState<LatLng[]>([]);

  const [areas] = useState<AreaData[]>([
    {
      id: 'area1',
      name: 'Historic Cairo District',
      paths: [
        { lat: 30.0400, lng: 31.2300 },
        { lat: 30.0500, lng: 31.2300 },
        { lat: 30.0500, lng: 31.2450 },
        { lat: 30.0400, lng: 31.2450 }
      ],
      fillColor: '#FF0000',
      strokeColor: '#AA0000',
      fillOpacity: 0.3,
      strokeWeight: 2,
      description: 'Historic district containing Khan El Khalili and surrounding areas',
      type: 'Historic Zone'
    },
    {
      id: 'area2',
      name: 'Nile River Zone',
      paths: [
        { lat: 30.0100, lng: 31.2000 },
        { lat: 30.0200, lng: 31.2000 },
        { lat: 30.0250, lng: 31.2100 },
        { lat: 30.0300, lng: 31.2200 },
        { lat: 30.0200, lng: 31.2300 },
        { lat: 30.0100, lng: 31.2200 }
      ],
      fillColor: '#0000FF',
      strokeColor: '#000088',
      fillOpacity: 0.4,
      strokeWeight: 3,
      description: 'Area along the Nile River with parks and recreational facilities',
      type: 'Recreational Zone'
    },
    {
      id: 'area3',
      name: 'Business District',
      paths: [
        { lat: 30.0600, lng: 31.2400 },
        { lat: 30.0700, lng: 31.2400 },
        { lat: 30.0750, lng: 31.2500 },
        { lat: 30.0700, lng: 31.2600 },
        { lat: 30.0600, lng: 31.2600 },
        { lat: 30.0550, lng: 31.2500 }
      ],
      fillColor: '#00FF00',
      strokeColor: '#008800',
      fillOpacity: 0.25,
      strokeWeight: 2,
      description: 'Modern business and commercial district',
      type: 'Commercial Zone'
    }
  ]);

  const selectedArea = areas.find(area => area.id === selectedAreaId);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (isDrawing && event.latLng) {
      const newPoint = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      setCustomPolygon([...customPolygon, newPoint]);
    }
  };

  const clearCustomPolygon = () => {
    setCustomPolygon([]);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const startDrawing = () => {
    setIsDrawing(true);
    setCustomPolygon([]);
  };

  const calculateArea = (paths: LatLng[]): string => {
    if (paths.length < 3) return '0 km²';
    
    // Simple area calculation using shoelace formula (approximate)
    let area = 0;
    const n = paths.length;
    
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += paths[i].lat * paths[j].lng;
      area -= paths[j].lat * paths[i].lng;
    }
    
    area = Math.abs(area) / 2;
    
    // Convert to approximate km² (very rough calculation)
    const kmArea = area * 12321; // Rough conversion factor
    
    return `${kmArea.toFixed(2)} km²`;
  };

  const getPolygonCenter = (paths: LatLng[]): LatLng => {
    if (paths.length === 0) return { lat: 30.0444, lng: 31.2357 };
    
    const sumLat = paths.reduce((sum, point) => sum + point.lat, 0);
    const sumLng = paths.reduce((sum, point) => sum + point.lng, 0);
    
    return {
      lat: sumLat / paths.length,
      lng: sumLng / paths.length
    };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Polygons & Areas Demo</h1>
      <p>This page demonstrates how to implement polygons for showing areas, zones, and regions on maps.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <Card>
          <h3>Area Selection</h3>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="area-select" style={{ display: 'block', marginBottom: '5px' }}>
              Select Area:
            </label>
            <select
              id="area-select"
              value={selectedAreaId}
              onChange={(e) => setSelectedAreaId(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            >
              {areas.map(area => (
                <option key={area.id} value={area.id}>{area.name}</option>
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
              Show Boundary Markers
            </label>
          </div>

          {selectedArea && (
            <div style={{ fontSize: '14px', color: '#666' }}>
              <p><strong>Type:</strong> {selectedArea.type}</p>
              <p><strong>Description:</strong> {selectedArea.description}</p>
              <p><strong>Area:</strong> {calculateArea(selectedArea.paths)}</p>
              <p><strong>Vertices:</strong> {selectedArea.paths.length}</p>
            </div>
          )}
        </Card>

        <Card>
          <h3>Custom Polygon Drawing</h3>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ fontSize: '14px', margin: '0 0 10px 0' }}>
              Draw your own polygon by clicking on the map (minimum 3 points)
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Button 
                onClick={startDrawing} 
                disabled={isDrawing}
                variant={isDrawing ? 'secondary' : 'primary'}
              >
                {isDrawing ? 'Drawing...' : 'Start Drawing'}
              </Button>
              <Button 
                onClick={finishDrawing} 
                disabled={!isDrawing || customPolygon.length < 3}
              >
                Finish
              </Button>
              <Button onClick={clearCustomPolygon} variant="secondary">
                Clear
              </Button>
            </div>
          </div>
          
          {customPolygon.length > 0 && (
            <div style={{ fontSize: '14px', color: '#666' }}>
              <p><strong>Custom Polygon:</strong></p>
              <p>Vertices: {customPolygon.length}</p>
              {customPolygon.length >= 3 && (
                <p>Area: {calculateArea(customPolygon)}</p>
              )}
            </div>
          )}
        </Card>
      </div>

      <InfoBox variant={isDrawing ? 'warning' : 'info'}>
        {isDrawing ? (
          <>
            <strong>Drawing Mode Active:</strong> Click on the map to add vertices to your polygon. Need at least 3 points to create a polygon.
          </>
        ) : (
          <>
            <strong>Area Display:</strong> Viewing {selectedArea?.name}. Toggle drawing mode to create custom polygons.
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
            {/* Selected Area Polygon */}
            {selectedArea && (
              <Polygon
                paths={selectedArea.paths}
                options={{
                  fillColor: selectedArea.fillColor,
                  fillOpacity: selectedArea.fillOpacity,
                  strokeColor: selectedArea.strokeColor,
                  strokeWeight: selectedArea.strokeWeight,
                  strokeOpacity: 0.8,
                }}
              />
            )}

            {/* Custom Polygon */}
            {customPolygon.length >= 3 && (
              <Polygon
                paths={customPolygon}
                options={{
                  fillColor: "#FF00FF",
                  fillOpacity: 0.3,
                  strokeColor: "#AA00AA",
                  strokeWeight: 2,
                  strokeOpacity: 0.8,
                }}
              />
            )}

            {/* Area Boundary Markers */}
            {showMarkers && selectedArea && selectedArea.paths.map((point, index) => (
              <Marker
                key={`area-${selectedArea.id}-${index}`}
                position={point}
                title={`${selectedArea.name} - Vertex ${index + 1}`}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                  scaledSize: typeof google !== 'undefined' ? new google.maps.Size(24, 24) : undefined
                }}
              />
            ))}

            {/* Custom Polygon Markers */}
            {customPolygon.map((point, index) => (
              <Marker
                key={`custom-vertex-${index}`}
                position={point}
                title={`Custom Vertex ${index + 1}`}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
                  scaledSize: typeof google !== 'undefined' ? new google.maps.Size(20, 20) : undefined
                }}
              />
            ))}

            {/* Area Center Markers */}
            {selectedArea && (
              <Marker
                position={getPolygonCenter(selectedArea.paths)}
                title={`${selectedArea.name} Center`}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/info-i.png',
                  scaledSize: typeof google !== 'undefined' ? new google.maps.Size(32, 32) : undefined
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <Card>
        <h3>Implementation Code</h3>
        <CodeBlock language="tsx">
{`// Polygon Component Usage
import Polygon from '../components/maps/Polygon';

// In your component
const areaPaths = [
  { lat: 30.0400, lng: 31.2300 },
  { lat: 30.0500, lng: 31.2300 },
  { lat: 30.0500, lng: 31.2450 },
  { lat: 30.0400, lng: 31.2450 }
];

<GoogleMap center={{lat: 30.0444, lng: 31.2357}} zoom={12}>
  <Polygon
    paths={areaPaths}
    fillColor="#FF0000"
    fillOpacity={0.3}
    strokeColor="#AA0000"
    strokeWeight={2}
  />
</GoogleMap>`}
        </CodeBlock>
      </Card>

      <Card>
        <h3>Features Demonstrated</h3>
        <ul>
          <li><strong>Multiple Areas:</strong> Switch between predefined zones</li>
          <li><strong>Custom Drawing:</strong> Click to create custom polygons</li>
          <li><strong>Boundary Markers:</strong> Show vertices and center points</li>
          <li><strong>Area Calculation:</strong> Approximate area measurements</li>
          <li><strong>Visual Styling:</strong> Different colors and opacity levels</li>
          <li><strong>Zone Types:</strong> Historic, recreational, and commercial areas</li>
          <li><strong>Interactive Controls:</strong> Toggle markers and drawing modes</li>
        </ul>
      </Card>
    </div>
  );
};

export default PolygonsPage;