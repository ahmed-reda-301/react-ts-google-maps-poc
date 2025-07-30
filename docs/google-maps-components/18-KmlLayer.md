# KmlLayer Component

## Overview
`KmlLayer` is a component that displays KML (Keyhole Markup Language) data on the map. It allows you to overlay geographic data from KML files, including points, lines, polygons, and other geographic features with styling and metadata.

## Import
```typescript
import { KmlLayer } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `url` | `string` | ✅ | - | URL of the KML file to display |
| `options` | `KmlLayerOptions` | ❌ | - | Additional layer options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(kmlLayer: google.maps.KmlLayer) => void` | Called when layer loads |
| `onUnmount` | `(kmlLayer: google.maps.KmlLayer) => void` | Called when layer unmounts |
| `onClick` | `(e: google.maps.KmlMouseEvent) => void` | Layer click event |
| `onDefaultViewportChanged` | `() => void` | Called when viewport changes |
| `onStatusChanged` | `() => void` | Called when status changes |

## KmlLayerOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `clickable` | `boolean` | `true` | Allow clicking on KML features |
| `preserveViewport` | `boolean` | `false` | Don't adjust viewport to fit KML |
| `screenOverlays` | `boolean` | `true` | Show screen overlays |
| `suppressInfoWindows` | `boolean` | `false` | Hide info windows |

## Usage Examples

### Basic KML Layer
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, KmlLayer } from '@react-google-maps/api';

