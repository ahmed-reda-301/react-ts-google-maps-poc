# TrafficLayer Component

## Overview
`TrafficLayer` is a component that displays real-time traffic information on the map. It shows traffic conditions using color-coded lines on roads, helping users understand current traffic flow and plan their routes accordingly.

## Import
```typescript
import { TrafficLayer } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `TrafficLayerOptions` | ❌ | - | Layer configuration options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(trafficLayer: google.maps.TrafficLayer) => void` | Called when layer loads |
| `onUnmount` | `(trafficLayer: google.maps.TrafficLayer) => void` | Called when layer unmounts |

## TrafficLayerOptions

The TrafficLayer has minimal options as it's primarily a data overlay:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoRefresh` | `boolean` | `true` | Automatically refresh traffic data |
| `map` | `google.maps.Map` | - | Map instance (automatically set) |

## Traffic Color Legend

| Color | Meaning | Speed |
|-------|---------|-------|
| 🟢 Green | Free flow traffic | Normal speed |
| 🟡 Yellow | Moderate traffic | Slower than normal |
| 🟠 Orange | Heavy traffic | Much slower |
| 🔴 Red | Stop-and-go traffic | Very slow/stopped |

## Usage Examples

### Basic Traffic Layer
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, TrafficLayer } from '@react-google-maps/api';

