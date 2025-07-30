# DistanceMatrixService Component

## Overview
`DistanceMatrixService` is a component that calculates travel distance and time between multiple origins and destinations. It's useful for route optimization, delivery planning, and analyzing travel patterns across multiple locations.

## Import
```typescript
import { DistanceMatrixService } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `DistanceMatrixRequest` | ✅ | - | Request configuration |
| `callback` | `(response: DistanceMatrixResponse, status: DistanceMatrixStatus) => void` | ✅ | - | Callback function for results |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(distanceMatrixService: google.maps.DistanceMatrixService) => void` | Called when service loads |
| `onUnmount` | `(distanceMatrixService: google.maps.DistanceMatrixService) => void` | Called when service unmounts |

## DistanceMatrixRequest Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `origins` | `LatLng[] \| string[]` | ✅ | Starting points |
| `destinations` | `LatLng[] \| string[]` | ✅ | End points |
| `travelMode` | `TravelMode` | ✅ | Mode of transportation |
| `unitSystem` | `UnitSystem` | ❌ | Metric or Imperial units |
| `avoidHighways` | `boolean` | ❌ | Avoid highways |
| `avoidTolls` | `boolean` | ❌ | Avoid toll roads |
| `region` | `string` | ❌ | Region code for geocoding |
| `language` | `string` | ❌ | Language for results |
| `drivingOptions` | `DrivingOptions` | ❌ | Driving-specific options |
| `transitOptions` | `TransitOptions` | ❌ | Transit-specific options |

## Usage Examples

### Basic Distance Matrix
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, DistanceMatrixService, Marker } from '@react-google-maps/api';

interface MatrixResult {
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  status: string;
}