const BasicKmlLayer: React.FC = () => {
  const [showKml, setShowKml] = useState(true);
  const [kmlStatus, setKmlStatus] = useState<string>('Loading...');

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Sample KML URL (replace with your actual KML file)
  const kmlUrl = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';

  const onKmlLoad = (kmlLayer: google.maps.KmlLayer) => {
    console.log('KML Layer loaded');
    setKmlStatus('Loaded');
  };

  const onKmlClick = (e: google.maps.KmlMouseEvent) => {
    console.log('KML feature clicked:', e.featureData);
    alert(`Clicked on: ${e.featureData?.name || 'KML Feature'}`);
  };

  const onStatusChanged = () => {
    setKmlStatus('Status changed');
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic KML Layer</h3>
          <p>Display KML data on the map with interactive features</p>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
            <button
              onClick={() => setShowKml(!showKml)}
              style={{
                padding: '8px 16px',
                backgroundColor: showKml ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showKml ? 'Hide KML' : 'Show KML'}
            </button>
            
            <div style={{ 
              padding: '5px 10px', 
              backgroundColor: 'white', 
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              Status: {kmlStatus}
            </div>
          </div>

          <div style={{ fontSize: '14px', color: '#666' }}>
            <strong>KML URL:</strong> {kmlUrl}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={center}
        >
          {showKml && (
            <KmlLayer
              url={kmlUrl}
              onLoad={onKmlLoad}
              onClick={onKmlClick}
              onStatusChanged={onStatusChanged}
              options={{
                clickable: true,
                preserveViewport: false,
                suppressInfoWindows: false
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicKmlLayer;
```

### Multiple KML Layers
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, KmlLayer } from '@react-google-maps/api';

interface KmlData {
  id: string;
  name: string;
  url: string;
  description: string;
  category: 'boundaries' | 'routes' | 'points' | 'areas';
  visible: boolean;
  status: 'loading' | 'loaded' | 'error';
}

const MultipleKmlLayers: React.FC = () => {
  const [kmlLayers, setKmlLayers] = useState<KmlData[]>([
    {
      id: 'boundaries',
      name: 'Administrative Boundaries',
      url: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml',
      description: 'Regional administrative boundaries',
      category: 'boundaries',
      visible: true,
      status: 'loading'
    },
    {
      id: 'routes',
      name: 'Transportation Routes',
      url: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml',
      description: 'Major transportation corridors',
      category: 'routes',
      visible: false,
      status: 'loading'
    },
    {
      id: 'landmarks',
      name: 'Historical Landmarks',
      url: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml',
      description: 'Important historical sites',
      category: 'points',
      visible: false,
      status: 'loading'
    }
  ]);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 37.4419, // Google campus coordinates for demo
    lng: -122.1419
  };

  const toggleKmlLayer = (id: string) => {
    setKmlLayers(prev => prev.map(layer =>
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const updateKmlStatus = (id: string, status: KmlData['status']) => {
    setKmlLayers(prev => prev.map(layer =>
      layer.id === id ? { ...layer, status } : layer
    ));
  };

  const onKmlLoad = (id: string) => (kmlLayer: google.maps.KmlLayer) => {
    console.log(`KML Layer ${id} loaded`);
    updateKmlStatus(id, 'loaded');
  };

  const onKmlClick = (id: string) => (e: google.maps.KmlMouseEvent) => {
    const layerName = kmlLayers.find(layer => layer.id === id)?.name;
    console.log(`KML feature clicked in ${layerName}:`, e.featureData);
    
    if (e.featureData) {
      alert(`${layerName}\nFeature: ${e.featureData.name || 'Unnamed'}\nDescription: ${e.featureData.description || 'No description'}`);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      boundaries: '🗺️',
      routes: '🛣️',
      points: '📍',
      areas: '🏞️'
    };
    return icons[category as keyof typeof icons] || '📄';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      boundaries: '#007bff',
      routes: '#28a745',
      points: '#ffc107',
      areas: '#17a2b8'
    };
    return colors[category as keyof typeof colors] || '#6c757d';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      loading: '#ffc107',
      loaded: '#28a745',
      error: '#dc3545'
    };
    return colors[status as keyof typeof colors] || '#6c757d';
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Multiple KML Layers</h3>
          <p>Manage multiple KML datasets with different categories and visibility</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginTop: '15px' }}>
            {kmlLayers.map(layer => (
              <div
                key={layer.id}
                style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: `2px solid ${layer.visible ? getCategoryColor(layer.category) : '#dee2e6'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '20px', marginRight: '8px' }}>
                      {getCategoryIcon(layer.category)}
                    </span>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
                        {layer.name}
                      </h4>
                      <div style={{ fontSize: '12px', color: '#666', textTransform: 'capitalize' }}>
                        {layer.category}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleKmlLayer(layer.id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: layer.visible ? '#dc3545' : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    {layer.visible ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#555' }}>
                  {layer.description}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ 
                    padding: '3px 8px', 
                    backgroundColor: getStatusColor(layer.status) + '20',
                    color: getStatusColor(layer.status),
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}>
                    {layer.status}
                  </div>
                  
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {layer.visible ? '👁️ Visible' : '👁️‍🗨️ Hidden'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '15px' }}>
            <h4>Layer Statistics:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
                  {kmlLayers.length}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Total Layers</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                  {kmlLayers.filter(l => l.visible).length}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Visible</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffc107' }}>
                  {kmlLayers.filter(l => l.status === 'loaded').length}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Loaded</div>
              </div>
            </div>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          {kmlLayers
            .filter(layer => layer.visible)
            .map(layer => (
              <KmlLayer
                key={layer.id}
                url={layer.url}
                onLoad={onKmlLoad(layer.id)}
                onClick={onKmlClick(layer.id)}
                options={{
                  clickable: true,
                  preserveViewport: true,
                  suppressInfoWindows: false
                }}
              />
            ))
          }
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MultipleKmlLayers;
```

### KML Layer with Custom Controls
```typescript
import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, KmlLayer } from '@react-google-maps/api';

interface KmlLayerInfo {
  name: string;
  description: string;
  author: string;
  features: number;
  bounds?: google.maps.LatLngBounds;
}

const KmlLayerWithControls: React.FC = () => {
  const [kmlUrl, setKmlUrl] = useState('');
  const [currentKml, setCurrentKml] = useState<string | null>(null);
  const [kmlInfo, setKmlInfo] = useState<KmlLayerInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Sample KML URLs for testing
  const sampleKmlUrls = [
    {
      name: 'Google Campus',
      url: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml'
    },
    {
      name: 'Sample Boundaries',
      url: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml'
    }
  ];

  const loadKmlLayer = () => {
    if (!kmlUrl.trim()) {
      setError('Please enter a valid KML URL');
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentKml(kmlUrl);
  };

  const onKmlLoad = (kmlLayer: google.maps.KmlLayer) => {
    console.log('KML Layer loaded successfully');
    setLoading(false);
    
    // Extract KML information (this would be more detailed in a real implementation)
    setKmlInfo({
      name: 'Loaded KML Layer',
      description: 'KML data loaded from provided URL',
      author: 'Unknown',
      features: 0, // Would be calculated from actual KML data
      bounds: kmlLayer.getDefaultViewport()
    });

    // Fit map to KML bounds if available
    if (mapRef.current && kmlLayer.getDefaultViewport()) {
      mapRef.current.fitBounds(kmlLayer.getDefaultViewport());
    }
  };

  const onKmlError = () => {
    setLoading(false);
    setError('Failed to load KML file. Please check the URL and try again.');
    setCurrentKml(null);
  };

  const onKmlClick = (e: google.maps.KmlMouseEvent) => {
    if (e.featureData) {
      console.log('KML Feature clicked:', e.featureData);
    }
  };

  const clearKml = () => {
    setCurrentKml(null);
    setKmlInfo(null);
    setError(null);
    setKmlUrl('');
  };

  const fitToKmlBounds = () => {
    if (mapRef.current && kmlInfo?.bounds) {
      mapRef.current.fitBounds(kmlInfo.bounds);
    }
  };

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>KML Layer with Custom Controls</h3>
          <p>Load and manage KML files with custom controls and information display</p>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              KML File URL:
            </label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="url"
                value={kmlUrl}
                onChange={(e) => setKmlUrl(e.target.value)}
                placeholder="Enter KML file URL..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={loadKmlLayer}
                disabled={loading || !kmlUrl.trim()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: loading || !kmlUrl.trim() ? '#6c757d' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading || !kmlUrl.trim() ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Loading...' : 'Load KML'}
              </button>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <strong>Sample KML URLs:</strong>
              <div style={{ display: 'flex', gap: '10px', marginTop: '5px', flexWrap: 'wrap' }}>
                {sampleKmlUrls.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setKmlUrl(sample.url)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#e9ecef',
                      border: '1px solid #adb5bd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    {sample.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div style={{
              padding: '10px',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '4px',
              color: '#721c24',
              marginBottom: '15px'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {kmlInfo && (
            <div style={{
              padding: '15px',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px',
              marginBottom: '15px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>
                KML Layer Information
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <div>
                  <strong>Name:</strong> {kmlInfo.name}
                </div>
                <div>
                  <strong>Author:</strong> {kmlInfo.author}
                </div>
                <div>
                  <strong>Features:</strong> {kmlInfo.features}
                </div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <strong>Description:</strong> {kmlInfo.description}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {currentKml && (
              <>
                <button
                  onClick={clearKml}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Clear KML
                </button>
                
                <button
                  onClick={fitToKmlBounds}
                  disabled={!kmlInfo?.bounds}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: kmlInfo?.bounds ? '#28a745' : '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: kmlInfo?.bounds ? 'pointer' : 'not-allowed'
                  }}
                >
                  Fit to Bounds
                </button>
              </>
            )}
            
            <div style={{ 
              padding: '8px 12px', 
              backgroundColor: currentKml ? '#d4edda' : '#f8d7da',
              borderRadius: '4px',
              fontSize: '14px',
              color: currentKml ? '#155724' : '#721c24'
            }}>
              Status: {currentKml ? 'KML Loaded' : 'No KML Loaded'}
            </div>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={center}
          onLoad={onMapLoad}
        >
          {currentKml && (
            <KmlLayer
              url={currentKml}
              onLoad={onKmlLoad}
              onClick={onKmlClick}
              options={{
                clickable: true,
                preserveViewport: false,
                suppressInfoWindows: false
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default KmlLayerWithControls;
```

## Best Practices

### 1. KML File Optimization
```typescript
// Validate KML URL before loading
const validateKmlUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// Handle large KML files
const optimizeKmlLoading = (url: string) => {
  // Implement caching and compression strategies
  return url;
};
```

### 2. Error Handling
```typescript
// Comprehensive error handling
const handleKmlError = (error: any) => {
  console.error('KML loading error:', error);
  
  const errorMessages = {
    'FETCH_ERROR': 'Unable to fetch KML file. Check URL and network connection.',
    'INVALID_REQUEST': 'Invalid KML file format or structure.',
    'OVER_QUERY_LIMIT': 'Too many KML requests. Please try again later.',
    'REQUEST_DENIED': 'KML request denied. Check API key permissions.'
  };
  
  return errorMessages[error.code as keyof typeof errorMessages] || 'Unknown error occurred';
};
```

### 3. Performance Optimization
```typescript
// Limit number of KML layers
const MAX_KML_LAYERS = 10;

// Use React.memo for KML components
const OptimizedKmlLayer = React.memo(KmlLayer);

// Implement lazy loading
const useKmlLazyLoading = (visible: boolean, url: string) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  
  useEffect(() => {
    if (visible && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [visible, shouldLoad]);
  
  return shouldLoad ? url : null;
};
```

## Common Issues and Solutions

### 1. KML file not loading
- Verify KML file URL is accessible and CORS-enabled
- Check KML file format and structure
- Ensure file size is within limits (max 10MB)

### 2. Performance issues with large KML files
- Optimize KML file size and complexity
- Use KML file compression
- Implement progressive loading

### 3. Styling not displaying correctly
- Check KML style definitions
- Verify color and icon formats
- Test with simplified KML files

### 4. Click events not working
- Ensure clickable option is enabled
- Check for overlapping layers
- Verify KML feature has proper metadata

## Important Notes

- KmlLayer must be a child of GoogleMap component
- KML files must be publicly accessible via HTTP/HTTPS
- Maximum file size is typically 10MB
- KML files are cached by Google for performance
- Complex KML files may impact map performance
- Use preserveViewport to control automatic zooming
- suppressInfoWindows controls built-in info windows
- Consider file optimization for better loading times