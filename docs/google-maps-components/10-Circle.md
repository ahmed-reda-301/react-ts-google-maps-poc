# Circle Component

## Overview
`Circle` is a component that draws circular shapes on the map. It's commonly used to represent areas of influence, coverage zones, radius-based searches, or geographic boundaries around specific points.

## Import
```typescript
import { Circle } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `center` | `LatLngLiteral \| LatLng` | ✅ | - | Center point of the circle |
| `radius` | `number` | ✅ | - | Radius in meters |
| `options` | `CircleOptions` | ❌ | - | Additional circle options |

### Style Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fillColor` | `string` | `'#FF0000'` | Fill color |
| `fillOpacity` | `number` | `0.35` | Fill opacity (0.0 to 1.0) |
| `strokeColor` | `string` | `'#FF0000'` | Border color |
| `strokeOpacity` | `number` | `0.8` | Border opacity (0.0 to 1.0) |
| `strokeWeight` | `number` | `2` | Border width in pixels |
| `strokePosition` | `StrokePosition` | `'CENTER'` | Border position |

### Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `clickable` | `boolean` | `true` | Allow clicking on circle |
| `draggable` | `boolean` | `false` | Allow dragging circle |
| `editable` | `boolean` | `false` | Allow editing circle |
| `visible` | `boolean` | `true` | Circle visibility |
| `zIndex` | `number` | - | Circle z-index |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(circle: google.maps.Circle) => void` | Called when circle loads |
| `onUnmount` | `(circle: google.maps.Circle) => void` | Called when circle unmounts |
| `onClick` | `(e: google.maps.MapMouseEvent) => void` | Circle click event |
| `onDblClick` | `(e: google.maps.MapMouseEvent) => void` | Circle double-click event |
| `onRightClick` | `(e: google.maps.MapMouseEvent) => void` | Circle right-click event |
| `onMouseDown` | `(e: google.maps.MapMouseEvent) => void` | Mouse down on circle |
| `onMouseUp` | `(e: google.maps.MapMouseEvent) => void` | Mouse up on circle |
| `onMouseOver` | `(e: google.maps.MapMouseEvent) => void` | Mouse enters circle |
| `onMouseOut` | `(e: google.maps.MapMouseEvent) => void` | Mouse leaves circle |
| `onDrag` | `(e: google.maps.MapMouseEvent) => void` | Circle drag event |
| `onDragStart` | `(e: google.maps.MapMouseEvent) => void` | Circle drag start |
| `onDragEnd` | `(e: google.maps.MapMouseEvent) => void` | Circle drag end |
| `onCenterChanged` | `() => void` | Center position changed |
| `onRadiusChanged` | `() => void` | Radius changed |

## Usage Examples

### Basic Circle
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Circle, Marker } from '@react-google-maps/api';

const BasicCircle: React.FC = () => {
  const [radius, setRadius] = useState(5000); // 5km radius

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic Circle</h3>
          <p>A simple circle showing a {radius/1000}km radius around Kingdom Centre</p>
          
          <div style={{ marginTop: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Radius: {radius/1000}km
            </label>
            <input
              type="range"
              min="1000"
              max="20000"
              step="1000"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          <Marker
            position={center}
            title="Kingdom Centre"
          />
          
          <Circle
            center={center}
            radius={radius}
            options={{
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicCircle;
```

### Multiple Coverage Areas
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Circle, Marker } from '@react-google-maps/api';

interface CoverageArea {
  id: string;
  name: string;
  center: google.maps.LatLngLiteral;
  radius: number;
  color: string;
  type: 'wifi' | 'delivery' | 'service' | 'emergency';
}