const BasicDistanceMatrix: React.FC = () => {
  const [results, setResults] = useState<MatrixResult[]>([]);
  const [calculating, setCalculating] = useState(false);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Sample locations in Riyadh
  const origins = [
    { lat: 24.7136, lng: 46.6753 }, // Kingdom Centre
    { lat: 24.6877, lng: 46.6857 }  // Al Faisaliah Tower
  ];

  const destinations = [
    { lat: 24.6308, lng: 46.7073 }, // Masmak Fortress
    { lat: 24.6465, lng: 46.7169 }, // National Museum
    { lat: 24.7200, lng: 46.6700 }  // Riyadh Gallery
  ];

  const calculateMatrix = () => {
    setCalculating(true);
    setResults([]);
  };

  const handleMatrixResponse = (
    response: google.maps.DistanceMatrixResponse,
    status: google.maps.DistanceMatrixStatus
  ) => {
    setCalculating(false);

    if (status === 'OK') {
      const matrixResults: MatrixResult[] = [];
      
      response.rows.forEach((row, originIndex) => {
        row.elements.forEach((element, destIndex) => {
          matrixResults.push({
            origin: `Origin ${originIndex + 1}`,
            destination: `Destination ${destIndex + 1}`,
            distance: element.distance?.text || 'N/A',
            duration: element.duration?.text || 'N/A',
            status: element.status
          });
        });
      });
      
      setResults(matrixResults);
    } else {
      console.error('Distance Matrix request failed:', status);
      alert('Failed to calculate distance matrix. Please try again.');
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic Distance Matrix</h3>
          <p>Calculate distances and travel times between multiple points</p>
          
          <button
            onClick={calculateMatrix}
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
            {calculating ? 'Calculating...' : 'Calculate Distance Matrix'}
          </button>

          <div style={{ marginBottom: '15px' }}>
            <h4>Configuration:</h4>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <div><strong>Origins:</strong> {origins.length} locations</div>
              <div><strong>Destinations:</strong> {destinations.length} locations</div>
              <div><strong>Total Calculations:</strong> {origins.length * destinations.length}</div>
            </div>
          </div>

          {results.length > 0 && (
            <div>
              <h4>Results:</h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Origin</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Destination</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Distance</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Duration</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={index} style={{ 
                        borderBottom: '1px solid #dee2e6',
                        backgroundColor: result.status === 'OK' ? 'white' : '#f8d7da'
                      }}>
                        <td style={{ padding: '10px' }}>{result.origin}</td>
                        <td style={{ padding: '10px' }}>{result.destination}</td>
                        <td style={{ padding: '10px' }}>{result.distance}</td>
                        <td style={{ padding: '10px' }}>{result.duration}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            backgroundColor: result.status === 'OK' ? '#d4edda' : '#f8d7da',
                            color: result.status === 'OK' ? '#155724' : '#721c24'
                          }}>
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          {/* Origin markers */}
          {origins.map((origin, index) => (
            <Marker
              key={`origin-${index}`}
              position={origin}
              title={`Origin ${index + 1}`}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#28a745',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
            />
          ))}

          {/* Destination markers */}
          {destinations.map((destination, index) => (
            <Marker
              key={`dest-${index}`}
              position={destination}
              title={`Destination ${index + 1}`}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#dc3545',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
            />
          ))}

          {calculating && (
            <DistanceMatrixService
              options={{
                origins,
                destinations,
                travelMode: window.google.maps.TravelMode.DRIVING,
                unitSystem: window.google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
              }}
              callback={handleMatrixResponse}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicDistanceMatrix;
```

### Delivery Route Optimizer
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, DistanceMatrixService, Marker, Polyline } from '@react-google-maps/api';

interface DeliveryLocation {
  id: string;
  name: string;
  address: string;
  position: google.maps.LatLngLiteral;
  priority: 'high' | 'medium' | 'low';
  timeWindow: string;
}

interface RouteOptimization {
  totalDistance: number;
  totalDuration: number;
  optimizedOrder: number[];
  savings: number;
}

const DeliveryRouteOptimizer: React.FC = () => {
  const [depot] = useState({ lat: 24.7136, lng: 46.6753 }); // Warehouse location
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocation[]>([
    {
      id: '1',
      name: 'Customer A',
      address: 'Al Faisaliah Tower',
      position: { lat: 24.6877, lng: 46.6857 },
      priority: 'high',
      timeWindow: '09:00-11:00'
    },
    {
      id: '2',
      name: 'Customer B',
      address: 'Masmak Fortress',
      position: { lat: 24.6308, lng: 46.7073 },
      priority: 'medium',
      timeWindow: '10:00-14:00'
    },
    {
      id: '3',
      name: 'Customer C',
      address: 'National Museum',
      position: { lat: 24.6465, lng: 46.7169 },
      priority: 'low',
      timeWindow: '13:00-17:00'
    },
    {
      id: '4',
      name: 'Customer D',
      address: 'Riyadh Gallery',
      position: { lat: 24.7200, lng: 46.6700 },
      priority: 'high',
      timeWindow: '08:00-12:00'
    }
  ]);

  const [optimization, setOptimization] = useState<RouteOptimization | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState<google.maps.LatLngLiteral[]>([]);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const optimizeRoute = () => {
    setCalculating(true);
    setOptimization(null);
    setOptimizedRoute([]);
  };

  const handleMatrixResponse = (
    response: google.maps.DistanceMatrixResponse,
    status: google.maps.DistanceMatrixStatus
  ) => {
    setCalculating(false);

    if (status === 'OK') {
      // Simple nearest neighbor optimization (in production, use more sophisticated algorithms)
      const distances: number[][] = [];
      
      response.rows.forEach(row => {
        const rowDistances: number[] = [];
        row.elements.forEach(element => {
          rowDistances.push(element.distance?.value || Infinity);
        });
        distances.push(rowDistances);
      });

      // Calculate optimized route using nearest neighbor heuristic
      const optimizedOrder = calculateOptimizedRoute(distances, deliveryLocations);
      const routeStats = calculateRouteStats(distances, optimizedOrder);
      
      setOptimization(routeStats);
      
      // Create route path
      const routePath = [depot];
      optimizedOrder.forEach(index => {
        routePath.push(deliveryLocations[index].position);
      });
      routePath.push(depot); // Return to depot
      
      setOptimizedRoute(routePath);
    } else {
      console.error('Distance Matrix request failed:', status);
      alert('Failed to optimize route. Please try again.');
    }
  };

  const calculateOptimizedRoute = (distances: number[][], locations: DeliveryLocation[]) => {
    // Simple nearest neighbor algorithm (starting from depot at index 0)
    const unvisited = locations.map((_, index) => index);
    const route: number[] = [];
    let currentIndex = 0; // Start from depot

    while (unvisited.length > 0) {
      let nearestIndex = 0;
      let nearestDistance = Infinity;

      unvisited.forEach((locationIndex, arrayIndex) => {
        const distance = distances[currentIndex][locationIndex + 1]; // +1 because depot is at index 0
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = arrayIndex;
        }
      });

      const selectedLocationIndex = unvisited[nearestIndex];
      route.push(selectedLocationIndex);
      currentIndex = selectedLocationIndex + 1; // +1 for depot offset
      unvisited.splice(nearestIndex, 1);
    }

    return route;
  };

  const calculateRouteStats = (distances: number[][], optimizedOrder: number[]) => {
    let totalDistance = 0;
    let totalDuration = 0;

    // Distance from depot to first location
    if (optimizedOrder.length > 0) {
      totalDistance += distances[0][optimizedOrder[0] + 1];
    }

    // Distances between consecutive locations
    for (let i = 0; i < optimizedOrder.length - 1; i++) {
      totalDistance += distances[optimizedOrder[i] + 1][optimizedOrder[i + 1] + 1];
    }

    // Distance from last location back to depot
    if (optimizedOrder.length > 0) {
      totalDistance += distances[optimizedOrder[optimizedOrder.length - 1] + 1][0];
    }

    // Estimate duration (assuming average speed of 30 km/h in city)
    totalDuration = (totalDistance / 1000) * 2; // 2 minutes per km

    // Calculate savings compared to visiting in original order
    let originalDistance = 0;
    for (let i = 0; i < deliveryLocations.length; i++) {
      originalDistance += distances[0][i + 1]; // Depot to each location
      originalDistance += distances[i + 1][0]; // Each location back to depot
    }

    const savings = ((originalDistance - totalDistance) / originalDistance) * 100;

    return {
      totalDistance: Math.round(totalDistance / 1000 * 100) / 100, // Convert to km
      totalDuration: Math.round(totalDuration),
      optimizedOrder,
      savings: Math.round(savings)
    };
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: '#dc3545',
      medium: '#ffc107',
      low: '#28a745'
    };
    return colors[priority as keyof typeof colors] || '#6c757d';
  };

  const getPriorityIcon = (priority: string) => {
    const icons = {
      high: '🔴',
      medium: '🟡',
      low: '🟢'
    };
    return icons[priority as keyof typeof icons] || '⚪';
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Delivery Route Optimizer</h3>
          <p>Optimize delivery routes to minimize travel time and distance</p>
          
          <button
            onClick={optimizeRoute}
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
            {calculating ? 'Optimizing Route...' : 'Optimize Delivery Route'}
          </button>

          <div style={{ marginBottom: '15px' }}>
            <h4>Delivery Locations:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
              {deliveryLocations.map((location, index) => (
                <div
                  key={location.id}
                  style={{
                    padding: '10px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: `2px solid ${getPriorityColor(location.priority)}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontSize: '16px', marginRight: '8px' }}>
                      {getPriorityIcon(location.priority)}
                    </span>
                    <strong>{location.name}</strong>
                    {optimization && (
                      <span style={{ 
                        marginLeft: 'auto',
                        padding: '2px 6px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        #{optimization.optimizedOrder.indexOf(index) + 1}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    <div>{location.address}</div>
                    <div>Priority: {location.priority}</div>
                    <div>Time Window: {location.timeWindow}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {optimization && (
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Route Optimization Results</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                <div>
                  <strong>Total Distance:</strong>
                  <div style={{ fontSize: '20px', color: '#007bff' }}>{optimization.totalDistance} km</div>
                </div>
                <div>
                  <strong>Estimated Duration:</strong>
                  <div style={{ fontSize: '20px', color: '#007bff' }}>{optimization.totalDuration} min</div>
                </div>
                <div>
                  <strong>Route Savings:</strong>
                  <div style={{ fontSize: '20px', color: '#28a745' }}>{optimization.savings}%</div>
                </div>
                <div>
                  <strong>Stops:</strong>
                  <div style={{ fontSize: '20px', color: '#007bff' }}>{deliveryLocations.length}</div>
                </div>
              </div>
              
              <div style={{ marginTop: '15px' }}>
                <strong>Optimized Route Order:</strong>
                <div style={{ marginTop: '5px' }}>
                  Depot → {optimization.optimizedOrder.map(index => deliveryLocations[index].name).join(' → ')} → Depot
                </div>
              </div>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          {/* Depot marker */}
          <Marker
            position={depot}
            title="Warehouse/Depot"
            icon={{
              path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 8,
              fillColor: '#007bff',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2
            }}
          />

          {/* Delivery location markers */}
          {deliveryLocations.map((location, index) => (
            <Marker
              key={location.id}
              position={location.position}
              title={`${location.name} - ${location.priority} priority`}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: getPriorityColor(location.priority),
                fillOpacity: 0.8,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
              label={{
                text: optimization ? (optimization.optimizedOrder.indexOf(index) + 1).toString() : (index + 1).toString(),
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px'
              }}
            />
          ))}

          {/* Optimized route polyline */}
          {optimizedRoute.length > 0 && (
            <Polyline
              path={optimizedRoute}
              options={{
                strokeColor: '#007bff',
                strokeWeight: 4,
                strokeOpacity: 0.8
              }}
            />
          )}

          {calculating && (
            <DistanceMatrixService
              options={{
                origins: [depot, ...deliveryLocations.map(loc => loc.position)],
                destinations: [depot, ...deliveryLocations.map(loc => loc.position)],
                travelMode: window.google.maps.TravelMode.DRIVING,
                unitSystem: window.google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
              }}
              callback={handleMatrixResponse}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default DeliveryRouteOptimizer;
```

## Best Practices

### 1. Request Optimization
```typescript
// Batch requests efficiently
const optimizeMatrixRequest = (origins: LatLng[], destinations: LatLng[]) => {
  // Google Maps allows up to 25 origins and 25 destinations per request
  const MAX_ORIGINS = 25;
  const MAX_DESTINATIONS = 25;
  
  if (origins.length > MAX_ORIGINS || destinations.length > MAX_DESTINATIONS) {
    // Split into multiple requests
    return splitMatrixRequest(origins, destinations);
  }
  
  return [{ origins, destinations }];
};

// Cache results to avoid redundant requests
const useMatrixCache = () => {
  const cache = useRef(new Map<string, DistanceMatrixResponse>());
  
  const getCacheKey = (origins: LatLng[], destinations: LatLng[], options: any) => {
    return JSON.stringify({ origins, destinations, options });
  };
  
  return { cache: cache.current, getCacheKey };
};
```

### 2. Error Handling
```typescript
// Comprehensive error handling
const handleMatrixError = (status: google.maps.DistanceMatrixStatus) => {
  const errorMessages = {
    'INVALID_REQUEST': 'Invalid request parameters',
    'MAX_ELEMENTS_EXCEEDED': 'Too many origins/destinations',
    'MAX_DIMENSIONS_EXCEEDED': 'Request exceeds size limits',
    'OVER_QUERY_LIMIT': 'API quota exceeded',
    'REQUEST_DENIED': 'Request denied - check API key',
    'UNKNOWN_ERROR': 'Server error occurred'
  };
  
  return errorMessages[status] || 'Unknown error';
};
```

### 3. Performance Optimization
```typescript
// Use React.memo for expensive calculations
const OptimizedMatrixResults = React.memo(({ results }: { results: MatrixResult[] }) => {
  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>{/* result display */}</div>
      ))}
    </div>
  );
});

// Debounce matrix calculations
const useDebouncedMatrix = (delay: number) => {
  const [trigger, setTrigger] = useState(false);
  
  const debouncedTrigger = useCallback(
    debounce(() => setTrigger(prev => !prev), delay),
    [delay]
  );
  
  return { trigger, debouncedTrigger };
};
```

## Common Issues and Solutions

### 1. Request limits exceeded
- Maximum 25 origins and 25 destinations per request
- Split large requests into smaller batches
- Implement request queuing for multiple batches

### 2. Quota exceeded errors
- Monitor API usage and implement rate limiting
- Cache results to reduce redundant requests
- Consider upgrading API plan for higher quotas

### 3. Invalid coordinates
- Validate latitude/longitude values before requests
- Handle geocoding for address strings
- Provide fallback for failed geocoding

### 4. Performance issues with large matrices
- Use pagination for displaying large result sets
- Implement virtual scrolling for many results
- Consider server-side processing for complex optimizations

## Important Notes

- DistanceMatrixService must be a child of GoogleMap component
- Maximum 25 origins and 25 destinations per request
- Results are cached by Google for performance
- Consider API quotas and billing when making frequent requests
- Use appropriate travel modes for accurate results
- Implement proper error handling for production use
- Cache results locally to improve performance
- Consider using web workers for complex route optimizations