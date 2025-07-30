# DirectionsRenderer Component

## Overview
`DirectionsRenderer` is a component that displays route directions on the map. It renders the calculated route from DirectionsService as a polyline with markers and provides turn-by-turn navigation display.

## Import
```typescript
import { DirectionsRenderer } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `directions` | `DirectionsResult` | ✅ | - | Route data to display |
| `options` | `DirectionsRendererOptions` | ❌ | - | Rendering options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(directionsRenderer: google.maps.DirectionsRenderer) => void` | Called when renderer loads |
| `onUnmount` | `(directionsRenderer: google.maps.DirectionsRenderer) => void` | Called when renderer unmounts |
| `onDirectionsChanged` | `() => void` | Called when directions change |

## DirectionsRendererOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `draggable` | `boolean` | `false` | Allow dragging route waypoints |
| `hideRouteList` | `boolean` | `false` | Hide turn-by-turn directions panel |
| `infoWindow` | `InfoWindow` | - | Custom info window for markers |
| `markerOptions` | `MarkerOptions` | - | Options for route markers |
| `panel` | `Element` | - | HTML element to display directions |
| `polylineOptions` | `PolylineOptions` | - | Options for route polyline |
| `preserveViewport` | `boolean` | `false` | Don't adjust viewport to fit route |
| `routeIndex` | `number` | `0` | Index of route to display (for alternatives) |
| `suppressBicyclingLayer` | `boolean` | `false` | Hide bicycling layer |
| `suppressInfoWindows` | `boolean` | `false` | Hide info windows on markers |
| `suppressMarkers` | `boolean` | `false` | Hide start/end markers |
| `suppressPolylines` | `boolean` | `false` | Hide route polyline |

## Usage Examples

