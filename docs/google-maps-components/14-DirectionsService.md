# DirectionsService Component

## Overview
`DirectionsService` is a component that calculates routes between locations using Google's routing algorithms. It provides turn-by-turn directions and route information for various travel modes.

## Import
```typescript
import { DirectionsService } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `DirectionsRequest` | ✅ | - | Route calculation parameters |
| `callback` | `(result: DirectionsResult \| null, status: DirectionsStatus) => void` | ✅ | - | Function called with route results |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(directionsService: google.maps.DirectionsService) => void` | Called when service loads |
| `onUnmount` | `(directionsService: google.maps.DirectionsService) => void` | Called when service unmounts |

## DirectionsRequest Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `origin` | `string \| LatLngLiteral \| LatLng` | ✅ | Starting point |
| `destination` | `string \| LatLngLiteral \| LatLng` | ✅ | End point |
| `travelMode` | `TravelMode` | ✅ | Mode of transportation |
| `waypoints` | `DirectionsWaypoint[]` | ❌ | Intermediate stops |
| `optimizeWaypoints` | `boolean` | ❌ | Optimize waypoint order |
| `avoidFerries` | `boolean` | ❌ | Avoid ferry routes |
| `avoidHighways` | `boolean` | ❌ | Avoid highways |
| `avoidTolls` | `boolean` | ❌ | Avoid toll roads |
| `region` | `string` | ❌ | Region code for geocoding |
| `unitSystem` | `UnitSystem` | ❌ | Distance unit system |
| `drivingOptions` | `DrivingOptions` | ❌ | Driving-specific options |
| `transitOptions` | `TransitOptions` | ❌ | Transit-specific options |

## Travel Modes

```typescript
enum TravelMode {
  DRIVING = 'DRIVING',
  WALKING = 'WALKING',
  BICYCLING = 'BICYCLING',
  TRANSIT = 'TRANSIT'
}
```

## Usage Examples

