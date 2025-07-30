# LoadScript Component

## Overview
`LoadScript` is a component that loads the Google Maps JavaScript API and provides the necessary context for all other map components.

## Import
```typescript
import { LoadScript } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `googleMapsApiKey` | `string` | ✅ | - | Google Maps API key |
| `id` | `string` | ❌ | `'script-loader'` | Unique script ID |
| `version` | `string` | ❌ | `'weekly'` | Google Maps API version |
| `language` | `string` | ❌ | - | Map language |
| `region` | `string` | ❌ | - | Geographic region |
| `libraries` | `Libraries[]` | ❌ | `[]` | Additional libraries to load |

### Loading Control Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadingElement` | `React.ReactElement` | `<div>Loading...</div>` | Element shown during loading |
| `onLoad` | `() => void` | - | Called when API loads successfully |
| `onError` | `(error: Error) => void` | - | Called when an error occurs |
| `onUnmount` | `() => void` | - | Called when component unmounts |
| `preventGoogleFontsLoading` | `boolean` | `false` | Prevent loading Google Fonts |

### Advanced Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mapIds` | `string[]` | - | Custom map IDs |
| `authReferrerPolicy` | `string` | - | Auth referrer policy |
| `channel` | `string` | - | Tracking channel |
| `nonce` | `string` | - | Security nonce value |

## Available Libraries

```typescript
type Libraries = 
  | "drawing"
  | "geometry" 
  | "localContext"
  | "places"
  | "visualization";
```

### Library Descriptions

| Library | Description | Use Case |
|---------|-------------|----------|
| `drawing` | Drawing tools for maps | Drawing shapes and lines |
| `geometry` | Geometric operations | Distance and area calculations |
| `localContext` | Local context | Local place information |
| `places` | Places service | Place search and autocomplete |
| `visualization` | Visualization | Heatmaps and visualizations |

## Usage Examples

### Basic Example
```typescript
import React from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const BasicLoadScript: React.FC = () => {
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
      />
    </LoadScript>
  );
};

export default BasicLoadScript;
```

### Example with Additional Libraries
```typescript
import React from 'react';
import { LoadScript, GoogleMap, Autocomplete } from '@react-google-maps/api';

const libraries: ("places" | "drawing" | "geometry")[] = ["places", "drawing", "geometry"];

const LoadScriptWithLibraries: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onLoad = () => {
    console.log('Google Maps API loaded successfully');
  };

  const onError = (error: Error) => {
    console.error('Error loading Google Maps API:', error);
  };

  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY"
      libraries={libraries}
      onLoad={onLoad}
      onError={onError}
      language="en"
      region="US"
    >
      <div>
        <Autocomplete>
          <input
            type="text"
            placeholder="Search for a place..."
            style={{
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '240px',
              height: '32px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipses',
              position: 'absolute',
              left: '50%',
              marginLeft: '-120px'
            }}
          />
        </Autocomplete>
        
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        />
      </div>
    </LoadScript>
  );
};

export default LoadScriptWithLibraries;
```

### Example with Custom Loading Element
```typescript
import React from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const CustomLoadingElement: React.FC = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px'
  }}>
    <div style={{
      textAlign: 'center'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 10px'
      }} />
      <p>Loading map...</p>
    </div>
  </div>
);

const LoadScriptWithCustomLoading: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <LoadScript
        googleMapsApiKey="YOUR_API_KEY"
        loadingElement={<CustomLoadingElement />}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        />
      </LoadScript>
    </>
  );
};

export default LoadScriptWithCustomLoading;
```

### Example with Error Handling
```typescript
import React, { useState } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const LoadScriptWithErrorHandling: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onLoad = () => {
    console.log('Google Maps API loaded successfully');
    setIsLoaded(true);
    setLoadError(null);
  };

  const onError = (error: Error) => {
    console.error('Error loading Google Maps API:', error);
    setLoadError(error);
    setIsLoaded(false);
  };

  if (loadError) {
    return (
      <div style={{
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffebee',
        border: '1px solid #f44336',
        borderRadius: '4px',
        color: '#c62828'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h3>Error Loading Map</h3>
          <p>{loadError.message}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY"
      onLoad={onLoad}
      onError={onError}
      loadingElement={
        <div style={{
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5'
        }}>
          Loading map...
        </div>
      }
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
      />
    </LoadScript>
  );
};

export default LoadScriptWithErrorHandling;
```

