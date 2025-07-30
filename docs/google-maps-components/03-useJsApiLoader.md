# useJsApiLoader Hook

## Overview
`useJsApiLoader` is a React hook that provides more control over loading the Google Maps JavaScript API compared to the `LoadScript` component. It returns loading state and allows for conditional rendering.

## Import
```typescript
import { useJsApiLoader } from '@react-google-maps/api';
```

## Hook Signature
```typescript
const { isLoaded, loadError } = useJsApiLoader(options);
```

## Parameters

### LoaderOptions

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `googleMapsApiKey` | `string` | ✅ | - | Google Maps API key |
| `id` | `string` | ❌ | `'script-loader'` | Unique script ID |
| `version` | `string` | ❌ | `'weekly'` | Google Maps API version |
| `language` | `string` | ❌ | - | Map language |
| `region` | `string` | ❌ | - | Geographic region |
| `libraries` | `Libraries[]` | ❌ | `[]` | Additional libraries to load |
| `mapIds` | `string[]` | ❌ | - | Custom map IDs |
| `authReferrerPolicy` | `string` | ❌ | - | Auth referrer policy |
| `channel` | `string` | ❌ | - | Tracking channel |
| `nonce` | `string` | ❌ | - | Security nonce value |
| `preventGoogleFontsLoading` | `boolean` | ❌ | `false` | Prevent loading Google Fonts |

## Return Value

| Property | Type | Description |
|----------|------|-------------|
| `isLoaded` | `boolean` | Whether the API has loaded successfully |
| `loadError` | `Error \| undefined` | Error object if loading failed |

## Usage Examples

### Basic Example
```typescript
import React from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

const BasicHookExample: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "YOUR_API_KEY"
  });

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={13}
      center={center}
    />
  );
};

export default BasicHookExample;
```

### Example with Libraries
```typescript
import React from 'react';
import { useJsApiLoader, GoogleMap, Autocomplete } from '@react-google-maps/api';

const libraries: ("places" | "drawing")[] = ["places", "drawing"];

const HookWithLibraries: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "YOUR_API_KEY",
    libraries,
    language: "en",
    region: "US"
  });

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  if (loadError) {
    return (
      <div style={{
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffebee',
        color: '#c62828'
      }}>
        <div>
          <h3>Failed to load Google Maps</h3>
          <p>{loadError.message}</p>
        </div>
      </div>
    );
  }ل

  if (!isLoaded) {
    return (
      <div style={{
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div>
          <div className="spinner" />
          <p>Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Autocomplete>
        <input
          type="text"
          placeholder="Search for a place..."
          style={{
            width: '300px',
            height: '40px',
            padding: '0 12px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </Autocomplete>
      
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
      />
    </div>
  );
};

export default HookWithLibraries;
```

### Advanced Example with State Management
```typescript
import React, { useState, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

interface MapState {
  center: google.maps.LatLngLiteral;
  zoom: number;
  markers: google.maps.LatLngLiteral[];
}

const AdvancedHookExample: React.FC = () => {
  const [mapState, setMapState] = useState<MapState>({
    center: { lat: 24.7136, lng: 46.6753 },
    zoom: 13,
    markers: []
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places", "geometry"],
    version: "weekly"
  });

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  // Effect to handle API load completion
  useEffect(() => {
    if (isLoaded) {
      console.log('Google Maps API loaded successfully');
      // You can perform additional setup here
    }
  }, [isLoaded]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      
      setMapState(prev => ({
        ...prev,
        markers: [...prev.markers, newMarker]
      }));
    }
  };

  const clearMarkers = () => {
    setMapState(prev => ({
      ...prev,
      markers: []
    }));
  };

  if (loadError) {
    return (
      <div style={{
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffebee',
        border: '2px solid #f44336',
        borderRadius: '8px'
      }}>
        <div style={{ textAlign: 'center', color: '#c62828' }}>
          <h2>🗺️ Map Loading Error</h2>
          <p><strong>Error:</strong> {loadError.message}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={{
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <h3>Loading Google Maps...</h3>
          <p>Please wait while we load the map</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Interactive Map Demo</h3>
        <p>Click on the map to add markers. Total markers: {mapState.markers.length}</p>
        <button 
          onClick={clearMarkers}
          disabled={mapState.markers.length === 0}
          style={{
            padding: '8px 16px',
            backgroundColor: mapState.markers.length > 0 ? '#dc3545' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: mapState.markers.length > 0 ? 'pointer' : 'not-allowed'
          }}
        >
          Clear Markers
        </button>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <GoogleMap
        mapContainerStyle={mapStyles}
        center={mapState.center}
        zoom={mapState.zoom}
        onClick={handleMapClick}
        options={{
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true
        }}
      >
        {mapState.markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            title={`Marker ${index + 1}`}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default AdvancedHookExample;
```

