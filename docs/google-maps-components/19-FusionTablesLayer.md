# FusionTablesLayer Component

## ⚠️ DEPRECATED NOTICE
**FusionTablesLayer has been deprecated by Google and is no longer supported as of December 3, 2019. This documentation is provided for legacy reference only. For new projects, consider using alternative data visualization methods such as:**
- Custom data overlays with OverlayView
- KmlLayer for geographic data
- HeatmapLayer for density visualization
- Custom markers with data binding

## Overview
`FusionTablesLayer` was a component that displayed data from Google Fusion Tables on the map. It allowed visualization of large datasets with geographic information through various styling options.

## Import
```typescript
import { FusionTablesLayer } from '@react-google-maps/api';
```

## Props (Legacy Reference)

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `FusionTablesLayerOptions` | ✅ | - | Layer configuration options |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(fusionTablesLayer: google.maps.FusionTablesLayer) => void` | Called when layer loads |
| `onUnmount` | `(fusionTablesLayer: google.maps.FusionTablesLayer) => void` | Called when layer unmounts |
| `onClick` | `(e: google.maps.FusionTablesMouseEvent) => void` | Layer click event |

## FusionTablesLayerOptions (Legacy)

| Option | Type | Description |
|--------|------|-------------|
| `query` | `FusionTablesQuery` | Query to filter data |
| `styles` | `FusionTablesStyle[]` | Styling options |
| `suppressInfoWindows` | `boolean` | Hide info windows |
| `clickable` | `boolean` | Allow clicking on features |

## Migration Alternatives

### 1. Using Custom Data Overlays
```typescript
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, OverlayView, Marker } from '@react-google-maps/api';

interface DataPoint {
  id: string;
  position: google.maps.LatLngLiteral;
  value: number;
  category: string;
  name: string;
}

