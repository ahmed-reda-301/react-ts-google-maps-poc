# StandaloneSearchBox Component

## Overview
`StandaloneSearchBox` is a component that provides place search functionality without being tied to a specific map. It offers autocomplete suggestions and place details, making it useful for location input forms and search interfaces.

## Import
```typescript
import { StandaloneSearchBox } from '@react-google-maps/api';
```

## Requirements
The `places` library must be loaded for StandaloneSearchBox to work:
```typescript
const libraries = ["places"];
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactElement` | ✅ | - | Input element to enhance |
| `options` | `SearchBoxOptions` | ❌ | - | Search box configuration options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(searchBox: google.maps.places.SearchBox) => void` | Called when search box loads |
| `onUnmount` | `(searchBox: google.maps.places.SearchBox) => void` | Called when search box unmounts |
| `onPlacesChanged` | `() => void` | Called when places are selected |

## SearchBoxOptions

| Option | Type | Description |
|--------|------|-------------|
| `bounds` | `LatLngBounds \| LatLngBoundsLiteral` | Bias results to specific area |

## Usage Examples

### Basic Standalone Search Box
```typescript
import React, { useState } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

const BasicStandaloneSearchBox: React.FC = () => {
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    if (searchBox !== null) {
      const selectedPlaces = searchBox.getPlaces();
      if (selectedPlaces) {
        setPlaces(selectedPlaces);
        console.log('Selected places:', selectedPlaces);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h3>Basic Standalone Search Box</h3>
        <p>Search for places without needing a map</p>
        
        <div style={{ marginBottom: '20px' }}>
          <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
            <input
              type="text"
              placeholder="Search for places..."
              style={{
                boxSizing: 'border-box',
                border: '2px solid #007bff',
                width: '100%',
                height: '50px',
                padding: '0 20px',
                borderRadius: '25px',
                fontSize: '16px',
                outline: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
          </StandaloneSearchBox>
        </div>

        {places.length > 0 && (
          <div>
            <h4>Search Results:</h4>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {places.map((place, index) => (
                <div
                  key={index}
                  style={{
                    padding: '15px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    border: '1px solid #dee2e6'
                  }}
                >
                  <h5 style={{ margin: '0 0 8px 0', color: '#007bff' }}>
                    {place.name}
                  </h5>
                  
                  {place.formatted_address && (
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                      📍 {place.formatted_address}
                    </p>
                  )}
                  
                  {place.geometry?.location && (
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                      🌍 {place.geometry.location.lat().toFixed(6)}, {place.geometry.location.lng().toFixed(6)}
                    </p>
                  )}
                  
                  {place.types && (
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      <strong>Types:</strong> {place.types.slice(0, 3).join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default BasicStandaloneSearchBox;
```

### Location Input Form
```typescript
import React, { useState } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

interface LocationData {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  placeId: string;
}

const LocationInputForm: React.FC = () => {
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: ''
  });

  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    if (searchBox !== null) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        
        if (place.geometry?.location) {
          setSelectedLocation({
            name: place.name || '',
            address: place.formatted_address || '',
            coordinates: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            },
            placeId: place.place_id || ''
          });
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      alert('Please select a location');
      return;
    }

    const submissionData = {
      ...formData,
      location: selectedLocation
    };

    console.log('Form submitted:', submissionData);
    alert('Form submitted successfully! Check console for details.');
  };

  const clearLocation = () => {
    setSelectedLocation(null);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h3>Business Registration Form</h3>
        <p>Enter your business details and location</p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Business Name *
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                height: '40px',
                padding: '0 15px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Contact Person *
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                height: '40px',
                padding: '0 15px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Business Location *
            </label>
            <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
              <input
                type="text"
                placeholder="Search for your business location..."
                style={{
                  width: '100%',
                  height: '50px',
                  padding: '0 20px',
                  border: '2px solid #007bff',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </StandaloneSearchBox>
          </div>

          {selectedLocation && (
            <div style={{
              padding: '15px',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h5 style={{ margin: '0 0 8px 0', color: '#155724' }}>
                    ✅ Location Selected
                  </h5>
                  <div style={{ fontSize: '14px', color: '#155724' }}>
                    <div><strong>Name:</strong> {selectedLocation.name}</div>
                    <div><strong>Address:</strong> {selectedLocation.address}</div>
                    <div><strong>Coordinates:</strong> {selectedLocation.coordinates.lat.toFixed(6)}, {selectedLocation.coordinates.lng.toFixed(6)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearLocation}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Register Business
          </button>
        </form>
      </div>
    </LoadScript>
  );
};

export default LocationInputForm;
```

### Multi-Location Search
```typescript
import React, { useState } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

interface SavedLocation {
  id: number;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: string;
  notes: string;
}

const MultiLocationSearch: React.FC = () => {
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [currentPlace, setCurrentPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  const categories = [
    'Restaurant',
    'Hotel',
    'Shopping',
    'Office',
    'Hospital',
    'School',
    'Gas Station',
    'Bank',
    'Other'
  ];

  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    if (searchBox !== null) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        setCurrentPlace(places[0]);
      }
    }
  };

  const saveLocation = () => {
    if (!currentPlace || !currentPlace.geometry?.location) {
      alert('Please select a location first');
      return;
    }

    if (!category) {
      alert('Please select a category');
      return;
    }

    const newLocation: SavedLocation = {
      id: Date.now(),
      name: currentPlace.name || 'Unknown Place',
      address: currentPlace.formatted_address || '',
      coordinates: {
        lat: currentPlace.geometry.location.lat(),
        lng: currentPlace.geometry.location.lng()
      },
      category,
      notes
    };

    setSavedLocations(prev => [...prev, newLocation]);
    setCurrentPlace(null);
    setCategory('');
    setNotes('');
    
    // Clear the search input
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input) input.value = '';
  };

  const removeLocation = (id: number) => {
    setSavedLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const exportLocations = () => {
    const dataStr = JSON.stringify(savedLocations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'saved-locations.json';
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const clearAllLocations = () => {
    if (window.confirm('Are you sure you want to clear all saved locations?')) {
      setSavedLocations([]);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Restaurant': '🍽️',
      'Hotel': '🏨',
      'Shopping': '🛍️',
      'Office': '🏢',
      'Hospital': '🏥',
      'School': '🏫',
      'Gas Station': '⛽',
      'Bank': '🏦',
      'Other': '📍'
    };
    return icons[category] || '📍';
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h3>Location Collection Tool</h3>
        <p>Search and save multiple locations with categories and notes</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 300px', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Search Section */}
          <div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Search for Location
              </label>
              <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                <input
                  type="text"
                  placeholder="Search for places..."
                  style={{
                    width: '100%',
                    height: '50px',
                    padding: '0 20px',
                    border: '2px solid #007bff',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </StandaloneSearchBox>
            </div>

            {currentPlace && (
              <div style={{
                padding: '15px',
                backgroundColor: '#e3f2fd',
                border: '1px solid #2196f3',
                borderRadius: '8px',
                marginBottom: '15px'
              }}>
                <h5 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>
                  Selected: {currentPlace.name}
                </h5>
                <p style={{ margin: '0', fontSize: '14px', color: '#1976d2' }}>
                  {currentPlace.formatted_address}
                </p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select category...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional notes..."
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <button
              onClick={saveLocation}
              disabled={!currentPlace || !category}
              style={{
                width: '100%',
                height: '50px',
                backgroundColor: currentPlace && category ? '#28a745' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: currentPlace && category ? 'pointer' : 'not-allowed'
              }}
            >
              Save Location
            </button>
          </div>

          {/* Statistics Panel */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h4 style={{ margin: '0 0 15px 0' }}>Statistics</h4>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
                {savedLocations.length}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Total Locations
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h5>By Category:</h5>
              {categories.map(cat => {
                const count = savedLocations.filter(loc => loc.category === cat).length;
                if (count === 0) return null;
                
                return (
                  <div key={cat} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    marginBottom: '5px'
                  }}>
                    <span>{getCategoryIcon(cat)} {cat}</span>
                    <span style={{ fontWeight: 'bold' }}>{count}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={exportLocations}
                disabled={savedLocations.length === 0}
                style={{
                  padding: '8px 16px',
                  backgroundColor: savedLocations.length > 0 ? '#17a2b8' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: savedLocations.length > 0 ? 'pointer' : 'not-allowed',
                  fontSize: '14px'
                }}
              >
                Export JSON
              </button>
              
              <button
                onClick={clearAllLocations}
                disabled={savedLocations.length === 0}
                style={{
                  padding: '8px 16px',
                  backgroundColor: savedLocations.length > 0 ? '#dc3545' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: savedLocations.length > 0 ? 'pointer' : 'not-allowed',
                  fontSize: '14px'
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Saved Locations List */}
        {savedLocations.length > 0 && (
          <div>
            <h4>Saved Locations ({savedLocations.length})</h4>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {savedLocations.map(location => (
                <div
                  key={location.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    border: '1px solid #dee2e6'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                      <span style={{ fontSize: '20px', marginRight: '8px' }}>
                        {getCategoryIcon(location.category)}
                      </span>
                      <strong style={{ fontSize: '16px' }}>{location.name}</strong>
                    </div>
                    
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                      📍 {location.address}
                    </div>
                    
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                      🌍 {location.coordinates.lat.toFixed(6)}, {location.coordinates.lng.toFixed(6)}
                    </div>
                    
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      <span style={{ 
                        padding: '2px 6px', 
                        backgroundColor: '#e9ecef', 
                        borderRadius: '3px',
                        marginRight: '8px'
                      }}>
                        {location.category}
                      </span>
                      {location.notes && (
                        <span>📝 {location.notes}</span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeLocation(location.id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default MultiLocationSearch;
```

### Search with Bounds Restriction
```typescript
import React, { useState } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

const BoundedSearch: React.FC = () => {
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [selectedBounds, setSelectedBounds] = useState('riyadh');

  const predefinedBounds = {
    riyadh: {
      name: 'Riyadh, Saudi Arabia',
      bounds: {
        north: 24.8,
        south: 24.6,
        east: 46.8,
        west: 46.5
      }
    },
    jeddah: {
      name: 'Jeddah, Saudi Arabia',
      bounds: {
        north: 21.7,
        south: 21.4,
        east: 39.3,
        west: 39.0
      }
    },
    dammam: {
      name: 'Dammam, Saudi Arabia',
      bounds: {
        north: 26.5,
        south: 26.3,
        east: 50.2,
        west: 49.9
      }
    },
    worldwide: {
      name: 'Worldwide',
      bounds: null
    }
  };

  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
    
    // Set initial bounds
    if (selectedBounds !== 'worldwide') {
      const bounds = predefinedBounds[selectedBounds as keyof typeof predefinedBounds].bounds;
      if (bounds) {
        const googleBounds = new window.google.maps.LatLngBounds(
          { lat: bounds.south, lng: bounds.west },
          { lat: bounds.north, lng: bounds.east }
        );
        ref.setBounds(googleBounds);
      }
    }
  };

  const onPlacesChanged = () => {
    if (searchBox !== null) {
      const selectedPlaces = searchBox.getPlaces();
      if (selectedPlaces) {
        setPlaces(selectedPlaces);
      }
    }
  };

  const handleBoundsChange = (boundsKey: string) => {
    setSelectedBounds(boundsKey);
    setPlaces([]);
    
    if (searchBox) {
      if (boundsKey === 'worldwide') {
        // Remove bounds restriction
        searchBox.setBounds(undefined);
      } else {
        const bounds = predefinedBounds[boundsKey as keyof typeof predefinedBounds].bounds;
        if (bounds) {
          const googleBounds = new window.google.maps.LatLngBounds(
            { lat: bounds.south, lng: bounds.west },
            { lat: bounds.north, lng: bounds.east }
          );
          searchBox.setBounds(googleBounds);
        }
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
        <h3>Bounded Search</h3>
        <p>Search results are biased to the selected geographic area</p>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Search Area:
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
            {Object.entries(predefinedBounds).map(([key, area]) => (
              <button
                key={key}
                onClick={() => handleBoundsChange(key)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: selectedBounds === key ? '#007bff' : 'white',
                  color: selectedBounds === key ? 'white' : '#007bff',
                  border: '2px solid #007bff',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                {area.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
            <input
              type="text"
              placeholder={`Search in ${predefinedBounds[selectedBounds as keyof typeof predefinedBounds].name}...`}
              style={{
                width: '100%',
                height: '50px',
                padding: '0 20px',
                border: '2px solid #007bff',
                borderRadius: '25px',
                fontSize: '16px',
                outline: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
          </StandaloneSearchBox>
        </div>

        <div style={{
          padding: '10px 15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '14px',
          color: '#1976d2'
        }}>
          <strong>Current Search Area:</strong> {predefinedBounds[selectedBounds as keyof typeof predefinedBounds].name}
          {selectedBounds !== 'worldwide' && (
            <div style={{ marginTop: '5px', fontSize: '12px' }}>
              Results will be biased to this geographic area, but may include places from other areas if they're highly relevant.
            </div>
          )}
        </div>

        {places.length > 0 && (
          <div>
            <h4>Search Results ({places.length}):</h4>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {places.map((place, index) => (
                <div
                  key={index}
                  style={{
                    padding: '15px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    border: '1px solid #dee2e6'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h5 style={{ margin: '0 0 8px 0', color: '#007bff' }}>
                        {place.name}
                      </h5>
                      
                      {place.formatted_address && (
                        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                          📍 {place.formatted_address}
                        </p>
                      )}
                      
                      {place.geometry?.location && (
                        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                          🌍 {place.geometry.location.lat().toFixed(6)}, {place.geometry.location.lng().toFixed(6)}
                        </p>
                      )}
                      
                      {place.rating && (
                        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                          ⭐ {place.rating}/5
                        </p>
                      )}
                      
                      {place.types && (
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          <strong>Types:</strong> {place.types.slice(0, 3).join(', ')}
                        </div>
                      )}
                    </div>
                    
                    {place.photos && place.photos.length > 0 && (
                      <div style={{ marginLeft: '15px' }}>
                        <img
                          src={place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })}
                          alt={place.name}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default BoundedSearch;
```

## Data Types

### SearchBoxOptions
```typescript
interface SearchBoxOptions {
  bounds?: LatLngBounds | LatLngBoundsLiteral;
}
```

### PlaceResult (Key Properties)
```typescript
interface PlaceResult {
  address_components?: GeocoderAddressComponent[];
  formatted_address?: string;
  geometry?: PlaceGeometry;
  name?: string;
  place_id?: string;
  types?: string[];
  rating?: number;
  photos?: PlacePhoto[];
  website?: string;
  international_phone_number?: string;
}
```

## Best Practices

### 1. Input Handling
```typescript
// Use uncontrolled inputs for better compatibility
const SearchInput = () => (
  <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
    <input
      type="text"
      placeholder="Search places..."
      // Don't use value prop for controlled input
    />
  </StandaloneSearchBox>
);

// Clear input programmatically
const clearInput = () => {
  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
  if (input) input.value = '';
};
```

### 2. Error Handling
```typescript
const onPlacesChanged = () => {
  if (searchBox !== null) {
    try {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        setPlaces(places);
      } else {
        console.log('No places found');
      }
    } catch (error) {
      console.error('Error getting places:', error);
    }
  }
};
```

### 3. Performance Optimization
```typescript
// Debounce place changes
const debouncedPlacesChanged = useCallback(
  debounce(() => {
    onPlacesChanged();
  }, 300),
  [searchBox]
);

// Limit results
const onPlacesChanged = () => {
  if (searchBox !== null) {
    const places = searchBox.getPlaces();
    if (places) {
      setPlaces(places.slice(0, 10)); // Limit to 10 results
    }
  }
};
```

## Common Issues and Solutions

### 1. Places library not loaded
- Ensure 'places' is included in libraries array
- Check that LoadScript includes the places library

### 2. Search box not working
- Verify the child is an HTML input element
- Check if API key has Places API enabled

### 3. No results returned
- Check if bounds are too restrictive
- Verify search terms are valid
- Ensure network connectivity

### 4. Input value not clearing
- Use uncontrolled input approach
- Clear input programmatically using DOM manipulation

## Important Notes

- StandaloneSearchBox requires the Places library to be loaded
- The child must be an HTML input element
- Use uncontrolled inputs for better compatibility
- Bounds bias results but don't strictly limit them
- Access place details through searchBox.getPlaces()
- Consider implementing result limits for better performance
- Handle cases where no places are found
- The component works independently of GoogleMap