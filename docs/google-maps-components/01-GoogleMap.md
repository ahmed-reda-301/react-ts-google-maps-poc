# GoogleMap Component

## Overview
`GoogleMap` is the core component in the `@react-google-maps/api` library that renders a Google Maps instance in a React application.

## Import
```typescript
import { GoogleMap } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `mapContainerStyle` | `React.CSSProperties` | ✅ | - | CSS styles for the map container |
| `mapContainerClassName` | `string` | ❌ | - | CSS class for the map container |
| `center` | `LatLngLiteral` | ❌ | `{lat: 0, lng: 0}` | Map center coordinates |
| `zoom` | `number` | ❌ | `3` | Zoom level |
| `options` | `google.maps.MapOptions` | ❌ | - | Additional map options |

### Control Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `clickableIcons` | `boolean` | `true` | Enable clicking on map icons |
| `disableDefaultUI` | `boolean` | `false` | Hide default UI controls |
| `disableDoubleClickZoom` | `boolean` | `false` | Disable double-click zoom |
| `draggable` | `boolean` | `true` | Allow map dragging |
| `gestureHandling` | `'cooperative' \| 'greedy' \| 'none' \| 'auto'` | `'auto'` | Gesture handling mode |
| `keyboardShortcuts` | `boolean` | `true` | Enable keyboard shortcuts |
| `mapTypeControl` | `boolean` | `true` | Show map type control |
| `mapTypeId` | `google.maps.MapTypeId` | `'roadmap'` | Map type |
| `maxZoom` | `number` | - | Maximum zoom level |
| `minZoom` | `number` | - | Minimum zoom level |
| `restriction` | `google.maps.MapRestriction` | - | Map area restrictions |
| `scrollwheel` | `boolean` | `true` | Allow mouse wheel zoom |
| `streetViewControl` | `boolean` | `true` | Show Street View control |
| `zoomControl` | `boolean` | `true` | Show zoom controls |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(map: google.maps.Map) => void` | Called when map loads |
| `onUnmount` | `(map: google.maps.Map) => void` | Called when map unmounts |
| `onClick` | `(e: google.maps.MapMouseEvent) => void` | Map click event |
| `onDblClick` | `(e: google.maps.MapMouseEvent) => void` | Map double-click event |
| `onRightClick` | `(e: google.maps.MapMouseEvent) => void` | Map right-click event |
| `onMouseMove` | `(e: google.maps.MapMouseEvent) => void` | Mouse move over map |
| `onMouseOut` | `(e: google.maps.MapMouseEvent) => void` | Mouse leaves map |
| `onMouseOver` | `(e: google.maps.MapMouseEvent) => void` | Mouse enters map |
| `onDrag` | `() => void` | Map drag event |
| `onDragEnd` | `() => void` | Map drag end event |
| `onDragStart` | `() => void` | Map drag start event |
| `onZoomChanged` | `() => void` | Zoom level changed |
| `onCenterChanged` | `() => void` | Map center changed |
| `onBoundsChanged` | `() => void` | Map bounds changed |
| `onIdle` | `() => void` | Map becomes idle |
| `onTilesLoaded` | `() => void` | All tiles loaded |

## Usage Examples

### Basic Example
```typescript
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const BasicMap: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const defaultCenter = {
    lat: 24.7136,
    lng: 46.6753
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      />
    </LoadScript>
  );
};

export default BasicMap;
```

### Advanced Example with Options
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const AdvancedMap: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 24.7136, lng: 46.6753 });

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    fullscreenControl: true,
    gestureHandling: 'cooperative',
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 3,
    styles: [
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
      }
    ]
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log('Map loaded');
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    console.log('Map unmounted');
    setMap(null);
  }, []);

  const onClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      console.log('Clicked at:', { lat, lng });
      setCenter({ lat, lng });
    }
  }, []);

  const onZoomChanged = useCallback(() => {
    if (map) {
      console.log('Zoom changed to:', map.getZoom());
    }
  }, [map]);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={center}
        zoom={13}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
        onZoomChanged={onZoomChanged}
      />
    </LoadScript>
  );
};

