# Polyline Component

## Overview
`Polyline` is a component that draws a series of connected line segments on the map. It's commonly used to show routes, paths, boundaries, or any linear features.

## Import
```typescript
import { Polyline } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `path` | `LatLngLiteral[] \| LatLng[]` | ✅ | - | Array of coordinates defining the line |
| `options` | `PolylineOptions` | ❌ | - | Additional polyline options |

### Style Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `strokeColor` | `string` | `'#FF0000'` | Line color |
| `strokeOpacity` | `number` | `1.0` | Line opacity (0.0 to 1.0) |
| `strokeWeight` | `number` | `2` | Line width in pixels |
| `geodesic` | `boolean` | `false` | Follow Earth's curvature |
| `visible` | `boolean` | `true` | Polyline visibility |
| `zIndex` | `number` | - | Polyline z-index |

### Interaction Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `clickable` | `boolean` | `true` | Allow clicking on polyline |
| `draggable` | `boolean` | `false` | Allow dragging polyline |
| `editable` | `boolean` | `false` | Allow editing polyline |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(polyline: google.maps.Polyline) => void` | Called when polyline loads |
| `onUnmount` | `(polyline: google.maps.Polyline) => void` | Called when polyline unmounts |
| `onClick` | `(e: google.maps.PolyMouseEvent) => void` | Polyline click event |
| `onDblClick` | `(e: google.maps.PolyMouseEvent) => void` | Polyline double-click event |
| `onRightClick` | `(e: google.maps.PolyMouseEvent) => void` | Polyline right-click event |
| `onMouseDown` | `(e: google.maps.PolyMouseEvent) => void` | Mouse down on polyline |
| `onMouseUp` | `(e: google.maps.PolyMouseEvent) => void` | Mouse up on polyline |
| `onMouseOver` | `(e: google.maps.PolyMouseEvent) => void` | Mouse enters polyline |
| `onMouseOut` | `(e: google.maps.PolyMouseEvent) => void` | Mouse leaves polyline |
| `onDrag` | `(e: google.maps.MapMouseEvent) => void` | Polyline drag event |
| `onDragStart` | `(e: google.maps.MapMouseEvent) => void` | Polyline drag start |
| `onDragEnd` | `(e: google.maps.MapMouseEvent) => void` | Polyline drag end |

## Usage Examples

### Basic Polyline
```typescript
import React from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

const BasicPolyline: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Simple path connecting several points in Riyadh
  const path = [
    { lat: 24.7136, lng: 46.6753 }, // Kingdom Centre
    { lat: 24.6877, lng: 46.6857 }, // Al Faisaliah Tower
    { lat: 24.6308, lng: 46.7073 }, // Masmak Fortress
    { lat: 24.6465, lng: 46.7169 }, // National Museum
    { lat: 24.7136, lng: 46.6753 }  // Back to Kingdom Centre
  ];

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={center}
      >
        <Polyline
          path={path}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 3
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default BasicPolyline;
```

### Multiple Styled Polylines
```typescript
import React from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

const MultiplePolylines: React.FC = () => {
  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Different routes with different styles
  const routes = [
    {
      id: 'route1',
      name: 'Business District Tour',
      path: [
        { lat: 24.7136, lng: 46.6753 },
        { lat: 24.6877, lng: 46.6857 },
        { lat: 24.6950, lng: 46.6920 },
        { lat: 24.7100, lng: 46.6800 }
      ],
      options: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        geodesic: true
      }
    },
    {
      id: 'route2',
      name: 'Historical Sites',
      path: [
        { lat: 24.6308, lng: 46.7073 },
        { lat: 24.6465, lng: 46.7169 },
        { lat: 24.6380, lng: 46.7250 },
        { lat: 24.6200, lng: 46.7100 }
      ],
      options: {
        strokeColor: '#00FF00',
        strokeOpacity: 0.7,
        strokeWeight: 3,
        geodesic: false
      }
    },
    {
      id: 'route3',
      name: 'Shopping Route',
      path: [
        { lat: 24.7200, lng: 46.6600 },
        { lat: 24.7300, lng: 46.6700 },
        { lat: 24.7400, lng: 46.6650 },
        { lat: 24.7350, lng: 46.6550 }
      ],
      options: {
        strokeColor: '#0000FF',
        strokeOpacity: 0.9,
        strokeWeight: 5,
        geodesic: true
      }
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
        <h3>Multiple Routes</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {routes.map(route => (
            <div key={route.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '20px',
                  height: '4px',
                  backgroundColor: route.options.strokeColor,
                  marginRight: '8px',
                  opacity: route.options.strokeOpacity
                }}
              />
              <span style={{ fontSize: '14px' }}>{route.name}</span>
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
          {routes.map(route => (
            <Polyline
              key={route.id}
              path={route.path}
              options={route.options}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MultiplePolylines;
```

### Interactive Polyline
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';

