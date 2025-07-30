# Autocomplete Component

## Overview
`Autocomplete` is a component that provides place search functionality with auto-completion suggestions. It enhances input fields with Google Places API integration, allowing users to search for and select places easily.

## Import
```typescript
import { Autocomplete } from '@react-google-maps/api';
```

## Requirements
The `places` library must be loaded for Autocomplete to work:
```typescript
const libraries = ["places"];
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactElement` | ✅ | - | Input element to enhance |
| `options` | `AutocompleteOptions` | ❌ | - | Autocomplete configuration options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(autocomplete: google.maps.places.Autocomplete) => void` | Called when autocomplete loads |
| `onUnmount` | `(autocomplete: google.maps.places.Autocomplete) => void` | Called when autocomplete unmounts |
| `onPlaceChanged` | `() => void` | Called when user selects a place |

## AutocompleteOptions

| Option | Type | Description |
|--------|------|-------------|
| `bounds` | `LatLngBounds \| LatLngBoundsLiteral` | Bias results to specific area |
| `componentRestrictions` | `ComponentRestrictions` | Restrict results by country |
| `fields` | `string[]` | Specify which place data to return |
| `strictBounds` | `boolean` | Restrict results to bounds area only |
| `types` | `string[]` | Filter results by place types |

## Usage Examples

### Basic Autocomplete
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

const BasicAutocomplete: React.FC = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.LatLngLiteral | null>(null);
  const [placeName, setPlaceName] = useState('');

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        
        setSelectedPlace(location);
        setPlaceName(place.name || place.formatted_address || '');
        console.log('Selected place:', place);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div>
        <div style={{ marginBottom: '10px' }}>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
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
                textOverflow: 'ellipses'
              }}
            />
          </Autocomplete>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={selectedPlace || center}
        >
          {selectedPlace && (
            <Marker
              position={selectedPlace}
              title={placeName}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicAutocomplete;
```

### Autocomplete with Restrictions
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

