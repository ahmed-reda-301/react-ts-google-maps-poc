# Marker Component

## Overview
`Marker` is a component that displays a marker (pin) on the Google Map at a specified location. It's one of the most commonly used components for marking points of interest.

## Import
```typescript
import { Marker } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `position` | `LatLngLiteral \| LatLng` | ✅ | - | Marker position coordinates |
| `title` | `string` | ❌ | - | Tooltip text on hover |
| `label` | `string \| MarkerLabel` | ❌ | - | Label displayed on marker |
| `icon` | `string \| Icon \| Symbol` | ❌ | - | Custom marker icon |
| `zIndex` | `number` | ❌ | - | Marker z-index (stacking order) |

### Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `draggable` | `boolean` | `false` | Allow marker dragging |
| `clickable` | `boolean` | `true` | Allow marker clicking |
| `visible` | `boolean` | `true` | Marker visibility |
| `opacity` | `number` | `1.0` | Marker opacity (0.0 to 1.0) |
| `cursor` | `string` | - | Mouse cursor on hover |

### Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `google.maps.Animation` | - | Marker animation |

### Advanced Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `MarkerShape` | - | Clickable area shape |
| `optimized` | `boolean` | `true` | Optimize marker rendering |
| `crossOnDrag` | `boolean` | `true` | Show crosshair when dragging |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(marker: google.maps.Marker) => void` | Called when marker loads |
| `onUnmount` | `(marker: google.maps.Marker) => void` | Called when marker unmounts |
| `onClick` | `(e: google.maps.MapMouseEvent) => void` | Marker click event |
| `onDblClick` | `(e: google.maps.MapMouseEvent) => void` | Marker double-click event |
| `onRightClick` | `(e: google.maps.MapMouseEvent) => void` | Marker right-click event |
| `onMouseDown` | `(e: google.maps.MapMouseEvent) => void` | Mouse down on marker |
| `onMouseUp` | `(e: google.maps.MapMouseEvent) => void` | Mouse up on marker |
| `onMouseOver` | `(e: google.maps.MapMouseEvent) => void` | Mouse enters marker |
| `onMouseOut` | `(e: google.maps.MapMouseEvent) => void` | Mouse leaves marker |
| `onDrag` | `(e: google.maps.MapMouseEvent) => void` | Marker drag event |
| `onDragStart` | `(e: google.maps.MapMouseEvent) => void` | Marker drag start |
| `onDragEnd` | `(e: google.maps.MapMouseEvent) => void` | Marker drag end |
| `onPositionChanged` | `() => void` | Position changed |
| `onAnimationChanged` | `() => void` | Animation changed |

## Usage Examples

### Basic Marker
```typescript
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const BasicMarker: React.FC = () => {
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
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
      >
        <Marker
          position={center}
          title="Riyadh, Saudi Arabia"
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default BasicMarker;
```

### Multiple Markers
```typescript
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Location {
  id: number;
  name: string;
  position: google.maps.LatLngLiteral;
}

const MultipleMarkers: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const locations: Location[] = [
    {
      id: 1,
      name: "Kingdom Centre",
      position: { lat: 24.7116, lng: 46.6753 }
    },
    {
      id: 2,
      name: "Al Faisaliah Tower",
      position: { lat: 24.6877, lng: 46.6857 }
    },
    {
      id: 3,
      name: "Masmak Fortress",
      position: { lat: 24.6308, lng: 46.7073 }
    },
    {
      id: 4,
      name: "King Abdulaziz Historical Center",
      position: { lat: 24.6465, lng: 46.7169 }
    }
  ];

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={center}
      >
        {locations.map(location => (
          <Marker
            key={location.id}
            position={location.position}
            title={location.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MultipleMarkers;
```

