# StreetViewPanorama Component

## Overview
`StreetViewPanorama` is a component that displays Google Street View imagery, allowing users to explore locations through 360-degree panoramic views. It can be used standalone or integrated with a map to provide immersive location experiences.

## Import
```typescript
import { StreetViewPanorama } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `StreetViewPanoramaOptions` | ❌ | - | Panorama configuration options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(streetView: google.maps.StreetViewPanorama) => void` | Called when panorama loads |
| `onUnmount` | `(streetView: google.maps.StreetViewPanorama) => void` | Called when panorama unmounts |
| `onCloseClick` | `() => void` | Called when close button is clicked |
| `onPanoChanged` | `() => void` | Called when panorama changes |
| `onPositionChanged` | `() => void` | Called when position changes |
| `onPovChanged` | `() => void` | Called when point of view changes |
| `onResize` | `() => void` | Called when panorama is resized |
| `onStatusChanged` | `() => void` | Called when status changes |
| `onVisibleChanged` | `() => void` | Called when visibility changes |
| `onZoomChanged` | `() => void` | Called when zoom level changes |

## StreetViewPanoramaOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | `LatLng \| LatLngLiteral` | - | Initial position |
| `pov` | `StreetViewPov` | - | Point of view (heading, pitch) |
| `zoom` | `number` | `1` | Zoom level (0-5) |
| `visible` | `boolean` | `true` | Panorama visibility |
| `pano` | `string` | - | Specific panorama ID |
| `addressControl` | `boolean` | `true` | Show address control |
| `clickToGo` | `boolean` | `true` | Enable click to navigate |
| `disableDefaultUI` | `boolean` | `false` | Disable default UI |
| `disableDoubleClickZoom` | `boolean` | `false` | Disable double-click zoom |
| `enableCloseButton` | `boolean` | `false` | Show close button |
| `fullscreenControl` | `boolean` | `true` | Show fullscreen control |
| `imageDateControl` | `boolean` | `false` | Show image date control |
| `linksControl` | `boolean` | `true` | Show navigation links |
| `motionTracking` | `boolean` | `true` | Enable motion tracking |
| `motionTrackingControl` | `boolean` | `true` | Show motion tracking control |
| `panControl` | `boolean` | `true` | Show pan control |
| `scrollwheel` | `boolean` | `true` | Enable scroll wheel zoom |
| `showRoadLabels` | `boolean` | `true` | Show road labels |
| `zoomControl` | `boolean` | `true` | Show zoom control |

## Usage Examples

### Basic Street View
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, StreetViewPanorama, Marker } from '@react-google-maps/api';

const BasicStreetView: React.FC = () => {
  const [showStreetView, setShowStreetView] = useState(false);
  const [streetViewPosition, setStreetViewPosition] = useState({
    lat: 24.7136,
    lng: 46.6753
  });

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const streetViewStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setStreetViewPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic Street View</h3>
          <p>Toggle between map and street view, or click on the map to change street view location</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button
              onClick={() => setShowStreetView(!showStreetView)}
              style={{
                padding: '10px 20px',
                backgroundColor: showStreetView ? '#dc3545' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showStreetView ? 'Show Map' : 'Show Street View'}
            </button>
          </div>

          <div style={{ fontSize: '14px', color: '#666' }}>
            <strong>Current Position:</strong> {streetViewPosition.lat.toFixed(6)}, {streetViewPosition.lng.toFixed(6)}
          </div>
        </div>

        {showStreetView ? (
          <div style={streetViewStyles}>
            <StreetViewPanorama
              options={{
                position: streetViewPosition,
                pov: { heading: 0, pitch: 0 },
                zoom: 1,
                visible: true,
                enableCloseButton: true
              }}
              onCloseClick={() => setShowStreetView(false)}
            />
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={center}
            onClick={onMapClick}
          >
            <Marker
              position={streetViewPosition}
              title="Street View Location"
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#007bff',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
            />
          </GoogleMap>
        )}
      </div>
    </LoadScript>
  );
};

export default BasicStreetView;
```

### Integrated Map and Street View
```typescript
import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, StreetViewPanorama, Marker } from '@react-google-maps/api';

