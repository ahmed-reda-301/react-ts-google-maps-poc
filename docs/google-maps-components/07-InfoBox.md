# InfoBox Component

## Overview
`InfoBox` is a component that provides more flexible and customizable information windows compared to the standard InfoWindow. It offers greater control over styling, positioning, and content layout.

## Import
```typescript
import { InfoBox } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `position` | `LatLngLiteral \| LatLng` | ✅ | - | InfoBox position |
| `children` | `React.ReactNode` | ❌ | - | Content to display inside InfoBox |
| `options` | `InfoBoxOptions` | ❌ | - | Additional InfoBox options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(infoBox: InfoBox) => void` | Called when InfoBox loads |
| `onUnmount` | `(infoBox: InfoBox) => void` | Called when InfoBox unmounts |
| `onCloseClick` | `() => void` | Called when close button is clicked |
| `onDomReady` | `() => void` | Called when DOM is ready |
| `onPositionChanged` | `() => void` | Called when position changes |

## InfoBoxOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `alignBottom` | `boolean` | `false` | Align to bottom of position |
| `boxClass` | `string` | - | CSS class for the box |
| `boxStyle` | `object` | - | Inline styles for the box |
| `closeBoxMargin` | `string` | `'2px'` | Margin around close button |
| `closeBoxURL` | `string` | - | URL for close button image |
| `content` | `string \| Element` | - | Content of the InfoBox |
| `disableAutoPan` | `boolean` | `false` | Disable auto-panning |
| `enableEventPropagation` | `boolean` | `false` | Enable event propagation |
| `infoBoxClearance` | `Size` | - | Clearance around InfoBox |
| `isHidden` | `boolean` | `false` | Hide the InfoBox |
| `maxWidth` | `number` | - | Maximum width in pixels |
| `pixelOffset` | `Size` | - | Offset from position |
| `zIndex` | `number` | - | Z-index of InfoBox |

## Usage Examples

### Basic InfoBox
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoBox } from '@react-google-maps/api';

