# HeatmapLayer Component

## Overview
`HeatmapLayer` is a component that displays data as a heatmap overlay on the map. It visualizes the density and intensity of data points using color gradients, making it ideal for showing patterns in geographic data.

## Import
```typescript
import { HeatmapLayer } from '@react-google-maps/api';
```

## Requirements
The `visualization` library must be loaded for HeatmapLayer to work:
```typescript
const libraries = ["visualization"];
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `LatLng[] \| WeightedLocation[]` | ✅ | - | Data points for the heatmap |
| `options` | `HeatmapLayerOptions` | ❌ | - | Heatmap configuration options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(heatmapLayer: google.maps.visualization.HeatmapLayer) => void` | Called when heatmap loads |
| `onUnmount` | `(heatmapLayer: google.maps.visualization.HeatmapLayer) => void` | Called when heatmap unmounts |

## HeatmapLayerOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dissipating` | `boolean` | `true` | Whether heatmap dissipates on zoom |
| `gradient` | `string[]` | - | Color gradient for heatmap |
| `maxIntensity` | `number` | - | Maximum intensity value |
| `opacity` | `number` | `0.6` | Heatmap opacity (0.0 to 1.0) |
| `radius` | `number` | - | Radius of influence for each point |

## Data Types

### WeightedLocation
```typescript
interface WeightedLocation {
  location: LatLng;
  weight: number;
}
```

## Usage Examples

### Basic Heatmap
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';

const libraries: ("visualization")[] = ["visualization"];

const BasicHeatmap: React.FC = () => {
  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Generate sample data points around Riyadh
  const generateHeatmapData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(
        new window.google.maps.LatLng(
          24.7136 + (Math.random() - 0.5) * 0.3,
          46.6753 + (Math.random() - 0.5) * 0.3
        )
      );
    }
    return data;
  };

  const [heatmapData] = useState(generateHeatmapData);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div>
        <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic Heatmap</h3>
          <p>Showing density of data points around Riyadh using default heatmap settings</p>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Data points: {heatmapData.length}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          <HeatmapLayer data={heatmapData} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicHeatmap;
```

### Customizable Heatmap
```typescript
import React, { useState, useMemo } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';

const libraries: ("visualization")[] = ["visualization"];