const RestrictedAutocomplete: React.FC = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.LatLngLiteral | null>(null);
  const [placeDetails, setPlaceDetails] = useState<any>(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Restrict to Saudi Arabia
  const autocompleteOptions = {
    componentRestrictions: { country: 'sa' },
    fields: [
      'place_id',
      'geometry',
      'name',
      'formatted_address',
      'types',
      'address_components',
      'international_phone_number',
      'website',
      'rating'
    ],
    types: ['establishment', 'geocode'] // Restrict to establishments and addresses
  };

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        
        setSelectedPlace(location);
        setPlaceDetails(place);
        console.log('Selected place details:', place);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div>
        <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Place Search (Saudi Arabia Only)</h3>
          <p>Search for establishments and addresses in Saudi Arabia</p>
          
          <Autocomplete 
            onLoad={onLoad} 
            onPlaceChanged={onPlaceChanged}
            options={autocompleteOptions}
          >
            <input
              type="text"
              placeholder="Search for places in Saudi Arabia..."
              style={{
                boxSizing: 'border-box',
                border: '2px solid #007bff',
                width: '100%',
                height: '40px',
                padding: '0 15px',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </Autocomplete>

          {placeDetails && (
            <div style={{ 
              marginTop: '15px', 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>
                {placeDetails.name || 'Selected Place'}
              </h4>
              
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                <strong>Address:</strong> {placeDetails.formatted_address}
              </div>
              
              {placeDetails.types && (
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  <strong>Types:</strong> {placeDetails.types.join(', ')}
                </div>
              )}
              
              {placeDetails.rating && (
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  <strong>Rating:</strong> {placeDetails.rating}/5 ⭐
                </div>
              )}
              
              {placeDetails.international_phone_number && (
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  <strong>Phone:</strong> {placeDetails.international_phone_number}
                </div>
              )}
              
              {placeDetails.website && (
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <strong>Website:</strong> 
                  <a 
                    href={placeDetails.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ marginLeft: '5px', color: '#007bff' }}
                  >
                    {placeDetails.website}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={selectedPlace ? 15 : 10}
          center={selectedPlace || center}
        >
          {selectedPlace && (
            <Marker
              position={selectedPlace}
              title={placeDetails?.name || 'Selected Place'}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default RestrictedAutocomplete;
```

### Multiple Autocomplete Inputs
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

interface PlaceInfo {
  location: google.maps.LatLngLiteral;
  name: string;
}

const MultipleAutocomplete: React.FC = () => {
  const [fromAutocomplete, setFromAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [toAutocomplete, setToAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [fromPlace, setFromPlace] = useState<PlaceInfo | null>(null);
  const [toPlace, setToPlace] = useState<PlaceInfo | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onFromLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setFromAutocomplete(autocompleteInstance);
  };

  const onToLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setToAutocomplete(autocompleteInstance);
  };

  const onFromPlaceChanged = () => {
    if (fromAutocomplete !== null) {
      const place = fromAutocomplete.getPlace();
      
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        
        setFromPlace({
          location,
          name: place.name || place.formatted_address || 'From Location'
        });
      }
    }
  };

  const onToPlaceChanged = () => {
    if (toAutocomplete !== null) {
      const place = toAutocomplete.getPlace();
      
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        
        setToPlace({
          location,
          name: place.name || place.formatted_address || 'To Location'
        });
      }
    }
  };

  const calculateRoute = () => {
    if (fromPlace && toPlace) {
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: fromPlace.location,
          destination: toPlace.location,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            console.error('Directions request failed:', status);
            alert('Could not calculate route. Please try different locations.');
          }
        }
      );
    }
  };

  const clearRoute = () => {
    setDirections(null);
    setFromPlace(null);
    setToPlace(null);
  };

  const getMapCenter = () => {
    if (fromPlace && toPlace) {
      return {
        lat: (fromPlace.location.lat + toPlace.location.lat) / 2,
        lng: (fromPlace.location.lng + toPlace.location.lng) / 2
      };
    }
    return fromPlace?.location || toPlace?.location || center;
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Route Planner</h3>
          <p>Enter starting and destination points to calculate a route</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                From:
              </label>
              <Autocomplete 
                onLoad={onFromLoad} 
                onPlaceChanged={onFromPlaceChanged}
                options={{ componentRestrictions: { country: 'sa' } }}
              >
                <input
                  type="text"
                  placeholder="Enter starting point..."
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 15px',
                    border: '2px solid #28a745',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </Autocomplete>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                To:
              </label>
              <Autocomplete 
                onLoad={onToLoad} 
                onPlaceChanged={onToPlaceChanged}
                options={{ componentRestrictions: { country: 'sa' } }}
              >
                <input
                  type="text"
                  placeholder="Enter destination..."
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 15px',
                    border: '2px solid #dc3545',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </Autocomplete>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={calculateRoute}
              disabled={!fromPlace || !toPlace}
              style={{
                padding: '10px 20px',
                backgroundColor: fromPlace && toPlace ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: fromPlace && toPlace ? 'pointer' : 'not-allowed',
                fontWeight: 'bold'
              }}
            >
              Calculate Route
            </button>
            
            <button
              onClick={clearRoute}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>

            {fromPlace && toPlace && (
              <div style={{ 
                padding: '8px 12px', 
                backgroundColor: '#d4edda', 
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                ✅ Ready to calculate route
              </div>
            )}
          </div>

          {(fromPlace || toPlace) && (
            <div style={{ marginTop: '15px', fontSize: '14px' }}>
              {fromPlace && (
                <div style={{ marginBottom: '5px' }}>
                  <span style={{ color: '#28a745', fontWeight: 'bold' }}>From:</span> {fromPlace.name}
                </div>
              )}
              {toPlace && (
                <div>
                  <span style={{ color: '#dc3545', fontWeight: 'bold' }}>To:</span> {toPlace.name}
                </div>
              )}
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={directions ? 10 : 12}
          center={getMapCenter()}
        >
          {fromPlace && !directions && (
            <Marker
              position={fromPlace.location}
              title={fromPlace.name}
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

          {toPlace && !directions && (
            <Marker
              position={toPlace.location}
              title={toPlace.name}
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

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: false,
                polylineOptions: {
                  strokeColor: '#007bff',
                  strokeWeight: 5,
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

export default MultipleAutocomplete;
```

### Autocomplete with Custom Styling
```typescript
import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

const StyledAutocomplete: React.FC = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.LatLngLiteral | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      setIsLoading(true);
      const place = autocomplete.getPlace();
      
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        
        setSelectedPlace(location);
        setInputValue(place.formatted_address || place.name || '');
      }
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setInputValue('');
    setSelectedPlace(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <Autocomplete 
              onLoad={onLoad} 
              onPlaceChanged={onPlaceChanged}
              options={{
                componentRestrictions: { country: 'sa' },
                types: ['establishment', 'geocode']
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="🔍 Search for places..."
                style={{
                  width: '100%',
                  height: '50px',
                  padding: '0 50px 0 20px',
                  border: '2px solid #e9ecef',
                  borderRadius: '25px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#007bff';
                  e.target.style.boxShadow = '0 4px 20px rgba(0,123,255,0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }}
              />
            </Autocomplete>

            {/* Loading indicator */}
            {isLoading && (
              <div style={{
                position: 'absolute',
                right: '45px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                border: '2px solid #f3f3f3',
                borderTop: '2px solid #007bff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            )}

            {/* Clear button */}
            {inputValue && !isLoading && (
              <button
                onClick={clearSearch}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '30px',
                  height: '30px',
                  border: 'none',
                  borderRadius: '50%',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            )}
          </div>

          {selectedPlace && (
            <div style={{
              marginTop: '10px',
              padding: '15px',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              maxWidth: '400px'
            }}>
              <span style={{ marginRight: '10px', fontSize: '20px' }}>📍</span>
              <div>
                <div style={{ fontWeight: 'bold', color: '#155724' }}>
                  Location Selected
                </div>
                <div style={{ fontSize: '14px', color: '#155724' }}>
                  {inputValue}
                </div>
              </div>
            </div>
          )}
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: translateY(-50%) rotate(0deg); }
              100% { transform: translateY(-50%) rotate(360deg); }
            }
          `}
        </style>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={selectedPlace ? 15 : 12}
          center={selectedPlace || center}
        >
          {selectedPlace && (
            <Marker
              position={selectedPlace}
              title={inputValue}
              animation={window.google.maps.Animation.DROP}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default StyledAutocomplete;
```

## Data Types

### AutocompleteOptions
```typescript
interface AutocompleteOptions {
  bounds?: LatLngBounds | LatLngBoundsLiteral;
  componentRestrictions?: ComponentRestrictions;
  fields?: string[];
  strictBounds?: boolean;
  types?: string[];
}
```

### ComponentRestrictions
```typescript
interface ComponentRestrictions {
  country: string | string[];
}
```

### Available Fields
```typescript
const availableFields = [
  'address_components',
  'adr_address',
  'business_status',
  'formatted_address',
  'geometry',
  'icon',
  'icon_mask_base_uri',
  'icon_background_color',
  'name',
  'permanently_closed',
  'photos',
  'place_id',
  'plus_code',
  'types',
  'url',
  'utc_offset_minutes',
  'vicinity',
  'website',
  'price_level',
  'rating',
  'opening_hours',
  'international_phone_number'
];
```

### Place Types
```typescript
const placeTypes = [
  'address',
  'administrative_area_level_1',
  'administrative_area_level_2',
  'country',
  'establishment',
  'finance',
  'food',
  'general_contractor',
  'geocode',
  'health',
  'locality',
  'lodging',
  'postal_code',
  'route',
  'shopping_mall',
  'store',
  'sublocality',
  'transit_station'
];
```

## Best Practices

### 1. Performance Optimization
```typescript
// Specify only required fields
const autocompleteOptions = {
  fields: ['place_id', 'geometry', 'name', 'formatted_address'],
  types: ['establishment'] // Limit to specific types
};

// Use component restrictions to limit search area
const restrictedOptions = {
  componentRestrictions: { country: 'sa' },
  bounds: saudiBounds // Bias to specific region
};
```

### 2. Error Handling
```typescript
const onPlaceChanged = () => {
  if (autocomplete !== null) {
    const place = autocomplete.getPlace();
    
    if (!place.geometry) {
      console.error('No geometry available for this place');
      alert('Please select a place from the dropdown');
      return;
    }
    
    // Process valid place
    handleValidPlace(place);
  }
};
```

### 3. User Experience
```typescript
// Provide clear feedback
const [searchStatus, setSearchStatus] = useState<'idle' | 'searching' | 'found' | 'error'>('idle');

// Clear previous results when typing
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
  if (e.target.value === '') {
    setSelectedPlace(null);
  }
};
```

## Common Issues and Solutions

### 1. Places library not loaded
- Ensure 'places' is included in libraries array
- Check that LoadScript includes the places library

### 2. No results or limited results
- Check component restrictions
- Verify API key has Places API enabled
- Consider expanding search bounds

### 3. Input not working with controlled components
- Use uncontrolled input for autocomplete
- Handle value changes carefully to avoid conflicts

### 4. Styling issues
- Autocomplete modifies input styling
- Use CSS specificity to override default styles

## Important Notes

- Autocomplete requires the Places library to be loaded
- The child must be an HTML input element
- Use uncontrolled inputs for better compatibility
- Specify fields to optimize API usage and costs
- Component restrictions help improve relevance
- Place selection triggers onPlaceChanged event
- Access place details through autocomplete.getPlace()
- Consider implementing debouncing for better performance