# Rectangle Component

## Overview
`Rectangle` is a component that draws rectangular shapes on the map. It's commonly used to represent rectangular areas, bounding boxes, selection areas, or geographic regions with defined boundaries.

## Import
```typescript
import { Rectangle } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `bounds` | `LatLngBoundsLiteral \| LatLngBounds` | ✅ | - | Rectangle boundaries |
| `options` | `RectangleOptions` | ❌ | - | Additional rectangle options |

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
| `clickable` | `boolean` | `true` | Allow clicking on rectangle |
| `draggable` | `boolean` | `false` | Allow dragging rectangle |
| `editable` | `boolean` | `false` | Allow editing rectangle |
| `visible` | `boolean` | `true` | Rectangle visibility |
| `zIndex` | `number` | - | Rectangle z-index |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(rectangle: google.maps.Rectangle) => void` | Called when rectangle loads |
| `onUnmount` | `(rectangle: google.maps.Rectangle) => void` | Called when rectangle unmounts |
| `onClick` | `(e: google.maps.MapMouseEvent) => void` | Rectangle click event |
| `onDblClick` | `(e: google.maps.MapMouseEvent) => void` | Rectangle double-click event |
| `onRightClick` | `(e: google.maps.MapMouseEvent) => void` | Rectangle right-click event |
| `onMouseDown` | `(e: google.maps.MapMouseEvent) => void` | Mouse down on rectangle |
| `onMouseUp` | `(e: google.maps.MapMouseEvent) => void` | Mouse up on rectangle |
| `onMouseOver` | `(e: google.maps.MapMouseEvent) => void` | Mouse enters rectangle |
| `onMouseOut` | `(e: google.maps.MapMouseEvent) => void` | Mouse leaves rectangle |
| `onDrag` | `(e: google.maps.MapMouseEvent) => void` | Rectangle drag event |
| `onDragStart` | `(e: google.maps.MapMouseEvent) => void` | Rectangle drag start |
| `onDragEnd` | `(e: google.maps.MapMouseEvent) => void` | Rectangle drag end |
| `onBoundsChanged` | `() => void` | Bounds changed |

## Usage Examples

### Basic Rectangle
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Rectangle, Marker } from '@react-google-maps/api';

