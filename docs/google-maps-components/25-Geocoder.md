# Geocoder Component

## Overview
`Geocoder` is a component that provides geocoding services to convert addresses into geographic coordinates (geocoding) and coordinates into addresses (reverse geocoding). It's essential for location-based applications that need to work with both addresses and coordinates.

## Import
```typescript
import { Geocoder } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `GeocoderRequest` | ✅ | - | Geocoding request configuration |
| `callback` | `(results: GeocoderResult[], status: GeocoderStatus) => void` | ✅ | - | Callback function for results |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(geocoder: google.maps.Geocoder) => void` | Called when geocoder loads |
| `onUnmount` | `(geocoder: google.maps.Geocoder) => void` | Called when geocoder unmounts |

## GeocoderRequest Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `address` | `string` | ❌* | Address to geocode |
| `location` | `LatLng \| LatLngLiteral` | ❌* | Coordinates for reverse geocoding |
| `placeId` | `string` | ❌* | Place ID to geocode |
| `bounds` | `LatLngBounds \| LatLngBoundsLiteral` | ❌ | Bias results to specific area |
| `componentRestrictions` | `GeocoderComponentRestrictions` | ❌ | Restrict results by components |
| `region` | `string` | ❌ | Region code for bias |
| `language` | `string` | ❌ | Language for results |

*One of address, location, or placeId is required

## Usage Examples

### Basic Address Geocoding
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Geocoder, Marker } from '@react-google-maps/api';

interface GeocodeResult {
  address: string;
  coordinates: google.maps.LatLngLiteral;
  formattedAddress: string;
  placeId: string;
}