### Basic Route Calculation
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const BasicDirections: React.FC = () => {
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
      console.log('Route calculated successfully:', result);
    } else {
      console.error('Directions request failed:', status);
      alert('Could not calculate route. Please try again.');
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
          <h3>Basic Route Calculation</h3>
          <p>Route from Kingdom Centre to Masmak Fortress</p>
          
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
            <div style={{ marginTop: '10px', fontSize: '14px' }}>
              <strong>Route Info:</strong>
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
              options={{
                suppressMarkers: false
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicDirections;
```

### Multi-Mode Route Comparison
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

interface RouteInfo {
  mode: google.maps.TravelMode;
  directions: google.maps.DirectionsResult | null;
  color: string;
  name: string;
}

const MultiModeDirections: React.FC = () => {
  const [routes, setRoutes] = useState<RouteInfo[]>([
    { mode: window.google.maps.TravelMode.DRIVING, directions: null, color: '#007bff', name: 'Driving' },
    { mode: window.google.maps.TravelMode.WALKING, directions: null, color: '#28a745', name: 'Walking' },
    { mode: window.google.maps.TravelMode.BICYCLING, directions: null, color: '#ffc107', name: 'Bicycling' }
  ]);
  const [calculating, setCalculating] = useState<string[]>([]);
  const [activeRoute, setActiveRoute] = useState<google.maps.TravelMode | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const origin = { lat: 24.7136, lng: 46.6753 }; // Kingdom Centre
  const destination = { lat: 24.6877, lng: 46.6857 }; // Al Faisaliah Tower

  const directionsCallback = (mode: google.maps.TravelMode) => (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    setCalculating(prev => prev.filter(m => m !== mode));
    
    if (status === 'OK' && result) {
      setRoutes(prev => prev.map(route => 
        route.mode === mode ? { ...route, directions: result } : route
      ));
    } else {
      console.error(`${mode} directions request failed:`, status);
    }
  };

  const calculateRoute = (mode: google.maps.TravelMode) => {
    setCalculating(prev => [...prev, mode]);
    setRoutes(prev => prev.map(route => 
      route.mode === mode ? { ...route, directions: null } : route
    ));
  };

  const calculateAllRoutes = () => {
    routes.forEach(route => {
      calculateRoute(route.mode);
    });
  };

  const clearAllRoutes = () => {
    setRoutes(prev => prev.map(route => ({ ...route, directions: null })));
    setActiveRoute(null);
  };

  const getRouteInfo = (route: RouteInfo) => {
    if (!route.directions) return null;
    
    const leg = route.directions.routes[0].legs[0];
    return {
      distance: leg.distance?.text || 'N/A',
      duration: leg.duration?.text || 'N/A'
    };
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Multi-Mode Route Comparison</h3>
          <p>Compare different travel modes between Kingdom Centre and Al Faisaliah Tower</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={calculateAllRoutes}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Calculate All Routes
            </button>
            
            <button
              onClick={clearAllRoutes}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {routes.map(route => {
              const info = getRouteInfo(route);
              const isCalculating = calculating.includes(route.mode);
              
              return (
                <div
                  key={route.mode}
                  style={{
                    padding: '15px',
                    backgroundColor: activeRoute === route.mode ? route.color + '20' : 'white',
                    border: `2px solid ${route.color}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setActiveRoute(activeRoute === route.mode ? null : route.mode)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: route.color,
                        borderRadius: '50%',
                        marginRight: '8px'
                      }}
                    />
                    <strong>{route.name}</strong>
                  </div>
                  
                  <div style={{ fontSize: '14px', marginBottom: '10px' }}>
                    {isCalculating ? (
                      <span style={{ color: '#6c757d' }}>Calculating...</span>
                    ) : info ? (
                      <>
                        <div>Distance: {info.distance}</div>
                        <div>Duration: {info.duration}</div>
                      </>
                    ) : (
                      <span style={{ color: '#6c757d' }}>Not calculated</span>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      calculateRoute(route.mode);
                    }}
                    disabled={isCalculating}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: isCalculating ? '#6c757d' : route.color,
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: isCalculating ? 'not-allowed' : 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          {calculating.map(mode => (
            <DirectionsService
              key={mode}
              options={{
                origin,
                destination,
                travelMode: mode
              }}
              callback={directionsCallback(mode)}
            />
          ))}

          {routes.map(route => {
            if (!route.directions) return null;
            
            const isActive = activeRoute === null || activeRoute === route.mode;
            
            return (
              <DirectionsRenderer
                key={route.mode}
                directions={route.directions}
                options={{
                  suppressMarkers: false,
                  polylineOptions: {
                    strokeColor: route.color,
                    strokeWeight: isActive ? 5 : 3,
                    strokeOpacity: isActive ? 0.8 : 0.4
                  },
                  markerOptions: {
                    visible: isActive
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

export default MultiModeDirections;
```

### Route with Waypoints
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

interface Waypoint {
  location: google.maps.LatLngLiteral;
  name: string;
  stopover: boolean;
}

const WaypointDirections: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [optimizeRoute, setOptimizeRoute] = useState(false);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const origin = { lat: 24.7136, lng: 46.6753 }; // Kingdom Centre
  const destination = { lat: 24.6308, lng: 46.7073 }; // Masmak Fortress

  const waypoints: Waypoint[] = [
    {
      location: { lat: 24.6877, lng: 46.6857 },
      name: 'Al Faisaliah Tower',
      stopover: true
    },
    {
      location: { lat: 24.6465, lng: 46.7169 },
      name: 'National Museum',
      stopover: true
    },
    {
      location: { lat: 24.6500, lng: 46.7000 },
      name: 'King Abdulaziz Historical Center',
      stopover: true
    }
  ];

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    setCalculating(false);
    
    if (status === 'OK' && result) {
      setDirections(result);
      console.log('Route with waypoints calculated:', result);
    } else {
      console.error('Directions request failed:', status);
      alert('Could not calculate route with waypoints.');
    }
  };

  const calculateRoute = () => {
    setCalculating(true);
    setDirections(null);
  };

  const getTotalDistance = () => {
    if (!directions) return 'N/A';
    
    let totalDistance = 0;
    directions.routes[0].legs.forEach(leg => {
      if (leg.distance?.value) {
        totalDistance += leg.distance.value;
      }
    });
    
    return (totalDistance / 1000).toFixed(1) + ' km';
  };

  const getTotalDuration = () => {
    if (!directions) return 'N/A';
    
    let totalDuration = 0;
    directions.routes[0].legs.forEach(leg => {
      if (leg.duration?.value) {
        totalDuration += leg.duration.value;
      }
    });
    
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Multi-Stop Route Planning</h3>
          <p>Plan a route with multiple waypoints through Riyadh landmarks</p>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
              <input
                type="checkbox"
                checked={optimizeRoute}
                onChange={(e) => setOptimizeRoute(e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              Optimize waypoint order for shortest route
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
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
              {calculating ? 'Calculating Route...' : 'Calculate Multi-Stop Route'}
            </button>

            {directions && (
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#d4edda', 
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  Total Distance: {getTotalDistance()}
                </div>
                <div style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#d1ecf1', 
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  Total Duration: {getTotalDuration()}
                </div>
              </div>
            )}
          </div>

          <div style={{ fontSize: '14px' }}>
            <strong>Route Stops:</strong>
            <ol style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>Kingdom Centre (Start)</li>
              {waypoints.map((waypoint, index) => (
                <li key={index}>{waypoint.name}</li>
              ))}
              <li>Masmak Fortress (End)</li>
            </ol>
          </div>

          {directions && (
            <div style={{ marginTop: '15px' }}>
              <strong>Leg Details:</strong>
              <div style={{ marginTop: '5px' }}>
                {directions.routes[0].legs.map((leg, index) => (
                  <div key={index} style={{ 
                    padding: '8px', 
                    backgroundColor: 'white', 
                    borderRadius: '4px',
                    marginBottom: '5px',
                    fontSize: '13px'
                  }}>
                    <strong>Leg {index + 1}:</strong> {leg.distance?.text} - {leg.duration?.text}
                    <br />
                    <span style={{ color: '#666' }}>
                      {leg.start_address} → {leg.end_address}
                    </span>
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
        >
          {calculating && (
            <DirectionsService
              options={{
                origin,
                destination,
                waypoints: waypoints.map(wp => ({
                  location: wp.location,
                  stopover: wp.stopover
                })),
                optimizeWaypoints: optimizeRoute,
                travelMode: window.google.maps.TravelMode.DRIVING
              }}
              callback={directionsCallback}
            />
          )}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: false,
                polylineOptions: {
                  strokeColor: '#007bff',
                  strokeWeight: 5,
                  strokeOpacity: 0.8
                }
              }}
            />
          )}

          {/* Show waypoint markers when not calculating */}
          {!calculating && !directions && waypoints.map((waypoint, index) => (
            <Marker
              key={index}
              position={waypoint.location}
              title={waypoint.name}
              label={{
                text: (index + 1).toString(),
                color: 'white',
                fontWeight: 'bold'
              }}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#ffc107',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default WaypointDirections;
```

## Data Types

### DirectionsRequest
```typescript
interface DirectionsRequest {
  origin: string | LatLngLiteral | LatLng;
  destination: string | LatLngLiteral | LatLng;
  travelMode: TravelMode;
  waypoints?: DirectionsWaypoint[];
  optimizeWaypoints?: boolean;
  avoidFerries?: boolean;
  avoidHighways?: boolean;
  avoidTolls?: boolean;
  region?: string;
  unitSystem?: UnitSystem;
  drivingOptions?: DrivingOptions;
  transitOptions?: TransitOptions;
}
```

### DirectionsWaypoint
```typescript
interface DirectionsWaypoint {
  location: string | LatLngLiteral | LatLng;
  stopover?: boolean;
}
```

### DirectionsResult
```typescript
interface DirectionsResult {
  routes: DirectionsRoute[];
  geocoded_waypoints?: DirectionsGeocodedWaypoint[];
  request: DirectionsRequest;
}
```

### DirectionsStatus
```typescript
enum DirectionsStatus {
  OK = 'OK',
  NOT_FOUND = 'NOT_FOUND',
  ZERO_RESULTS = 'ZERO_RESULTS',
  MAX_WAYPOINTS_EXCEEDED = 'MAX_WAYPOINTS_EXCEEDED',
  MAX_ROUTE_LENGTH_EXCEEDED = 'MAX_ROUTE_LENGTH_EXCEEDED',
  INVALID_REQUEST = 'INVALID_REQUEST',
  OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
  REQUEST_DENIED = 'REQUEST_DENIED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}
```

## Best Practices

### 1. Error Handling
```typescript
const directionsCallback = (result: DirectionsResult | null, status: DirectionsStatus) => {
  switch (status) {
    case 'OK':
      if (result) setDirections(result);
      break;
    case 'NOT_FOUND':
      alert('One or more locations could not be found');
      break;
    case 'ZERO_RESULTS':
      alert('No route could be found between the locations');
      break;
    case 'MAX_WAYPOINTS_EXCEEDED':
      alert('Too many waypoints in the request');
      break;
    case 'OVER_QUERY_LIMIT':
      alert('Query limit exceeded. Please try again later');
      break;
    default:
      alert('Directions request failed: ' + status);
  }
};
```

### 2. Performance Optimization
```typescript
// Limit waypoints (max 25 for paid accounts, 8 for free)
const MAX_WAYPOINTS = 8;

// Debounce route calculations
const debouncedCalculateRoute = useCallback(
  debounce(() => {
    calculateRoute();
  }, 500),
  []
);

// Cache results to avoid repeated calculations
const routeCache = new Map<string, DirectionsResult>();
```

### 3. User Experience
```typescript
// Show loading state
const [calculating, setCalculating] = useState(false);

// Provide route alternatives
const [routeIndex, setRouteIndex] = useState(0);

// Show route summary
const getRouteSummary = (result: DirectionsResult) => ({
  distance: result.routes[0].legs.reduce((total, leg) => 
    total + (leg.distance?.value || 0), 0
  ),
  duration: result.routes[0].legs.reduce((total, leg) => 
    total + (leg.duration?.value || 0), 0
  )
});
```

## Common Issues and Solutions

### 1. No route found
- Check if locations are accessible by the selected travel mode
- Verify coordinates are valid
- Consider alternative travel modes

### 2. Query limit exceeded
- Implement request throttling
- Cache results to reduce API calls
- Consider upgrading API quota

### 3. Waypoint limit exceeded
- Limit waypoints to API maximum (25 for paid, 8 for free)
- Split long routes into segments
- Use route optimization

### 4. Invalid travel mode
- Verify travel mode is supported for the region
- Check if transit data is available for the area

## Important Notes

- DirectionsService must be a child of GoogleMap component
- Service automatically makes API request when mounted
- Use with DirectionsRenderer to display results
- Maximum 25 waypoints for paid accounts, 8 for free accounts
- Some travel modes may not be available in all regions
- Results include multiple route alternatives when available
- Optimize waypoints to find the most efficient route order
- Consider API quotas and implement appropriate caching