const BasicRectangle: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Define rectangle bounds around central Riyadh
  const rectangleBounds = {
    north: 24.7500,
    south: 24.6500,
    east: 46.7200,
    west: 46.6200
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic Rectangle</h3>
          <p>A simple rectangle covering central Riyadh area</p>
          
          <div style={{ fontSize: '14px', marginTop: '10px' }}>
            <strong>Bounds:</strong>
            <br />
            North: {rectangleBounds.north}°, South: {rectangleBounds.south}°
            <br />
            East: {rectangleBounds.east}°, West: {rectangleBounds.west}°
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          <Rectangle
            bounds={rectangleBounds}
            options={{
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
          
          <Marker
            position={center}
            title="Center Point"
          />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicRectangle;
```

### Multiple Zone Rectangles
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Rectangle } from '@react-google-maps/api';

interface Zone {
  id: string;
  name: string;
  bounds: google.maps.LatLngBoundsLiteral;
  color: string;
  type: 'residential' | 'commercial' | 'industrial' | 'recreational';
  description: string;
}

const MultipleZoneRectangles: React.FC = () => {
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
      id: 'business-district',
      name: 'Business District',
      bounds: {
        north: 24.7400,
        south: 24.7000,
        east: 46.7000,
        west: 46.6500
      },
      color: '#007bff',
      type: 'commercial',
      description: 'Main commercial and business area with offices and shopping centers'
    },
    {
      id: 'residential-north',
      name: 'Northern Residential',
      bounds: {
        north: 24.7800,
        south: 24.7400,
        east: 46.7200,
        west: 46.6300
      },
      color: '#28a745',
      type: 'residential',
      description: 'Quiet residential neighborhoods with family homes'
    },
    {
      id: 'industrial-south',
      name: 'Industrial Zone',
      bounds: {
        north: 24.6800,
        south: 24.6400,
        east: 46.7300,
        west: 46.6800
      },
      color: '#6c757d',
      type: 'industrial',
      description: 'Industrial and manufacturing facilities'
    },
    {
      id: 'recreational-east',
      name: 'Recreational Area',
      bounds: {
        north: 24.7200,
        south: 24.6800,
        east: 46.7500,
        west: 46.7000
      },
      color: '#ffc107',
      type: 'recreational',
      description: 'Parks, sports facilities, and entertainment venues'
    }
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      residential: '🏠',
      commercial: '🏢',
      industrial: '🏭',
      recreational: '🌳'
    };
    return icons[type as keyof typeof icons] || '📍';
  };

  const handleRectangleClick = (zoneId: string) => {
    setSelectedZone(selectedZone === zoneId ? null : zoneId);
  };

  const getRectangleOptions = (zone: Zone) => ({
    fillColor: zone.color,
    fillOpacity: selectedZone === zone.id ? 0.5 : 0.25,
    strokeColor: zone.color,
    strokeOpacity: 0.8,
    strokeWeight: selectedZone === zone.id ? 3 : 2,
    clickable: true
  });

  const calculateArea = (bounds: google.maps.LatLngBoundsLiteral) => {
    const latDiff = bounds.north - bounds.south;
    const lngDiff = bounds.east - bounds.west;
    
    // Approximate area calculation (not precise for large areas)
    const area = latDiff * lngDiff * 111 * 111; // Rough conversion to km²
    return area.toFixed(2);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>City Zoning Map</h3>
          <p>Click on any zone to highlight it and see details</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', marginTop: '15px' }}>
            {zones.map(zone => (
              <div
                key={zone.id}
                style={{
                  padding: '15px',
                  backgroundColor: selectedZone === zone.id ? zone.color + '20' : 'white',
                  border: `2px solid ${zone.color}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => handleRectangleClick(zone.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '24px', marginRight: '10px' }}>
                    {getTypeIcon(zone.type)}
                  </span>
                  <div>
                    <strong style={{ fontSize: '16px' }}>{zone.name}</strong>
                    <div style={{ fontSize: '12px', color: '#666', textTransform: 'capitalize' }}>
                      {zone.type}
                    </div>
                  </div>
                </div>
                
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#555' }}>
                  {zone.description}
                </p>
                
                <div style={{ fontSize: '13px', color: '#666' }}>
                  <div>Area: ~{calculateArea(zone.bounds)} km²</div>
                  <div>
                    Bounds: {zone.bounds.north.toFixed(3)}°N, {zone.bounds.south.toFixed(3)}°S
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          {zones.map(zone => (
            <Rectangle
              key={zone.id}
              bounds={zone.bounds}
              options={getRectangleOptions(zone)}
              onClick={() => handleRectangleClick(zone.id)}
            />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MultipleZoneRectangles;
```

### Interactive Rectangle Selector
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Rectangle } from '@react-google-maps/api';

const InteractiveRectangleSelector: React.FC = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPoint, setStartPoint] = useState<google.maps.LatLngLiteral | null>(null);
  const [currentBounds, setCurrentBounds] = useState<google.maps.LatLngBoundsLiteral | null>(null);
  const [savedRectangles, setSavedRectangles] = useState<Array<{
    id: number;
    bounds: google.maps.LatLngBoundsLiteral;
    name: string;
  }>>([]);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const clickedPoint = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };

    if (!isSelecting) return;

    if (!startPoint) {
      // First click - set start point
      setStartPoint(clickedPoint);
    } else {
      // Second click - complete rectangle
      const bounds = {
        north: Math.max(startPoint.lat, clickedPoint.lat),
        south: Math.min(startPoint.lat, clickedPoint.lat),
        east: Math.max(startPoint.lng, clickedPoint.lng),
        west: Math.min(startPoint.lng, clickedPoint.lng)
      };
      
      setCurrentBounds(bounds);
      setStartPoint(null);
      setIsSelecting(false);
    }
  }, [isSelecting, startPoint]);

  const onMapMouseMove = useCallback((e: google.maps.MapMouseEvent) => {
    if (!isSelecting || !startPoint || !e.latLng) return;

    const currentPoint = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };

    const bounds = {
      north: Math.max(startPoint.lat, currentPoint.lat),
      south: Math.min(startPoint.lat, currentPoint.lat),
      east: Math.max(startPoint.lng, currentPoint.lng),
      west: Math.min(startPoint.lng, currentPoint.lng)
    };

    setCurrentBounds(bounds);
  }, [isSelecting, startPoint]);

  const startSelection = () => {
    setIsSelecting(true);
    setStartPoint(null);
    setCurrentBounds(null);
  };

  const cancelSelection = () => {
    setIsSelecting(false);
    setStartPoint(null);
    setCurrentBounds(null);
  };

  const saveRectangle = () => {
    if (!currentBounds) return;

    const name = prompt('Enter a name for this rectangle:');
    if (!name) return;

    const newRectangle = {
      id: Date.now(),
      bounds: currentBounds,
      name
    };

    setSavedRectangles(prev => [...prev, newRectangle]);
    setCurrentBounds(null);
  };

  const removeRectangle = (id: number) => {
    setSavedRectangles(prev => prev.filter(rect => rect.id !== id));
  };

  const clearAll = () => {
    setSavedRectangles([]);
    setCurrentBounds(null);
    setStartPoint(null);
    setIsSelecting(false);
  };

  const calculateArea = (bounds: google.maps.LatLngBoundsLiteral) => {
    const latDiff = bounds.north - bounds.south;
    const lngDiff = bounds.east - bounds.west;
    const area = latDiff * lngDiff * 111 * 111; // Rough conversion to km²
    return area.toFixed(2);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Interactive Rectangle Selector</h3>
          <p>
            {isSelecting 
              ? startPoint 
                ? 'Click on the map to complete the rectangle'
                : 'Click on the map to start drawing a rectangle'
              : 'Click "Start Selection" to draw rectangles on the map'
            }
          </p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            {!isSelecting ? (
              <button
                onClick={startSelection}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Start Selection
              </button>
            ) : (
              <button
                onClick={cancelSelection}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel Selection
              </button>
            )}
            
            {currentBounds && (
              <button
                onClick={saveRectangle}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Save Rectangle
              </button>
            )}
            
            <button
              onClick={clearAll}
              disabled={savedRectangles.length === 0 && !currentBounds}
              style={{
                padding: '10px 20px',
                backgroundColor: savedRectangles.length > 0 || currentBounds ? '#6c757d' : '#e9ecef',
                color: savedRectangles.length > 0 || currentBounds ? 'white' : '#6c757d',
                border: 'none',
                borderRadius: '4px',
                cursor: savedRectangles.length > 0 || currentBounds ? 'pointer' : 'not-allowed'
              }}
            >
              Clear All
            </button>
          </div>

          {currentBounds && (
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#d4edda', 
              borderRadius: '4px',
              marginBottom: '15px'
            }}>
              <strong>Current Rectangle:</strong>
              <br />
              Area: ~{calculateArea(currentBounds)} km²
              <br />
              Bounds: N{currentBounds.north.toFixed(4)}° S{currentBounds.south.toFixed(4)}° 
              E{currentBounds.east.toFixed(4)}° W{currentBounds.west.toFixed(4)}°
            </div>
          )}

          {savedRectangles.length > 0 && (
            <div>
              <h4>Saved Rectangles ({savedRectangles.length}):</h4>
              <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {savedRectangles.map(rectangle => (
                  <div
                    key={rectangle.id}
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
                    <div>
                      <strong>{rectangle.name}</strong>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        Area: ~{calculateArea(rectangle.bounds)} km²
                      </div>
                    </div>
                    <button
                      onClick={() => removeRectangle(rectangle.id)}
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
          onMouseMove={onMapMouseMove}
          options={{
            cursor: isSelecting ? 'crosshair' : 'default'
          }}
        >
          {/* Current selection rectangle */}
          {currentBounds && (
            <Rectangle
              bounds={currentBounds}
              options={{
                fillColor: '#007bff',
                fillOpacity: 0.3,
                strokeColor: '#0056b3',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                strokeStyle: isSelecting ? 'dashed' : 'solid'
              }}
            />
          )}

          {/* Saved rectangles */}
          {savedRectangles.map((rectangle, index) => (
            <Rectangle
              key={rectangle.id}
              bounds={rectangle.bounds}
              options={{
                fillColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
                fillOpacity: 0.25,
                strokeColor: `hsl(${(index * 60) % 360}, 70%, 40%)`,
                strokeOpacity: 0.8,
                strokeWeight: 2
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default InteractiveRectangleSelector;
```

### Editable Rectangle with Bounds Display
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Rectangle } from '@react-google-maps/api';

const EditableRectangle: React.FC = () => {
  const [bounds, setBounds] = useState<google.maps.LatLngBoundsLiteral>({
    north: 24.7400,
    south: 24.6800,
    east: 46.7200,
    west: 46.6400
  });
  const [isEditable, setIsEditable] = useState(false);
  const [rectangleRef, setRectangleRef] = useState<google.maps.Rectangle | null>(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onLoad = useCallback((rectangleInstance: google.maps.Rectangle) => {
    setRectangleRef(rectangleInstance);
    
    // Listen for bounds changes when editable
    const boundsChangedListener = () => {
      const newBounds = rectangleInstance.getBounds();
      if (newBounds) {
        const ne = newBounds.getNorthEast();
        const sw = newBounds.getSouthWest();
        
        setBounds({
          north: ne.lat(),
          south: sw.lat(),
          east: ne.lng(),
          west: sw.lng()
        });
      }
    };

    rectangleInstance.addListener('bounds_changed', boundsChangedListener);
  }, []);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const calculateArea = () => {
    const latDiff = bounds.north - bounds.south;
    const lngDiff = bounds.east - bounds.west;
    const area = latDiff * lngDiff * 111 * 111; // Rough conversion to km²
    return area.toFixed(2);
  };

  const calculatePerimeter = () => {
    const latDiff = bounds.north - bounds.south;
    const lngDiff = bounds.east - bounds.west;
    const perimeter = 2 * (latDiff + lngDiff) * 111; // Rough conversion to km
    return perimeter.toFixed(2);
  };

  const resetBounds = () => {
    const defaultBounds = {
      north: 24.7400,
      south: 24.6800,
      east: 46.7200,
      west: 46.6400
    };
    setBounds(defaultBounds);
    
    if (rectangleRef) {
      const newBounds = new window.google.maps.LatLngBounds(
        { lat: defaultBounds.south, lng: defaultBounds.west },
        { lat: defaultBounds.north, lng: defaultBounds.east }
      );
      rectangleRef.setBounds(newBounds);
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Editable Rectangle</h3>
          <p>
            {isEditable 
              ? 'Drag the rectangle corners or edges to resize it'
              : 'Click "Edit Mode" to make the rectangle editable'
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
              onClick={resetBounds}
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Coordinates</h4>
              <div style={{ fontSize: '14px' }}>
                <div><strong>North:</strong> {bounds.north.toFixed(6)}°</div>
                <div><strong>South:</strong> {bounds.south.toFixed(6)}°</div>
                <div><strong>East:</strong> {bounds.east.toFixed(6)}°</div>
                <div><strong>West:</strong> {bounds.west.toFixed(6)}°</div>
              </div>
            </div>
            
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#28a745' }}>Dimensions</h4>
              <div style={{ fontSize: '14px' }}>
                <div><strong>Width:</strong> {((bounds.east - bounds.west) * 111).toFixed(2)} km</div>
                <div><strong>Height:</strong> {((bounds.north - bounds.south) * 111).toFixed(2)} km</div>
                <div><strong>Area:</strong> {calculateArea()} km²</div>
                <div><strong>Perimeter:</strong> {calculatePerimeter()} km</div>
              </div>
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
                <li>Drag the corners to resize the rectangle</li>
                <li>Drag the edges to move specific sides</li>
                <li>All measurements update automatically</li>
              </ul>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          <Rectangle
            bounds={bounds}
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

export default EditableRectangle;
```

## Data Types

### RectangleOptions
```typescript
interface RectangleOptions {
  bounds?: LatLngBounds | LatLngBoundsLiteral;
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  map?: Map;
  strokeColor?: string;
  strokeOpacity?: number;
  strokePosition?: StrokePosition;
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
}
```

### LatLngBoundsLiteral
```typescript
interface LatLngBoundsLiteral {
  north: number;
  south: number;
  east: number;
  west: number;
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

### 1. Bounds Validation
```typescript
// Validate rectangle bounds
const validateBounds = (bounds: LatLngBoundsLiteral) => {
  return {
    north: Math.max(bounds.north, bounds.south),
    south: Math.min(bounds.north, bounds.south),
    east: Math.max(bounds.east, bounds.west),
    west: Math.min(bounds.east, bounds.west)
  };
};

// Check if bounds are valid
const isValidBounds = (bounds: LatLngBoundsLiteral) => {
  return bounds.north > bounds.south && bounds.east > bounds.west;
};
```

### 2. Performance Optimization
```typescript
// Use React.memo for rectangle components
const OptimizedRectangle = React.memo(Rectangle);

// Limit the number of rectangles
const MAX_RECTANGLES = 20;

// Use appropriate bounds sizes
const validateBoundsSize = (bounds: LatLngBoundsLiteral) => {
  const maxSize = 1.0; // Maximum 1 degree
  const latDiff = bounds.north - bounds.south;
  const lngDiff = bounds.east - bounds.west;
  
  return latDiff <= maxSize && lngDiff <= maxSize;
};
```

### 3. Event Handling
```typescript
// Handle rectangle interactions
const handleRectangleClick = useCallback((e: google.maps.MapMouseEvent) => {
  console.log('Rectangle clicked at:', e.latLng?.lat(), e.latLng?.lng());
}, []);

// Monitor bounds changes
const handleBoundsChanged = useCallback(() => {
  if (rectangleRef) {
    const newBounds = rectangleRef.getBounds();
    console.log('Bounds changed:', newBounds?.toJSON());
  }
}, [rectangleRef]);
```

## Common Issues and Solutions

### 1. Rectangle not displaying
- Ensure bounds are valid (north > south, east > west)
- Check if rectangle is within map viewport
- Verify bounds coordinates are reasonable

### 2. Invalid bounds error
- Validate bounds before setting them
- Ensure north/south and east/west are correctly ordered
- Handle edge cases near poles or date line

### 3. Editing not working
- Ensure editable prop is set to true
- Check if event listeners are properly attached
- Verify rectangle reference is available

### 4. Performance issues
- Limit the number of rectangles
- Use appropriate bounds sizes
- Implement virtualization for many rectangles

## Important Notes

- Rectangle must be a child of GoogleMap component
- Bounds prop is required and must be valid
- North must be greater than south, east must be greater than west
- Editable rectangles allow users to modify bounds by dragging
- Use geometry library for accurate area calculations
- Performance decreases with large numbers of rectangles
- Consider map projection effects for large rectangles
- Stroke position affects how borders are rendered relative to the rectangle edge