### Basic Route Display
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const BasicDirectionsRenderer: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [calculating, setCalculating] = useState(false);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const origin = { lat: 24.7136, lng: 46.6753 }; // Kingdom Centre
  const destination = { lat: 24.6308, lng: 46.7073 }; // Masmak Fortress

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    setCalculating(false);
    
    if (status === 'OK' && result) {
      setDirections(result);
    } else {
      console.error('Directions request failed:', status);
    }
  };

  const calculateRoute = () => {
    setCalculating(true);
    setDirections(null);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic Route Display</h3>
          <button
            onClick={calculateRoute}
            disabled={calculating}
            style={{
              padding: '10px 20px',
              backgroundColor: calculating ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: calculating ? 'not-allowed' : 'pointer'
            }}
          >
            {calculating ? 'Calculating...' : 'Show Route'}
          </button>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          {calculating && (
            <DirectionsService
              options={{
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING
              }}
              callback={directionsCallback}
            />
          )}

          {directions && (
            <DirectionsRenderer
              directions={directions}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicDirectionsRenderer;
```

### Custom Styled Route
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const CustomStyledRoute: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [routeStyle, setRouteStyle] = useState('default');

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const origin = { lat: 24.7136, lng: 46.6753 };
  const destination = { lat: 24.6877, lng: 46.6857 };

  const routeStyles = {
    default: {
      strokeColor: '#4285F4',
      strokeWeight: 5,
      strokeOpacity: 0.8
    },
    highway: {
      strokeColor: '#FF6B6B',
      strokeWeight: 6,
      strokeOpacity: 0.9
    },
    scenic: {
      strokeColor: '#4ECDC4',
      strokeWeight: 4,
      strokeOpacity: 0.7
    },
    fast: {
      strokeColor: '#FFE66D',
      strokeWeight: 7,
      strokeOpacity: 1.0
    }
  };

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    setCalculating(false);
    
    if (status === 'OK' && result) {
      setDirections(result);
    } else {
      console.error('Directions request failed:', status);
    }
  };

  const calculateRoute = () => {
    setCalculating(true);
    setDirections(null);
  };

  const getRendererOptions = () => ({
    polylineOptions: routeStyles[routeStyle as keyof typeof routeStyles],
    markerOptions: {
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: routeStyles[routeStyle as keyof typeof routeStyles].strokeColor,
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2
      }
    },
    suppressInfoWindows: false
  });

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Custom Route Styling</h3>
          <p>Choose different visual styles for the route display</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            {Object.entries(routeStyles).map(([style, config]) => (
              <button
                key={style}
                onClick={() => setRouteStyle(style)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: routeStyle === style ? config.strokeColor : 'white',
                  color: routeStyle === style ? 'white' : config.strokeColor,
                  border: `2px solid ${config.strokeColor}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontWeight: 'bold'
                }}
              >
                {style}
              </button>
            ))}
          </div>

          <button
            onClick={calculateRoute}
            disabled={calculating}
            style={{
              padding: '10px 20px',
              backgroundColor: calculating ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: calculating ? 'not-allowed' : 'pointer'
            }}
          >
            {calculating ? 'Calculating...' : 'Calculate Route'}
          </button>

          {directions && (
            <div style={{ marginTop: '15px', fontSize: '14px' }}>
              <strong>Route Information:</strong>
              <br />
              Distance: {directions.routes[0].legs[0].distance?.text}
              <br />
              Duration: {directions.routes[0].legs[0].duration?.text}
              <br />
              Style: <span style={{ 
                color: routeStyles[routeStyle as keyof typeof routeStyles].strokeColor,
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}>
                {routeStyle}
              </span>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          {calculating && (
            <DirectionsService
              options={{
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING
              }}
              callback={directionsCallback}
            />
          )}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={getRendererOptions()}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default CustomStyledRoute;
```

### Route with Turn-by-Turn Directions Panel
```typescript
import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const RouteWithDirectionsPanel: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [calculating, setCalculating] = useState(false);
  const directionsPanel = useRef<HTMLDivElement>(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const origin = { lat: 24.7136, lng: 46.6753 };
  const destination = { lat: 24.6308, lng: 46.7073 };

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    setCalculating(false);
    
    if (status === 'OK' && result) {
      setDirections(result);
    } else {
      console.error('Directions request failed:', status);
    }
  };

  const calculateRoute = () => {
    setCalculating(true);
    setDirections(null);
  };

  const getRendererOptions = () => ({
    panel: directionsPanel.current,
    polylineOptions: {
      strokeColor: '#007bff',
      strokeWeight: 5,
      strokeOpacity: 0.8
    },
    suppressMarkers: false
  });

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Route with Turn-by-Turn Directions</h3>
          <button
            onClick={calculateRoute}
            disabled={calculating}
            style={{
              padding: '10px 20px',
              backgroundColor: calculating ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: calculating ? 'not-allowed' : 'pointer'
            }}
          >
            {calculating ? 'Calculating...' : 'Get Directions'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '15px' }}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={12}
            center={center}
          >
            {calculating && (
              <DirectionsService
                options={{
                  origin,
                  destination,
                  travelMode: window.google.maps.TravelMode.DRIVING
                }}
                callback={directionsCallback}
              />
            )}

            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={getRendererOptions()}
              />
            )}
          </GoogleMap>

          <div style={{
            height: '400px',
            overflow: 'auto',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}>
            <div style={{
              padding: '15px',
              borderBottom: '1px solid #dee2e6',
              backgroundColor: '#f8f9fa',
              fontWeight: 'bold'
            }}>
              Turn-by-Turn Directions
            </div>
            
            <div 
              ref={directionsPanel}
              style={{ padding: '10px' }}
            />
            
            {!directions && (
              <div style={{
                padding: '20px',
                textAlign: 'center',
                color: '#6c757d',
                fontStyle: 'italic'
              }}>
                Calculate a route to see turn-by-turn directions
              </div>
            )}
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default RouteWithDirectionsPanel;
```

### Multiple Route Alternatives
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MultipleRouteAlternatives: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const origin = { lat: 24.7136, lng: 46.6753 };
  const destination = { lat: 24.6308, lng: 46.7073 };

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    setCalculating(false);
    
    if (status === 'OK' && result) {
      setDirections(result);
      setSelectedRouteIndex(0);
      console.log('Found', result.routes.length, 'route alternatives');
    } else {
      console.error('Directions request failed:', status);
    }
  };

  const calculateRoute = () => {
    setCalculating(true);
    setDirections(null);
  };

  const getRouteInfo = (route: google.maps.DirectionsRoute) => {
    const leg = route.legs[0];
    return {
      distance: leg.distance?.text || 'N/A',
      duration: leg.duration?.text || 'N/A',
      summary: route.summary || 'Route'
    };
  };

  const getRouteColor = (index: number) => {
    const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1'];
    return colors[index % colors.length];
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Route Alternatives</h3>
          <p>Compare different route options between the same origin and destination</p>
          
          <button
            onClick={calculateRoute}
            disabled={calculating}
            style={{
              padding: '10px 20px',
              backgroundColor: calculating ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: calculating ? 'not-allowed' : 'pointer',
              marginBottom: '15px'
            }}
          >
            {calculating ? 'Finding Routes...' : 'Find Route Alternatives'}
          </button>

          {directions && directions.routes.length > 1 && (
            <div>
              <h4>Available Routes ({directions.routes.length})</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
                {directions.routes.map((route, index) => {
                  const info = getRouteInfo(route);
                  const isSelected = selectedRouteIndex === index;
                  const color = getRouteColor(index);
                  
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedRouteIndex(index)}
                      style={{
                        padding: '15px',
                        backgroundColor: isSelected ? color + '20' : 'white',
                        border: `2px solid ${color}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: color,
                            borderRadius: '50%',
                            marginRight: '8px'
                          }}
                        />
                        <strong>Route {index + 1}</strong>
                        {isSelected && (
                          <span style={{ 
                            marginLeft: 'auto', 
                            color: color, 
                            fontWeight: 'bold' 
                          }}>
                            ✓ Selected
                          </span>
                        )}
                      </div>
                      
                      <div style={{ fontSize: '14px', marginBottom: '5px' }}>
                        <strong>Distance:</strong> {info.distance}
                      </div>
                      <div style={{ fontSize: '14px', marginBottom: '5px' }}>
                        <strong>Duration:</strong> {info.duration}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        <strong>Via:</strong> {info.summary}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          {calculating && (
            <DirectionsService
              options={{
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true
              }}
              callback={directionsCallback}
            />
          )}

          {directions && directions.routes.map((route, index) => {
            const isSelected = selectedRouteIndex === index;
            const color = getRouteColor(index);
            
            return (
              <DirectionsRenderer
                key={index}
                directions={{
                  ...directions,
                  routes: [route]
                }}
                options={{
                  routeIndex: 0,
                  polylineOptions: {
                    strokeColor: color,
                    strokeWeight: isSelected ? 6 : 4,
                    strokeOpacity: isSelected ? 0.9 : 0.6,
                    zIndex: isSelected ? 100 : 50
                  },
                  suppressMarkers: !isSelected,
                  markerOptions: {
                    icon: {
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 8,
                      fillColor: color,
                      fillOpacity: 1,
                      strokeColor: '#FFFFFF',
                      strokeWeight: 2
                    }
                  }
                }}
              />
            );
          })}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MultipleRouteAlternatives;