const BasicGeocoder: React.FC = () => {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<GeocodeResult | null>(null);
  const [geocoding, setGeocoding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const geocodeAddress = () => {
    if (!address.trim()) {
      setError('Please enter an address');
      return;
    }

    setGeocoding(true);
    setError(null);
    setResult(null);
  };

  const handleGeocodeResponse = (
    results: google.maps.GeocoderResult[],
    status: google.maps.GeocoderStatus
  ) => {
    setGeocoding(false);

    if (status === 'OK' && results.length > 0) {
      const firstResult = results[0];
      const location = firstResult.geometry.location;
      
      setResult({
        address: address,
        coordinates: {
          lat: location.lat(),
          lng: location.lng()
        },
        formattedAddress: firstResult.formatted_address,
        placeId: firstResult.place_id
      });
    } else {
      setError(getErrorMessage(status));
    }
  };

  const getErrorMessage = (status: google.maps.GeocoderStatus) => {
    const messages = {
      'ZERO_RESULTS': 'No results found for this address',
      'OVER_QUERY_LIMIT': 'Query limit exceeded',
      'REQUEST_DENIED': 'Request denied',
      'INVALID_REQUEST': 'Invalid request',
      'UNKNOWN_ERROR': 'Unknown error occurred'
    };
    return messages[status as keyof typeof messages] || 'Geocoding failed';
  };

  const clearResults = () => {
    setResult(null);
    setError(null);
    setAddress('');
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic Address Geocoding</h3>
          <p>Convert addresses to geographic coordinates</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter an address (e.g., Kingdom Centre, Riyadh)"
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              onKeyPress={(e) => e.key === 'Enter' && geocodeAddress()}
            />
            <button
              onClick={geocodeAddress}
              disabled={geocoding || !address.trim()}
              style={{
                padding: '10px 20px',
                backgroundColor: geocoding || !address.trim() ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: geocoding || !address.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              {geocoding ? 'Geocoding...' : 'Geocode'}
            </button>
            <button
              onClick={clearResults}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
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

          {result && (
            <div style={{
              padding: '15px',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>
                Geocoding Result
              </h4>
              <div style={{ fontSize: '14px', color: '#155724' }}>
                <div><strong>Input Address:</strong> {result.address}</div>
                <div><strong>Formatted Address:</strong> {result.formattedAddress}</div>
                <div><strong>Coordinates:</strong> {result.coordinates.lat.toFixed(6)}, {result.coordinates.lng.toFixed(6)}</div>
                <div><strong>Place ID:</strong> {result.placeId}</div>
              </div>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={result ? 15 : 11}
          center={result ? result.coordinates : center}
        >
          {result && (
            <Marker
              position={result.coordinates}
              title={result.formattedAddress}
            />
          )}

          {geocoding && (
            <Geocoder
              options={{
                address: address,
                componentRestrictions: {
                  country: 'SA' // Restrict to Saudi Arabia
                }
              }}
              callback={handleGeocodeResponse}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicGeocoder;
```

### Reverse Geocoding
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Geocoder, Marker } from '@react-google-maps/api';

interface ReverseGeocodeResult {
  coordinates: google.maps.LatLngLiteral;
  addresses: Array<{
    formattedAddress: string;
    types: string[];
    placeId: string;
  }>;
}

const ReverseGeocoder: React.FC = () => {
  const [clickedLocation, setClickedLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [result, setResult] = useState<ReverseGeocodeResult | null>(null);
  const [geocoding, setGeocoding] = useState(false);

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
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      
      setClickedLocation(location);
      setGeocoding(true);
      setResult(null);
    }
  };

  const handleReverseGeocodeResponse = (
    results: google.maps.GeocoderResult[],
    status: google.maps.GeocoderStatus
  ) => {
    setGeocoding(false);

    if (status === 'OK' && results.length > 0 && clickedLocation) {
      const addresses = results.slice(0, 5).map(result => ({
        formattedAddress: result.formatted_address,
        types: result.types,
        placeId: result.place_id
      }));

      setResult({
        coordinates: clickedLocation,
        addresses
      });
    } else {
      console.error('Reverse geocoding failed:', status);
      alert('Could not find address for this location');
    }
  };

  const clearResults = () => {
    setClickedLocation(null);
    setResult(null);
  };

  const getTypeIcon = (types: string[]) => {
    if (types.includes('street_address')) return '🏠';
    if (types.includes('route')) return '🛣️';
    if (types.includes('neighborhood')) return '🏘️';
    if (types.includes('locality')) return '🏙️';
    if (types.includes('administrative_area_level_1')) return '🗺️';
    if (types.includes('country')) return '🌍';
    return '📍';
  };

  const getTypePriority = (types: string[]) => {
    const priorities = {
      'street_address': 1,
      'route': 2,
      'intersection': 3,
      'neighborhood': 4,
      'locality': 5,
      'administrative_area_level_2': 6,
      'administrative_area_level_1': 7,
      'country': 8
    };
    
    for (const type of types) {
      if (priorities[type as keyof typeof priorities]) {
        return priorities[type as keyof typeof priorities];
      }
    }
    return 9;
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Reverse Geocoding</h3>
          <p>Click on the map to get address information for any location</p>
          
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            <strong>Instructions:</strong> Click anywhere on the map to get the address and location details for that point.
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button
              onClick={clearResults}
              disabled={!result && !clickedLocation}
              style={{
                padding: '8px 16px',
                backgroundColor: result || clickedLocation ? '#dc3545' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: result || clickedLocation ? 'pointer' : 'not-allowed'
              }}
            >
              Clear Results
            </button>
            
            <div style={{ 
              padding: '8px 12px', 
              backgroundColor: geocoding ? '#ffc107' : clickedLocation ? '#28a745' : '#6c757d',
              color: geocoding ? 'black' : 'white',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              Status: {geocoding ? 'Geocoding...' : clickedLocation ? 'Location Selected' : 'Click on Map'}
            </div>
          </div>

          {result && (
            <div style={{
              padding: '15px',
              backgroundColor: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '8px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>
                Location Information
              </h4>
              
              <div style={{ marginBottom: '15px', fontSize: '14px' }}>
                <strong>Coordinates:</strong> {result.coordinates.lat.toFixed(6)}, {result.coordinates.lng.toFixed(6)}
              </div>

              <h5 style={{ margin: '0 0 10px 0' }}>Addresses Found:</h5>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {result.addresses
                  .sort((a, b) => getTypePriority(a.types) - getTypePriority(b.types))
                  .map((address, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '10px',
                        backgroundColor: index === 0 ? '#e3f2fd' : '#f8f9fa',
                        borderRadius: '4px',
                        marginBottom: '8px',
                        border: index === 0 ? '1px solid #2196f3' : '1px solid #dee2e6'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '16px', marginRight: '8px', marginTop: '2px' }}>
                          {getTypeIcon(address.types)}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: index === 0 ? 'bold' : 'normal', marginBottom: '5px' }}>
                            {address.formattedAddress}
                          </div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            Types: {address.types.slice(0, 3).join(', ')}
                            {address.types.length > 3 && ` (+${address.types.length - 3} more)`}
                          </div>
                        </div>
                        {index === 0 && (
                          <span style={{
                            padding: '2px 6px',
                            backgroundColor: '#2196f3',
                            color: 'white',
                            borderRadius: '10px',
                            fontSize: '10px'
                          }}>
                            PRIMARY
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
          onClick={onMapClick}
          options={{
            cursor: 'crosshair'
          }}
        >
          {clickedLocation && (
            <Marker
              position={clickedLocation}
              title="Selected Location"
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#007bff',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
            />
          )}

          {geocoding && clickedLocation && (
            <Geocoder
              options={{
                location: clickedLocation
              }}
              callback={handleReverseGeocodeResponse}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default ReverseGeocoder;
```

### Batch Geocoding Tool
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Geocoder, Marker } from '@react-google-maps/api';

interface BatchGeocodeItem {
  id: number;
  address: string;
  status: 'pending' | 'processing' | 'success' | 'error';
  result?: {
    coordinates: google.maps.LatLngLiteral;
    formattedAddress: string;
    placeId: string;
  };
  error?: string;
}

const BatchGeocodingTool: React.FC = () => {
  const [addresses, setAddresses] = useState<string>('');
  const [geocodeItems, setGeocodeItems] = useState<BatchGeocodeItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const parseAddresses = () => {
    const addressList = addresses
      .split('\n')
      .map(addr => addr.trim())
      .filter(addr => addr.length > 0);

    const items: BatchGeocodeItem[] = addressList.map((address, index) => ({
      id: index,
      address,
      status: 'pending'
    }));

    setGeocodeItems(items);
  };

  const startBatchGeocoding = async () => {
    if (geocodeItems.length === 0) {
      parseAddresses();
      return;
    }

    setProcessing(true);
    
    for (let i = 0; i < geocodeItems.length; i++) {
      setCurrentIndex(i);
      
      // Update status to processing
      setGeocodeItems(prev => prev.map(item => 
        item.id === i ? { ...item, status: 'processing' } : item
      ));

      // Add delay between requests to avoid rate limiting
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Trigger geocoding for current item
      await geocodeItem(i);
    }

    setProcessing(false);
    setCurrentIndex(-1);
  };

  const geocodeItem = (index: number): Promise<void> => {
    return new Promise((resolve) => {
      const item = geocodeItems[index];
      
      // This would trigger the Geocoder component
      // For demo purposes, we'll simulate the response
      setTimeout(() => {
        // Simulate geocoding result
        const success = Math.random() > 0.2; // 80% success rate for demo
        
        if (success) {
          const mockResult = {
            coordinates: {
              lat: 24.7136 + (Math.random() - 0.5) * 0.1,
              lng: 46.6753 + (Math.random() - 0.5) * 0.1
            },
            formattedAddress: `${item.address}, Riyadh, Saudi Arabia`,
            placeId: `place_id_${index}`
          };

          setGeocodeItems(prev => prev.map(item => 
            item.id === index 
              ? { ...item, status: 'success', result: mockResult }
              : item
          ));
        } else {
          setGeocodeItems(prev => prev.map(item => 
            item.id === index 
              ? { ...item, status: 'error', error: 'Address not found' }
              : item
          ));
        }
        
        resolve();
      }, 500 + Math.random() * 1000);
    });
  };

  const clearResults = () => {
    setGeocodeItems([]);
    setAddresses('');
    setCurrentIndex(-1);
  };

  const exportResults = () => {
    const successfulResults = geocodeItems.filter(item => item.status === 'success');
    const csvContent = [
      'Address,Formatted Address,Latitude,Longitude,Place ID',
      ...successfulResults.map(item => 
        `"${item.address}","${item.result?.formattedAddress}",${item.result?.coordinates.lat},${item.result?.coordinates.lng},"${item.result?.placeId}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'geocoding_results.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: '⏳',
      processing: '🔄',
      success: '✅',
      error: '❌'
    };
    return icons[status as keyof typeof icons] || '❓';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: '#6c757d',
      processing: '#ffc107',
      success: '#28a745',
      error: '#dc3545'
    };
    return colors[status as keyof typeof colors] || '#6c757d';
  };

  const getStats = () => {
    return {
      total: geocodeItems.length,
      pending: geocodeItems.filter(item => item.status === 'pending').length,
      processing: geocodeItems.filter(item => item.status === 'processing').length,
      success: geocodeItems.filter(item => item.status === 'success').length,
      error: geocodeItems.filter(item => item.status === 'error').length
    };
  };

  const stats = getStats();
  const successfulResults = geocodeItems.filter(item => item.status === 'success' && item.result);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Batch Geocoding Tool</h3>
          <p>Geocode multiple addresses at once</p>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Enter Addresses (one per line):
            </label>
            <textarea
              value={addresses}
              onChange={(e) => setAddresses(e.target.value)}
              placeholder={`Kingdom Centre, Riyadh
Al Faisaliah Tower, Riyadh
Masmak Fortress, Riyadh
National Museum, Riyadh`}
              style={{
                width: '100%',
                height: '120px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                resize: 'vertical'
              }}
              disabled={processing}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={startBatchGeocoding}
              disabled={processing || (!addresses.trim() && geocodeItems.length === 0)}
              style={{
                padding: '10px 20px',
                backgroundColor: processing || (!addresses.trim() && geocodeItems.length === 0) ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: processing || (!addresses.trim() && geocodeItems.length === 0) ? 'not-allowed' : 'pointer'
              }}
            >
              {processing ? 'Processing...' : geocodeItems.length > 0 ? 'Start Geocoding' : 'Parse & Start'}
            </button>
            
            <button
              onClick={clearResults}
              disabled={processing}
              style={{
                padding: '10px 20px',
                backgroundColor: processing ? '#6c757d' : '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: processing ? 'not-allowed' : 'pointer'
              }}
            >
              Clear All
            </button>
            
            <button
              onClick={exportResults}
              disabled={stats.success === 0}
              style={{
                padding: '10px 20px',
                backgroundColor: stats.success > 0 ? '#28a745' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: stats.success > 0 ? 'pointer' : 'not-allowed'
              }}
            >
              Export CSV
            </button>
          </div>

          {geocodeItems.length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <h4>Progress Statistics:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px' }}>
                {Object.entries(stats).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      padding: '10px',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      border: '1px solid #dee2e6',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ 
                      fontSize: '20px', 
                      fontWeight: 'bold', 
                      color: key === 'total' ? '#007bff' : getStatusColor(key)
                    }}>
                      {value}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', textTransform: 'capitalize' }}>
                      {key}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {geocodeItems.length > 0 && (
            <div>
              <h4>Results:</h4>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {geocodeItems.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '10px',
                      backgroundColor: currentIndex === index ? '#fff3cd' : 'white',
                      borderRadius: '4px',
                      marginBottom: '5px',
                      border: `1px solid ${currentIndex === index ? '#ffc107' : '#dee2e6'}`,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: '16px', marginRight: '10px' }}>
                      {getStatusIcon(item.status)}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                        {item.address}
                      </div>
                      {item.result && (
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {item.result.formattedAddress} | 
                          {item.result.coordinates.lat.toFixed(4)}, {item.result.coordinates.lng.toFixed(4)}
                        </div>
                      )}
                      {item.error && (
                        <div style={{ fontSize: '12px', color: '#dc3545' }}>
                          Error: {item.error}
                        </div>
                      )}
                    </div>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: getStatusColor(item.status),
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '10px',
                      textTransform: 'uppercase'
                    }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={successfulResults.length > 0 ? 11 : 11}
          center={center}
        >
          {successfulResults.map((item) => (
            <Marker
              key={item.id}
              position={item.result!.coordinates}
              title={item.result!.formattedAddress}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#28a745',
                fillOpacity: 0.8,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BatchGeocodingTool;
```

## Best Practices

### 1. Request Optimization
```typescript
// Implement request caching
const useGeocodingCache = () => {
  const cache = useRef(new Map<string, GeocoderResult[]>());
  
  const getCacheKey = (request: GeocoderRequest) => {
    return JSON.stringify(request);
  };
  
  const getCachedResult = (request: GeocoderRequest) => {
    return cache.current.get(getCacheKey(request));
  };
  
  const setCachedResult = (request: GeocoderRequest, results: GeocoderResult[]) => {
    cache.current.set(getCacheKey(request), results);
  };
  
  return { getCachedResult, setCachedResult };
};

// Rate limiting for batch operations
const useRateLimit = (requestsPerSecond: number) => {
  const lastRequest = useRef(0);
  
  const waitForRateLimit = async () => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequest.current;
    const minInterval = 1000 / requestsPerSecond;
    
    if (timeSinceLastRequest < minInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, minInterval - timeSinceLastRequest)
      );
    }
    
    lastRequest.current = Date.now();
  };
  
  return { waitForRateLimit };
};
```

### 2. Error Handling
```typescript
// Comprehensive error handling
const handleGeocodingError = (status: google.maps.GeocoderStatus) => {
  const errorHandlers = {
    'ZERO_RESULTS': () => 'No results found. Try a more specific address.',
    'OVER_QUERY_LIMIT': () => 'Too many requests. Please wait and try again.',
    'REQUEST_DENIED': () => 'Request denied. Check your API key permissions.',
    'INVALID_REQUEST': () => 'Invalid request. Check your input parameters.',
    'UNKNOWN_ERROR': () => 'Server error. Please try again later.'
  };
  
  const handler = errorHandlers[status];
  return handler ? handler() : 'Geocoding failed with unknown error';
};

// Retry logic for failed requests
const useGeocodingRetry = (maxRetries: number = 3) => {
  const retryGeocoding = async (
    request: GeocoderRequest,
    callback: (results: GeocoderResult[], status: GeocoderStatus) => void
  ) => {
    let attempts = 0;
    
    const attemptGeocoding = () => {
      attempts++;
      
      // Trigger geocoding (this would be done through the component)
      // On failure, retry if attempts < maxRetries
    };
    
    attemptGeocoding();
  };
  
  return { retryGeocoding };
};
```

### 3. Performance Optimization
```typescript
// Debounce geocoding requests
const useDebouncedGeocoding = (delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// Batch processing for multiple addresses
const processBatch = async (
  addresses: string[],
  batchSize: number = 5,
  delay: number = 200
) => {
  const results = [];
  
  for (let i = 0; i < addresses.length; i += batchSize) {
    const batch = addresses.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(address => geocodeAddress(address))
    );
    
    results.push(...batchResults);
    
    // Add delay between batches
    if (i + batchSize < addresses.length) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return results;
};
```

## Common Issues and Solutions

### 1. Rate limiting errors
- Implement proper delays between requests
- Use caching to avoid redundant requests
- Consider upgrading to higher quota limits

### 2. Ambiguous addresses
- Use component restrictions to narrow results
- Provide bounds to bias results to specific areas
- Ask users for more specific information

### 3. No results found
- Implement fuzzy matching or suggestions
- Provide alternative search methods
- Guide users on proper address formatting

### 4. Performance issues with batch processing
- Implement proper rate limiting
- Use pagination for large datasets
- Consider server-side processing for very large batches

## Important Notes

- Geocoder must be a child of GoogleMap component
- API quotas apply - monitor usage carefully
- Results are cached by Google for performance
- Use component restrictions to improve accuracy
- Implement proper error handling for production use
- Consider using Places API for more advanced search features
- Batch operations should include rate limiting
- Cache results locally to improve performance and reduce API calls