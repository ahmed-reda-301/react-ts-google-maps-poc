# InfoWindow Component

## Overview
`InfoWindow` displays content in a popup window above the map, typically used to show information about a specific location or marker. It's commonly used in conjunction with markers to provide additional details.

## Import
```typescript
import { InfoWindow } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `position` | `LatLngLiteral \| LatLng` | ❌ | - | InfoWindow position (if not anchored to marker) |
| `children` | `React.ReactNode` | ❌ | - | Content to display inside InfoWindow |
| `options` | `InfoWindowOptions` | ❌ | - | Additional InfoWindow options |

### Display Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `zIndex` | `number` | - | InfoWindow z-index |
| `pixelOffset` | `Size` | - | Offset from anchor point |
| `disableAutoPan` | `boolean` | `false` | Disable auto-panning to show InfoWindow |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(infoWindow: google.maps.InfoWindow) => void` | Called when InfoWindow loads |
| `onUnmount` | `(infoWindow: google.maps.InfoWindow) => void` | Called when InfoWindow unmounts |
| `onCloseClick` | `() => void` | Called when close button is clicked |
| `onContentChanged` | `() => void` | Called when content changes |
| `onDomReady` | `() => void` | Called when DOM is ready |
| `onPositionChanged` | `() => void` | Called when position changes |
| `onZIndexChanged` | `() => void` | Called when z-index changes |

## Usage Examples