const IntegratedMapStreetView: React.FC = () => {
  const [streetViewPosition, setStreetViewPosition] = useState({
    lat: 24.7136,
    lng: 46.6753
  });
  const [streetViewPov, setStreetViewPov] = useState({
    heading: 0,
    pitch: 0
  });
  const [streetViewZoom, setStreetViewZoom] = useState(1);
  const [streetViewVisible, setStreetViewVisible] = useState(true);

  const mapRef = useRef<google.maps.Map | null>(null);
  const streetViewRef = useRef<google.maps.StreetViewPanorama | null>(null);

  const mapStyles = {
    height: "300px",
    width: "100%"
  };

  const streetViewStyles = {
    height: "300px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const onStreetViewLoad = (streetView: google.maps.StreetViewPanorama) => {
    streetViewRef.current = streetView;
    
    // Connect map and street view
    if (mapRef.current) {
      mapRef.current.setStreetView(streetView);
    }
  };

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setStreetViewPosition(newPosition);
      
      if (streetViewRef.current) {
        streetViewRef.current.setPosition(newPosition);
      }
    }
  };

  const onPositionChanged = () => {
    if (streetViewRef.current) {
      const position = streetViewRef.current.getPosition();
      if (position) {
        setStreetViewPosition({
          lat: position.lat(),
          lng: position.lng()
        });
      }
    }
  };

  const onPovChanged = () => {
    if (streetViewRef.current) {
      const pov = streetViewRef.current.getPov();
      setStreetViewPov({
        heading: pov.heading || 0,
        pitch: pov.pitch || 0
      });
    }
  };

  const onZoomChanged = () => {
    if (streetViewRef.current) {
      setStreetViewZoom(streetViewRef.current.getZoom());
    }
  };

  const resetView = () => {
    const defaultPosition = { lat: 24.7136, lng: 46.6753 };
    const defaultPov = { heading: 0, pitch: 0 };
    
    setStreetViewPosition(defaultPosition);
    setStreetViewPov(defaultPov);
    setStreetViewZoom(1);
    
    if (streetViewRef.current) {
      streetViewRef.current.setPosition(defaultPosition);
      streetViewRef.current.setPov(defaultPov);
      streetViewRef.current.setZoom(1);
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Integrated Map and Street View</h3>
          <p>Map and Street View are synchronized - click on the map to change street view location</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setStreetViewVisible(!streetViewVisible)}
              style={{
                padding: '8px 16px',
                backgroundColor: streetViewVisible ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {streetViewVisible ? 'Hide Street View' : 'Show Street View'}
            </button>
            
            <button
              onClick={resetView}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset View
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Position:</strong>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {streetViewPosition.lat.toFixed(4)}, {streetViewPosition.lng.toFixed(4)}
              </div>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Heading:</strong>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {streetViewPov.heading.toFixed(1)}°
              </div>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Pitch:</strong>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {streetViewPov.pitch.toFixed(1)}°
              </div>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Zoom:</strong>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {streetViewZoom}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <h4 style={{ margin: '0 0 10px 0' }}>Map View</h4>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={center}
              onLoad={onMapLoad}
              onClick={onMapClick}
            >
              <Marker
                position={streetViewPosition}
                title="Street View Location"
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: '#007bff',
                  fillOpacity: 1,
                  strokeColor: '#FFFFFF',
                  strokeWeight: 2
                }}
              />
            </GoogleMap>
          </div>

          <div>
            <h4 style={{ margin: '0 0 10px 0' }}>Street View</h4>
            {streetViewVisible ? (
              <div style={streetViewStyles}>
                <StreetViewPanorama
                  options={{
                    position: streetViewPosition,
                    pov: streetViewPov,
                    zoom: streetViewZoom,
                    visible: true,
                    addressControl: true,
                    clickToGo: true,
                    disableDefaultUI: false,
                    fullscreenControl: true,
                    linksControl: true,
                    panControl: true,
                    zoomControl: true
                  }}
                  onLoad={onStreetViewLoad}
                  onPositionChanged={onPositionChanged}
                  onPovChanged={onPovChanged}
                  onZoomChanged={onZoomChanged}
                />
              </div>
            ) : (
              <div style={{
                ...streetViewStyles,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '4px'
              }}>
                <div style={{ textAlign: 'center', color: '#666' }}>
                  <div style={{ fontSize: '48px', marginBottom: '10px' }}>👁️</div>
                  <div>Street View Hidden</div>
                  <div style={{ fontSize: '12px' }}>Click "Show Street View" to enable</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default IntegratedMapStreetView;
```

### Street View Tour
```typescript
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, StreetViewPanorama, Marker, Polyline } from '@react-google-maps/api';

interface TourStop {
  id: string;
  name: string;
  description: string;
  position: google.maps.LatLngLiteral;
  pov: {
    heading: number;
    pitch: number;
  };
  duration: number; // seconds
}

const StreetViewTour: React.FC = () => {
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showMap, setShowMap] = useState(true);

  const mapStyles = {
    height: "300px",
    width: "100%"
  };

  const streetViewStyles = {
    height: "400px",
    width: "100%"
  };

  // Define tour stops around Riyadh landmarks
  const tourStops: TourStop[] = [
    {
      id: 'kingdom-centre',
      name: 'Kingdom Centre',
      description: 'Iconic 99-story skyscraper and shopping center in the heart of Riyadh',
      position: { lat: 24.7136, lng: 46.6753 },
      pov: { heading: 0, pitch: 10 },
      duration: 10
    },
    {
      id: 'al-faisaliah',
      name: 'Al Faisaliah Tower',
      description: 'First skyscraper built in Saudi Arabia, featuring a distinctive ball-shaped top',
      position: { lat: 24.6877, lng: 46.6857 },
      pov: { heading: 45, pitch: 15 },
      duration: 8
    },
    {
      id: 'masmak-fortress',
      name: 'Masmak Fortress',
      description: 'Historic clay and mud-brick fort, symbol of Saudi heritage',
      position: { lat: 24.6308, lng: 46.7073 },
      pov: { heading: 90, pitch: 0 },
      duration: 12
    },
    {
      id: 'national-museum',
      name: 'National Museum',
      description: 'Premier cultural institution showcasing Saudi Arabian history and heritage',
      position: { lat: 24.6465, lng: 46.7169 },
      pov: { heading: 180, pitch: 5 },
      duration: 10
    }
  ];

  const currentStop = tourStops[currentStopIndex];

  // Auto-advance tour when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && timeRemaining === 0) {
      // Move to next stop
      if (currentStopIndex < tourStops.length - 1) {
        setCurrentStopIndex(prev => prev + 1);
        setTimeRemaining(tourStops[currentStopIndex + 1].duration);
      } else {
        // Tour completed
        setIsPlaying(false);
        setCurrentStopIndex(0);
        setTimeRemaining(tourStops[0].duration);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timeRemaining, currentStopIndex, tourStops]);

  const startTour = () => {
    setIsPlaying(true);
    setTimeRemaining(currentStop.duration);
  };

  const pauseTour = () => {
    setIsPlaying(false);
  };

  const stopTour = () => {
    setIsPlaying(false);
    setCurrentStopIndex(0);
    setTimeRemaining(tourStops[0].duration);
  };

  const goToStop = (index: number) => {
    setCurrentStopIndex(index);
    setTimeRemaining(tourStops[index].duration);
    setIsPlaying(false);
  };

  const nextStop = () => {
    if (currentStopIndex < tourStops.length - 1) {
      goToStop(currentStopIndex + 1);
    }
  };

  const previousStop = () => {
    if (currentStopIndex > 0) {
      goToStop(currentStopIndex - 1);
    }
  };

  const tourPath = tourStops.map(stop => stop.position);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Riyadh Landmarks Street View Tour</h3>
          <p>Take a virtual tour of Riyadh's most famous landmarks</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={isPlaying ? pauseTour : startTour}
              style={{
                padding: '10px 20px',
                backgroundColor: isPlaying ? '#ffc107' : '#28a745',
                color: isPlaying ? 'black' : 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {isPlaying ? '⏸️ Pause Tour' : '▶️ Start Tour'}
            </button>
            
            <button
              onClick={stopTour}
              disabled={!isPlaying && currentStopIndex === 0}
              style={{
                padding: '10px 20px',
                backgroundColor: !isPlaying && currentStopIndex === 0 ? '#6c757d' : '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: !isPlaying && currentStopIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ⏹️ Stop Tour
            </button>
            
            <button
              onClick={previousStop}
              disabled={currentStopIndex === 0}
              style={{
                padding: '10px 20px',
                backgroundColor: currentStopIndex === 0 ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentStopIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ⏮️ Previous
            </button>
            
            <button
              onClick={nextStop}
              disabled={currentStopIndex === tourStops.length - 1}
              style={{
                padding: '10px 20px',
                backgroundColor: currentStopIndex === tourStops.length - 1 ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentStopIndex === tourStops.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              ⏭️ Next
            </button>
            
            <button
              onClick={() => setShowMap(!showMap)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ margin: 0 }}>
                Stop {currentStopIndex + 1} of {tourStops.length}: {currentStop.name}
              </h4>
              {isPlaying && (
                <div style={{ 
                  padding: '5px 10px', 
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '15px',
                  fontSize: '14px'
                }}>
                  {timeRemaining}s remaining
                </div>
              )}
            </div>
            
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
              {currentStop.description}
            </p>

            {/* Progress bar */}
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#e9ecef', 
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '10px'
            }}>
              <div style={{
                width: `${((currentStopIndex + 1) / tourStops.length) * 100}%`,
                height: '100%',
                backgroundColor: '#007bff',
                transition: 'width 0.3s ease'
              }} />
            </div>

            {/* Tour stops navigation */}
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {tourStops.map((stop, index) => (
                <button
                  key={stop.id}
                  onClick={() => goToStop(index)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: index === currentStopIndex ? '#007bff' : 'white',
                    color: index === currentStopIndex ? 'white' : '#007bff',
                    border: '1px solid #007bff',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  {index + 1}. {stop.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: showMap ? '1fr 1fr' : '1fr', gap: '15px' }}>
          {showMap && (
            <div>
              <h4 style={{ margin: '0 0 10px 0' }}>Tour Route</h4>
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={11}
                center={{ lat: 24.6800, lng: 46.6900 }}
              >
                {/* Tour route */}
                <Polyline
                  path={tourPath}
                  options={{
                    strokeColor: '#007bff',
                    strokeWeight: 3,
                    strokeOpacity: 0.8
                  }}
                />
                
                {/* Tour stops */}
                {tourStops.map((stop, index) => (
                  <Marker
                    key={stop.id}
                    position={stop.position}
                    title={stop.name}
                    onClick={() => goToStop(index)}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: index === currentStopIndex ? 12 : 8,
                      fillColor: index === currentStopIndex ? '#dc3545' : '#007bff',
                      fillOpacity: 1,
                      strokeColor: '#FFFFFF',
                      strokeWeight: 2
                    }}
                    label={{
                      text: (index + 1).toString(),
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }}
                  />
                ))}
              </GoogleMap>
            </div>
          )}

          <div>
            <h4 style={{ margin: '0 0 10px 0' }}>Street View</h4>
            <div style={streetViewStyles}>
              <StreetViewPanorama
                options={{
                  position: currentStop.position,
                  pov: currentStop.pov,
                  zoom: 1,
                  visible: true,
                  addressControl: true,
                  clickToGo: false, // Disable navigation during tour
                  disableDefaultUI: false,
                  fullscreenControl: true,
                  linksControl: false, // Disable links during tour
                  panControl: true,
                  zoomControl: true
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default StreetViewTour;
```

## Best Practices

### 1. Performance Optimization
```typescript
// Use React.memo for street view components
const OptimizedStreetViewPanorama = React.memo(StreetViewPanorama);

// Lazy load street view when needed
const useLazyStreetView = (shouldLoad: boolean) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (shouldLoad && !loaded) {
      setLoaded(true);
    }
  }, [shouldLoad, loaded]);
  
  return loaded;
};
```

### 2. Error Handling
```typescript
// Handle street view availability
const useStreetViewStatus = (position: LatLng) => {
  const [status, setStatus] = useState<'loading' | 'available' | 'unavailable'>('loading');
  
  useEffect(() => {
    const streetViewService = new google.maps.StreetViewService();
    
    streetViewService.getPanorama({
      location: position,
      radius: 50
    }, (data, status) => {
      if (status === 'OK') {
        setStatus('available');
      } else {
        setStatus('unavailable');
      }
    });
  }, [position]);
  
  return status;
};
```

### 3. User Experience
```typescript
// Smooth transitions between panoramas
const useSmoothTransition = (streetViewRef: RefObject<StreetViewPanorama>) => {
  const transitionTo = useCallback((position: LatLng, pov?: StreetViewPov) => {
    if (streetViewRef.current) {
      // Animate to new position
      streetViewRef.current.setPosition(position);
      
      if (pov) {
        streetViewRef.current.setPov(pov);
      }
    }
  }, [streetViewRef]);
  
  return { transitionTo };
};
```

## Common Issues and Solutions

### 1. Street View not available
- Check if Street View imagery exists for the location
- Use StreetViewService to verify availability before displaying
- Provide fallback content when Street View is unavailable

### 2. Performance issues
- Lazy load Street View components
- Use appropriate zoom levels
- Limit the number of simultaneous Street View instances

### 3. Mobile responsiveness
- Adjust controls for touch devices
- Consider different aspect ratios
- Test gesture interactions on mobile

### 4. Integration with maps
- Properly synchronize map and Street View
- Handle position changes in both components
- Manage shared state effectively

## Important Notes

- StreetViewPanorama can be used standalone or integrated with GoogleMap
- Street View availability varies by location and date
- Some locations may have limited or no Street View coverage
- Consider user privacy and data usage when implementing Street View
- Mobile devices may have different interaction patterns
- Use StreetViewService to check availability before displaying
- Respect Google's usage policies and attribution requirements
- Consider implementing fallback content for unavailable locations