const CustomDataOverlay: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Simulate loading data that would have come from Fusion Tables
  useEffect(() => {
    const loadData = async () => {
      // In a real application, this would fetch from your data source
      const sampleData: DataPoint[] = [
        {
          id: '1',
          position: { lat: 24.7136, lng: 46.6753 },
          value: 85,
          category: 'commercial',
          name: 'Kingdom Centre Area'
        },
        {
          id: '2',
          position: { lat: 24.6877, lng: 46.6857 },
          value: 72,
          category: 'commercial',
          name: 'Al Faisaliah Area'
        },
        {
          id: '3',
          position: { lat: 24.6308, lng: 46.7073 },
          value: 45,
          category: 'historical',
          name: 'Masmak Fortress Area'
        },
        {
          id: '4',
          position: { lat: 24.6465, lng: 46.7169 },
          value: 38,
          category: 'cultural',
          name: 'National Museum Area'
        }
      ];

      // Simulate API delay
      setTimeout(() => {
        setDataPoints(sampleData);
        setLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors = {
      commercial: '#007bff',
      historical: '#dc3545',
      cultural: '#28a745',
      residential: '#ffc107'
    };
    return colors[category as keyof typeof colors] || '#6c757d';
  };

  const getMarkerSize = (value: number) => {
    // Scale marker size based on value (10-30 range)
    return Math.max(10, Math.min(30, value / 3));
  };

  if (loading) {
    return (
      <div style={{ 
        height: '500px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div>Loading data...</div>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Custom Data Visualization (Fusion Tables Alternative)</h3>
          <p>Display custom data points with styling based on categories and values</p>
          
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#fff3cd', 
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            <strong>⚠️ Migration Note:</strong> This example shows how to replace Fusion Tables functionality 
            with custom data overlays and markers.
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4>Data Statistics:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
                  {dataPoints.length}
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
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                  {Math.round(dataPoints.reduce((sum, point) => sum + point.value, 0) / dataPoints.length)}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Avg Value</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffc107' }}>
                  {new Set(dataPoints.map(p => p.category)).size}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Categories</div>
              </div>
            </div>
          </div>

          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <strong>Legend:</strong>
            <div style={{ marginTop: '5px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {Array.from(new Set(dataPoints.map(p => p.category))).map(category => (
                <span key={category} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: getCategoryColor(category),
                    borderRadius: '50%',
                    marginRight: '5px'
                  }} />
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          {dataPoints.map(point => (
            <Marker
              key={point.id}
              position={point.position}
              title={`${point.name} - Value: ${point.value}`}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: getMarkerSize(point.value),
                fillColor: getCategoryColor(point.category),
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

export default CustomDataOverlay;
```

### 2. Using KML for Geographic Data
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, KmlLayer } from '@react-google-maps/api';

const KmlDataVisualization: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState('boundaries');

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Sample KML datasets (replace Fusion Tables data)
  const kmlDatasets = {
    boundaries: {
      name: 'Administrative Boundaries',
      url: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml',
      description: 'Regional administrative boundaries data'
    },
    demographics: {
      name: 'Demographic Data',
      url: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml',
      description: 'Population and demographic information'
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>KML Data Visualization (Fusion Tables Alternative)</h3>
          <p>Use KML files to display geographic data that was previously in Fusion Tables</p>
          
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#d4edda', 
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            <strong>✅ Recommended Migration:</strong> Convert your Fusion Tables data to KML format 
            for continued geographic data visualization.
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Select Dataset:
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {Object.entries(kmlDatasets).map(([key, dataset]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDataset(key)}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: selectedDataset === key ? '#007bff' : 'white',
                    color: selectedDataset === key ? 'white' : '#007bff',
                    border: '2px solid #007bff',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  {dataset.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '14px', color: '#666' }}>
            <strong>Current Dataset:</strong> {kmlDatasets[selectedDataset as keyof typeof kmlDatasets].description}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          <KmlLayer
            url={kmlDatasets[selectedDataset as keyof typeof kmlDatasets].url}
            options={{
              clickable: true,
              preserveViewport: false,
              suppressInfoWindows: false
            }}
          />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default KmlDataVisualization;
```

### 3. Using HeatmapLayer for Density Data
```typescript
import React, { useState, useMemo } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';

const libraries: ("visualization")[] = ["visualization"];

const HeatmapDataVisualization: React.FC = () => {
  const [dataIntensity, setDataIntensity] = useState(0.6);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  // Convert tabular data to heatmap points
  const heatmapData = useMemo(() => {
    const data = [];
    
    // Sample data that might have been in Fusion Tables
    const densityPoints = [
      { lat: 24.7136, lng: 46.6753, weight: 100 }, // High density area
      { lat: 24.6877, lng: 46.6857, weight: 85 },
      { lat: 24.6308, lng: 46.7073, weight: 45 },
      { lat: 24.6465, lng: 46.7169, weight: 60 },
      { lat: 24.7200, lng: 46.6700, weight: 75 }
    ];

    densityPoints.forEach(point => {
      // Create multiple points around each location for better heatmap effect
      for (let i = 0; i < point.weight / 10; i++) {
        data.push({
          location: new window.google.maps.LatLng(
            point.lat + (Math.random() - 0.5) * 0.01,
            point.lng + (Math.random() - 0.5) * 0.01
          ),
          weight: Math.random() * point.weight
        });
      }
    });

    return data;
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Heatmap Data Visualization (Fusion Tables Alternative)</h3>
          <p>Use heatmaps to visualize density data that was previously in Fusion Tables</p>
          
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#d1ecf1', 
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            <strong>💡 Use Case:</strong> Perfect for visualizing density data, population statistics, 
            or any numeric data that was previously displayed as colored regions in Fusion Tables.
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Data Intensity: {dataIntensity}
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={dataIntensity}
              onChange={(e) => setDataIntensity(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ fontSize: '14px', color: '#666' }}>
            <strong>Data Points:</strong> {heatmapData.length} weighted locations
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
        >
          <HeatmapLayer
            data={heatmapData}
            options={{
              opacity: dataIntensity,
              radius: 25,
              dissipating: true
            }}
          />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default HeatmapDataVisualization;
```

## Migration Guide

### Step 1: Export Your Fusion Tables Data
Before the service was discontinued, users needed to:
1. Export data from Fusion Tables to CSV/KML format
2. Store the data in alternative services (Google Sheets, Cloud Storage, etc.)

### Step 2: Choose Alternative Visualization Method

| Original Use Case | Recommended Alternative |
|-------------------|------------------------|
| Point data with categories | Custom Markers with data binding |
| Density/heat maps | HeatmapLayer |
| Geographic boundaries | KmlLayer |
| Complex data queries | Custom data processing + OverlayView |
| Real-time data | Custom API + dynamic markers |

### Step 3: Implementation Patterns

```typescript
// Pattern 1: Custom Data Service
const useDataService = (dataSource: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(dataSource)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [dataSource]);
  
  return { data, loading };
};

// Pattern 2: Data Transformation
const transformFusionTableData = (csvData: any[]) => {
  return csvData.map(row => ({
    position: { lat: row.latitude, lng: row.longitude },
    value: row.value,
    category: row.category,
    // ... other properties
  }));
};
```

## Important Notes

- **Service Discontinued**: Fusion Tables was discontinued on December 3, 2019
- **No New Development**: Do not use FusionTablesLayer for new projects
- **Migration Required**: Existing applications must migrate to alternative solutions
- **Data Export**: Ensure you have exported all necessary data before migration
- **Alternative Solutions**: Use KmlLayer, HeatmapLayer, or custom overlays instead
- **Performance**: Modern alternatives often provide better performance and flexibility
- **Maintenance**: Google no longer provides support or updates for Fusion Tables

## Recommended Alternatives Summary

1. **KmlLayer**: For geographic data and boundaries
2. **HeatmapLayer**: For density and statistical data
3. **Custom Markers**: For point data with categories
4. **OverlayView**: For complex custom visualizations
5. **External Services**: Google Sheets API, Firebase, or custom APIs for data storage