### Basic InfoWindow
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const BasicInfoWindow: React.FC = () => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);

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
          onClick={() => setShowInfoWindow(true)}
        />

        {showInfoWindow && (
          <InfoWindow
            position={center}
            onCloseClick={() => setShowInfoWindow(false)}
          >
            <div>
              <h3>Riyadh, Saudi Arabia</h3>
              <p>The capital and largest city of Saudi Arabia</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default BasicInfoWindow;
```

### InfoWindow with Rich Content
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface PlaceInfo {
  id: number;
  name: string;
  position: google.maps.LatLngLiteral;
  description: string;
  image: string;
  rating: number;
  website?: string;
}

const RichInfoWindow: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<PlaceInfo | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const places: PlaceInfo[] = [
    {
      id: 1,
      name: "Kingdom Centre",
      position: { lat: 24.7116, lng: 46.6753 },
      description: "A 99-story skyscraper and one of the most recognizable landmarks in Riyadh",
      image: "https://example.com/kingdom-centre.jpg",
      rating: 4.5,
      website: "https://kingdomcentre.com.sa"
    },
    {
      id: 2,
      name: "Al Faisaliah Tower",
      position: { lat: 24.6877, lng: 46.6857 },
      description: "The first skyscraper constructed in Saudi Arabia, featuring a distinctive ball-shaped top",
      image: "https://example.com/al-faisaliah.jpg",
      rating: 4.3,
      website: "https://alfaisaliah.com"
    }
  ];

  const InfoWindowContent = ({ place }: { place: PlaceInfo }) => (
    <div style={{ 
      maxWidth: '300px', 
      padding: '10px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <img 
          src={place.image} 
          alt={place.name}
          style={{ 
            width: '100%', 
            height: '150px', 
            objectFit: 'cover',
            borderRadius: '8px'
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x150?text=No+Image';
          }}
        />
      </div>
      
      <h3 style={{ 
        margin: '0 0 8px 0', 
        fontSize: '18px',
        color: '#333'
      }}>
        {place.name}
      </h3>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '8px' 
      }}>
        <span style={{ color: '#ffa500', marginRight: '5px' }}>
          {'★'.repeat(Math.floor(place.rating))}
          {'☆'.repeat(5 - Math.floor(place.rating))}
        </span>
        <span style={{ fontSize: '14px', color: '#666' }}>
          {place.rating}/5
        </span>
      </div>
      
      <p style={{ 
        margin: '0 0 10px 0', 
        fontSize: '14px',
        lineHeight: '1.4',
        color: '#555'
      }}>
        {place.description}
      </p>
      
      {place.website && (
        <a 
          href={place.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        >
          Visit Website
        </a>
      )}
    </div>
  );

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
            onClick={() => setSelectedPlace(place)}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={selectedPlace.position}
            onCloseClick={() => setSelectedPlace(null)}
            options={{
              pixelOffset: new window.google.maps.Size(0, -30)
            }}
          >
            <InfoWindowContent place={selectedPlace} />
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default RichInfoWindow;
```

### Multiple InfoWindows
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface Location {
  id: number;
  name: string;
  position: google.maps.LatLngLiteral;
  info: string;
  type: 'restaurant' | 'hotel' | 'attraction';
}

const MultipleInfoWindows: React.FC = () => {
  const [activeInfoWindow, setActiveInfoWindow] = useState<number | null>(null);

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
      name: "Al Najdiyah Restaurant",
      position: { lat: 24.7116, lng: 46.6753 },
      info: "Traditional Saudi cuisine in the heart of Riyadh",
      type: 'restaurant'
    },
    {
      id: 2,
      name: "Ritz Carlton Hotel",
      position: { lat: 24.6877, lng: 46.6857 },
      info: "Luxury hotel with world-class amenities",
      type: 'hotel'
    },
    {
      id: 3,
      name: "National Museum",
      position: { lat: 24.6465, lng: 46.7169 },
      info: "Learn about Saudi Arabia's rich history and culture",
      type: 'attraction'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'restaurant': return '#ff6b6b';
      case 'hotel': return '#4ecdc4';
      case 'attraction': return '#45b7d1';
      default: return '#666';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return '🍽️';
      case 'hotel': return '🏨';
      case 'attraction': return '🏛️';
      default: return '📍';
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={center}
      >
        {locations.map(location => (
          <React.Fragment key={location.id}>
            <Marker
              position={location.position}
              title={location.name}
              onClick={() => setActiveInfoWindow(
                activeInfoWindow === location.id ? null : location.id
              )}
            />

            {activeInfoWindow === location.id && (
              <InfoWindow
                position={location.position}
                onCloseClick={() => setActiveInfoWindow(null)}
              >
                <div style={{ maxWidth: '250px', padding: '5px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '8px' 
                  }}>
                    <span style={{ fontSize: '20px', marginRight: '8px' }}>
                      {getTypeIcon(location.type)}
                    </span>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: '16px',
                      color: getTypeColor(location.type)
                    }}>
                      {location.name}
                    </h3>
                  </div>
                  
                  <p style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '14px',
                    color: '#555'
                  }}>
                    {location.info}
                  </p>
                  
                  <div style={{
                    padding: '4px 8px',
                    backgroundColor: getTypeColor(location.type),
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '12px',
                    display: 'inline-block',
                    textTransform: 'capitalize'
                  }}>
                    {location.type}
                  </div>
                </div>
              </InfoWindow>
            )}
          </React.Fragment>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MultipleInfoWindows;
```

### InfoWindow with Form
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const InfoWindowWithForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your feedback!');
    setFormData({ name: '', email: '', message: '' });
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const FormContent = () => (
    <div style={{ width: '300px', padding: '10px' }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#333' }}>
        Contact Us
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Message:
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={3}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            style={{
              flex: 1,
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
      >
        <Marker
          position={center}
          title="Click to contact us"
          onClick={() => setShowForm(true)}
        />

        {showForm && (
          <InfoWindow
            position={center}
            onCloseClick={() => setShowForm(false)}
            options={{
              disableAutoPan: false
            }}
          >
            <FormContent />
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default InfoWindowWithForm;
```

### Custom Styled InfoWindow
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const CustomStyledInfoWindow: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const location = {
    position: center,
    name: "Riyadh Business District",
    description: "Modern business hub with skyscrapers and commercial centers",
    features: ["Shopping", "Dining", "Business", "Entertainment"],
    hours: "24/7",
    contact: "+966 11 123 4567"
  };

  const CustomInfoWindowContent = ({ data }: { data: any }) => (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '0',
      borderRadius: '12px',
      overflow: 'hidden',
      minWidth: '280px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 20px 15px',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{
          margin: '0 0 8px 0',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          {data.name}
        </h2>
        <p style={{
          margin: 0,
          fontSize: '14px',
          opacity: 0.9
        }}>
          {data.description}
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '15px 20px' }}>
        {/* Features */}
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '14px',
            opacity: 0.8,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Features
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {data.features.map((feature: string, index: number) => (
              <span
                key={index}
                style={{
                  padding: '4px 8px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  backdropFilter: 'blur(5px)'
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          marginBottom: '15px'
        }}>
          <div>
            <div style={{
              fontSize: '12px',
              opacity: 0.8,
              marginBottom: '4px'
            }}>
              Hours
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {data.hours}
            </div>
          </div>
          <div>
            <div style={{
              fontSize: '12px',
              opacity: 0.8,
              marginBottom: '4px'
            }}>
              Contact
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {data.contact}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            flex: 1,
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            color: 'white',
            fontSize: '12px',
            cursor: 'pointer',
            backdropFilter: 'blur(5px)'
          }}>
            Directions
          </button>
          <button style={{
            flex: 1,
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '6px',
            color: '#333',
            fontSize: '12px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            More Info
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
      >
        <Marker
          position={location.position}
          title={location.name}
          onClick={() => setSelectedLocation(location)}
        />

        {selectedLocation && (
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={() => setSelectedLocation(null)}
            options={{
              disableAutoPan: false,
              pixelOffset: new window.google.maps.Size(0, -30)
            }}
          >
            <CustomInfoWindowContent data={selectedLocation} />
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default CustomStyledInfoWindow;
```

## Data Types

### InfoWindowOptions
```typescript
interface InfoWindowOptions {
  content?: string | Element;
  disableAutoPan?: boolean;
  maxWidth?: number;
  pixelOffset?: Size;
  position?: LatLng | LatLngLiteral;
  zIndex?: number;
}
```

### Size
```typescript
interface Size {
  width: number;
  height: number;
  widthUnit?: string;
  heightUnit?: string;
}
```

## Best Practices

### 1. Content Management
```typescript
// Keep content concise and relevant
const InfoWindowContent = ({ data }: { data: any }) => (
  <div style={{ maxWidth: '300px' }}>
    <h3>{data.title}</h3>
    <p>{data.description}</p>
    {/* Avoid too much content */}
  </div>
);
```

### 2. Performance Optimization
```typescript
// Close other InfoWindows when opening a new one
const [activeInfoWindow, setActiveInfoWindow] = useState<string | null>(null);

const handleMarkerClick = (markerId: string) => {
  setActiveInfoWindow(activeInfoWindow === markerId ? null : markerId);
};
```

### 3. Responsive Design
```typescript
// Make InfoWindows responsive
const getInfoWindowWidth = () => {
  return window.innerWidth < 768 ? '250px' : '350px';
};
```

### 4. Accessibility
```typescript
// Add proper ARIA labels and semantic HTML
const AccessibleInfoWindow = () => (
  <div role="dialog" aria-labelledby="info-title">
    <h3 id="info-title">Location Information</h3>
    <p>Description...</p>
  </div>
);
```

## Common Issues and Solutions

### 1. InfoWindow not positioning correctly
- Ensure position prop has valid coordinates
- Use pixelOffset to adjust positioning
- Check if marker position matches InfoWindow position

### 2. Content overflow
- Set maxWidth in options
- Use CSS to control content dimensions
- Test on different screen sizes

### 3. Multiple InfoWindows open
- Implement state management to close others
- Use a single state variable for active InfoWindow
- Consider UX implications of multiple windows

### 4. Styling limitations
- InfoWindow has limited styling options
- Consider using OverlayView for complex designs
- Use inline styles for better control

## Important Notes

- InfoWindow must be a child of GoogleMap component
- Only one InfoWindow should typically be open at a time
- Content can be any React component or HTML
- Position is optional if InfoWindow is anchored to a marker
- Use onCloseClick to handle close button clicks
- InfoWindow automatically pans map to stay visible
- Custom styling options are limited compared to OverlayView