```

### Draggable Route
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const DraggableRoute: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const origin = { lat: 24.7136, lng: 46.6753 };
  const destination = { lat: 24.6308, lng: 46.7073 };

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    setCalculating(false);
    
    if (status === 'OK' && result) {
      setDirections(result);
    } else {
      console.error('Directions request failed:', status);
    }
  };

  const onLoad = useCallback((renderer: google.maps.DirectionsRenderer) => {
    setDirectionsRenderer(renderer);
  }, []);

  const onDirectionsChanged = useCallback(() => {
    if (directionsRenderer) {
      const newDirections = directionsRenderer.getDirections();
      if (newDirections) {
        setDirections(newDirections);
        console.log('Route was modified by dragging');
      }
    }
  }, [directionsRenderer]);

  const calculateRoute = () => {
    setCalculating(true);
    setDirections(null);
  };

  const resetRoute = () => {
    calculateRoute();
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Draggable Route</h3>
          <p>Calculate a route and then drag it to modify the path</p>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={calculateRoute}
              disabled={calculating}
              style={{
                padding: '10px 20px',
                backgroundColor: calculating ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: calculating ? 'not-allowed' : 'pointer'
              }}
            >
              {calculating ? 'Calculating...' : 'Calculate Route'}
            </button>

            {directions && (
              <button
                onClick={resetRoute}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Reset to Original Route
              </button>
            )}
          </div>

          {directions && (
            <div style={{ 
              marginTop: '15px', 
              padding: '10px', 
              backgroundColor: '#d1ecf1', 
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <strong>Instructions:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                <li>Click and drag the blue route line to modify the path</li>
                <li>The route will automatically recalculate when you release</li>
                <li>Distance and duration will update accordingly</li>
              </ul>
            </div>
          )}

          {directions && (
            <div style={{ marginTop: '10px', fontSize: '14px' }}>
              <strong>Current Route:</strong>
              <br />
              Distance: {directions.routes[0].legs[0].distance?.text}
              <br />
              Duration: {directions.routes[0].legs[0].duration?.text}
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          {calculating && (
            <DirectionsService
              options={{
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING
              }}
              callback={directionsCallback}
            />
          )}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              onLoad={onLoad}
              onDirectionsChanged={onDirectionsChanged}
              options={{
                draggable: true,
                polylineOptions: {
                  strokeColor: '#007bff',
                  strokeWeight: 5,
                  strokeOpacity: 0.8
                }
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default DraggableRoute;
```