const InteractivePolyline: React.FC = () => {
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([
    { lat: 24.7136, lng: 46.6753 },
    { lat: 24.6877, lng: 46.6857 }
  ]);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPoint = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setPath(prevPath => [...prevPath, newPoint]);
    }
  }, []);

  const onPolylineClick = useCallback((e: google.maps.PolyMouseEvent) => {
    console.log('Polyline clicked at:', e.latLng?.lat(), e.latLng?.lng());
  }, []);

  const removePoint = (index: number) => {
    setPath(prevPath => prevPath.filter((_, i) => i !== index));
    setSelectedPoint(null);
  };

  const clearPath = () => {
    setPath([]);
    setSelectedPoint(null);
  };

  const calculateDistance = () => {
    if (path.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const from = new window.google.maps.LatLng(path[i].lat, path[i].lng);
      const to = new window.google.maps.LatLng(path[i + 1].lat, path[i + 1].lng);
      totalDistance += window.google.maps.geometry.spherical.computeDistanceBetween(from, to);
    }
    return (totalDistance / 1000).toFixed(2); // Convert to kilometers
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Interactive Polyline Builder</h3>
        <p>Click on the map to add points to the polyline</p>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button
            onClick={clearPath}
            disabled={path.length === 0}
            style={{
              padding: '8px 16px',
              backgroundColor: path.length > 0 ? '#dc3545' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: path.length > 0 ? 'pointer' : 'not-allowed'
            }}
          >
            Clear Path
          </button>
          
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Points: {path.length}
          </div>
          
          {path.length >= 2 && (
            <div style={{ 
              padding: '8px 12px', 
              backgroundColor: '#d4edda', 
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              Distance: {calculateDistance()} km
            </div>
          )}
        </div>

        {selectedPoint !== null && (
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#fff3cd', 
            borderRadius: '4px',
            marginBottom: '10px'
          }}>
            <strong>Selected Point {selectedPoint + 1}:</strong>
            <br />
            Lat: {path[selectedPoint].lat.toFixed(6)}, 
            Lng: {path[selectedPoint].lng.toFixed(6)}
            <br />
            <button
              onClick={() => removePoint(selectedPoint)}
              style={{
                marginTop: '5px',
                padding: '4px 8px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Remove Point
            </button>
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
          onClick={onMapClick}
        >
          {path.length >= 2 && (
            <Polyline
              path={path}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 3,
                clickable: true
              }}
              onClick={onPolylineClick}
            />
          )}

          {path.map((point, index) => (
            <Marker
              key={index}
              position={point}
              title={`Point ${index + 1}`}
              label={{
                text: (index + 1).toString(),
                color: 'white',
                fontWeight: 'bold'
              }}
              onClick={() => setSelectedPoint(index)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: selectedPoint === index ? '#FFD700' : '#FF0000',
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

export default InteractivePolyline;
```

### Animated Polyline
```typescript
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';

const AnimatedPolyline: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Complete route path
  const fullPath = [
    { lat: 24.7136, lng: 46.6753 }, // Start
    { lat: 24.7100, lng: 46.6800 },
    { lat: 24.7050, lng: 46.6850 },
    { lat: 24.7000, lng: 46.6900 },
    { lat: 24.6950, lng: 46.6920 },
    { lat: 24.6900, lng: 46.6940 },
    { lat: 24.6877, lng: 46.6857 }, // End
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAnimating && currentIndex < fullPath.length) {
      interval = setInterval(() => {
        setCurrentPath(prev => [...prev, fullPath[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 500); // Add a point every 500ms
    } else if (currentIndex >= fullPath.length) {
      setIsAnimating(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating, currentIndex, fullPath]);

  const startAnimation = () => {
    setCurrentPath([fullPath[0]]);
    setCurrentIndex(1);
    setIsAnimating(true);
  };

  const resetAnimation = () => {
    setCurrentPath([]);
    setCurrentIndex(0);
    setIsAnimating(false);
  };

  const getCurrentPosition = () => {
    return currentPath.length > 0 ? currentPath[currentPath.length - 1] : fullPath[0];
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Animated Route Drawing</h3>
        <p>Watch as the route is drawn progressively on the map</p>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            style={{
              padding: '8px 16px',
              backgroundColor: isAnimating ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isAnimating ? 'not-allowed' : 'pointer'
            }}
          >
            {isAnimating ? 'Animating...' : 'Start Animation'}
          </button>
          
          <button
            onClick={resetAnimation}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>

          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Progress: {currentPath.length}/{fullPath.length}
          </div>
        </div>
      </div>

      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          {currentPath.length >= 2 && (
            <Polyline
              path={currentPath}
              options={{
                strokeColor: '#FF6B6B',
                strokeOpacity: 0.8,
                strokeWeight: 4,
                geodesic: true
              }}
            />
          )}

          {/* Start marker */}
          <Marker
            position={fullPath[0]}
            title="Start"
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#28a745',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2
            }}
          />

          {/* End marker */}
          <Marker
            position={fullPath[fullPath.length - 1]}
            title="End"
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#dc3545',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2
            }}
          />

          {/* Current position marker (only show during animation) */}
          {isAnimating && currentPath.length > 0 && (
            <Marker
              position={getCurrentPosition()}
              title="Current Position"
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#FFD700',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
              animation={window.google.maps.Animation.BOUNCE}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default AnimatedPolyline;
```

### Editable Polyline
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

const EditablePolyline: React.FC = () => {
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([
    { lat: 24.7136, lng: 46.6753 },
    { lat: 24.6877, lng: 46.6857 },
    { lat: 24.6308, lng: 46.7073 }
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

  const onLoad = useCallback((polyline: google.maps.Polyline) => {
    console.log('Polyline loaded');
    
    // Listen for path changes when editable
    const pathChangedListener = () => {
      const newPath = polyline.getPath();
      const coordinates: google.maps.LatLngLiteral[] = [];
      
      for (let i = 0; i < newPath.getLength(); i++) {
        const point = newPath.getAt(i);
        coordinates.push({
          lat: point.lat(),
          lng: point.lng()
        });
      }
      
      setPath(coordinates);
    };

    polyline.getPath().addListener('set_at', pathChangedListener);
    polyline.getPath().addListener('insert_at', pathChangedListener);
    polyline.getPath().addListener('remove_at', pathChangedListener);
  }, []);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const savePath = () => {
    console.log('Saved path:', path);
    alert(`Path saved with ${path.length} points!`);
    setIsEditable(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Editable Polyline</h3>
        <p>
          {isEditable 
            ? 'Click and drag the points to edit the path. Click on the line to add new points.'
            : 'Click "Edit Mode" to modify the polyline path.'
          }
        </p>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
              onClick={savePath}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Save Path
            </button>
          )}

          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Points: {path.length}
          </div>
        </div>

        {isEditable && (
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            backgroundColor: '#d1ecf1', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <strong>Edit Instructions:</strong>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>Drag existing points to move them</li>
              <li>Click on the line to add new points</li>
              <li>Right-click on points to delete them</li>
            </ul>
          </div>
        )}
      </div>

      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          <Polyline
            path={path}
            onLoad={onLoad}
            options={{
              strokeColor: isEditable ? '#FF6B6B' : '#007bff',
              strokeOpacity: 0.8,
              strokeWeight: isEditable ? 4 : 3,
              editable: isEditable,
              draggable: isEditable,
              geodesic: true
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default EditablePolyline;
```

## Data Types

### PolylineOptions
```typescript
interface PolylineOptions {
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  geodesic?: boolean;
  icons?: IconSequence[];
  map?: Map;
  path?: MVCArray<LatLng> | LatLng[] | LatLngLiteral[];
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
}
```

### PolyMouseEvent
```typescript
interface PolyMouseEvent {
  edge?: number;
  path?: number;
  vertex?: number;
  latLng?: LatLng;
}
```

## Best Practices

### 1. Performance Optimization
```typescript
// Limit the number of points for better performance
const MAX_POINTS = 1000;

// Use geodesic for long distances
const options = {
  geodesic: true, // For paths over long distances
  strokeWeight: 3
};

// Simplify complex paths
const simplifyPath = (path: LatLngLiteral[], tolerance: number) => {
  // Implement Douglas-Peucker algorithm or similar
};
```

### 2. Styling Best Practices
```typescript
// Use consistent styling
const polylineStyles = {
  primary: {
    strokeColor: '#007bff',
    strokeOpacity: 0.8,
    strokeWeight: 4
  },
  secondary: {
    strokeColor: '#6c757d',
    strokeOpacity: 0.6,
    strokeWeight: 2
  },
  highlight: {
    strokeColor: '#ffc107',
    strokeOpacity: 1.0,
    strokeWeight: 6
  }
};
```

### 3. Event Handling
```typescript
// Use useCallback for event handlers
const handlePolylineClick = useCallback((e: google.maps.PolyMouseEvent) => {
  console.log('Clicked at vertex:', e.vertex);
  console.log('Clicked at edge:', e.edge);
}, []);

// Handle path changes efficiently
const handlePathChange = useCallback((polyline: google.maps.Polyline) => {
  const newPath = polyline.getPath().getArray().map(point => ({
    lat: point.lat(),
    lng: point.lng()
  }));
  setPath(newPath);
}, []);
```

## Common Issues and Solutions

### 1. Performance with large datasets
- Limit the number of points
- Use path simplification algorithms
- Consider using multiple shorter polylines

### 2. Geodesic vs non-geodesic
- Use geodesic: true for long distances
- Use geodesic: false for local/regional paths

### 3. Editing issues
- Ensure proper event listeners for path changes
- Handle edge cases when points are added/removed

### 4. Styling not applying
- Check that options are properly formatted
- Ensure strokeColor uses valid CSS color values

## Important Notes

- Polyline must be a child of GoogleMap component
- Path prop is required and must contain at least 2 points
- Geodesic polylines follow the Earth's curvature
- Editable polylines allow users to modify the path
- Use strokeWeight carefully - very thick lines can impact performance
- Event handlers receive PolyMouseEvent with vertex/edge information
- Path changes in editable mode require proper event handling