### Custom Hook Example
```typescript
import { useJsApiLoader } from '@react-google-maps/api';
import { useMemo } from 'react';

// Custom hook for Google Maps
export const useGoogleMaps = (apiKey: string, libraries?: ("places" | "drawing" | "geometry")[]) => {
  const loaderOptions = useMemo(() => ({
    googleMapsApiKey: apiKey,
    libraries: libraries || [],
    version: "weekly" as const
  }), [apiKey, libraries]);

  const { isLoaded, loadError } = useJsApiLoader(loaderOptions);

  return {
    isLoaded,
    loadError,
    isReady: isLoaded && !loadError
  };
};

// Usage of custom hook
const MapComponent: React.FC = () => {
  const { isLoaded, loadError, isReady } = useGoogleMaps(
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    ["places", "geometry"]
  );

  if (loadError) return <div>Error: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "100%" }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={13}
    />
  );
};
```

### Conditional Rendering Example
```typescript
import React, { useState } from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

const ConditionalMapExample: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "YOUR_API_KEY",
    libraries: ["places"]
  });

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const renderMapContent = () => {
    if (loadError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#ffebee', color: '#c62828' }}>
          <h3>Map Error</h3>
          <p>{loadError.message}</p>
        </div>
      );
    }

    if (!isLoaded) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#e3f2fd' }}>
          <p>Loading Google Maps API...</p>
        </div>
      );
    }

    return (
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
      />
    );
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setShowMap(!showMap)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </button>
      </div>

      {showMap && renderMapContent()}
    </div>
  );
};

export default ConditionalMapExample;
```

## Comparison with LoadScript

| Feature | useJsApiLoader | LoadScript |
|---------|----------------|------------|
| **Control** | More control over rendering | Automatic rendering |
| **Loading State** | Returns loading state | Uses loading element |
| **Error Handling** | Returns error object | Uses onError callback |
| **Conditional Rendering** | Easy to implement | Requires wrapper logic |
| **Performance** | Better for complex apps | Simpler for basic use |
| **Bundle Size** | Slightly smaller | Includes wrapper component |

## Best Practices

### 1. Environment Variables
```typescript
const useGoogleMapsLoader = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    throw new Error('Google Maps API key is required');
  }
  
  return useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places", "geometry"]
  });
};
```

### 2. Error Boundaries
```typescript
import React from 'react';

class MapErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Map error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with the map.</div>;
    }

    return this.props.children;
  }
}

// Usage
const App = () => (
  <MapErrorBoundary>
    <MapComponent />
  </MapErrorBoundary>
);
```

### 3. Memoization
```typescript
import { useMemo } from 'react';

const MapComponent: React.FC = () => {
  const loaderOptions = useMemo(() => ({
    googleMapsApiKey: "YOUR_API_KEY",
    libraries: ["places"] as const,
    version: "weekly" as const
  }), []);

  const { isLoaded, loadError } = useJsApiLoader(loaderOptions);

  // Rest of component...
};
```

### 4. Loading States
```typescript
const LoadingStates = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

const getLoadingState = (isLoaded: boolean, loadError?: Error) => {
  if (loadError) return LoadingStates.ERROR;
  if (isLoaded) return LoadingStates.SUCCESS;
  return LoadingStates.LOADING;
};
```

## TypeScript Types

### LoaderOptions Interface
```typescript
interface LoaderOptions {
  googleMapsApiKey: string;
  id?: string;
  version?: string;
  language?: string;
  region?: string;
  libraries?: Libraries[];
  mapIds?: string[];
  authReferrerPolicy?: string;
  channel?: string;
  nonce?: string;
  preventGoogleFontsLoading?: boolean;
}
```

### Hook Return Type
```typescript
interface UseJsApiLoaderResult {
  isLoaded: boolean;
  loadError: Error | undefined;
}
```

## Common Patterns

### 1. Retry Logic
```typescript
const useGoogleMapsWithRetry = (options: LoaderOptions, maxRetries = 3) => {
  const [retryCount, setRetryCount] = useState(0);
  const { isLoaded, loadError } = useJsApiLoader(options);

  const retry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      window.location.reload();
    }
  };

  return { isLoaded, loadError, retry, canRetry: retryCount < maxRetries };
};
```

### 2. Preloading
```typescript
const usePreloadGoogleMaps = () => {
  useEffect(() => {
    // Preload the API when component mounts
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = 'https://maps.googleapis.com';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
};
```

## Important Notes

- **Use only once per application**: Don't call useJsApiLoader multiple times
- **Memoize options**: Prevent unnecessary re-loading
- **Handle all states**: Loading, success, and error states
- **Use TypeScript**: For better type safety
- **Implement error boundaries**: For graceful error handling
- **Consider performance**: Load only required libraries
- **Test error scenarios**: Network failures, invalid keys, etc.