### Example with Advanced Settings
```typescript
import React from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = [
  "places", 
  "drawing", 
  "geometry", 
  "visualization"
];

const AdvancedLoadScript: React.FC = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY"
      libraries={libraries}
      version="weekly"
      language="en"
      region="US"
      preventGoogleFontsLoading={true}
      channel="your-channel"
      mapIds={["your-map-id"]}
      onLoad={() => console.log('API loaded')}
      onError={(error) => console.error('API load error:', error)}
      onUnmount={() => console.log('API unmounted')}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
      />
    </LoadScript>
  );
};

export default AdvancedLoadScript;
```

### Environment Variables Example
```typescript
import React from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

// .env file:
// REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here

const EnvLoadScript: React.FC = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div style={{
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffebee',
        border: '1px solid #f44336',
        borderRadius: '4px',
        color: '#c62828'
      }}>
        <p>Google Maps API key is required</p>
      </div>
    );
  }

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
      />
    </LoadScript>
  );
};

export default EnvLoadScript;
```

## Best Practices

### 1. API Key Management
```typescript
// Use environment variables
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  throw new Error('Google Maps API key is required');
}

// Validate API key format (optional)
const isValidApiKey = (key: string) => {
  return key.length === 39 && key.startsWith('AIza');
};
```

### 2. Performance Optimization
```typescript
// Load only required libraries
const libraries = ["places"]; // Only libraries you actually use

// Use memo to prevent re-loading
const MemoizedMap = React.memo(() => (
  <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
    <GoogleMap />
  </LoadScript>
));

// Single LoadScript instance per app
// Don't wrap multiple LoadScript components
```

### 3. Error Handling
```typescript
const handleLoadError = (error: Error) => {
  // Log error
  console.error('Maps API load error:', error);
  
  // Notify user
  alert('Failed to load map. Please try again.');
  
  // Send error report (optional)
  // sendErrorReport(error);
  
  // Fallback action
  // showStaticMap();
};
```

### 4. Loading States
```typescript
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner" />
    <p>Loading Google Maps...</p>
  </div>
);

// Use meaningful loading messages
const loadingElement = <LoadingSpinner />;
```

## Common Errors and Solutions

### 1. Invalid API Key
```
Error: Google Maps JavaScript API error: InvalidKeyMapError
```
**Solution**: Verify API key and enable Maps JavaScript API in Google Cloud Console

### 2. Quota Exceeded
```
Error: Google Maps JavaScript API error: OverQuotaMapError
```
**Solution**: Check usage limits in Google Cloud Console and upgrade if needed

### 3. Referrer Not Allowed
```
Error: Google Maps JavaScript API error: RefererNotAllowedMapError
```
**Solution**: Add your domain to allowed referrers in API key restrictions

### 4. Library Load Error
```
Error: Google Maps JavaScript API error: MissingKeyMapError
```
**Solution**: Ensure API key has access to required libraries

### 5. Network Issues
```
Error: Failed to load Google Maps API
```
**Solution**: Check network connectivity and firewall settings

## TypeScript Types

### LoadScriptProps
```typescript
interface LoadScriptProps {
  googleMapsApiKey: string;
  id?: string;
  version?: string;
  language?: string;
  region?: string;
  libraries?: Libraries[];
  loadingElement?: React.ReactElement;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onUnmount?: () => void;
  preventGoogleFontsLoading?: boolean;
  mapIds?: string[];
  authReferrerPolicy?: string;
  channel?: string;
  nonce?: string;
}
```

### Libraries Type
```typescript
type Libraries = 
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization";
```

## Performance Tips

1. **Use only required libraries**: Don't load unnecessary libraries
2. **Implement proper error boundaries**: Handle API load failures gracefully
3. **Cache API responses**: For places and geocoding requests
4. **Use single LoadScript instance**: Don't create multiple instances
5. **Implement retry logic**: For network failures
6. **Monitor API usage**: Track quota consumption

## Security Considerations

1. **Restrict API key**: Use HTTP referrer restrictions
2. **Use environment variables**: Don't hardcode API keys
3. **Implement rate limiting**: Prevent abuse
4. **Monitor usage**: Watch for unusual activity
5. **Use nonce**: For Content Security Policy compliance

## Important Notes

- **Use LoadScript only once** per application
- **All map components must be inside LoadScript**
- **Use libraries only for required functionality** to improve performance
- **Store API key in environment variables** not in code
- **Implement error handling** for better user experience
- **Consider using useJsApiLoader** for more control over loading process