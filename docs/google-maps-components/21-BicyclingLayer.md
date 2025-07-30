# BicyclingLayer Component

## Overview
`BicyclingLayer` is a component that displays bicycle-friendly roads and paths on the map. It shows bike lanes, bike paths, and bike-friendly roads to help cyclists plan their routes and navigate safely.

## Import
```typescript
import { BicyclingLayer } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `BicyclingLayerOptions` | ❌ | - | Layer configuration options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(bicyclingLayer: google.maps.BicyclingLayer) => void` | Called when layer loads |
| `onUnmount` | `(bicyclingLayer: google.maps.BicyclingLayer) => void` | Called when layer unmounts |

## BicyclingLayerOptions

The BicyclingLayer has minimal options as it's primarily a data overlay:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `map` | `google.maps.Map` | - | Map instance (automatically set) |

## Usage Examples

### Basic Bicycling Layer
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, BicyclingLayer } from '@react-google-maps/api';

const BasicBicyclingLayer: React.FC = () => {
  const [showBicycling, setShowBicycling] = useState(true);

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
          <h3>Basic Bicycling Layer</h3>
          <p>Display bicycle-friendly roads and bike paths on the map</p>
          
          <button
            onClick={() => setShowBicycling(!showBicycling)}
            style={{
              padding: '8px 16px',
              backgroundColor: showBicycling ? '#dc3545' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showBicycling ? 'Hide Bicycling Layer' : 'Show Bicycling Layer'}
          </button>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          {showBicycling && <BicyclingLayer />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicBicyclingLayer;
```

### Bicycling Layer with Route Planning
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, BicyclingLayer, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const BicyclingRouteMap: React.FC = () => {
  const [showBicycling, setShowBicycling] = useState(true);
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [calculating, setCalculating] = useState(false);

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
      alert('Could not calculate bicycle route. Try different locations.');
    }
  };

  const calculateBicycleRoute = () => {
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
      summary: route.summary || 'Bicycle Route'
    };
  };

  const routeInfo = getRouteInfo();

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Bicycle Route Planning</h3>
          <p>Plan bicycle routes using bike-friendly roads and paths</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowBicycling(!showBicycling)}
              style={{
                padding: '8px 16px',
                backgroundColor: showBicycling ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showBicycling ? 'Hide Bike Paths' : 'Show Bike Paths'}
            </button>
            
            <button
              onClick={calculateBicycleRoute}
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
              {calculating ? 'Calculating...' : 'Calculate Bike Route'}
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
              <li>Click "Calculate Bike Route" to get bicycle-friendly directions</li>
              <li>The blue lines show bike lanes and bike-friendly roads</li>
            </ol>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: origin ? '#28a745' : '#6c757d' }}>
                {origin ? '✅' : '❌'}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Start Point</div>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: destination ? '#dc3545' : '#6c757d' }}>
                {destination ? '✅' : '❌'}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Destination</div>
            </div>
            
            {routeInfo && (
              <>
                <div style={{ 
                  padding: '10px', 
                  backgroundColor: 'white', 
                  borderRadius: '4px',
                  border: '1px solid #dee2e6',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#007bff' }}>
                    {routeInfo.distance}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Distance</div>
                </div>
                
                <div style={{ 
                  padding: '10px', 
                  backgroundColor: 'white', 
                  borderRadius: '4px',
                  border: '1px solid #dee2e6',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#007bff' }}>
                    {routeInfo.duration}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Duration</div>
                </div>
              </>
            )}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
          onClick={onMapClick}
        >
          {showBicycling && <BicyclingLayer />}
          
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
                travelMode: window.google.maps.TravelMode.BICYCLING
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

export default BicyclingRouteMap;
```

### Bicycling Layer with City Comparison
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, BicyclingLayer } from '@react-google-maps/api';

interface CityData {
  id: string;
  name: string;
  center: google.maps.LatLngLiteral;
  zoom: number;
  description: string;
  bikeScore: number;
  features: string[];
}

const BicyclingCityComparison: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('riyadh');
  const [showBicycling, setShowBicycling] = useState(true);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const cities: Record<string, CityData> = {
    riyadh: {
      id: 'riyadh',
      name: 'Riyadh, Saudi Arabia',
      center: { lat: 24.7136, lng: 46.6753 },
      zoom: 12,
      description: 'Capital city with developing cycling infrastructure',
      bikeScore: 25,
      features: ['Some bike lanes', 'Parks with cycling paths', 'Growing bike culture']
    },
    amsterdam: {
      id: 'amsterdam',
      name: 'Amsterdam, Netherlands',
      center: { lat: 52.3676, lng: 4.9041 },
      zoom: 12,
      description: 'World-renowned cycling city with extensive bike infrastructure',
      bikeScore: 95,
      features: ['Extensive bike lane network', 'Bike parking facilities', 'Bike-first traffic design']
    },
    copenhagen: {
      id: 'copenhagen',
      name: 'Copenhagen, Denmark',
      center: { lat: 55.6761, lng: 12.5683 },
      zoom: 12,
      description: 'Leading cycling city with innovative bike infrastructure',
      bikeScore: 90,
      features: ['Cycle superhighways', 'Bike bridges', 'Integrated public transport']
    },
    portland: {
      id: 'portland',
      name: 'Portland, Oregon, USA',
      center: { lat: 45.5152, lng: -122.6784 },
      zoom: 12,
      description: 'Bike-friendly US city with strong cycling community',
      bikeScore: 75,
      features: ['Protected bike lanes', 'Bike share programs', 'Cycling events']
    }
  };

  const currentCity = cities[selectedCity];

  const getBikeScoreColor = (score: number) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    if (score >= 40) return '#fd7e14';
    return '#dc3545';
  };

  const getBikeScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Cycling Infrastructure Comparison</h3>
          <p>Compare bicycle infrastructure across different cities worldwide</p>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Select City:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {Object.values(cities).map(city => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.id)}
                  style={{
                    padding: '10px',
                    backgroundColor: selectedCity === city.id ? '#007bff' : 'white',
                    color: selectedCity === city.id ? 'white' : '#007bff',
                    border: '2px solid #007bff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {city.name}
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    Bike Score: {city.bikeScore}/100
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <button
              onClick={() => setShowBicycling(!showBicycling)}
              style={{
                padding: '8px 16px',
                backgroundColor: showBicycling ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showBicycling ? 'Hide Bike Infrastructure' : 'Show Bike Infrastructure'}
            </button>
          </div>

          <div style={{ 
            padding: '15px', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>
              {currentCity.name}
            </h4>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <span style={{ marginRight: '10px' }}>Bike Score:</span>
                <div style={{
                  padding: '5px 10px',
                  backgroundColor: getBikeScoreColor(currentCity.bikeScore),
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {currentCity.bikeScore}/100 - {getBikeScoreLabel(currentCity.bikeScore)}
                </div>
              </div>
              
              <div style={{ 
                width: '100%', 
                height: '8px', 
                backgroundColor: '#e9ecef', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${currentCity.bikeScore}%`,
                  height: '100%',
                  backgroundColor: getBikeScoreColor(currentCity.bikeScore),
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>
              {currentCity.description}
            </p>

            <div>
              <strong>Key Features:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                {currentCity.features.map((feature, index) => (
                  <li key={index} style={{ fontSize: '14px', marginBottom: '3px' }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={currentCity.zoom}
          center={currentCity.center}
        >
          {showBicycling && <BicyclingLayer />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BicyclingCityComparison;
```

### Bicycling Layer with Safety Information
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, BicyclingLayer, Marker, InfoWindow } from '@react-google-maps/api';

interface SafetyPoint {
  id: string;
  position: google.maps.LatLngLiteral;
  type: 'safe' | 'caution' | 'danger';
  title: string;
  description: string;
  tips: string[];
}

const BicyclingSafetyMap: React.FC = () => {
  const [showBicycling, setShowBicycling] = useState(true);
  const [showSafetyPoints, setShowSafetyPoints] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<SafetyPoint | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const safetyPoints: SafetyPoint[] = [
    {
      id: 'safe1',
      position: { lat: 24.7200, lng: 46.6700 },
      type: 'safe',
      title: 'King Fahd Road Bike Lane',
      description: 'Protected bike lane with good visibility',
      tips: ['Well-maintained surface', 'Good lighting', 'Regular police patrol']
    },
    {
      id: 'caution1',
      position: { lat: 24.7100, lng: 46.6800 },
      type: 'caution',
      title: 'Busy Intersection',
      description: 'High traffic intersection - exercise caution',
      tips: ['Use pedestrian crossing', 'Wait for green light', 'Make eye contact with drivers']
    },
    {
      id: 'danger1',
      position: { lat: 24.7000, lng: 46.6900 },
      type: 'danger',
      title: 'Construction Zone',
      description: 'Active construction - find alternative route',
      tips: ['Avoid during peak hours', 'Use alternative route', 'Walk bike if necessary']
    },
    {
      id: 'safe2',
      position: { lat: 24.7300, lng: 46.6600 },
      type: 'safe',
      title: 'Park Cycling Path',
      description: 'Dedicated cycling path through green space',
      tips: ['Family-friendly', 'Separated from traffic', 'Rest areas available']
    }
  ];

  const getSafetyIcon = (type: string) => {
    const icons = {
      safe: '🟢',
      caution: '🟡',
      danger: '🔴'
    };
    return icons[type as keyof typeof icons] || '⚪';
  };

  const getSafetyColor = (type: string) => {
    const colors = {
      safe: '#28a745',
      caution: '#ffc107',
      danger: '#dc3545'
    };
    return colors[type as keyof typeof colors] || '#6c757d';
  };

  const getSafetyLabel = (type: string) => {
    const labels = {
      safe: 'Safe Zone',
      caution: 'Caution Area',
      danger: 'Danger Zone'
    };
    return labels[type as keyof typeof labels] || 'Unknown';
  };

  const getTypeStats = () => {
    return {
      safe: safetyPoints.filter(p => p.type === 'safe').length,
      caution: safetyPoints.filter(p => p.type === 'caution').length,
      danger: safetyPoints.filter(p => p.type === 'danger').length
    };
  };

  const stats = getTypeStats();

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Cycling Safety Information</h3>
          <p>View bike infrastructure along with safety information and tips</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowBicycling(!showBicycling)}
              style={{
                padding: '8px 16px',
                backgroundColor: showBicycling ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showBicycling ? 'Hide Bike Paths' : 'Show Bike Paths'}
            </button>
            
            <button
              onClick={() => setShowSafetyPoints(!showSafetyPoints)}
              style={{
                padding: '8px 16px',
                backgroundColor: showSafetyPoints ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showSafetyPoints ? 'Hide Safety Points' : 'Show Safety Points'}
            </button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4>Safety Statistics:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: `2px solid ${getSafetyColor('safe')}`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>
                  {getSafetyIcon('safe')}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: getSafetyColor('safe') }}>
                  {stats.safe}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Safe Zones</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: `2px solid ${getSafetyColor('caution')}`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>
                  {getSafetyIcon('caution')}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: getSafetyColor('caution') }}>
                  {stats.caution}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Caution Areas</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: `2px solid ${getSafetyColor('danger')}`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>
                  {getSafetyIcon('danger')}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: getSafetyColor('danger') }}>
                  {stats.danger}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Danger Zones</div>
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
              🟢 Safe zones with good infrastructure | 
              🟡 Areas requiring caution | 
              🔴 Dangerous areas to avoid
            </div>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          {showBicycling && <BicyclingLayer />}
          
          {showSafetyPoints && safetyPoints.map(point => (
            <Marker
              key={point.id}
              position={point.position}
              title={point.title}
              onClick={() => setSelectedPoint(point)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: getSafetyColor(point.type),
                fillOpacity: 0.8,
                strokeColor: '#FFFFFF',
                strokeWeight: 3
              }}
            />
          ))}

          {selectedPoint && (
            <InfoWindow
              position={selectedPoint.position}
              onCloseClick={() => setSelectedPoint(null)}
            >
              <div style={{ maxWidth: '250px', padding: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px', marginRight: '8px' }}>
                    {getSafetyIcon(selectedPoint.type)}
                  </span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px' }}>
                      {selectedPoint.title}
                    </h4>
                    <div style={{ 
                      fontSize: '12px', 
                      color: getSafetyColor(selectedPoint.type),
                      fontWeight: 'bold'
                    }}>
                      {getSafetyLabel(selectedPoint.type)}
                    </div>
                  </div>
                </div>
                
                <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
                  {selectedPoint.description}
                </p>
                
                <div>
                  <strong style={{ fontSize: '14px' }}>Safety Tips:</strong>
                  <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                    {selectedPoint.tips.map((tip, index) => (
                      <li key={index} style={{ fontSize: '12px', marginBottom: '2px' }}>
                        {tip}
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

export default BicyclingSafetyMap;
```

## Best Practices

### 1. Layer Management
```typescript
// Use React.memo for performance
const OptimizedBicyclingLayer = React.memo(BicyclingLayer);

// Conditional rendering based on zoom level
const useBicyclingLayerVisibility = (map: google.maps.Map) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const listener = map.addListener('zoom_changed', () => {
      const zoom = map.getZoom();
      setVisible(zoom >= 10); // Show only at appropriate zoom levels
    });
    
    return () => listener.remove();
  }, [map]);
  
  return visible;
};
```

### 2. Integration with Routing
```typescript
// Combine with DirectionsService for bicycle routing
const getBicycleDirections = (origin: LatLng, destination: LatLng) => {
  return {
    origin,
    destination,
    travelMode: google.maps.TravelMode.BICYCLING,
    avoidHighways: true, // Prefer bike-friendly routes
    avoidTolls: true
  };
};
```

### 3. User Experience
```typescript
// Provide context about bicycling infrastructure
const BicyclingLayerInfo = () => (
  <div style={{ padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
    <strong>Bicycling Layer Information:</strong>
    <ul>
      <li>Blue lines indicate bike lanes and bike-friendly roads</li>
      <li>Darker blue shows dedicated bike paths</li>
      <li>Lighter blue shows bike-friendly roads</li>
      <li>Coverage varies by location and data availability</li>
    </ul>
  </div>
);
```

## Common Issues and Solutions

### 1. Limited coverage in some areas
- Bicycling layer data may not be available in all regions
- Coverage is best in major cities with established bike infrastructure
- Consider supplementing with local cycling route data

### 2. Layer not visible at certain zoom levels
- Bicycling layer is most visible at zoom levels 10-18
- Automatically show/hide based on zoom level
- Provide user feedback about optimal zoom levels

### 3. Performance with other layers
- Limit the number of simultaneous layers
- Use conditional rendering based on user needs
- Consider layer priority and visibility

## Important Notes

- BicyclingLayer must be a child of GoogleMap component
- No additional props required - it's a simple overlay
- Data coverage varies by geographic location
- Best visibility at zoom levels 10-18
- Combines well with DirectionsService for bicycle routing
- Layer data is maintained by Google and updated periodically
- Consider local cycling infrastructure when planning routes
- Always prioritize safety when using cycling directions