const BasicInfoBox: React.FC = () => {
  const [showInfoBox, setShowInfoBox] = useState(false);

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
      <div>
        <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic InfoBox</h3>
          <p>Click the marker to show a customizable InfoBox</p>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          <Marker
            position={center}
            onClick={() => setShowInfoBox(true)}
          />

          {showInfoBox && (
            <InfoBox
              position={center}
              onCloseClick={() => setShowInfoBox(false)}
              options={{
                boxStyle: {
                  background: 'white',
                  border: '2px solid #007bff',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  maxWidth: '300px'
                },
                closeBoxURL: '',
                enableEventPropagation: false
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>
                  Kingdom Centre
                </h4>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
                  A 99-story skyscraper in Riyadh, Saudi Arabia. It's one of the most recognizable landmarks in the city.
                </p>
                <button
                  onClick={() => setShowInfoBox(false)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </InfoBox>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicInfoBox;
```

### Styled InfoBox with Rich Content
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoBox } from '@react-google-maps/api';

interface PlaceData {
  id: number;
  name: string;
  position: google.maps.LatLngLiteral;
  description: string;
  image: string;
  rating: number;
  price: string;
  amenities: string[];
  website: string;
}

const StyledInfoBox: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const places: PlaceData[] = [
    {
      id: 1,
      name: "Luxury Hotel Riyadh",
      position: { lat: 24.7136, lng: 46.6753 },
      description: "Experience luxury and comfort in the heart of Riyadh with stunning city views and world-class amenities.",
      image: "https://via.placeholder.com/300x200?text=Luxury+Hotel",
      rating: 4.8,
      price: "$200-300/night",
      amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym"],
      website: "https://example.com"
    },
    {
      id: 2,
      name: "Business Center Plaza",
      position: { lat: 24.6877, lng: 46.6857 },
      description: "Modern business center with state-of-the-art facilities and prime location in the financial district.",
      image: "https://via.placeholder.com/300x200?text=Business+Center",
      rating: 4.5,
      price: "$50-100/day",
      amenities: ["WiFi", "Meeting Rooms", "Parking", "Cafe"],
      website: "https://example.com"
    }
  ];

  const InfoBoxContent = ({ place }: { place: PlaceData }) => (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      overflow: 'hidden',
      width: '350px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      color: 'white'
    }}>
      {/* Header Image */}
      <div style={{ position: 'relative' }}>
        <img
          src={place.image}
          alt={place.name}
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          borderRadius: '20px',
          padding: '5px 10px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          ⭐ {place.rating}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>
          {place.name}
        </h3>
        
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: 0.9 }}>
          {place.description}
        </p>

        {/* Price */}
        <div style={{ 
          marginBottom: '15px',
          padding: '8px 12px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          💰 {place.price}
        </div>

        {/* Amenities */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.8 }}>
            Amenities:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {place.amenities.map((amenity, index) => (
              <span
                key={index}
                style={{
                  padding: '3px 8px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => window.open(place.website, '_blank')}
            style={{
              flex: 1,
              padding: '10px',
              background: 'rgba(255,255,255,0.9)',
              color: '#333',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Visit Website
          </button>
          <button
            onClick={() => setSelectedPlace(null)}
            style={{
              flex: 1,
              padding: '10px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Styled InfoBox with Rich Content</h3>
          <p>Click on markers to see beautifully styled InfoBoxes with rich content</p>
        </div>

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
            <InfoBox
              position={selectedPlace.position}
              onCloseClick={() => setSelectedPlace(null)}
              options={{
                boxStyle: {
                  background: 'transparent',
                  border: 'none',
                  padding: '0'
                },
                closeBoxURL: '',
                enableEventPropagation: false,
                pixelOffset: new window.google.maps.Size(-175, -200)
              }}
            >
              <InfoBoxContent place={selectedPlace} />
            </InfoBox>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default StyledInfoBox;
```

### Multiple InfoBoxes with Different Styles
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoBox } from '@react-google-maps/api';

interface InfoBoxData {
  id: number;
  position: google.maps.LatLngLiteral;
  title: string;
  content: string;
  style: 'modern' | 'classic' | 'minimal' | 'colorful';
  visible: boolean;
}

const MultipleInfoBoxes: React.FC = () => {
  const [infoBoxes, setInfoBoxes] = useState<InfoBoxData[]>([
    {
      id: 1,
      position: { lat: 24.7136, lng: 46.6753 },
      title: "Modern Style",
      content: "This InfoBox uses a modern design with gradients and shadows.",
      style: 'modern',
      visible: false
    },
    {
      id: 2,
      position: { lat: 24.6877, lng: 46.6857 },
      title: "Classic Style",
      content: "A traditional InfoBox design with clean lines and simple colors.",
      style: 'classic',
      visible: false
    },
    {
      id: 3,
      position: { lat: 24.6308, lng: 46.7073 },
      title: "Minimal Style",
      content: "Minimalist design focusing on content with subtle styling.",
      style: 'minimal',
      visible: false
    },
    {
      id: 4,
      position: { lat: 24.6465, lng: 46.7169 },
      title: "Colorful Style",
      content: "Vibrant and colorful design to grab attention.",
      style: 'colorful',
      visible: false
    }
  ]);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const toggleInfoBox = (id: number) => {
    setInfoBoxes(prev => prev.map(box => 
      box.id === id 
        ? { ...box, visible: !box.visible }
        : { ...box, visible: false } // Close others
    ));
  };

  const getStyleConfig = (style: string) => {
    const styles = {
      modern: {
        boxStyle: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '12px',
          padding: '20px',
          color: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          maxWidth: '280px'
        },
        contentStyle: {
          fontFamily: 'Arial, sans-serif'
        }
      },
      classic: {
        boxStyle: {
          background: 'white',
          border: '2px solid #333',
          borderRadius: '4px',
          padding: '15px',
          color: '#333',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          maxWidth: '280px'
        },
        contentStyle: {
          fontFamily: 'Times New Roman, serif'
        }
      },
      minimal: {
        boxStyle: {
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid #e0e0e0',
          borderRadius: '2px',
          padding: '12px',
          color: '#555',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          maxWidth: '280px'
        },
        contentStyle: {
          fontFamily: 'Helvetica, Arial, sans-serif'
        }
      },
      colorful: {
        boxStyle: {
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
          backgroundSize: '400% 400%',
          animation: 'gradient 3s ease infinite',
          border: 'none',
          borderRadius: '16px',
          padding: '18px',
          color: 'white',
          boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
          maxWidth: '280px'
        },
        contentStyle: {
          fontFamily: 'Comic Sans MS, cursive',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }
      }
    };
    return styles[style as keyof typeof styles];
  };

  const InfoBoxContent = ({ box }: { box: InfoBoxData }) => {
    const styleConfig = getStyleConfig(box.style);
    
    return (
      <div style={styleConfig.contentStyle}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
          {box.title}
        </h4>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', lineHeight: '1.4' }}>
          {box.content}
        </p>
        <button
          onClick={() => toggleInfoBox(box.id)}
          style={{
            padding: '8px 16px',
            background: box.style === 'classic' ? '#333' : 'rgba(255,255,255,0.3)',
            color: box.style === 'classic' ? 'white' : 'inherit',
            border: box.style === 'minimal' ? '1px solid #ccc' : 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <style>
          {`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
        
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Multiple InfoBox Styles</h3>
          <p>Click on different markers to see various InfoBox styling options</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '15px' }}>
            {infoBoxes.map(box => (
              <div
                key={box.id}
                style={{
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                  textAlign: 'center'
                }}
              >
                <strong>{box.title}</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  {box.style.charAt(0).toUpperCase() + box.style.slice(1)} design
                </div>
                <div style={{ 
                  marginTop: '5px',
                  fontSize: '12px',
                  color: box.visible ? '#28a745' : '#6c757d'
                }}>
                  {box.visible ? '👁️ Visible' : '👁️‍🗨️ Hidden'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          {infoBoxes.map(box => (
            <React.Fragment key={box.id}>
              <Marker
                position={box.position}
                title={box.title}
                onClick={() => toggleInfoBox(box.id)}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: box.visible ? '#28a745' : '#007bff',
                  fillOpacity: 1,
                  strokeColor: '#FFFFFF',
                  strokeWeight: 2
                }}
              />

              {box.visible && (
                <InfoBox
                  position={box.position}
                  onCloseClick={() => toggleInfoBox(box.id)}
                  options={{
                    boxStyle: getStyleConfig(box.style).boxStyle,
                    closeBoxURL: '',
                    enableEventPropagation: false,
                    pixelOffset: new window.google.maps.Size(-140, -50)
                  }}
                >
                  <InfoBoxContent box={box} />
                </InfoBox>
              )}
            </React.Fragment>
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MultipleInfoBoxes;
```

## Best Practices

### 1. Styling and Design
```typescript
// Use consistent styling patterns
const infoBoxStyles = {
  base: {
    background: 'white',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    maxWidth: '300px'
  },
  header: {
    margin: '0 0 10px 0',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  content: {
    margin: '0 0 15px 0',
    fontSize: '14px',
    lineHeight: '1.4'
  }
};

// Responsive design
const getResponsiveWidth = () => {
  return window.innerWidth < 768 ? '250px' : '350px';
};
```

### 2. Performance Optimization
```typescript
// Use React.memo for InfoBox content
const MemoizedInfoBoxContent = React.memo(({ data }: { data: any }) => (
  <div>{/* content */}</div>
));

// Limit number of open InfoBoxes
const MAX_OPEN_INFOBOXES = 3;

// Close InfoBoxes when map moves significantly
const useAutoCloseInfoBoxes = (map: google.maps.Map) => {
  useEffect(() => {
    const listener = map.addListener('bounds_changed', () => {
      // Close InfoBoxes logic
    });
    return () => listener.remove();
  }, [map]);
};
```

### 3. Accessibility
```typescript
// Add proper ARIA attributes
const AccessibleInfoBox = () => (
  <div role="dialog" aria-labelledby="infobox-title" aria-describedby="infobox-content">
    <h4 id="infobox-title">Title</h4>
    <div id="infobox-content">Content</div>
  </div>
);

// Keyboard navigation support
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeInfoBox();
  }
};
```

## Common Issues and Solutions

### 1. InfoBox not positioning correctly
- Use pixelOffset to adjust positioning
- Check if position coordinates are valid
- Consider map projection and zoom level

### 2. Styling not applying
- Ensure boxStyle object is properly formatted
- Check for CSS conflicts
- Use inline styles for better control

### 3. Content overflow
- Set maxWidth in boxStyle
- Use CSS overflow properties
- Test on different screen sizes

### 4. Performance issues with many InfoBoxes
- Limit the number of simultaneously open InfoBoxes
- Use virtualization for large datasets
- Implement proper cleanup

## Important Notes

- InfoBox must be a child of GoogleMap component
- More flexible than InfoWindow but requires more setup
- Custom styling requires careful CSS management
- Position prop is required for proper placement
- Use pixelOffset for fine-tuning position
- enableEventPropagation affects click behavior
- Consider mobile responsiveness in design
- Test across different browsers for consistency