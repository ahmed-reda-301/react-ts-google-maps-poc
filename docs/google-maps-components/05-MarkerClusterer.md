# MarkerClusterer Component

## Overview
`MarkerClusterer` is a component that groups nearby markers into clusters to improve map performance and readability when displaying large numbers of markers. It automatically manages clustering based on zoom level and marker density.

## Import
```typescript
import { MarkerClusterer } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactElement<any, string \| React.JSXElementConstructor<any>>[]` | ✅ | - | Marker components to cluster |
| `options` | `MarkerClustererOptions` | ❌ | - | Clustering configuration options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(markerClusterer: MarkerClusterer) => void` | Called when clusterer loads |
| `onUnmount` | `(markerClusterer: MarkerClusterer) => void` | Called when clusterer unmounts |
| `onClick` | `(cluster: Cluster) => void` | Called when cluster is clicked |
| `onClusteringBegin` | `(markerClusterer: MarkerClusterer) => void` | Called when clustering starts |
| `onClusteringEnd` | `(markerClusterer: MarkerClusterer) => void` | Called when clustering ends |

## MarkerClustererOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `gridSize` | `number` | `60` | Grid size for clustering (pixels) |
| `maxZoom` | `number` | `null` | Maximum zoom level for clustering |
| `minimumClusterSize` | `number` | `2` | Minimum markers needed to form cluster |
| `styles` | `ClusterIconStyle[]` | - | Custom cluster icon styles |
| `title` | `string` | - | Tooltip text for clusters |
| `zoomOnClick` | `boolean` | `true` | Zoom in when cluster is clicked |
| `averageCenter` | `boolean` | `false` | Use average position for cluster center |
| `ignoreHidden` | `boolean` | `false` | Ignore hidden markers in clustering |

## Usage Examples

### Basic Marker Clustering
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';

interface LocationData {
  id: number;
  position: google.maps.LatLngLiteral;
  title: string;
}

const BasicMarkerClusterer: React.FC = () => {
  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Generate sample locations around Riyadh
  const locations: LocationData[] = [
    { id: 1, position: { lat: 24.7136, lng: 46.6753 }, title: "Kingdom Centre" },
    { id: 2, position: { lat: 24.6877, lng: 46.6857 }, title: "Al Faisaliah Tower" },
    { id: 3, position: { lat: 24.6308, lng: 46.7073 }, title: "Masmak Fortress" },
    { id: 4, position: { lat: 24.6465, lng: 46.7169 }, title: "National Museum" },
    { id: 5, position: { lat: 24.7200, lng: 46.6700 }, title: "Business District 1" },
    { id: 6, position: { lat: 24.7250, lng: 46.6750 }, title: "Business District 2" },
    { id: 7, position: { lat: 24.7180, lng: 46.6800 }, title: "Business District 3" },
    { id: 8, position: { lat: 24.7300, lng: 46.6650 }, title: "Business District 4" },
    { id: 9, position: { lat: 24.6800, lng: 46.6500 }, title: "Residential Area 1" },
    { id: 10, position: { lat: 24.6850, lng: 46.6550 }, title: "Residential Area 2" },
    { id: 11, position: { lat: 24.6900, lng: 46.6600 }, title: "Residential Area 3" },
    { id: 12, position: { lat: 24.6950, lng: 46.6650 }, title: "Residential Area 4" },
    { id: 13, position: { lat: 24.6400, lng: 46.7200 }, title: "Historical Site 1" },
    { id: 14, position: { lat: 24.6450, lng: 46.7250 }, title: "Historical Site 2" },
    { id: 15, position: { lat: 24.6500, lng: 46.7300 }, title: "Historical Site 3" }
  ];

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic Marker Clustering</h3>
          <p>Zoom in and out to see how markers are automatically clustered based on proximity</p>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Total markers: {locations.length}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={center}
        >
          <MarkerClusterer>
            {(clusterer) =>
              locations.map(location => (
                <Marker
                  key={location.id}
                  position={location.position}
                  title={location.title}
                  clusterer={clusterer}
                />
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicMarkerClusterer;
```

### Custom Styled Clusters
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';