export default AdvancedMap;
```

### Custom Controls Example
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const CustomControlMap: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapType, setMapType] = useState<google.maps.MapTypeId>('roadmap');

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = { lat: 24.7136, lng: 46.6753 };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const changeMapType = (type: google.maps.MapTypeId) => {
    if (map) {
      map.setMapTypeId(type);
      setMapType(type);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={() => changeMapType('roadmap')}
          disabled={mapType === 'roadmap'}
        >
          Roadmap
        </button>
        <button 
          onClick={() => changeMapType('satellite')}
          disabled={mapType === 'satellite'}
        >
          Satellite
        </button>
        <button 
          onClick={() => changeMapType('hybrid')}
          disabled={mapType === 'hybrid'}
        >
          Hybrid
        </button>
        <button 
          onClick={() => changeMapType('terrain')}
          disabled={mapType === 'terrain'}
        >
          Terrain
        </button>
      </div>
      
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={center}
          zoom={13}
          mapTypeId={mapType}
          onLoad={onLoad}
        />
      </LoadScript>
    </div>
  );
};

export default CustomControlMap;
```

### Map with Custom Styles
```typescript
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const StyledMap: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = { lat: 24.7136, lng: 46.6753 };

  // Custom map styles (dark theme example)
  const customMapStyles = [
    {
      elementType: "geometry",
      stylers: [{ color: "#242f3e" }]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }]
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }]
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }]
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }]
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }]
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }]
    }
  ];

  const mapOptions: google.maps.MapOptions = {
    styles: customMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: 'cooperative'
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={center}
        zoom={13}
        options={mapOptions}
      />
    </LoadScript>
  );
};

export default StyledMap;
```

## Data Types

### LatLngLiteral
```typescript
interface LatLngLiteral {
  lat: number;
  lng: number;
}
```

### MapOptions (Key Options)
```typescript
interface MapOptions {
  backgroundColor?: string;
  center?: LatLng | LatLngLiteral;
  clickableIcons?: boolean;
  disableDefaultUI?: boolean;
  disableDoubleClickZoom?: boolean;
  draggable?: boolean;
  fullscreenControl?: boolean;
  gestureHandling?: 'cooperative' | 'greedy' | 'none' | 'auto';
  keyboardShortcuts?: boolean;
  mapTypeControl?: boolean;
  mapTypeId?: MapTypeId;
  maxZoom?: number;
  minZoom?: number;
  restriction?: MapRestriction;
  scrollwheel?: boolean;
  streetViewControl?: boolean;
  styles?: MapTypeStyle[];
  zoom?: number;
  zoomControl?: boolean;
}
```

### MapTypeId
```typescript
enum MapTypeId {
  HYBRID = 'hybrid',
  ROADMAP = 'roadmap',
  SATELLITE = 'satellite',
  TERRAIN = 'terrain'
}
```

## Best Practices

1. **Use useCallback for events**: Prevent unnecessary re-renders
2. **Store map reference**: Use it for advanced operations
3. **Use memo for optimization**: If props don't change frequently
4. **Handle errors**: Ensure valid API key
5. **Use custom styles**: Improve map appearance
6. **Set proper dimensions**: Always specify height and width
7. **Optimize event handlers**: Debounce frequent events like onBoundsChanged

## Performance Tips

```typescript
// Memoize the map component
const MemoizedGoogleMap = React.memo(GoogleMap);

// Use useCallback for event handlers
const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
  // Handle click
}, []);

// Debounce frequent events
const debouncedBoundsChanged = useCallback(
  debounce(() => {
    // Handle bounds change
  }, 300),
  []
);
```

## Common Issues and Solutions

### 1. Map not displaying
- Ensure `mapContainerStyle` has valid height and width
- Check if API key is valid and Maps JavaScript API is enabled

### 2. Events not firing
- Make sure event handlers are properly memoized
- Check if the map is fully loaded before attaching events

### 3. Performance issues
- Use `React.memo` for the map component
- Debounce frequent events
- Limit the number of markers/overlays

## Important Notes

- `GoogleMap` must be wrapped in `LoadScript` or use `useJsApiLoader`
- `mapContainerStyle` is required and must include `height` and `width`
- Use `onLoad` to get the map instance for advanced operations
- Events use the native Google Maps API event system
- The component re-renders when props change, so optimize accordingly