### Custom Icon Markers
```typescript
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const CustomIconMarkers: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Custom icon configurations
  const customIcons = {
    restaurant: {
      url: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
      scaledSize: new window.google.maps.Size(32, 32),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(16, 32)
    },
    hotel: {
      url: 'https://maps.google.com/mapfiles/ms/icons/lodging.png',
      scaledSize: new window.google.maps.Size(32, 32),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(16, 32)
    },
    shopping: {
      url: 'https://maps.google.com/mapfiles/ms/icons/shopping.png',
      scaledSize: new window.google.maps.Size(32, 32),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(16, 32)
    }
  };

  const places = [
    {
      id: 1,
      name: "Al Najdiyah Restaurant",
      position: { lat: 24.7116, lng: 46.6753 },
      type: 'restaurant'
    },
    {
      id: 2,
      name: "Ritz Carlton Hotel",
      position: { lat: 24.6877, lng: 46.6857 },
      type: 'hotel'
    },
    {
      id: 3,
      name: "Al Nakheel Mall",
      position: { lat: 24.6308, lng: 46.7073 },
      type: 'shopping'
    }
  ];

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={center}
      >
        {places.map(place => (
          <Marker
            key={place.id}
            position={place.position}
            title={place.name}
            icon={customIcons[place.type as keyof typeof customIcons]}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default CustomIconMarkers;
```

