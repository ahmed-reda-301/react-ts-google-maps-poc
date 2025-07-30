# Polygon Component

## Overview
`Polygon` is a component that draws a closed shape with multiple sides on the map. It's commonly used to represent areas, boundaries, zones, or regions with both stroke and fill styling options.

## Import
```typescript
import { Polygon } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `paths` | `LatLngLiteral[] \| LatLngLiteral[][]` | ✅ | - | Array of coordinates defining the polygon |
| `options` | `PolygonOptions` | ❌ | - | Additional polygon options |

### Stroke Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `strokeColor` | `string` | `'#FF0000'` | Border color |
| `strokeOpacity` | `number` | `1.0` | Border opacity (0.0 to 1.0) |
| `strokeWeight` | `number` | `2` | Border width in pixels |
| `strokePosition` | `StrokePosition` | `'CENTER'` | Border position |

### Fill Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fillColor` | `string` | `'#FF0000'` | Fill color |
| `fillOpacity` | `number` | `0.35` | Fill opacity (0.0 to 1.0) |

### Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `clickable` | `boolean` | `true` | Allow clicking on polygon |
| `draggable` | `boolean` | `false` | Allow dragging polygon |
| `editable` | `boolean` | `false` | Allow editing polygon |
| `geodesic` | `boolean` | `false` | Follow Earth's curvature |
| `visible` | `boolean` | `true` | Polygon visibility |
| `zIndex` | `number` | - | Polygon z-index |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(polygon: google.maps.Polygon) => void` | Called when polygon loads |
| `onUnmount` | `(polygon: google.maps.Polygon) => void` | Called when polygon unmounts |
| `onClick` | `(e: google.maps.PolyMouseEvent) => void` | Polygon click event |
| `onDblClick` | `(e: google.maps.PolyMouseEvent) => void` | Polygon double-click event |
| `onRightClick` | `(e: google.maps.PolyMouseEvent) => void` | Polygon right-click event |
| `onMouseDown` | `(e: google.maps.PolyMouseEvent) => void` | Mouse down on polygon |
| `onMouseUp` | `(e: google.maps.PolyMouseEvent) => void` | Mouse up on polygon |
| `onMouseOver` | `(e: google.maps.PolyMouseEvent) => void` | Mouse enters polygon |
| `onMouseOut` | `(e: google.maps.PolyMouseEvent) => void` | Mouse leaves polygon |
| `onDrag` | `(e: google.maps.MapMouseEvent) => void` | Polygon drag event |
| `onDragStart` | `(e: google.maps.MapMouseEvent) => void` | Polygon drag start |
| `onDragEnd` | `(e: google.maps.MapMouseEvent) => void` | Polygon drag end |

## Usage Examples

### Basic Polygon
```typescript
import React from 'react';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