const CustomizableHeatmap: React.FC = () => {
  const [heatmapOptions, setHeatmapOptions] = useState({
    opacity: 0.6,
    radius: 20,
    dissipating: true,
    gradient: 'default'
  });

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Predefined gradients
  const gradients = {
    default: null, // Use default gradient
    fire: [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ],
    ocean: [
      'rgba(255, 255, 255, 0)',
      'rgba(255, 255, 255, 1)',
      'rgba(191, 255, 255, 1)',
      'rgba(127, 255, 255, 1)',
      'rgba(63, 255, 255, 1)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)'
    ],
    rainbow: [
      'rgba(255, 0, 255, 0)',
      'rgba(255, 0, 255, 1)',
      'rgba(255, 0, 0, 1)',
      'rgba(255, 255, 0, 1)',
      'rgba(0, 255, 0, 1)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 0, 255, 1)'
    ]
  };

  // Generate sample data with different intensities
  const heatmapData = useMemo(() => {
    const data = [];
    
    // High density area (business district)
    for (let i = 0; i < 50; i++) {
      data.push(
        new window.google.maps.LatLng(
          24.7136 + (Math.random() - 0.5) * 0.05,
          46.6753 + (Math.random() - 0.5) * 0.05
        )
      );
    }
    
    // Medium density areas
    for (let i = 0; i < 30; i++) {
      data.push(
        new window.google.maps.LatLng(
          24.6877 + (Math.random() - 0.5) * 0.08,
          46.6857 + (Math.random() - 0.5) * 0.08
        )
      );
    }
    
    // Low density scattered points
    for (let i = 0; i < 40; i++) {
      data.push(
        new window.google.maps.LatLng(
          24.7136 + (Math.random() - 0.5) * 0.4,
          46.6753 + (Math.random() - 0.5) * 0.4
        )
      );
    }
    
    return data;
  }, []);

  const getHeatmapOptions = () => ({
    opacity: heatmapOptions.opacity,
    radius: heatmapOptions.radius,
    dissipating: heatmapOptions.dissipating,
    gradient: heatmapOptions.gradient === 'default' 
      ? undefined 
      : gradients[heatmapOptions.gradient as keyof typeof gradients]
  });

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Customizable Heatmap</h3>
          <p>Adjust heatmap settings to see how they affect the visualization</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Opacity: {heatmapOptions.opacity}
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={heatmapOptions.opacity}
                onChange={(e) => setHeatmapOptions(prev => ({
                  ...prev,
                  opacity: parseFloat(e.target.value)
                }))}
                style={{ width: '100%' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Radius: {heatmapOptions.radius}px
              </label>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={heatmapOptions.radius}
                onChange={(e) => setHeatmapOptions(prev => ({
                  ...prev,
                  radius: parseInt(e.target.value)
                }))}
                style={{ width: '100%' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Gradient:
              </label>
              <select
                value={heatmapOptions.gradient}
                onChange={(e) => setHeatmapOptions(prev => ({
                  ...prev,
                  gradient: e.target.value
                }))}
                style={{
                  width: '100%',
                  height: '35px',
                  padding: '0 10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="default">Default</option>
                <option value="fire">Fire</option>
                <option value="ocean">Ocean</option>
                <option value="rainbow">Rainbow</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                <input
                  type="checkbox"
                  checked={heatmapOptions.dissipating}
                  onChange={(e) => setHeatmapOptions(prev => ({
                    ...prev,
                    dissipating: e.target.checked
                  }))}
                  style={{ marginRight: '8px' }}
                />
                Dissipating on Zoom
              </label>
            </div>
          </div>

          <div style={{ marginTop: '15px', fontSize: '14px' }}>
            <strong>Data points:</strong> {heatmapData.length}
            <br />
            <strong>Current settings:</strong> Opacity {heatmapOptions.opacity}, 
            Radius {heatmapOptions.radius}px, 
            Gradient {heatmapOptions.gradient}, 
            Dissipating {heatmapOptions.dissipating ? 'On' : 'Off'}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          <HeatmapLayer 
            data={heatmapData}
            options={getHeatmapOptions()}
          />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default CustomizableHeatmap;
```

### Weighted Heatmap
```typescript
import React, { useState, useMemo } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer, Marker } from '@react-google-maps/api';

const libraries: ("visualization")[] = ["visualization"];

interface DataPoint {
  location: google.maps.LatLngLiteral;
  weight: number;
  name: string;
  category: 'high' | 'medium' | 'low';
}

const WeightedHeatmap: React.FC = () => {
  const [showMarkers, setShowMarkers] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Sample data points with weights
  const dataPoints: DataPoint[] = useMemo(() => [
    // High weight points (shopping centers, business districts)
    { location: { lat: 24.7136, lng: 46.6753 }, weight: 100, name: "Kingdom Centre", category: 'high' },
    { location: { lat: 24.6877, lng: 46.6857 }, weight: 90, name: "Al Faisaliah Tower", category: 'high' },
    { location: { lat: 24.7200, lng: 46.6700 }, weight: 85, name: "Riyadh Gallery", category: 'high' },
    { location: { lat: 24.7300, lng: 46.6800 }, weight: 80, name: "Granada Center", category: 'high' },
    
    // Medium weight points (residential areas, smaller centers)
    { location: { lat: 24.6800, lng: 46.6500 }, weight: 50, name: "Residential Area 1", category: 'medium' },
    { location: { lat: 24.6900, lng: 46.6600 }, weight: 45, name: "Residential Area 2", category: 'medium' },
    { location: { lat: 24.7000, lng: 46.7000 }, weight: 55, name: "Local Market 1", category: 'medium' },
    { location: { lat: 24.6700, lng: 46.6800 }, weight: 40, name: "Local Market 2", category: 'medium' },
    { location: { lat: 24.7400, lng: 46.6600 }, weight: 48, name: "Community Center", category: 'medium' },
    
    // Low weight points (scattered locations)
    { location: { lat: 24.6500, lng: 46.6400 }, weight: 20, name: "Suburban Area 1", category: 'low' },
    { location: { lat: 24.7500, lng: 46.7200 }, weight: 25, name: "Suburban Area 2", category: 'low' },
    { location: { lat: 24.6600, lng: 46.7300 }, weight: 15, name: "Rural Area 1", category: 'low' },
    { location: { lat: 24.7600, lng: 46.6400 }, weight: 30, name: "Rural Area 2", category: 'low' },
    { location: { lat: 24.6400, lng: 46.7100 }, weight: 18, name: "Outskirt Area", category: 'low' }
  ], []);

  const filteredData = useMemo(() => {
    const filtered = selectedCategory === 'all' 
      ? dataPoints 
      : dataPoints.filter(point => point.category === selectedCategory);
    
    return filtered.map(point => ({
      location: new window.google.maps.LatLng(point.location.lat, point.location.lng),
      weight: point.weight
    }));
  }, [dataPoints, selectedCategory]);

  const getMarkerColor = (category: string) => {
    const colors = {
      high: '#dc3545',
      medium: '#ffc107',
      low: '#28a745'
    };
    return colors[category as keyof typeof colors];
  };

  const getCategoryStats = () => {
    const stats = {
      all: dataPoints.length,
      high: dataPoints.filter(p => p.category === 'high').length,
      medium: dataPoints.filter(p => p.category === 'medium').length,
      low: dataPoints.filter(p => p.category === 'low').length
    };
    
    const totalWeight = dataPoints
      .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
      .reduce((sum, p) => sum + p.weight, 0);
    
    return { ...stats, totalWeight };
  };

  const stats = getCategoryStats();

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Weighted Heatmap</h3>
          <p>Heatmap with weighted data points showing different intensity levels</p>
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Filter by Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Categories</option>
                <option value="high">High Weight</option>
                <option value="medium">Medium Weight</option>
                <option value="low">Low Weight</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginTop: '20px' }}>
                <input
                  type="checkbox"
                  checked={showMarkers}
                  onChange={(e) => setShowMarkers(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Show Data Point Markers
              </label>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginBottom: '15px' }}>
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
                {stats.all}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Total Points</div>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>
                {stats.high}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>High Weight</div>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffc107' }}>
                {stats.medium}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Medium Weight</div>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                {stats.low}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Low Weight</div>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#6f42c1' }}>
                {stats.totalWeight}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Total Weight</div>
            </div>
          </div>

          <div style={{ fontSize: '14px' }}>
            <strong>Legend:</strong>
            <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
              <span>🔴 High Weight (80-100)</span>
              <span>🟡 Medium Weight (40-60)</span>
              <span>🟢 Low Weight (15-30)</span>
            </div>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={center}
        >
          <HeatmapLayer 
            data={filteredData}
            options={{
              opacity: 0.7,
              radius: 25,
              dissipating: true
            }}
          />
          
          {showMarkers && dataPoints
            .filter(point => selectedCategory === 'all' || point.category === selectedCategory)
            .map((point, index) => (
              <Marker
                key={index}
                position={point.location}
                title={`${point.name} (Weight: ${point.weight})`}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: Math.sqrt(point.weight) / 2,
                  fillColor: getMarkerColor(point.category),
                  fillOpacity: 0.8,
                  strokeColor: '#FFFFFF',
                  strokeWeight: 2
                }}
              />
            ))
          }
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default WeightedHeatmap;
```

### Real-time Data Heatmap
```typescript
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';

const libraries: ("visualization")[] = ["visualization"];

const RealTimeHeatmap: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<google.maps.LatLng[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [dataCount, setDataCount] = useState(0);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Simulate real-time data updates
  const generateNewDataPoint = useCallback(() => {
    // Simulate data points with some clustering around popular areas
    const hotspots = [
      { lat: 24.7136, lng: 46.6753, weight: 0.4 }, // Kingdom Centre
      { lat: 24.6877, lng: 46.6857, weight: 0.3 }, // Al Faisaliah
      { lat: 24.6308, lng: 46.7073, weight: 0.2 }, // Masmak
      { lat: 24.7200, lng: 46.6700, weight: 0.1 }  // Other area
    ];

    const selectedHotspot = hotspots[Math.floor(Math.random() * hotspots.length)];
    
    return new window.google.maps.LatLng(
      selectedHotspot.lat + (Math.random() - 0.5) * 0.02,
      selectedHotspot.lng + (Math.random() - 0.5) * 0.02
    );
  }, []);

  // Simulation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSimulating) {
      interval = setInterval(() => {
        const newPoint = generateNewDataPoint();
        setHeatmapData(prev => {
          const updated = [...prev, newPoint];
          // Keep only last 200 points for performance
          return updated.slice(-200);
        });
        setDataCount(prev => prev + 1);
      }, 500); // Add new point every 500ms
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating, generateNewDataPoint]);

  const startSimulation = () => {
    setIsSimulating(true);
  };

  const stopSimulation = () => {
    setIsSimulating(false);
  };

  const clearData = () => {
    setHeatmapData([]);
    setDataCount(0);
    setIsSimulating(false);
  };

  const addBurstData = () => {
    const burstPoints = [];
    for (let i = 0; i < 20; i++) {
      burstPoints.push(generateNewDataPoint());
    }
    setHeatmapData(prev => [...prev, ...burstPoints].slice(-200));
    setDataCount(prev => prev + 20);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Real-time Data Heatmap</h3>
          <p>Simulate real-time data updates and see the heatmap change dynamically</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={startSimulation}
              disabled={isSimulating}
              style={{
                padding: '10px 20px',
                backgroundColor: isSimulating ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSimulating ? 'not-allowed' : 'pointer'
              }}
            >
              {isSimulating ? 'Simulating...' : 'Start Simulation'}
            </button>
            
            <button
              onClick={stopSimulation}
              disabled={!isSimulating}
              style={{
                padding: '10px 20px',
                backgroundColor: !isSimulating ? '#6c757d' : '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: !isSimulating ? 'not-allowed' : 'pointer'
              }}
            >
              Stop Simulation
            </button>
            
            <button
              onClick={addBurstData}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Burst Data (+20)
            </button>
            
            <button
              onClick={clearData}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ffc107',
                color: 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear All Data
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
                {heatmapData.length}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Active Points</div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                (Max 200)
              </div>
            </div>
            
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                {dataCount}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Total Generated</div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                Since start
              </div>
            </div>
            
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: isSimulating ? '#28a745' : '#dc3545' 
              }}>
                {isSimulating ? '🟢' : '🔴'}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Status</div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                {isSimulating ? 'Running' : 'Stopped'}
              </div>
            </div>
            
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
                0.5s
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Update Rate</div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                Per point
              </div>
            </div>
          </div>

          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: isSimulating ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <strong>Simulation Info:</strong> 
            {isSimulating 
              ? ' Data points are being added every 0.5 seconds around popular areas in Riyadh.'
              : ' Click "Start Simulation" to begin generating real-time data points.'
            }
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          {heatmapData.length > 0 && (
            <HeatmapLayer 
              data={heatmapData}
              options={{
                opacity: 0.8,
                radius: 30,
                dissipating: true,
                gradient: [
                  'rgba(0, 255, 255, 0)',
                  'rgba(0, 255, 255, 1)',
                  'rgba(0, 191, 255, 1)',
                  'rgba(0, 127, 255, 1)',
                  'rgba(0, 63, 255, 1)',
                  'rgba(0, 0, 255, 1)',
                  'rgba(0, 0, 223, 1)',
                  'rgba(0, 0, 191, 1)',
                  'rgba(0, 0, 159, 1)',
                  'rgba(0, 0, 127, 1)',
                  'rgba(63, 0, 91, 1)',
                  'rgba(127, 0, 63, 1)',
                  'rgba(191, 0, 31, 1)',
                  'rgba(255, 0, 0, 1)'
                ]
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default RealTimeHeatmap;
```

## Best Practices

### 1. Data Management
```typescript
// Limit data points for performance
const MAX_POINTS = 1000;

// Use weighted locations for better visualization
const createWeightedPoint = (lat: number, lng: number, weight: number) => ({
  location: new window.google.maps.LatLng(lat, lng),
  weight: weight
});

// Normalize weights for consistent visualization
const normalizeWeights = (data: WeightedLocation[], maxWeight: number) => {
  return data.map(point => ({
    ...point,
    weight: (point.weight / maxWeight) * 100
  }));
};
```

### 2. Performance Optimization
```typescript
// Use React.memo for heatmap component
const OptimizedHeatmapLayer = React.memo(HeatmapLayer);

// Debounce data updates
const debouncedUpdateData = useCallback(
  debounce((newData: google.maps.LatLng[]) => {
    setHeatmapData(newData);
  }, 100),
  []
);

// Implement data virtualization for large datasets
const useVirtualizedHeatmapData = (allData: any[], viewport: any) => {
  return useMemo(() => {
    return allData.filter(point => isInViewport(point, viewport));
  }, [allData, viewport]);
};
```

### 3. Visual Design
```typescript
// Create custom gradients
const createGradient = (colors: string[]) => {
  return colors.map((color, index) => 
    `rgba(${color}, ${index / (colors.length - 1)})`
  );
};

// Responsive radius based on zoom
const getRadiusForZoom = (zoom: number) => {
  if (zoom < 10) return 15;
  if (zoom < 13) return 20;
  return 25;
};
```

## Common Issues and Solutions

### 1. Visualization library not loaded
- Ensure 'visualization' is included in libraries array
- Check that LoadScript includes the visualization library

### 2. Performance issues with large datasets
- Limit the number of data points (max 1000-2000)
- Use data virtualization for viewport-based filtering
- Implement data aggregation for distant points

### 3. Heatmap not visible
- Check data point coordinates are valid
- Ensure opacity is greater than 0
- Verify data points are within map bounds

### 4. Memory leaks with real-time data
- Implement data point limits
- Clean up intervals and timeouts
- Use proper cleanup in useEffect

## Important Notes

- HeatmapLayer requires the visualization library to be loaded
- Performance decreases significantly with large datasets (>2000 points)
- Use weighted locations for more accurate intensity representation
- Dissipating option affects how heatmap behaves on zoom changes
- Custom gradients should have proper alpha values for smooth transitions
- Consider data aggregation for better performance with dense datasets
- Real-time updates should be throttled to prevent performance issues