const MultipleCoverageAreas: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const coverageAreas: CoverageArea[] = [
    {
      id: 'wifi-1',
      name: 'WiFi Hotspot - Kingdom Centre',
      center: { lat: 24.7136, lng: 46.6753 },
      radius: 500,
      color: '#007bff',
      type: 'wifi'
    },
    {
      id: 'delivery-1',
      name: 'Delivery Zone - Central Riyadh',
      center: { lat: 24.6877, lng: 46.6857 },
      radius: 3000,
      color: '#28a745',
      type: 'delivery'
    },
    {
      id: 'service-1',
      name: 'Service Area - Al Faisaliah',
      center: { lat: 24.6877, lng: 46.6857 },
      radius: 2000,
      color: '#ffc107',
      type: 'service'
    },
    {
      id: 'emergency-1',
      name: 'Emergency Response Zone',
      center: { lat: 24.6308, lng: 46.7073 },
      radius: 4000,
      color: '#dc3545',
      type: 'emergency'
    }
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      wifi: '📶',
      delivery: '🚚',
      service: '🔧',
      emergency: '🚨'
    };
    return icons[type as keyof typeof icons] || '📍';
  };

  const handleCircleClick = (areaId: string) => {
    setSelectedArea(selectedArea === areaId ? null : areaId);
  };

  const getCircleOptions = (area: CoverageArea) => ({
    fillColor: area.color,
    fillOpacity: selectedArea === area.id ? 0.5 : 0.25,
    strokeColor: area.color,
    strokeOpacity: 0.8,
    strokeWeight: selectedArea === area.id ? 3 : 2,
    clickable: true
  });

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Coverage Areas</h3>
          <p>Click on any circle to highlight it and see details</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px', marginTop: '15px' }}>
            {coverageAreas.map(area => (
              <div
                key={area.id}
                style={{
                  padding: '15px',
                  backgroundColor: selectedArea === area.id ? area.color + '20' : 'white',
                  border: `2px solid ${area.color}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => handleCircleClick(area.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px', marginRight: '8px' }}>
                    {getTypeIcon(area.type)}
                  </span>
                  <strong style={{ fontSize: '14px' }}>{area.name}</strong>
                </div>
                
                <div style={{ fontSize: '13px', color: '#666' }}>
                  <div>Radius: {area.radius >= 1000 ? `${area.radius/1000}km` : `${area.radius}m`}</div>
                  <div style={{ textTransform: 'capitalize' }}>Type: {area.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={center}
        >
          {coverageAreas.map(area => (
            <React.Fragment key={area.id}>
              <Marker
                position={area.center}
                title={area.name}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: area.color,
                  fillOpacity: 1,
                  strokeColor: '#FFFFFF',
                  strokeWeight: 2
                }}
              />
              
              <Circle
                center={area.center}
                radius={area.radius}
                options={getCircleOptions(area)}
                onClick={() => handleCircleClick(area.id)}
              />
            </React.Fragment>
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MultipleCoverageAreas;
```

### Interactive Circle Builder
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Circle, Marker } from '@react-google-maps/api';

const InteractiveCircleBuilder: React.FC = () => {
  const [circles, setCircles] = useState<Array<{
    id: number;
    center: google.maps.LatLngLiteral;
    radius: number;
    color: string;
  }>>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(2000);
  const [selectedColor, setSelectedColor] = useState('#007bff');

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const colors = [
    { name: 'Blue', value: '#007bff' },
    { name: 'Green', value: '#28a745' },
    { name: 'Yellow', value: '#ffc107' },
    { name: 'Red', value: '#dc3545' },
    { name: 'Purple', value: '#6f42c1' },
    { name: 'Teal', value: '#20c997' }
  ];

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (isCreating && e.latLng) {
      const newCircle = {
        id: Date.now(),
        center: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        },
        radius: selectedRadius,
        color: selectedColor
      };
      
      setCircles(prev => [...prev, newCircle]);
      setIsCreating(false);
    }
  }, [isCreating, selectedRadius, selectedColor]);

  const removeCircle = (id: number) => {
    setCircles(prev => prev.filter(circle => circle.id !== id));
  };

  const clearAllCircles = () => {
    setCircles([]);
  };

  const calculateTotalArea = () => {
    const totalArea = circles.reduce((sum, circle) => {
      return sum + (Math.PI * Math.pow(circle.radius, 2));
    }, 0);
    
    return (totalArea / 1000000).toFixed(2); // Convert to square kilometers
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Interactive Circle Builder</h3>
          <p>
            {isCreating 
              ? 'Click on the map to place a circle'
              : 'Configure your circle settings and click "Start Creating" to add circles to the map'
            }
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Radius: {selectedRadius >= 1000 ? `${selectedRadius/1000}km` : `${selectedRadius}m`}
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={selectedRadius}
                onChange={(e) => setSelectedRadius(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Color:
              </label>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {colors.map(color => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: color.value,
                      border: selectedColor === color.value ? '3px solid #000' : '1px solid #ccc',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsCreating(!isCreating)}
              style={{
                padding: '10px 20px',
                backgroundColor: isCreating ? '#dc3545' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {isCreating ? 'Cancel Creating' : 'Start Creating'}
            </button>
            
            <button
              onClick={clearAllCircles}
              disabled={circles.length === 0}
              style={{
                padding: '10px 20px',
                backgroundColor: circles.length > 0 ? '#6c757d' : '#e9ecef',
                color: circles.length > 0 ? 'white' : '#6c757d',
                border: 'none',
                borderRadius: '4px',
                cursor: circles.length > 0 ? 'pointer' : 'not-allowed'
              }}
            >
              Clear All
            </button>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
            <div style={{ 
              padding: '8px 12px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Circles:</strong> {circles.length}
            </div>
            
            {circles.length > 0 && (
              <div style={{ 
                padding: '8px 12px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6'
              }}>
                <strong>Total Area:</strong> {calculateTotalArea()} km²
              </div>
            )}
          </div>

          {circles.length > 0 && (
            <div style={{ marginTop: '15px' }}>
              <h4>Created Circles:</h4>
              <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {circles.map((circle, index) => (
                  <div
                    key={circle.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      marginBottom: '5px',
                      border: '1px solid #dee2e6'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: circle.color,
                          borderRadius: '50%',
                          marginRight: '8px'
                        }}
                      />
                      <span style={{ fontSize: '14px' }}>
                        Circle {index + 1} - {circle.radius >= 1000 ? `${circle.radius/1000}km` : `${circle.radius}m`}
                      </span>
                    </div>
                    <button
                      onClick={() => removeCircle(circle.id)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
          onClick={onMapClick}
          options={{
            cursor: isCreating ? 'crosshair' : 'default'
          }}
        >
          {circles.map(circle => (
            <React.Fragment key={circle.id}>
              <Marker
                position={circle.center}
                title={`Circle - ${circle.radius >= 1000 ? `${circle.radius/1000}km` : `${circle.radius}m`}`}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 6,
                  fillColor: circle.color,
                  fillOpacity: 1,
                  strokeColor: '#FFFFFF',
                  strokeWeight: 2
                }}
              />
              
              <Circle
                center={circle.center}
                radius={circle.radius}
                options={{
                  fillColor: circle.color,
                  fillOpacity: 0.35,
                  strokeColor: circle.color,
                  strokeOpacity: 0.8,
                  strokeWeight: 2
                }}
              />
            </React.Fragment>
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default InteractiveCircleBuilder;
```

### Editable Circle with Area Calculation
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Circle, Marker } from '@react-google-maps/api';

const EditableCircle: React.FC = () => {
  const [circle, setCircle] = useState({
    center: { lat: 24.7136, lng: 46.6753 },
    radius: 3000
  });
  const [isEditable, setIsEditable] = useState(false);
  const [circleRef, setCircleRef] = useState<google.maps.Circle | null>(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const onLoad = useCallback((circleInstance: google.maps.Circle) => {
    setCircleRef(circleInstance);
    
    // Listen for changes when editable
    const centerChangedListener = () => {
      const newCenter = circleInstance.getCenter();
      if (newCenter) {
        setCircle(prev => ({
          ...prev,
          center: {
            lat: newCenter.lat(),
            lng: newCenter.lng()
          }
        }));
      }
    };

    const radiusChangedListener = () => {
      const newRadius = circleInstance.getRadius();
      setCircle(prev => ({
        ...prev,
        radius: newRadius
      }));
    };

    circleInstance.addListener('center_changed', centerChangedListener);
    circleInstance.addListener('radius_changed', radiusChangedListener);
  }, []);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const calculateArea = () => {
    const area = Math.PI * Math.pow(circle.radius, 2);
    return (area / 1000000).toFixed(2); // Convert to square kilometers
  };

  const calculateCircumference = () => {
    const circumference = 2 * Math.PI * circle.radius;
    return (circumference / 1000).toFixed(2); // Convert to kilometers
  };

  const resetCircle = () => {
    const defaultCircle = {
      center: { lat: 24.7136, lng: 46.6753 },
      radius: 3000
    };
    setCircle(defaultCircle);
    
    if (circleRef) {
      circleRef.setCenter(defaultCircle.center);
      circleRef.setRadius(defaultCircle.radius);
    }
  };

  return (
    <LoadScript 
      googleMapsApiKey="YOUR_API_KEY"
      libraries={['geometry']}
    >
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Editable Circle</h3>
          <p>
            {isEditable 
              ? 'Drag the circle to move it or drag the edge to resize it'
              : 'Click "Edit Mode" to make the circle editable'
            }
          </p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button
              onClick={toggleEditable}
              style={{
                padding: '10px 20px',
                backgroundColor: isEditable ? '#dc3545' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {isEditable ? 'Exit Edit Mode' : 'Edit Mode'}
            </button>
            
            <button
              onClick={resetCircle}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Center:</strong>
              <br />
              <small>
                Lat: {circle.center.lat.toFixed(6)}
                <br />
                Lng: {circle.center.lng.toFixed(6)}
              </small>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Radius:</strong>
              <br />
              <small>
                {circle.radius >= 1000 
                  ? `${(circle.radius / 1000).toFixed(2)} km`
                  : `${circle.radius.toFixed(0)} m`
                }
              </small>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Area:</strong>
              <br />
              <small>{calculateArea()} km²</small>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Circumference:</strong>
              <br />
              <small>{calculateCircumference()} km</small>
            </div>
          </div>

          {isEditable && (
            <div style={{ 
              marginTop: '15px', 
              padding: '10px', 
              backgroundColor: '#d1ecf1', 
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <strong>Edit Instructions:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                <li>Drag the circle center to move the entire circle</li>
                <li>Drag the circle edge to resize the radius</li>
                <li>All measurements update automatically</li>
              </ul>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={circle.center}
        >
          <Marker
            position={circle.center}
            title="Circle Center"
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: isEditable ? '#FFD700' : '#007bff',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2
            }}
          />
          
          <Circle
            center={circle.center}
            radius={circle.radius}
            onLoad={onLoad}
            options={{
              fillColor: isEditable ? '#FFD700' : '#007bff',
              fillOpacity: 0.35,
              strokeColor: isEditable ? '#FFA500' : '#0056b3',
              strokeOpacity: 0.8,
              strokeWeight: isEditable ? 3 : 2,
              editable: isEditable,
              draggable: isEditable
            }}
          />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default EditableCircle;
```

## Data Types

### CircleOptions
```typescript
interface CircleOptions {
  center?: LatLng | LatLngLiteral;
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  map?: Map;
  radius?: number;
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
// Use React.memo for circle components
const OptimizedCircle = React.memo(Circle);

// Limit the number of circles for better performance
const MAX_CIRCLES = 50;

// Use appropriate radius values
const validateRadius = (radius: number) => {
  return Math.max(10, Math.min(radius, 50000)); // 10m to 50km
};
```

### 2. Visual Design
```typescript
// Use consistent color schemes
const circleStyles = {
  coverage: {
    fillColor: '#007bff',
    strokeColor: '#0056b3',
    fillOpacity: 0.25
  },
  warning: {
    fillColor: '#ffc107',
    strokeColor: '#e0a800',
    fillOpacity: 0.35
  },
  danger: {
    fillColor: '#dc3545',
    strokeColor: '#c82333',
    fillOpacity: 0.4
  }
};

// Responsive stroke weight
const getStrokeWeight = (radius: number) => {
  if (radius < 1000) return 1;
  if (radius < 5000) return 2;
  return 3;
};
```

### 3. Event Handling
```typescript
// Handle circle interactions
const handleCircleClick = useCallback((e: google.maps.MapMouseEvent) => {
  console.log('Circle clicked at:', e.latLng?.lat(), e.latLng?.lng());
}, []);

// Monitor circle changes
const handleRadiusChanged = useCallback(() => {
  if (circleRef) {
    const newRadius = circleRef.getRadius();
    console.log('Radius changed to:', newRadius);
  }
}, [circleRef]);
```

## Common Issues and Solutions

### 1. Circle not displaying
- Ensure center coordinates are valid
- Check if radius is greater than 0
- Verify circle is within map bounds

### 2. Performance issues with many circles
- Limit the number of visible circles
- Use clustering for overlapping circles
- Implement virtualization for off-screen circles

### 3. Editing not working
- Ensure editable prop is set to true
- Check if event listeners are properly attached
- Verify circle reference is available

### 4. Incorrect area calculations
- Use proper mathematical formulas
- Consider Earth's curvature for large circles
- Use geometry library for accurate calculations

## Important Notes

- Circle must be a child of GoogleMap component
- Center and radius props are required
- Radius is specified in meters
- Use geometry library for accurate area calculations
- Editable circles allow users to modify center and radius
- Performance decreases with large numbers of circles
- Consider using appropriate zoom levels for circle visibility
- Stroke position affects how borders are rendered relative to the circle edge