### Draggable Markers
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const DraggableMarkers: React.FC = () => {
  const [markers, setMarkers] = useState([
    {
      id: 1,
      position: { lat: 24.7136, lng: 46.6753 },
      title: "Draggable Marker 1"
    },
    {
      id: 2,
      position: { lat: 24.7200, lng: 46.6800 },
      title: "Draggable Marker 2"
    }
  ]);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onMarkerDragEnd = useCallback((markerId: number) => (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      setMarkers(prevMarkers =>
        prevMarkers.map(marker =>
          marker.id === markerId
            ? { ...marker, position: newPosition }
            : marker
        )
      );

      console.log(`Marker ${markerId} moved to:`, newPosition);
    }
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
        <h3>Draggable Markers Demo</h3>
        <p>Drag the markers to move them around the map</p>
        <div>
          {markers.map(marker => (
            <div key={marker.id}>
              <strong>Marker {marker.id}:</strong> 
              {` Lat: ${marker.position.lat.toFixed(4)}, Lng: ${marker.position.lng.toFixed(4)}`}
            </div>
          ))}
        </div>
      </div>

      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          {markers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              draggable={true}
              onDragEnd={onMarkerDragEnd(marker.id)}
              animation={window.google?.maps?.Animation?.DROP}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default DraggableMarkers;
```

### Animated Markers
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const AnimatedMarkers: React.FC = () => {
  const [animation, setAnimation] = useState<google.maps.Animation | null>(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const toggleBounce = () => {
    setAnimation(animation === window.google.maps.Animation.BOUNCE 
      ? null 
      : window.google.maps.Animation.BOUNCE
    );
  };

  const dropMarker = () => {
    setAnimation(window.google.maps.Animation.DROP);
    // Reset animation after drop completes
    setTimeout(() => setAnimation(null), 1000);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
        <h3>Animated Markers Demo</h3>
        <button 
          onClick={toggleBounce}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            backgroundColor: animation === window.google?.maps?.Animation?.BOUNCE ? '#dc3545' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {animation === window.google?.maps?.Animation?.BOUNCE ? 'Stop Bounce' : 'Start Bounce'}
        </button>
        <button 
          onClick={dropMarker}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Drop Animation
        </button>
      </div>

      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          <Marker
            position={center}
            title="Animated Marker"
            animation={animation}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default AnimatedMarkers;
```

### Markers with Labels
```typescript
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MarkersWithLabels: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const labeledMarkers = [
    {
      position: { lat: 24.7136, lng: 46.6753 },
      label: 'A',
      title: 'Point A'
    },
    {
      position: { lat: 24.7200, lng: 46.6800 },
      label: {
        text: 'B',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px'
      },
      title: 'Point B'
    },
    {
      position: { lat: 24.7100, lng: 46.6900 },
      label: {
        text: '1',
        color: 'red',
        fontWeight: 'bold',
        fontSize: '16px'
      },
      title: 'Point 1'
    }
  ];

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
      >
        {labeledMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            label={marker.label}
            title={marker.title}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MarkersWithLabels;
```

### Interactive Markers with Click Events
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface MarkerData {
  id: number;
  position: google.maps.LatLngLiteral;
  title: string;
  description: string;
}

const InteractiveMarkers: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const markers: MarkerData[] = [
    {
      id: 1,
      position: { lat: 24.7136, lng: 46.6753 },
      title: "Kingdom Centre",
      description: "A 99-story skyscraper in Riyadh, Saudi Arabia"
    },
    {
      id: 2,
      position: { lat: 24.6877, lng: 46.6857 },
      title: "Al Faisaliah Tower",
      description: "The first skyscraper constructed in Saudi Arabia"
    },
    {
      id: 3,
      position: { lat: 24.6308, lng: 46.7073 },
      title: "Masmak Fortress",
      description: "A clay and mudbrick fort in the old quarters of Riyadh"
    }
  ];

  const onMarkerClick = useCallback((marker: MarkerData) => {
    setSelectedMarker(marker);
  }, []);

  const onInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={center}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            onClick={() => onMarkerClick(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={onInfoWindowClose}
          >
            <div style={{ maxWidth: '200px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
                {selectedMarker.title}
              </h3>
              <p style={{ margin: 0, fontSize: '14px' }}>
                {selectedMarker.description}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default InteractiveMarkers;
```

## Data Types

### LatLngLiteral
```typescript
interface LatLngLiteral {
  lat: number;
  lng: number;
}
```

### MarkerLabel
```typescript
interface MarkerLabel {
  text: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
}
```

### Icon
```typescript
interface Icon {
  url: string;
  size?: Size;
  origin?: Point;
  anchor?: Point;
  scaledSize?: Size;
  labelOrigin?: Point;
}
```

### Animation
```typescript
enum Animation {
  BOUNCE = 1,
  DROP = 2
}
```

## Best Practices

### 1. Performance Optimization
```typescript
// Use React.memo for marker components
const OptimizedMarker = React.memo(Marker);

// Limit the number of markers
const MAX_MARKERS = 100;

// Use marker clustering for many markers
import { MarkerClusterer } from '@react-google-maps/api';
```

### 2. Custom Icons
```typescript
// Preload custom icons
const preloadIcon = (url: string) => {
  const img = new Image();
  img.src = url;
};

// Use consistent icon sizes
const ICON_SIZE = new window.google.maps.Size(32, 32);
const ICON_ANCHOR = new window.google.maps.Point(16, 32);
```

### 3. Event Handling
```typescript
// Use useCallback for event handlers
const handleMarkerClick = useCallback((markerId: number) => {
  // Handle click
}, []);

// Debounce drag events
const debouncedDragEnd = useCallback(
  debounce((position: google.maps.LatLngLiteral) => {
    // Handle drag end
  }, 300),
  []
);
```

### 4. State Management
```typescript
// Use proper state structure
interface MarkerState {
  id: string;
  position: google.maps.LatLngLiteral;
  visible: boolean;
  data: any;
}

// Update markers efficiently
const updateMarker = (id: string, updates: Partial<MarkerState>) => {
  setMarkers(prev => prev.map(marker => 
    marker.id === id ? { ...marker, ...updates } : marker
  ));
};
```

## Common Issues and Solutions

### 1. Markers not appearing
- Ensure position coordinates are valid
- Check if markers are within map bounds
- Verify that the map is fully loaded

### 2. Performance issues with many markers
- Use MarkerClusterer for large datasets
- Implement virtualization for off-screen markers
- Use optimized: true for better performance

### 3. Custom icons not loading
- Ensure icon URLs are accessible
- Use proper CORS headers for external images
- Preload icons before using them

### 4. Event handlers causing re-renders
- Use useCallback for event handlers
- Memoize marker components
- Avoid inline functions in props

## Important Notes

- Markers must be children of GoogleMap component
- Position prop is required and must be valid coordinates
- Custom icons should be optimized for web (small file size)
- Use animation sparingly to avoid performance issues
- Consider using MarkerClusterer for large numbers of markers
- Event handlers receive Google Maps API event objects
- Draggable markers can impact performance on mobile devices