const CustomStyledClusters: React.FC = () => {
  const [clusterStats, setClusterStats] = useState<{total: number, clusters: number}>({
    total: 0,
    clusters: 0
  });

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Generate more sample data
  const generateLocations = (count: number) => {
    const locations = [];
    for (let i = 0; i < count; i++) {
      locations.push({
        id: i,
        position: {
          lat: 24.7136 + (Math.random() - 0.5) * 0.5,
          lng: 46.6753 + (Math.random() - 0.5) * 0.5
        },
        title: `Location ${i + 1}`
      });
    }
    return locations;
  };

  const locations = generateLocations(50);

  // Custom cluster styles
  const clusterStyles = [
    {
      textColor: 'white',
      url: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="#007bff" stroke="#0056b3" stroke-width="2"/>
        </svg>
      `),
      height: 40,
      width: 40,
      textSize: 12
    },
    {
      textColor: 'white',
      url: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="23" fill="#28a745" stroke="#1e7e34" stroke-width="2"/>
        </svg>
      `),
      height: 50,
      width: 50,
      textSize: 14
    },
    {
      textColor: 'white',
      url: 'data:image/svg+xml;base64=' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="28" fill="#dc3545" stroke="#c82333" stroke-width="2"/>
        </svg>
      `),
      height: 60,
      width: 60,
      textSize: 16
    }
  ];

  const clustererOptions = {
    styles: clusterStyles,
    gridSize: 60,
    maxZoom: 15,
    minimumClusterSize: 2,
    zoomOnClick: true,
    averageCenter: true
  };

  const onClusteringEnd = (clusterer: any) => {
    const clusters = clusterer.getClusters();
    setClusterStats({
      total: locations.length,
      clusters: clusters.length
    });
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Custom Styled Clusters</h3>
          <p>Clusters with custom colors and sizes based on marker count</p>
          
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#007bff',
                marginRight: '8px'
              }} />
              <span style={{ fontSize: '14px' }}>2-9 markers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                backgroundColor: '#28a745',
                marginRight: '8px'
              }} />
              <span style={{ fontSize: '14px' }}>10-19 markers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#dc3545',
                marginRight: '8px'
              }} />
              <span style={{ fontSize: '14px' }}>20+ markers</span>
            </div>
          </div>

          <div style={{ marginTop: '15px', fontSize: '14px' }}>
            <strong>Statistics:</strong>
            <br />
            Total Markers: {clusterStats.total}
            <br />
            Current Clusters: {clusterStats.clusters}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          <MarkerClusterer
            options={clustererOptions}
            onClusteringEnd={onClusteringEnd}
          >
            {(clusterer) =>
              locations.map(location => (
                <Marker
                  key={location.id}
                  position={location.position}
                  title={location.title}
                  clusterer={clusterer}
                />
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default CustomStyledClusters;
```

### Interactive Cluster Management
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer, InfoWindow } from '@react-google-maps/api';

interface LocationData {
  id: number;
  position: google.maps.LatLngLiteral;
  title: string;
  category: 'restaurant' | 'hotel' | 'attraction' | 'shopping';
  visible: boolean;
}

const InteractiveClusterManagement: React.FC = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<LocationData | null>(null);
  const [clusterSettings, setClusterSettings] = useState({
    gridSize: 60,
    minimumClusterSize: 2,
    maxZoom: 15
  });
  const [categoryFilters, setCategoryFilters] = useState({
    restaurant: true,
    hotel: true,
    attraction: true,
    shopping: true
  });

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Generate sample data with categories
  React.useEffect(() => {
    const categories: LocationData['category'][] = ['restaurant', 'hotel', 'attraction', 'shopping'];
    const sampleLocations: LocationData[] = [];
    
    for (let i = 0; i < 40; i++) {
      sampleLocations.push({
        id: i,
        position: {
          lat: 24.7136 + (Math.random() - 0.5) * 0.4,
          lng: 46.6753 + (Math.random() - 0.5) * 0.4
        },
        title: `${categories[i % 4]} ${Math.floor(i / 4) + 1}`,
        category: categories[i % 4],
        visible: true
      });
    }
    
    setLocations(sampleLocations);
  }, []);

  const getMarkerIcon = (category: string) => {
    const icons = {
      restaurant: '🍽️',
      hotel: '🏨',
      attraction: '🏛️',
      shopping: '🛍️'
    };
    return icons[category as keyof typeof icons] || '📍';
  };

  const getMarkerColor = (category: string) => {
    const colors = {
      restaurant: '#ff6b6b',
      hotel: '#4ecdc4',
      attraction: '#45b7d1',
      shopping: '#96ceb4'
    };
    return colors[category as keyof typeof colors] || '#666';
  };

  const toggleCategoryFilter = (category: keyof typeof categoryFilters) => {
    setCategoryFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
    
    setLocations(prev => prev.map(location => ({
      ...location,
      visible: location.category === category ? !categoryFilters[category] : location.visible
    })));
  };

  const visibleLocations = locations.filter(location => 
    location.visible && categoryFilters[location.category]
  );

  const clustererOptions = {
    gridSize: clusterSettings.gridSize,
    minimumClusterSize: clusterSettings.minimumClusterSize,
    maxZoom: clusterSettings.maxZoom,
    styles: [
      {
        textColor: 'white',
        url: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="#007bff" stroke="#0056b3" stroke-width="2"/>
          </svg>
        `),
        height: 40,
        width: 40,
        textSize: 12
      }
    ]
  };

  const onMarkerClick = useCallback((location: LocationData) => {
    setSelectedMarker(location);
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Interactive Cluster Management</h3>
          
          {/* Category Filters */}
          <div style={{ marginBottom: '15px' }}>
            <h4>Category Filters:</h4>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {Object.entries(categoryFilters).map(([category, enabled]) => (
                <label key={category} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => toggleCategoryFilter(category as keyof typeof categoryFilters)}
                    style={{ marginRight: '8px' }}
                  />
                  <span style={{ 
                    color: getMarkerColor(category),
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}>
                    {getMarkerIcon(category)} {category}
                  </span>
                  <span style={{ marginLeft: '5px', color: '#666' }}>
                    ({locations.filter(l => l.category === category).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Cluster Settings */}
          <div style={{ marginBottom: '15px' }}>
            <h4>Cluster Settings:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                  Grid Size: {clusterSettings.gridSize}px
                </label>
                <input
                  type="range"
                  min="30"
                  max="120"
                  value={clusterSettings.gridSize}
                  onChange={(e) => setClusterSettings(prev => ({
                    ...prev,
                    gridSize: parseInt(e.target.value)
                  }))}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                  Min Cluster Size: {clusterSettings.minimumClusterSize}
                </label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={clusterSettings.minimumClusterSize}
                  onChange={(e) => setClusterSettings(prev => ({
                    ...prev,
                    minimumClusterSize: parseInt(e.target.value)
                  }))}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                  Max Zoom: {clusterSettings.maxZoom}
                </label>
                <input
                  type="range"
                  min="10"
                  max="20"
                  value={clusterSettings.maxZoom}
                  onChange={(e) => setClusterSettings(prev => ({
                    ...prev,
                    maxZoom: parseInt(e.target.value)
                  }))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>

          <div style={{ fontSize: '14px' }}>
            <strong>Visible Markers:</strong> {visibleLocations.length} / {locations.length}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          <MarkerClusterer options={clustererOptions}>
            {(clusterer) =>
              visibleLocations.map(location => (
                <Marker
                  key={location.id}
                  position={location.position}
                  title={location.title}
                  clusterer={clusterer}
                  onClick={() => onMarkerClick(location)}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: getMarkerColor(location.category),
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 2
                  }}
                />
              ))
            }
          </MarkerClusterer>

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div style={{ padding: '5px' }}>
                <h4 style={{ margin: '0 0 5px 0' }}>
                  {getMarkerIcon(selectedMarker.category)} {selectedMarker.title}
                </h4>
                <p style={{ margin: 0, fontSize: '14px', textTransform: 'capitalize' }}>
                  Category: {selectedMarker.category}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default InteractiveClusterManagement;
```

### Performance Comparison
```typescript
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';

const PerformanceComparison: React.FC = () => {
  const [markerCount, setMarkerCount] = useState(100);
  const [useClusterer, setUseClusterer] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);
  const [renderTime, setRenderTime] = useState<number>(0);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Generate locations based on count
  useEffect(() => {
    const startTime = performance.now();
    
    const newLocations = [];
    for (let i = 0; i < markerCount; i++) {
      newLocations.push({
        id: i,
        position: {
          lat: 24.7136 + (Math.random() - 0.5) * 1.0,
          lng: 46.6753 + (Math.random() - 0.5) * 1.0
        },
        title: `Marker ${i + 1}`
      });
    }
    
    setLocations(newLocations);
    
    const endTime = performance.now();
    setRenderTime(endTime - startTime);
  }, [markerCount]);

  const clustererOptions = {
    gridSize: 60,
    minimumClusterSize: 2,
    maxZoom: 15
  };

  const renderMarkers = (clusterer?: any) => {
    return locations.map(location => (
      <Marker
        key={location.id}
        position={location.position}
        title={location.title}
        clusterer={clusterer}
      />
    ));
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Performance Comparison</h3>
          <p>Compare performance with and without marker clustering</p>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px' }}>
              Number of Markers: {markerCount}
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={markerCount}
              onChange={(e) => setMarkerCount(parseInt(e.target.value))}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
              <span>10</span>
              <span>500</span>
              <span>1000</span>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={useClusterer}
                onChange={(e) => setUseClusterer(e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              Use Marker Clustering
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Markers:</strong> {markerCount}
            </div>
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Clustering:</strong> {useClusterer ? 'Enabled' : 'Disabled'}
            </div>
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Render Time:</strong> {renderTime.toFixed(2)}ms
            </div>
          </div>

          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: markerCount > 500 && !useClusterer ? '#fff3cd' : '#d4edda',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {markerCount > 500 && !useClusterer ? (
              <span style={{ color: '#856404' }}>
                ⚠️ Performance Warning: Consider enabling clustering for better performance with {markerCount} markers
              </span>
            ) : (
              <span style={{ color: '#155724' }}>
                ✅ Good performance configuration
              </span>
            )}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={center}
        >
          {useClusterer ? (
            <MarkerClusterer options={clustererOptions}>
              {(clusterer) => renderMarkers(clusterer)}
            </MarkerClusterer>
          ) : (
            renderMarkers()
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default PerformanceComparison;
```

## Data Types

### MarkerClustererOptions
```typescript
interface MarkerClustererOptions {
  gridSize?: number;
  maxZoom?: number;
  minimumClusterSize?: number;
  styles?: ClusterIconStyle[];
  title?: string;
  zoomOnClick?: boolean;
  averageCenter?: boolean;
  ignoreHidden?: boolean;
  enableRetinaIcons?: boolean;
  imageExtension?: string;
  imagePath?: string;
  imageSizes?: number[];
}
```

### ClusterIconStyle
```typescript
interface ClusterIconStyle {
  url: string;
  height: number;
  width: number;
  anchorText?: number[];
  anchorIcon?: number[];
  textColor?: string;
  textSize?: number;
  textDecoration?: string;
  fontWeight?: string;
  fontStyle?: string;
  fontFamily?: string;
  backgroundPosition?: string;
}
```

## Best Practices

### 1. Performance Optimization
```typescript
// Use clustering for large datasets
const shouldUseClusterer = markers.length > 50;

// Optimize cluster settings
const clustererOptions = {
  gridSize: 60, // Balance between performance and visual appeal
  minimumClusterSize: 2, // Minimum markers to form cluster
  maxZoom: 15 // Stop clustering at high zoom levels
};

// Use React.memo for marker components
const OptimizedMarker = React.memo(Marker);
```

### 2. Custom Styling
```typescript
// Create responsive cluster styles
const createClusterStyles = () => [
  {
    textColor: 'white',
    url: createClusterIcon('#007bff', 40),
    height: 40,
    width: 40,
    textSize: 12
  },
  {
    textColor: 'white',
    url: createClusterIcon('#28a745', 50),
    height: 50,
    width: 50,
    textSize: 14
  },
  {
    textColor: 'white',
    url: createClusterIcon('#dc3545', 60),
    height: 60,
    width: 60,
    textSize: 16
  }
];

const createClusterIcon = (color: string, size: number) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="${color}" stroke="#fff" stroke-width="2"/>
    </svg>
  `)}`;
};
```

### 3. Event Handling
```typescript
// Handle cluster clicks
const onClusterClick = useCallback((cluster: any) => {
  const markers = cluster.getMarkers();
  console.log(`Cluster clicked with ${markers.length} markers`);
  
  // Zoom to cluster bounds
  const bounds = new window.google.maps.LatLngBounds();
  markers.forEach((marker: any) => {
    bounds.extend(marker.getPosition());
  });
  
  map?.fitBounds(bounds);
}, [map]);

// Monitor clustering changes
const onClusteringEnd = useCallback((clusterer: any) => {
  const clusters = clusterer.getClusters();
  console.log(`Clustering complete: ${clusters.length} clusters formed`);
}, []);
```

## Common Issues and Solutions

### 1. Markers not clustering
- Ensure markers have `clusterer` prop set
- Check `minimumClusterSize` setting
- Verify markers are within clustering distance

### 2. Performance issues with many markers
- Increase `gridSize` for fewer clusters
- Set appropriate `maxZoom` level
- Use marker virtualization for very large datasets

### 3. Custom styles not applying
- Verify image URLs are accessible
- Check image dimensions match style settings
- Ensure base64 encoded SVGs are properly formatted

### 4. Cluster clicks not working
- Implement `onClick` event handler
- Check if `zoomOnClick` is interfering
- Verify cluster bounds calculation

## Important Notes

- MarkerClusterer must be a child of GoogleMap component
- Markers must have `clusterer` prop to be included in clustering
- Clustering performance depends on marker count and grid size
- Custom cluster icons should be optimized for web
- Use appropriate zoom levels to balance clustering and detail
- Consider marker density when setting clustering parameters
- Test performance with realistic data volumes
- Clustering algorithms work best with geographically distributed data