## Data Types

### DirectionsRendererOptions
```typescript
interface DirectionsRendererOptions {
  directions?: DirectionsResult;
  draggable?: boolean;
  hideRouteList?: boolean;
  infoWindow?: InfoWindow;
  map?: Map;
  markerOptions?: MarkerOptions;
  panel?: Element;
  polylineOptions?: PolylineOptions;
  preserveViewport?: boolean;
  routeIndex?: number;
  suppressBicyclingLayer?: boolean;
  suppressInfoWindows?: boolean;
  suppressMarkers?: boolean;
  suppressPolylines?: boolean;
}
```

## Best Practices

### 1. Performance Optimization
```typescript
// Use memo to prevent unnecessary re-renders
const MemoizedDirectionsRenderer = React.memo(DirectionsRenderer);

// Optimize polyline options
const polylineOptions = {
  strokeWeight: 5,
  strokeOpacity: 0.8,
  clickable: false // If interaction not needed
};
```

### 2. User Experience
```typescript
// Provide visual feedback for route selection
const getRouteStyle = (isSelected: boolean) => ({
  strokeWeight: isSelected ? 6 : 4,
  strokeOpacity: isSelected ? 0.9 : 0.6,
  zIndex: isSelected ? 100 : 50
});

// Show route information
const displayRouteInfo = (directions: DirectionsResult) => {
  const route = directions.routes[0];
  const leg = route.legs[0];
  
  return {
    distance: leg.distance?.text,
    duration: leg.duration?.text,
    summary: route.summary
  };
};
```

### 3. Error Handling
```typescript
// Handle renderer errors
const onLoad = (renderer: google.maps.DirectionsRenderer) => {
  try {
    setDirectionsRenderer(renderer);
  } catch (error) {
    console.error('Error loading directions renderer:', error);
  }
};

// Validate directions before rendering
const isValidDirections = (directions: DirectionsResult) => {
  return directions && 
         directions.routes && 
         directions.routes.length > 0 &&
         directions.routes[0].legs &&
         directions.routes[0].legs.length > 0;
};
```

## Common Issues and Solutions

### 1. Route not displaying
- Ensure directions prop contains valid DirectionsResult
- Check if DirectionsService completed successfully
- Verify map is properly loaded

### 2. Custom styling not applying
- Check polylineOptions format
- Ensure options object is properly structured
- Verify color values are valid CSS colors

### 3. Markers not showing
- Check suppressMarkers option
- Verify markerOptions configuration
- Ensure directions contain valid start/end points

### 4. Panel not displaying directions
- Verify panel element exists in DOM
- Check if hideRouteList is set to false
- Ensure directions contain step-by-step instructions

## Important Notes

- DirectionsRenderer must be a child of GoogleMap component
- Requires valid DirectionsResult from DirectionsService
- Can display multiple route alternatives using routeIndex
- Draggable routes automatically recalculate when modified
- Panel option displays turn-by-turn directions in HTML element
- suppressMarkers/suppressPolylines allow selective display
- preserveViewport prevents automatic map bounds adjustment
- Use different colors/styles to distinguish multiple routes