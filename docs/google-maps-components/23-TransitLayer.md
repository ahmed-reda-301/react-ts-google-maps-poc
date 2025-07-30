# TransitLayer Component

## Overview
`TransitLayer` is a component that displays public transportation information on the map. It shows transit lines, stations, and stops for buses, trains, subways, and other public transportation systems.

## Import
```typescript
import { TransitLayer } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `TransitLayerOptions` | ❌ | - | Layer configuration options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(transitLayer: google.maps.TransitLayer) => void` | Called when layer loads |
| `onUnmount` | `(transitLayer: google.maps.TransitLayer) => void` | Called when layer unmounts |

## TransitLayerOptions

The TransitLayer has minimal options as it's primarily a data overlay:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `map` | `google.maps.Map` | - | Map instance (automatically set) |

## Usage Examples

### Basic Transit Layer
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, TransitLayer } from '@react-google-maps/api';

const BasicTransitLayer: React.FC = () => {
  const [showTransit, setShowTransit] = useState(true);

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
          <h3>Basic Transit Layer</h3>
          <p>Display public transportation routes and stations</p>
          
          <button
            onClick={() => setShowTransit(!showTransit)}
            style={{
              padding: '8px 16px',
              backgroundColor: showTransit ? '#dc3545' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showTransit ? 'Hide Transit Layer' : 'Show Transit Layer'}
          </button>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          {showTransit && <TransitLayer />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicTransitLayer;
```

### Transit Route Planning
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, TransitLayer, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const TransitRoutePlanning: React.FC = () => {
  const [showTransit, setShowTransit] = useState(true);
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [transitOptions, setTransitOptions] = useState({
    departureTime: new Date(),
    modes: ['BUS', 'RAIL', 'SUBWAY', 'TRAIN', 'TRAM'] as google.maps.TransitMode[]
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
      console.error('Transit directions request failed:', status);
      alert('Could not find transit route. Try different locations or check if transit data is available in this area.');
    }
  };

  const calculateTransitRoute = () => {
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
      departureTime: leg.departure_time?.text || 'N/A',
      arrivalTime: leg.arrival_time?.text || 'N/A',
      steps: leg.steps?.filter(step => step.travel_mode === 'TRANSIT').length || 0
    };
  };

  const routeInfo = getRouteInfo();

  const updateDepartureTime = (minutes: number) => {
    const newTime = new Date();
    newTime.setMinutes(newTime.getMinutes() + minutes);
    setTransitOptions(prev => ({
      ...prev,
      departureTime: newTime
    }));
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Transit Route Planning</h3>
          <p>Plan routes using public transportation</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowTransit(!showTransit)}
              style={{
                padding: '8px 16px',
                backgroundColor: showTransit ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showTransit ? 'Hide Transit Lines' : 'Show Transit Lines'}
            </button>
            
            <button
              onClick={calculateTransitRoute}
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
              {calculating ? 'Calculating...' : 'Get Transit Directions'}
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
            <h4>Departure Time:</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => updateDepartureTime(0)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Now
              </button>
              <button
                onClick={() => updateDepartureTime(15)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                +15 min
              </button>
              <button
                onClick={() => updateDepartureTime(30)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                +30 min
              </button>
              <button
                onClick={() => updateDepartureTime(60)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                +1 hour
              </button>
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Selected: {transitOptions.departureTime.toLocaleTimeString()}
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
              <li>Adjust departure time if needed</li>
              <li>Click "Get Transit Directions" for public transport route</li>
            </ol>
          </div>

          {routeInfo && (
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Transit Route Information</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                <div>
                  <strong>Distance:</strong> {routeInfo.distance}
                </div>
                <div>
                  <strong>Duration:</strong> {routeInfo.duration}
                </div>
                <div>
                  <strong>Departure:</strong> {routeInfo.departureTime}
                </div>
                <div>
                  <strong>Arrival:</strong> {routeInfo.arrivalTime}
                </div>
                <div>
                  <strong>Transit Steps:</strong> {routeInfo.steps}
                </div>
              </div>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
          onClick={onMapClick}
        >
          {showTransit && <TransitLayer />}
          
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
                travelMode: window.google.maps.TravelMode.TRANSIT,
                transitOptions: {
                  departureTime: transitOptions.departureTime,
                  modes: transitOptions.modes
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

export default TransitRoutePlanning;
```

### Transit System Explorer
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, TransitLayer, Marker, InfoWindow } from '@react-google-maps/api';

interface TransitStation {
  id: string;
  name: string;
  position: google.maps.LatLngLiteral;
  type: 'bus' | 'metro' | 'train' | 'tram';
  lines: string[];
  facilities: string[];
  accessibility: boolean;
}

const TransitSystemExplorer: React.FC = () => {
  const [showTransit, setShowTransit] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [selectedStation, setSelectedStation] = useState<TransitStation | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'bus' | 'metro' | 'train' | 'tram'>('all');

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Sample transit stations (in a real app, this would come from an API)
  const transitStations: TransitStation[] = [
    {
      id: 'metro1',
      name: 'King Abdullah Financial District',
      position: { lat: 24.7580, lng: 46.6348 },
      type: 'metro',
      lines: ['Blue Line', 'Green Line'],
      facilities: ['Parking', 'WiFi', 'Shops', 'ATM'],
      accessibility: true
    },
    {
      id: 'metro2',
      name: 'Olaya Station',
      position: { lat: 24.6877, lng: 46.6857 },
      type: 'metro',
      lines: ['Blue Line'],
      facilities: ['WiFi', 'Elevator', 'Shops'],
      accessibility: true
    },
    {
      id: 'bus1',
      name: 'King Fahd Road Bus Stop',
      position: { lat: 24.7200, lng: 46.6700 },
      type: 'bus',
      lines: ['Route 101', 'Route 205', 'Route 310'],
      facilities: ['Shelter', 'Bench'],
      accessibility: false
    },
    {
      id: 'bus2',
      name: 'Downtown Bus Terminal',
      position: { lat: 24.7136, lng: 46.6753 },
      type: 'bus',
      lines: ['Route 101', 'Route 102', 'Route 103', 'Route 201'],
      facilities: ['Shelter', 'Ticket Office', 'WiFi', 'Restrooms'],
      accessibility: true
    },
    {
      id: 'train1',
      name: 'Riyadh Central Station',
      position: { lat: 24.7000, lng: 46.6800 },
      type: 'train',
      lines: ['Haramain High Speed Rail'],
      facilities: ['Parking', 'WiFi', 'Restaurants', 'Shops', 'Hotel'],
      accessibility: true
    }
  ];

  const getStationIcon = (type: string) => {
    const icons = {
      bus: '🚌',
      metro: '🚇',
      train: '🚆',
      tram: '🚊'
    };
    return icons[type as keyof typeof icons] || '🚏';
  };

  const getStationColor = (type: string) => {
    const colors = {
      bus: '#ffc107',
      metro: '#007bff',
      train: '#28a745',
      tram: '#17a2b8'
    };
    return colors[type as keyof typeof colors] || '#6c757d';
  };

  const filteredStations = filterType === 'all' 
    ? transitStations 
    : transitStations.filter(station => station.type === filterType);

  const getTypeStats = () => {
    return {
      total: transitStations.length,
      bus: transitStations.filter(s => s.type === 'bus').length,
      metro: transitStations.filter(s => s.type === 'metro').length,
      train: transitStations.filter(s => s.type === 'train').length,
      tram: transitStations.filter(s => s.type === 'tram').length,
      accessible: transitStations.filter(s => s.accessibility).length
    };
  };

  const stats = getTypeStats();

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Transit System Explorer</h3>
          <p>Explore public transportation stations and routes</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowTransit(!showTransit)}
              style={{
                padding: '8px 16px',
                backgroundColor: showTransit ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showTransit ? 'Hide Transit Lines' : 'Show Transit Lines'}
            </button>
            
            <button
              onClick={() => setShowStations(!showStations)}
              style={{
                padding: '8px 16px',
                backgroundColor: showStations ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showStations ? 'Hide Stations' : 'Show Stations'}
            </button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Filter by Transit Type:
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {(['all', 'bus', 'metro', 'train', 'tram'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: filterType === type ? '#007bff' : 'white',
                    color: filterType === type ? 'white' : '#007bff',
                    border: '2px solid #007bff',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    textTransform: 'capitalize'
                  }}
                >
                  {type === 'all' ? 'All Types' : `${getStationIcon(type)} ${type}`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4>Transit Statistics:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
                  {stats.total}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Total Stations</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: getStationColor('bus') }}>
                  {stats.bus}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>🚌 Bus Stops</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: getStationColor('metro') }}>
                  {stats.metro}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>🚇 Metro</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: getStationColor('train') }}>
                  {stats.train}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>🚆 Train</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                  {stats.accessible}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>♿ Accessible</div>
              </div>
            </div>
          </div>

          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <strong>Legend:</strong>
            <div style={{ marginTop: '5px' }}>
              🚌 Bus stops and terminals | 🚇 Metro/subway stations | 🚆 Train stations | ♿ Wheelchair accessible
            </div>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          {showTransit && <TransitLayer />}
          
          {showStations && filteredStations.map(station => (
            <Marker
              key={station.id}
              position={station.position}
              title={station.name}
              onClick={() => setSelectedStation(station)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: getStationColor(station.type),
                fillOpacity: 0.8,
                strokeColor: '#FFFFFF',
                strokeWeight: 3
              }}
            />
          ))}

          {selectedStation && (
            <InfoWindow
              position={selectedStation.position}
              onCloseClick={() => setSelectedStation(null)}
            >
              <div style={{ maxWidth: '280px', padding: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '24px', marginRight: '10px' }}>
                    {getStationIcon(selectedStation.type)}
                  </span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px' }}>
                      {selectedStation.name}
                    </h4>
                    <div style={{ 
                      fontSize: '12px', 
                      color: getStationColor(selectedStation.type),
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}>
                      {selectedStation.type} Station
                    </div>
                  </div>
                  {selectedStation.accessibility && (
                    <span style={{ fontSize: '16px', marginLeft: '10px' }}>♿</span>
                  )}
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '14px' }}>Lines/Routes:</strong>
                  <div style={{ marginTop: '5px' }}>
                    {selectedStation.lines.map((line, index) => (
                      <span
                        key={index}
                        style={{
                          display: 'inline-block',
                          padding: '2px 6px',
                          margin: '2px',
                          backgroundColor: getStationColor(selectedStation.type),
                          color: 'white',
                          borderRadius: '10px',
                          fontSize: '11px'
                        }}
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <strong style={{ fontSize: '14px' }}>Facilities:</strong>
                  <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                    {selectedStation.facilities.map((facility, index) => (
                      <li key={index} style={{ fontSize: '12px', marginBottom: '2px' }}>
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default TransitSystemExplorer;
```

## Best Practices

### 1. Layer Management
```typescript
// Use React.memo for performance
const OptimizedTransitLayer = React.memo(TransitLayer);

// Conditional rendering based on zoom level
const useTransitLayerVisibility = (map: google.maps.Map) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const listener = map.addListener('zoom_changed', () => {
      const zoom = map.getZoom();
      setVisible(zoom >= 11); // Transit is most useful at city level
    });
    
    return () => listener.remove();
  }, [map]);
  
  return visible;
};
```

### 2. Integration with Directions
```typescript
// Combine with DirectionsService for transit routing
const getTransitDirections = (
  origin: LatLng, 
  destination: LatLng, 
  departureTime: Date
) => {
  return {
    origin,
    destination,
    travelMode: google.maps.TravelMode.TRANSIT,
    transitOptions: {
      departureTime,
      modes: [
        google.maps.TransitMode.BUS,
        google.maps.TransitMode.RAIL,
        google.maps.TransitMode.SUBWAY,
        google.maps.TransitMode.TRAIN
      ]
    }
  };
};
```

### 3. User Experience Enhancement
```typescript
// Provide context about transit availability
const TransitAvailabilityInfo = ({ location }: { location: string }) => {
  const [hasTransit, setHasTransit] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check transit availability for the location
    // This would typically involve an API call
    checkTransitAvailability(location).then(setHasTransit);
  }, [location]);
  
  if (hasTransit === null) return <div>Checking transit availability...</div>;
  
  return (
    <div style={{ 
      padding: '10px', 
      backgroundColor: hasTransit ? '#d4edda' : '#f8d7da',
      borderRadius: '4px'
    }}>
      {hasTransit 
        ? '✅ Public transit available in this area'
        : '❌ Limited or no public transit data available'
      }
    </div>
  );
};
```

## Common Issues and Solutions

### 1. Limited transit data coverage
- Transit layer data varies significantly by location
- Coverage is best in major cities with established public transit
- Consider providing alternative transportation options

### 2. Layer not visible at certain zoom levels
- Transit layer is most visible at zoom levels 11-18
- Automatically show/hide based on zoom level
- Provide user feedback about optimal zoom levels

### 3. Transit directions not available
- Not all areas have transit routing support
- Provide fallback to walking or driving directions
- Check DirectionsStatus for specific error handling

### 4. Outdated transit information
- Transit schedules and routes can change frequently
- Consider supplementing with real-time transit APIs
- Provide disclaimers about data accuracy

## Important Notes

- TransitLayer must be a child of GoogleMap component
- No additional props required - it's a simple overlay
- Data coverage varies significantly by geographic location
- Best visibility at zoom levels 11-18
- Combines well with DirectionsService for transit routing
- Layer data is maintained by Google and transit agencies
- Real-time information may not be available in all areas
- Consider accessibility features when displaying transit information
- Transit options in DirectionsService provide more detailed routing