const BasicPolygon: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Define a triangular area around Riyadh landmarks
  const trianglePath = [
    { lat: 24.7136, lng: 46.6753 }, // Kingdom Centre
    { lat: 24.6877, lng: 46.6857 }, // Al Faisaliah Tower
    { lat: 24.6308, lng: 46.7073 }, // Masmak Fortress
    { lat: 24.7136, lng: 46.6753 }  // Back to start
  ];

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={center}
      >
        <Polygon
          paths={trianglePath}
          options={{
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default BasicPolygon;
```

### Multiple Polygons with Different Styles
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

interface Zone {
  id: string;
  name: string;
  paths: google.maps.LatLngLiteral[];
  fillColor: string;
  strokeColor: string;
  description: string;
}

const MultiplePolygons: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const zones: Zone[] = [
    {
      id: 'business',
      name: 'Business District',
      paths: [
        { lat: 24.7200, lng: 46.6700 },
        { lat: 24.7300, lng: 46.6700 },
        { lat: 24.7300, lng: 46.6900 },
        { lat: 24.7200, lng: 46.6900 }
      ],
      fillColor: '#007bff',
      strokeColor: '#0056b3',
      description: 'Main business and commercial area'
    },
    {
      id: 'residential',
      name: 'Residential Area',
      paths: [
        { lat: 24.6800, lng: 46.6500 },
        { lat: 24.7000, lng: 46.6500 },
        { lat: 24.7000, lng: 46.6700 },
        { lat: 24.6800, lng: 46.6700 }
      ],
      fillColor: '#28a745',
      strokeColor: '#1e7e34',
      description: 'Quiet residential neighborhoods'
    },
    {
      id: 'historical',
      name: 'Historical District',
      paths: [
        { lat: 24.6200, lng: 46.7000 },
        { lat: 24.6500, lng: 46.7000 },
        { lat: 24.6500, lng: 46.7300 },
        { lat: 24.6200, lng: 46.7300 }
      ],
      fillColor: '#ffc107',
      strokeColor: '#e0a800',
      description: 'Historic sites and cultural landmarks'
    },
    {
      id: 'shopping',
      name: 'Shopping District',
      paths: [
        { lat: 24.7000, lng: 46.6900 },
        { lat: 24.7200, lng: 46.6900 },
        { lat: 24.7200, lng: 46.7100 },
        { lat: 24.7000, lng: 46.7100 }
      ],
      fillColor: '#dc3545',
      strokeColor: '#c82333',
      description: 'Major shopping centers and malls'
    }
  ];

  const handlePolygonClick = (zoneId: string) => {
    setSelectedZone(selectedZone === zoneId ? null : zoneId);
  };

  const getPolygonOptions = (zone: Zone) => ({
    fillColor: zone.fillColor,
    fillOpacity: selectedZone === zone.id ? 0.6 : 0.35,
    strokeColor: zone.strokeColor,
    strokeOpacity: 0.8,
    strokeWeight: selectedZone === zone.id ? 3 : 2,
    clickable: true
  });

  return (
    <div>
      <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>City Zones</h3>
        <p>Click on any zone to highlight it and see details</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
          {zones.map(zone => (
            <div
              key={zone.id}
              style={{
                padding: '10px',
                backgroundColor: selectedZone === zone.id ? zone.fillColor + '20' : 'white',
                border: `2px solid ${zone.strokeColor}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handlePolygonClick(zone.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: zone.fillColor,
                    borderRadius: '3px',
                    marginRight: '8px'
                  }}
                />
                <strong>{zone.name}</strong>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                {zone.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          {zones.map(zone => (
            <Polygon
              key={zone.id}
              paths={zone.paths}
              options={getPolygonOptions(zone)}
              onClick={() => handlePolygonClick(zone.id)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MultiplePolygons;
```

### Interactive Polygon Builder
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';

const InteractivePolygonBuilder: React.FC = () => {
  const [polygonPath, setPolygonPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (isBuilding && e.latLng) {
      const newPoint = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setPolygonPath(prevPath => [...prevPath, newPoint]);
    }
  }, [isBuilding]);

  const startBuilding = () => {
    setPolygonPath([]);
    setIsBuilding(true);
  };

  const finishPolygon = () => {
    if (polygonPath.length >= 3) {
      setIsBuilding(false);
    } else {
      alert('A polygon needs at least 3 points!');
    }
  };

  const clearPolygon = () => {
    setPolygonPath([]);
    setIsBuilding(false);
  };

  const removeLastPoint = () => {
    setPolygonPath(prevPath => prevPath.slice(0, -1));
  };

  const calculateArea = () => {
    if (polygonPath.length < 3) return 0;
    
    const path = polygonPath.map(point => 
      new window.google.maps.LatLng(point.lat, point.lng)
    );
    
    const area = window.google.maps.geometry.spherical.computeArea(path);
    return (area / 1000000).toFixed(2); // Convert to square kilometers
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Polygon Builder</h3>
        <p>
          {isBuilding 
            ? 'Click on the map to add points to your polygon. You need at least 3 points.'
            : 'Click "Start Building" to create a new polygon by clicking on the map.'
          }
        </p>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
          {!isBuilding ? (
            <button
              onClick={startBuilding}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Start Building
            </button>
          ) : (
            <>
              <button
                onClick={finishPolygon}
                disabled={polygonPath.length < 3}
                style={{
                  padding: '8px 16px',
                  backgroundColor: polygonPath.length >= 3 ? '#28a745' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: polygonPath.length >= 3 ? 'pointer' : 'not-allowed'
                }}
              >
                Finish Polygon
              </button>
              
              <button
                onClick={removeLastPoint}
                disabled={polygonPath.length === 0}
                style={{
                  padding: '8px 16px',
                  backgroundColor: polygonPath.length > 0 ? '#ffc107' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: polygonPath.length > 0 ? 'pointer' : 'not-allowed'
                }}
              >
                Remove Last Point
              </button>
            </>
          )}
          
          <button
            onClick={clearPolygon}
            disabled={polygonPath.length === 0}
            style={{
              padding: '8px 16px',
              backgroundColor: polygonPath.length > 0 ? '#dc3545' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: polygonPath.length > 0 ? 'pointer' : 'not-allowed'
            }}
          >
            Clear
          </button>
        </div>

        <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '4px'
          }}>
            Points: {polygonPath.length}
          </div>
          
          {polygonPath.length >= 3 && (
            <div style={{ 
              padding: '8px 12px', 
              backgroundColor: '#d4edda', 
              borderRadius: '4px'
            }}>
              Area: {calculateArea()} km²
            </div>
          )}
          
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: isBuilding ? '#fff3cd' : '#e9ecef', 
            borderRadius: '4px'
          }}>
            Status: {isBuilding ? 'Building...' : 'Ready'}
          </div>
        </div>
      </div>

      <LoadScript 
        googleMapsApiKey="YOUR_API_KEY"
        libraries={['geometry']}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
          onClick={onMapClick}
          options={{
            cursor: isBuilding ? 'crosshair' : 'default'
          }}
        >
          {/* Show polygon if we have at least 3 points */}
          {polygonPath.length >= 3 && (
            <Polygon
              paths={polygonPath}
              options={{
                fillColor: '#FF6B6B',
                fillOpacity: 0.35,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                clickable: false
              }}
            />
          )}

          {/* Show markers for each point */}
          {polygonPath.map((point, index) => (
            <Marker
              key={index}
              position={point}
              title={`Point ${index + 1}`}
              label={{
                text: (index + 1).toString(),
                color: 'white',
                fontWeight: 'bold'
              }}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#FF0000',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default InteractivePolygonBuilder;
```

### Polygon with Holes
```typescript
import React from 'react';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

const PolygonWithHoles: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Outer boundary (main polygon)
  const outerPath = [
    { lat: 24.7000, lng: 46.6500 },
    { lat: 24.7400, lng: 46.6500 },
    { lat: 24.7400, lng: 46.7000 },
    { lat: 24.7000, lng: 46.7000 },
    { lat: 24.7000, lng: 46.6500 }
  ];

  // Inner holes (exclusion areas)
  const hole1 = [
    { lat: 24.7100, lng: 46.6600 },
    { lat: 24.7200, lng: 46.6600 },
    { lat: 24.7200, lng: 46.6700 },
    { lat: 24.7100, lng: 46.6700 },
    { lat: 24.7100, lng: 46.6600 }
  ];

  const hole2 = [
    { lat: 24.7250, lng: 46.6750 },
    { lat: 24.7350, lng: 46.6750 },
    { lat: 24.7350, lng: 46.6850 },
    { lat: 24.7250, lng: 46.6850 },
    { lat: 24.7250, lng: 46.6750 }
  ];

  // Combine outer path with holes
  const polygonPaths = [outerPath, hole1, hole2];

  return (
    <div>
      <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Polygon with Holes</h3>
        <p>This polygon demonstrates how to create exclusion areas (holes) within a larger polygon.</p>
        
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#007bff',
              opacity: 0.35,
              border: '2px solid #0056b3',
              marginRight: '8px'
            }} />
            <span>Main Area</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'white',
              border: '2px solid #0056b3',
              marginRight: '8px'
            }} />
            <span>Excluded Areas (Holes)</span>
          </div>
        </div>
      </div>

      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          <Polygon
            paths={polygonPaths}
            options={{
              fillColor: '#007bff',
              fillOpacity: 0.35,
              strokeColor: '#0056b3',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default PolygonWithHoles;
```

### Editable Polygon
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

const EditablePolygon: React.FC = () => {
  const [polygonPath, setPolygonPath] = useState<google.maps.LatLngLiteral[]>([
    { lat: 24.7136, lng: 46.6753 },
    { lat: 24.6877, lng: 46.6857 },
    { lat: 24.6308, lng: 46.7073 },
    { lat: 24.6465, lng: 46.7169 }
  ]);
  const [isEditable, setIsEditable] = useState(false);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onLoad = useCallback((polygon: google.maps.Polygon) => {
    console.log('Polygon loaded');
    
    // Listen for path changes when editable
    const pathChangedListener = () => {
      const outerPath = polygon.getPath();
      const coordinates: google.maps.LatLngLiteral[] = [];
      
      for (let i = 0; i < outerPath.getLength(); i++) {
        const point = outerPath.getAt(i);
        coordinates.push({
          lat: point.lat(),
          lng: point.lng()
        });
      }
      
      setPolygonPath(coordinates);
    };

    polygon.getPath().addListener('set_at', pathChangedListener);
    polygon.getPath().addListener('insert_at', pathChangedListener);
    polygon.getPath().addListener('remove_at', pathChangedListener);
  }, []);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const calculateArea = () => {
    if (polygonPath.length < 3) return 0;
    
    const path = polygonPath.map(point => 
      new window.google.maps.LatLng(point.lat, point.lng)
    );
    
    const area = window.google.maps.geometry.spherical.computeArea(path);
    return (area / 1000000).toFixed(2); // Convert to square kilometers
  };

  const savePolygon = () => {
    console.log('Saved polygon:', polygonPath);
    alert(`Polygon saved with ${polygonPath.length} points and area of ${calculateArea()} km²!`);
    setIsEditable(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Editable Polygon</h3>
        <p>
          {isEditable 
            ? 'Click and drag the points to edit the polygon. Click on edges to add new points.'
            : 'Click "Edit Mode" to modify the polygon shape.'
          }
        </p>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <button
            onClick={toggleEditable}
            style={{
              padding: '8px 16px',
              backgroundColor: isEditable ? '#dc3545' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isEditable ? 'Exit Edit Mode' : 'Edit Mode'}
          </button>
          
          {isEditable && (
            <button
              onClick={savePolygon}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Save Polygon
            </button>
          )}

          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Points: {polygonPath.length}
          </div>

          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#d4edda', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Area: {calculateArea()} km²
          </div>
        </div>

        {isEditable && (
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#d1ecf1', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <strong>Edit Instructions:</strong>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>Drag existing points to move them</li>
              <li>Click on edges to add new points</li>
              <li>Right-click on points to delete them</li>
            </ul>
          </div>
        )}
      </div>

      <LoadScript 
        googleMapsApiKey="YOUR_API_KEY"
        libraries={['geometry']}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          <Polygon
            paths={polygonPath}
            onLoad={onLoad}
            options={{
              fillColor: isEditable ? '#FF6B6B' : '#007bff',
              fillOpacity: 0.35,
              strokeColor: isEditable ? '#FF0000' : '#0056b3',
              strokeOpacity: 0.8,
              strokeWeight: isEditable ? 3 : 2,
              editable: isEditable,
              draggable: isEditable
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default EditablePolygon;
```

## Data Types

### PolygonOptions
```typescript
interface PolygonOptions {
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  geodesic?: boolean;
  paths?: MVCArray<MVCArray<LatLng>> | MVCArray<LatLng> | LatLng[][] | LatLngLiteral[][];
  strokeColor?: string;
  strokeOpacity?: number;
  strokePosition?: StrokePosition;
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
}
```

### StrokePosition
```typescript
enum StrokePosition {
  CENTER = 0,
  INSIDE = 1,
  OUTSIDE = 2
}
```

## Best Practices

### 1. Performance Optimization
```typescript
// Limit complexity for better performance
const MAX_VERTICES = 500;

// Use simplified paths for large areas
const simplifyPolygon = (path: LatLngLiteral[], tolerance: number) => {
  // Implement simplification algorithm
};

// Consider using multiple smaller polygons instead of one complex polygon
```

### 2. Styling Guidelines
```typescript
// Use consistent color schemes
const polygonStyles = {
  residential: {
    fillColor: '#28a745',
    strokeColor: '#1e7e34',
    fillOpacity: 0.35
  },
  commercial: {
    fillColor: '#007bff',
    strokeColor: '#0056b3',
    fillOpacity: 0.35
  },
  industrial: {
    fillColor: '#6c757d',
    strokeColor: '#495057',
    fillOpacity: 0.35
  }
};
```

### 3. Event Handling
```typescript
// Handle polygon interactions efficiently
const handlePolygonClick = useCallback((e: google.maps.PolyMouseEvent) => {
  console.log('Clicked vertex:', e.vertex);
  console.log('Clicked edge:', e.edge);
  console.log('Clicked path:', e.path);
}, []);
```

## Common Issues and Solutions

### 1. Complex polygons causing performance issues
- Simplify polygon paths
- Use multiple smaller polygons
- Implement level-of-detail rendering

### 2. Holes not displaying correctly
- Ensure hole paths are in opposite winding order
- Verify hole is completely inside outer boundary

### 3. Editing issues
- Properly handle path change events
- Validate polygon after edits

### 4. Fill not showing
- Check fillOpacity is greater than 0
- Ensure fillColor is valid

## Important Notes

- Polygon must be a child of GoogleMap component
- Paths prop is required and must contain at least 3 points
- For polygons with holes, use array of arrays format
- Holes should have opposite winding order from outer boundary
- Editable polygons allow users to modify shape and add/remove vertices
- Use geometry library for area calculations
- Performance decreases with polygon complexity
- Consider using geodesic for large geographic areas