# GroundOverlay Component

## Overview
`GroundOverlay` is a component that displays an image overlay on the map at specific geographic bounds. It's useful for displaying custom maps, floor plans, historical maps, or any image that needs to be positioned geographically.

## Import
```typescript
import { GroundOverlay } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `url` | `string` | ✅ | - | URL of the image to overlay |
| `bounds` | `LatLngBoundsLiteral \| LatLngBounds` | ✅ | - | Geographic bounds for the overlay |
| `options` | `GroundOverlayOptions` | ❌ | - | Additional overlay options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(groundOverlay: google.maps.GroundOverlay) => void` | Called when overlay loads |
| `onUnmount` | `(groundOverlay: google.maps.GroundOverlay) => void` | Called when overlay unmounts |
| `onClick` | `(e: google.maps.MapMouseEvent) => void` | Overlay click event |
| `onDblClick` | `(e: google.maps.MapMouseEvent) => void` | Overlay double-click event |

## GroundOverlayOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `clickable` | `boolean` | `true` | Allow clicking on overlay |
| `opacity` | `number` | `1.0` | Overlay opacity (0.0 to 1.0) |

## Usage Examples

### Basic Ground Overlay
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, GroundOverlay } from '@react-google-maps/api';

const BasicGroundOverlay: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Define bounds for the overlay (covering part of Riyadh)
  const overlayBounds = {
    north: 24.7300,
    south: 24.6900,
    east: 46.6900,
    west: 46.6500
  };

  // Sample image URL (replace with your actual image)
  const imageUrl = 'https://via.placeholder.com/800x600/ff0000/ffffff?text=Ground+Overlay';

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic Ground Overlay</h3>
          <p>An image overlay positioned at specific geographic coordinates</p>
          
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            style={{
              padding: '8px 16px',
              backgroundColor: showOverlay ? '#dc3545' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showOverlay ? 'Hide Overlay' : 'Show Overlay'}
          </button>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          {showOverlay && (
            <GroundOverlay
              url={imageUrl}
              bounds={overlayBounds}
              options={{
                opacity: 0.7,
                clickable: true
              }}
              onClick={() => alert('Ground overlay clicked!')}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicGroundOverlay;
```

### Multiple Ground Overlays
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, GroundOverlay } from '@react-google-maps/api';

interface OverlayData {
  id: string;
  name: string;
  url: string;
  bounds: google.maps.LatLngBoundsLiteral;
  opacity: number;
  visible: boolean;
  description: string;
}

const MultipleGroundOverlays: React.FC = () => {
  const [overlays, setOverlays] = useState<OverlayData[]>([
    {
      id: 'historical-map',
      name: 'Historical Map 1950',
      url: 'https://via.placeholder.com/800x600/8B4513/ffffff?text=Historical+Map+1950',
      bounds: {
        north: 24.7200,
        south: 24.7000,
        east: 46.6800,
        west: 46.6600
      },
      opacity: 0.8,
      visible: true,
      description: 'Historical map of Riyadh from 1950'
    },
    {
      id: 'floor-plan',
      name: 'Building Floor Plan',
      url: 'https://via.placeholder.com/600x400/4169E1/ffffff?text=Floor+Plan',
      bounds: {
        north: 24.7150,
        south: 24.7120,
        east: 46.6780,
        west: 46.6750
      },
      opacity: 0.9,
      visible: true,
      description: 'Detailed floor plan of a commercial building'
    },
    {
      id: 'satellite-enhanced',
      name: 'Enhanced Satellite View',
      url: 'https://via.placeholder.com/800x800/228B22/ffffff?text=Enhanced+Satellite',
      bounds: {
        north: 24.7100,
        south: 24.6950,
        east: 46.6900,
        west: 46.6700
      },
      opacity: 0.6,
      visible: false,
      description: 'Enhanced satellite imagery with additional details'
    }
  ]);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7100,
    lng: 46.6750
  };

  const toggleOverlay = (id: string) => {
    setOverlays(prev => prev.map(overlay =>
      overlay.id === id ? { ...overlay, visible: !overlay.visible } : overlay
    ));
  };

  const updateOpacity = (id: string, opacity: number) => {
    setOverlays(prev => prev.map(overlay =>
      overlay.id === id ? { ...overlay, opacity } : overlay
    ));
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Multiple Ground Overlays</h3>
          <p>Manage multiple image overlays with different opacities and visibility</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginTop: '15px' }}>
            {overlays.map(overlay => (
              <div
                key={overlay.id}
                style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: `2px solid ${overlay.visible ? '#28a745' : '#6c757d'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
                      {overlay.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                      {overlay.description}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleOverlay(overlay.id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: overlay.visible ? '#dc3545' : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    {overlay.visible ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                    Opacity: {overlay.opacity}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={overlay.opacity}
                    onChange={(e) => updateOpacity(overlay.id, parseFloat(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
                
                <div style={{ fontSize: '12px', color: '#666' }}>
                  <div>Bounds: {overlay.bounds.north.toFixed(4)}°N, {overlay.bounds.south.toFixed(4)}°S</div>
                  <div>Status: {overlay.visible ? '👁️ Visible' : '👁️‍🗨️ Hidden'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
        >
          {overlays
            .filter(overlay => overlay.visible)
            .map(overlay => (
              <GroundOverlay
                key={overlay.id}
                url={overlay.url}
                bounds={overlay.bounds}
                options={{
                  opacity: overlay.opacity,
                  clickable: true
                }}
                onClick={() => alert(`Clicked on: ${overlay.name}`)}
              />
            ))
          }
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MultipleGroundOverlays;
```

### Interactive Floor Plan Overlay
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, GroundOverlay, Marker } from '@react-google-maps/api';

interface FloorPlanData {
  id: string;
  name: string;
  imageUrl: string;
  bounds: google.maps.LatLngBoundsLiteral;
  rooms: Array<{
    id: string;
    name: string;
    position: google.maps.LatLngLiteral;
    type: 'office' | 'meeting' | 'storage' | 'restroom';
  }>;
}

const InteractiveFloorPlan: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<string>('ground');
  const [showRoomMarkers, setShowRoomMarkers] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const floorPlans: Record<string, FloorPlanData> = {
    ground: {
      id: 'ground',
      name: 'Ground Floor',
      imageUrl: 'https://via.placeholder.com/800x600/4169E1/ffffff?text=Ground+Floor+Plan',
      bounds: {
        north: 24.7140,
        south: 24.7132,
        east: 46.6757,
        west: 46.6749
      },
      rooms: [
        { id: 'lobby', name: 'Main Lobby', position: { lat: 24.7136, lng: 46.6753 }, type: 'office' },
        { id: 'reception', name: 'Reception', position: { lat: 24.7137, lng: 46.6752 }, type: 'office' },
        { id: 'meeting1', name: 'Meeting Room A', position: { lat: 24.7135, lng: 46.6754 }, type: 'meeting' },
        { id: 'storage1', name: 'Storage', position: { lat: 24.7134, lng: 46.6751 }, type: 'storage' }
      ]
    },
    first: {
      id: 'first',
      name: 'First Floor',
      imageUrl: 'https://via.placeholder.com/800x600/228B22/ffffff?text=First+Floor+Plan',
      bounds: {
        north: 24.7140,
        south: 24.7132,
        east: 46.6757,
        west: 46.6749
      },
      rooms: [
        { id: 'office1', name: 'Office 101', position: { lat: 24.7138, lng: 46.6752 }, type: 'office' },
        { id: 'office2', name: 'Office 102', position: { lat: 24.7138, lng: 46.6754 }, type: 'office' },
        { id: 'meeting2', name: 'Conference Room', position: { lat: 24.7135, lng: 46.6753 }, type: 'meeting' },
        { id: 'restroom1', name: 'Restroom', position: { lat: 24.7133, lng: 46.6751 }, type: 'restroom' }
      ]
    }
  };

  const getRoomIcon = (type: string) => {
    const icons = {
      office: '🏢',
      meeting: '🤝',
      storage: '📦',
      restroom: '🚻'
    };
    return icons[type as keyof typeof icons] || '📍';
  };

  const getRoomColor = (type: string) => {
    const colors = {
      office: '#007bff',
      meeting: '#28a745',
      storage: '#ffc107',
      restroom: '#6f42c1'
    };
    return colors[type as keyof typeof colors] || '#6c757d';
  };

  const currentFloorPlan = floorPlans[selectedFloor];

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Interactive Building Floor Plan</h3>
          <p>Navigate between floors and explore room details</p>
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Select Floor:
              </label>
              <div style={{ display: 'flex', gap: '5px' }}>
                {Object.values(floorPlans).map(floor => (
                  <button
                    key={floor.id}
                    onClick={() => setSelectedFloor(floor.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: selectedFloor === floor.id ? '#007bff' : 'white',
                      color: selectedFloor === floor.id ? 'white' : '#007bff',
                      border: '2px solid #007bff',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {floor.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginTop: '20px' }}>
                <input
                  type="checkbox"
                  checked={showRoomMarkers}
                  onChange={(e) => setShowRoomMarkers(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Show Room Markers
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4>Current Floor: {currentFloorPlan.name}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {currentFloorPlan.rooms.map(room => (
                <div
                  key={room.id}
                  style={{
                    padding: '10px',
                    backgroundColor: selectedRoom === room.id ? getRoomColor(room.type) + '20' : 'white',
                    border: `2px solid ${getRoomColor(room.type)}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontSize: '16px', marginRight: '8px' }}>
                      {getRoomIcon(room.type)}
                    </span>
                    <strong style={{ fontSize: '14px' }}>{room.name}</strong>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', textTransform: 'capitalize' }}>
                    Type: {room.type}
                  </div>
                  {selectedRoom === room.id && (
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '5px' }}>
                      Coordinates: {room.position.lat.toFixed(6)}, {room.position.lng.toFixed(6)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '14px' }}>
            <strong>Legend:</strong>
            <div style={{ display: 'flex', gap: '15px', marginTop: '5px', flexWrap: 'wrap' }}>
              <span>🏢 Office</span>
              <span>🤝 Meeting Room</span>
              <span>📦 Storage</span>
              <span>🚻 Restroom</span>
            </div>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={18}
          center={center}
          mapTypeId="satellite"
        >
          <GroundOverlay
            url={currentFloorPlan.imageUrl}
            bounds={currentFloorPlan.bounds}
            options={{
              opacity: 0.8,
              clickable: false
            }}
          />
          
          {showRoomMarkers && currentFloorPlan.rooms.map(room => (
            <Marker
              key={room.id}
              position={room.position}
              title={room.name}
              onClick={() => setSelectedRoom(room.id)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: selectedRoom === room.id ? 12 : 8,
                fillColor: getRoomColor(room.type),
                fillOpacity: selectedRoom === room.id ? 1 : 0.8,
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

export default InteractiveFloorPlan;
```

### Historical Map Comparison
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, GroundOverlay } from '@react-google-maps/api';

interface HistoricalMap {
  id: string;
  year: number;
  name: string;
  imageUrl: string;
  description: string;
  opacity: number;
}

const HistoricalMapComparison: React.FC = () => {
  const [selectedMaps, setSelectedMaps] = useState<string[]>(['current']);
  const [comparisonMode, setComparisonMode] = useState<'overlay' | 'split'>('overlay');

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Common bounds for all historical maps
  const mapBounds = {
    north: 24.7400,
    south: 24.6800,
    east: 46.7000,
    west: 46.6400
  };

  const historicalMaps: HistoricalMap[] = [
    {
      id: 'current',
      year: 2024,
      name: 'Current Satellite',
      imageUrl: 'https://via.placeholder.com/800x600/228B22/ffffff?text=Current+2024',
      description: 'Current satellite imagery',
      opacity: 1.0
    },
    {
      id: '2010',
      year: 2010,
      name: 'Riyadh 2010',
      imageUrl: 'https://via.placeholder.com/800x600/4169E1/ffffff?text=Riyadh+2010',
      description: 'Riyadh development in 2010',
      opacity: 0.8
    },
    {
      id: '1990',
      year: 1990,
      name: 'Riyadh 1990',
      imageUrl: 'https://via.placeholder.com/800x600/FF6347/ffffff?text=Riyadh+1990',
      description: 'Riyadh before major expansion',
      opacity: 0.7
    },
    {
      id: '1970',
      year: 1970,
      name: 'Riyadh 1970',
      imageUrl: 'https://via.placeholder.com/800x600/8B4513/ffffff?text=Riyadh+1970',
      description: 'Early development of Riyadh',
      opacity: 0.6
    }
  ];

  const toggleMapSelection = (mapId: string) => {
    setSelectedMaps(prev => {
      if (prev.includes(mapId)) {
        return prev.filter(id => id !== mapId);
      } else {
        return [...prev, mapId];
      }
    });
  };

  const updateMapOpacity = (mapId: string, opacity: number) => {
    // This would update the opacity in a real implementation
    console.log(`Update ${mapId} opacity to ${opacity}`);
  };

  const getSelectedMaps = () => {
    return historicalMaps.filter(map => selectedMaps.includes(map.id));
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Historical Map Comparison</h3>
          <p>Compare different time periods of Riyadh development</p>
          
          <div style={{ marginBottom: '15px' }}>
            <h4>Select Maps to Display:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {historicalMaps.map(map => (
                <div
                  key={map.id}
                  style={{
                    padding: '10px',
                    backgroundColor: selectedMaps.includes(map.id) ? '#d4edda' : 'white',
                    border: `2px solid ${selectedMaps.includes(map.id) ? '#28a745' : '#dee2e6'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => toggleMapSelection(map.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{map.name}</strong>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {map.description}
                      </div>
                    </div>
                    <div style={{ fontSize: '20px' }}>
                      {selectedMaps.includes(map.id) ? '✅' : '⬜'}
                    </div>
                  </div>
                  
                  {selectedMaps.includes(map.id) && (
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px' }}>
                        Opacity: {map.opacity}
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={map.opacity}
                        onChange={(e) => updateMapOpacity(map.id, parseFloat(e.target.value))}
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: '100%' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4>Comparison Statistics:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
                  {selectedMaps.length}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Active Maps</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                  {Math.max(...getSelectedMaps().map(m => m.year)) - Math.min(...getSelectedMaps().map(m => m.year))}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Year Span</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffc107' }}>
                  {getSelectedMaps().length > 0 ? Math.min(...getSelectedMaps().map(m => m.year)) : 'N/A'}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Earliest Year</div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '14px', color: '#666' }}>
            <strong>Tips:</strong>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>Select multiple maps to see overlays</li>
              <li>Adjust opacity to see through layers</li>
              <li>Compare different time periods to see development</li>
            </ul>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          {getSelectedMaps()
            .sort((a, b) => a.year - b.year) // Show older maps first (bottom layer)
            .map(map => (
              <GroundOverlay
                key={map.id}
                url={map.imageUrl}
                bounds={mapBounds}
                options={{
                  opacity: map.opacity,
                  clickable: true
                }}
                onClick={() => alert(`Viewing: ${map.name} (${map.year})`)}
              />
            ))
          }
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default HistoricalMapComparison;
```

## Best Practices

### 1. Image Optimization
```typescript
// Optimize images for web
const optimizeImageUrl = (url: string, width: number, height: number) => {
  // Use image optimization services
  return `${url}?w=${width}&h=${height}&q=80&f=webp`;
};

// Preload images
const preloadImage = (url: string) => {
  const img = new Image();
  img.src = url;
  return new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
};
```

### 2. Performance Optimization
```typescript
// Limit number of overlays
const MAX_OVERLAYS = 5;

// Use appropriate image sizes
const getImageSize = (bounds: LatLngBoundsLiteral, zoom: number) => {
  const latDiff = bounds.north - bounds.south;
  const lngDiff = bounds.east - bounds.west;
  
  // Calculate appropriate image size based on bounds and zoom
  const width = Math.min(2048, Math.max(512, lngDiff * zoom * 100));
  const height = Math.min(2048, Math.max(512, latDiff * zoom * 100));
  
  return { width, height };
};
```

### 3. Error Handling
```typescript
// Handle image loading errors
const [imageError, setImageError] = useState<string | null>(null);

const handleImageError = (url: string) => {
  setImageError(`Failed to load image: ${url}`);
  console.error('Ground overlay image failed to load:', url);
};

// Validate bounds
const validateBounds = (bounds: LatLngBoundsLiteral) => {
  return bounds.north > bounds.south && bounds.east > bounds.west;
};
```

## Common Issues and Solutions

### 1. Image not displaying
- Verify image URL is accessible and CORS-enabled
- Check if bounds are valid (north > south, east > west)
- Ensure image format is supported (JPEG, PNG, GIF)

### 2. Performance issues
- Optimize image sizes for web
- Limit number of simultaneous overlays
- Use appropriate image compression

### 3. Incorrect positioning
- Verify bounds coordinates are accurate
- Check coordinate system (WGS84)
- Test with known reference points

### 4. Opacity not working
- Ensure opacity value is between 0.0 and 1.0
- Check for CSS conflicts
- Verify browser support

## Important Notes

- GroundOverlay must be a child of GoogleMap component
- Images must be hosted on CORS-enabled servers
- Bounds must be valid (north > south, east > west)
- Large images may impact performance
- Consider image optimization for better loading times
- Use appropriate zoom levels for overlay visibility
- Test across different devices and browsers
- Implement proper error handling for failed image loads