const BasicTrafficLayer: React.FC = () => {
  const [showTraffic, setShowTraffic] = useState(true);

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
          <h3>Basic Traffic Layer</h3>
          <p>Display real-time traffic conditions on the map</p>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
            <button
              onClick={() => setShowTraffic(!showTraffic)}
              style={{
                padding: '8px 16px',
                backgroundColor: showTraffic ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showTraffic ? 'Hide Traffic' : 'Show Traffic'}
            </button>
          </div>

          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <strong>Traffic Legend:</strong>
            <div style={{ marginTop: '5px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <span>🟢 Free flow</span>
              <span>🟡 Moderate</span>
              <span>🟠 Heavy</span>
              <span>🔴 Stop & go</span>
            </div>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          {showTraffic && <TrafficLayer />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicTrafficLayer;
```

### Traffic-Aware Route Planning
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, TrafficLayer, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const TrafficAwareRouting: React.FC = () => {
  const [showTraffic, setShowTraffic] = useState(true);
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [routeOptions, setRouteOptions] = useState({
    avoidHighways: false,
    avoidTolls: false,
    optimizeWaypoints: true
  });

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const clickedPoint = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      if (!origin) {
        setOrigin(clickedPoint);
        setDestination(null);
        setDirections(null);
      } else if (!destination) {
        setDestination(clickedPoint);
      } else {
        // Reset and start over
        setOrigin(clickedPoint);
        setDestination(null);
        setDirections(null);
      }
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
      alert('Could not calculate route. Try different locations.');
    }
  };

  const calculateRoute = () => {
    if (origin && destination) {
      setCalculating(true);
      setDirections(null);
    }
  };

  const clearRoute = () => {
    setOrigin(null);
    setDestination(null);
    setDirections(null);
  };

  const getRouteInfo = () => {
    if (!directions) return null;
    
    const route = directions.routes[0];
    const leg = route.legs[0];
    
    return {
      distance: leg.distance?.text || 'N/A',
      duration: leg.duration?.text || 'N/A',
      durationInTraffic: leg.duration_in_traffic?.text || 'N/A',
      summary: route.summary || 'Route'
    };
  };

  const routeInfo = getRouteInfo();

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Traffic-Aware Route Planning</h3>
          <p>Plan routes considering real-time traffic conditions</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowTraffic(!showTraffic)}
              style={{
                padding: '8px 16px',
                backgroundColor: showTraffic ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showTraffic ? 'Hide Traffic' : 'Show Traffic'}
            </button>
            
            <button
              onClick={calculateRoute}
              disabled={!origin || !destination || calculating}
              style={{
                padding: '8px 16px',
                backgroundColor: origin && destination && !calculating ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: origin && destination && !calculating ? 'pointer' : 'not-allowed'
              }}
            >
              {calculating ? 'Calculating...' : 'Calculate Route'}
            </button>
            
            <button
              onClick={clearRoute}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ffc107',
                color: 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear Route
            </button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4>Route Options:</h4>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={routeOptions.avoidHighways}
                  onChange={(e) => setRouteOptions(prev => ({
                    ...prev,
                    avoidHighways: e.target.checked
                  }))}
                  style={{ marginRight: '5px' }}
                />
                Avoid Highways
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={routeOptions.avoidTolls}
                  onChange={(e) => setRouteOptions(prev => ({
                    ...prev,
                    avoidTolls: e.target.checked
                  }))}
                  style={{ marginRight: '5px' }}
                />
                Avoid Tolls
              </label>
            </div>
          </div>

          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            <strong>Instructions:</strong>
            <ol style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>Click on the map to set your starting point (green marker)</li>
              <li>Click again to set your destination (red marker)</li>
              <li>Click "Calculate Route" to get traffic-aware directions</li>
              <li>Red/orange lines on roads indicate heavy traffic</li>
            </ol>
          </div>

          {routeInfo && (
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Route Information</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                <div>
                  <strong>Distance:</strong> {routeInfo.distance}
                </div>
                <div>
                  <strong>Normal Time:</strong> {routeInfo.duration}
                </div>
                <div>
                  <strong>With Traffic:</strong> {routeInfo.durationInTraffic}
                </div>
                <div>
                  <strong>Route:</strong> {routeInfo.summary}
                </div>
              </div>
              
              {routeInfo.duration !== routeInfo.durationInTraffic && (
                <div style={{ 
                  marginTop: '10px', 
                  padding: '8px', 
                  backgroundColor: '#fff3cd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  ⚠️ Traffic is affecting travel time. Consider alternative routes or departure times.
                </div>
              )}
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
          onClick={onMapClick}
        >
          {showTraffic && <TrafficLayer />}
          
          {origin && (
            <Marker
              position={origin}
              title="Start Point"
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#28a745',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
            />
          )}
          
          {destination && (
            <Marker
              position={destination}
              title="Destination"
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#dc3545',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
            />
          )}

          {calculating && origin && destination && (
            <DirectionsService
              options={{
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
                avoidHighways: routeOptions.avoidHighways,
                avoidTolls: routeOptions.avoidTolls,
                drivingOptions: {
                  departureTime: new Date(),
                  trafficModel: window.google.maps.TrafficModel.BEST_GUESS
                }
              }}
              callback={directionsCallback}
            />
          )}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#007bff',
                  strokeWeight: 4,
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

export default TrafficAwareRouting;
```

### Traffic Monitoring Dashboard
```typescript
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, TrafficLayer } from '@react-google-maps/api';

interface TrafficArea {
  id: string;
  name: string;
  center: google.maps.LatLngLiteral;
  zoom: number;
  description: string;
  peakHours: string[];
  averageSpeed: number;
}

const TrafficMonitoringDashboard: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState('downtown');
  const [showTraffic, setShowTraffic] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const trafficAreas: Record<string, TrafficArea> = {
    downtown: {
      id: 'downtown',
      name: 'Downtown Riyadh',
      center: { lat: 24.7136, lng: 46.6753 },
      zoom: 14,
      description: 'Central business district with heavy traffic during peak hours',
      peakHours: ['07:00-09:00', '17:00-19:00'],
      averageSpeed: 25
    },
    kingfahd: {
      id: 'kingfahd',
      name: 'King Fahd Road',
      center: { lat: 24.7200, lng: 46.6700 },
      zoom: 13,
      description: 'Major arterial road connecting north and south',
      peakHours: ['06:30-09:30', '16:30-19:30'],
      averageSpeed: 45
    },
    airport: {
      id: 'airport',
      name: 'Airport Area',
      center: { lat: 24.9576, lng: 46.6988 },
      zoom: 12,
      description: 'Airport access roads with variable traffic patterns',
      peakHours: ['05:00-07:00', '20:00-23:00'],
      averageSpeed: 55
    },
    olaya: {
      id: 'olaya',
      name: 'Olaya District',
      center: { lat: 24.6877, lng: 46.6857 },
      zoom: 14,
      description: 'Commercial and residential area with moderate traffic',
      peakHours: ['07:30-09:00', '17:00-18:30'],
      averageSpeed: 35
    }
  };

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Auto-refresh traffic data
  useEffect(() => {
    if (refreshInterval > 0) {
      const timer = setInterval(() => {
        console.log('Refreshing traffic data...');
        // In a real app, this would trigger a refresh of traffic data
      }, refreshInterval * 1000);

      return () => clearInterval(timer);
    }
  }, [refreshInterval]);

  const currentArea = trafficAreas[selectedArea];

  const isCurrentlyPeakHour = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    return currentArea.peakHours.some(peakHour => {
      const [start, end] = peakHour.split('-');
      return currentTimeStr >= start && currentTimeStr <= end;
    });
  };

  const getTrafficStatus = () => {
    const isPeak = isCurrentlyPeakHour();
    if (isPeak) {
      return { status: 'Heavy', color: '#dc3545', icon: '🔴' };
    } else {
      const hour = currentTime.getHours();
      if (hour >= 22 || hour <= 5) {
        return { status: 'Light', color: '#28a745', icon: '🟢' };
      } else {
        return { status: 'Moderate', color: '#ffc107', icon: '🟡' };
      }
    }
  };

  const trafficStatus = getTrafficStatus();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Traffic Monitoring Dashboard</h3>
          <p>Monitor real-time traffic conditions across different areas</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Current Status</h4>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <span style={{ fontSize: '20px', marginRight: '8px' }}>
                  {trafficStatus.icon}
                </span>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: trafficStatus.color 
                }}>
                  {trafficStatus.status} Traffic
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Current Time: {formatTime(currentTime)}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Area: {currentArea.name}
              </div>
            </div>
            
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Peak Hours</h4>
              {currentArea.peakHours.map((hours, index) => (
                <div key={index} style={{ 
                  fontSize: '14px', 
                  marginBottom: '3px',
                  color: isCurrentlyPeakHour() ? '#dc3545' : '#666',
                  fontWeight: isCurrentlyPeakHour() ? 'bold' : 'normal'
                }}>
                  {hours}
                </div>
              ))}
            </div>
            
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Average Speed</h4>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                {currentArea.averageSpeed} km/h
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Free flow conditions
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Select Monitoring Area:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {Object.values(trafficAreas).map(area => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area.id)}
                  style={{
                    padding: '10px',
                    backgroundColor: selectedArea === area.id ? '#007bff' : 'white',
                    color: selectedArea === area.id ? 'white' : '#007bff',
                    border: '2px solid #007bff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {area.name}
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    Avg: {area.averageSpeed} km/h
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowTraffic(!showTraffic)}
              style={{
                padding: '8px 16px',
                backgroundColor: showTraffic ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showTraffic ? 'Hide Traffic Layer' : 'Show Traffic Layer'}
            </button>
            
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value={0}>No Auto-refresh</option>
              <option value={30}>Refresh every 30s</option>
              <option value={60}>Refresh every 1min</option>
              <option value={300}>Refresh every 5min</option>
            </select>
          </div>

          <div style={{ 
            padding: '10px', 
            backgroundColor: currentArea.description.includes('heavy') ? '#fff3cd' : '#e3f2fd',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <strong>Area Info:</strong> {currentArea.description}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={currentArea.zoom}
          center={currentArea.center}
        >
          {showTraffic && <TrafficLayer />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default TrafficMonitoringDashboard;
```

## Best Practices

### 1. Performance Optimization
```typescript
// Use React.memo for performance
const OptimizedTrafficLayer = React.memo(TrafficLayer);

// Conditional rendering based on zoom level
const useTrafficLayerVisibility = (map: google.maps.Map) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const listener = map.addListener('zoom_changed', () => {
      const zoom = map.getZoom();
      setVisible(zoom >= 10); // Traffic is most useful at street level
    });
    
    return () => listener.remove();
  }, [map]);
  
  return visible;
};
```

### 2. Data Refresh Management
```typescript
// Implement smart refresh logic
const useTrafficDataRefresh = (intervalSeconds: number) => {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  
  useEffect(() => {
    if (intervalSeconds > 0) {
      const timer = setInterval(() => {
        setLastRefresh(new Date());
        // Trigger traffic layer refresh
      }, intervalSeconds * 1000);
      
      return () => clearInterval(timer);
    }
  }, [intervalSeconds]);
  
  return lastRefresh;
};
```

### 3. Integration with Routing
```typescript
// Use traffic data in route planning
const getTrafficAwareRoute = (origin: LatLng, destination: LatLng) => {
  return {
    origin,
    destination,
    travelMode: google.maps.TravelMode.DRIVING,
    drivingOptions: {
      departureTime: new Date(),
      trafficModel: google.maps.TrafficModel.BEST_GUESS
    }
  };
};
```

## Common Issues and Solutions

### 1. Traffic data not showing
- Traffic layer requires zoom level 10 or higher for visibility
- Data availability varies by geographic location
- Check if the area has sufficient traffic data coverage

### 2. Performance impact
- Traffic layer can impact map performance with frequent updates
- Consider disabling auto-refresh when not needed
- Use conditional rendering based on user needs

### 3. Limited coverage areas
- Traffic data is primarily available in major cities
- Coverage varies by country and region
- Provide fallback information when data is unavailable

### 4. Real-time accuracy
- Traffic data has a slight delay (typically 2-5 minutes)
- Conditions can change rapidly during incidents
- Combine with other traffic sources for critical applications

## Important Notes

- TrafficLayer must be a child of GoogleMap component
- No additional props required - it's a simple overlay
- Data updates automatically every few minutes
- Best visibility at zoom levels 10-18
- Coverage varies significantly by geographic location
- Traffic data is most accurate in major metropolitan areas
- Consider user's data usage when enabling auto-refresh
- Layer works best when combined with DirectionsService for routing