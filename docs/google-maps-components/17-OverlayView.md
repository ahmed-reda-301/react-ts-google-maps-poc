# OverlayView Component

## Overview
`OverlayView` is a component that allows you to create custom overlays on the map. It provides complete control over the appearance and behavior of map overlays, enabling you to display any React component at specific geographic coordinates.

## Import
```typescript
import { OverlayView } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `position` | `LatLngLiteral \| LatLng` | ✅ | - | Overlay position coordinates |
| `mapPaneName` | `string` | ✅ | - | Map pane for overlay placement |
| `children` | `React.ReactNode` | ❌ | - | Content to display in overlay |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(overlayView: google.maps.OverlayView) => void` | Called when overlay loads |
| `onUnmount` | `(overlayView: google.maps.OverlayView) => void` | Called when overlay unmounts |

## Map Panes

| Pane | Description | Z-Index |
|------|-------------|---------|
| `mapPane` | Above tiles, below markers | 0 |
| `overlayLayer` | Above markers, below info windows | 1 |
| `overlayMouseTarget` | Above info windows, receives mouse events | 2 |
| `overlayImage` | Above overlayMouseTarget | 3 |
| `floatPane` | Above all other overlays | 4 |

## Usage Examples

### Basic Custom Overlay
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, OverlayView, Marker } from '@react-google-maps/api';

const BasicCustomOverlay: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const overlayPosition = {
    lat: 24.7136,
    lng: 46.6753
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Basic Custom Overlay</h3>
          <p>A simple custom overlay displaying React content at a specific location</p>
          
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
          zoom={13}
          center={center}
        >
          <Marker position={center} title="Kingdom Centre" />
          
          {showOverlay && (
            <OverlayView
              position={overlayPosition}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div style={{
                background: 'white',
                border: '2px solid #007bff',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transform: 'translate(-50%, -100%)',
                maxWidth: '200px'
              }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#007bff' }}>
                  Custom Overlay
                </h4>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  This is a custom React component displayed as a map overlay!
                </p>
              </div>
            </OverlayView>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default BasicCustomOverlay;
```

### Interactive Overlay with State
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';

interface OverlayData {
  id: number;
  position: google.maps.LatLngLiteral;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'warning';
  value: number;
}

const InteractiveOverlay: React.FC = () => {
  const [overlays, setOverlays] = useState<OverlayData[]>([
    {
      id: 1,
      position: { lat: 24.7136, lng: 46.6753 },
      title: "Sensor A",
      description: "Temperature monitoring",
      status: 'active',
      value: 25.6
    },
    {
      id: 2,
      position: { lat: 24.6877, lng: 46.6857 },
      title: "Sensor B",
      description: "Humidity monitoring",
      status: 'warning',
      value: 78.2
    },
    {
      id: 3,
      position: { lat: 24.6308, lng: 46.7073 },
      title: "Sensor C",
      description: "Air quality monitoring",
      status: 'inactive',
      value: 0
    }
  ]);

  const [selectedOverlay, setSelectedOverlay] = useState<number | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: '#28a745',
      warning: '#ffc107',
      inactive: '#6c757d'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      active: '✅',
      warning: '⚠️',
      inactive: '❌'
    };
    return icons[status as keyof typeof icons];
  };

  const updateOverlayStatus = (id: number, newStatus: OverlayData['status']) => {
    setOverlays(prev => prev.map(overlay =>
      overlay.id === id ? { ...overlay, status: newStatus } : overlay
    ));
  };

  const OverlayContent = ({ overlay }: { overlay: OverlayData }) => {
    const isSelected = selectedOverlay === overlay.id;
    
    return (
      <div
        onClick={() => setSelectedOverlay(isSelected ? null : overlay.id)}
        style={{
          background: 'white',
          border: `3px solid ${getStatusColor(overlay.status)}`,
          borderRadius: '12px',
          padding: isSelected ? '15px' : '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transform: 'translate(-50%, -100%)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          minWidth: isSelected ? '250px' : '120px',
          maxWidth: '300px'
        }}
      >
        {/* Compact View */}
        {!isSelected && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '5px' }}>
              {getStatusIcon(overlay.status)}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {overlay.title}
            </div>
            <div style={{ fontSize: '14px', color: getStatusColor(overlay.status), fontWeight: 'bold' }}>
              {overlay.value > 0 ? overlay.value : 'N/A'}
            </div>
          </div>
        )}

        {/* Expanded View */}
        {isSelected && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '24px', marginRight: '10px' }}>
                {getStatusIcon(overlay.status)}
              </span>
              <div>
                <h4 style={{ margin: 0, fontSize: '16px' }}>{overlay.title}</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                  {overlay.description}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: getStatusColor(overlay.status) }}>
                {overlay.value > 0 ? `${overlay.value}${overlay.title.includes('Temperature') ? '°C' : overlay.title.includes('Humidity') ? '%' : ' AQI'}` : 'Offline'}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Current reading
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>
                Status Controls:
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {(['active', 'warning', 'inactive'] as const).map(status => (
                  <button
                    key={status}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateOverlayStatus(overlay.id, status);
                    }}
                    style={{
                      padding: '4px 8px',
                      fontSize: '10px',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: overlay.status === status ? getStatusColor(status) : '#e9ecef',
                      color: overlay.status === status ? 'white' : '#666',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '10px', color: '#999', textAlign: 'center' }}>
              Click outside to minimize
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Interactive Sensor Overlays</h3>
          <p>Click on sensor overlays to expand and interact with them</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '15px' }}>
            {overlays.map(overlay => (
              <div
                key={overlay.id}
                style={{
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: `2px solid ${getStatusColor(overlay.status)}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ fontSize: '16px', marginRight: '8px' }}>
                    {getStatusIcon(overlay.status)}
                  </span>
                  <strong>{overlay.title}</strong>
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {overlay.description}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: getStatusColor(overlay.status) }}>
                  Status: {overlay.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
          onClick={() => setSelectedOverlay(null)}
        >
          {overlays.map(overlay => (
            <OverlayView
              key={overlay.id}
              position={overlay.position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <OverlayContent overlay={overlay} />
            </OverlayView>
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default InteractiveOverlay;
```

### Custom Chart Overlays
```typescript
import React, { useState, useMemo } from 'react';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';

interface ChartData {
  id: number;
  position: google.maps.LatLngLiteral;
  name: string;
  data: number[];
  labels: string[];
  type: 'bar' | 'line' | 'pie';
  color: string;
}

const CustomChartOverlays: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<number | null>(null);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const chartData: ChartData[] = [
    {
      id: 1,
      position: { lat: 24.7136, lng: 46.6753 },
      name: "Sales Data",
      data: [65, 59, 80, 81, 56],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      type: 'bar',
      color: '#007bff'
    },
    {
      id: 2,
      position: { lat: 24.6877, lng: 46.6857 },
      name: "Temperature Trend",
      data: [22, 25, 28, 30, 27],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      type: 'line',
      color: '#28a745'
    },
    {
      id: 3,
      position: { lat: 24.6308, lng: 46.7073 },
      name: "Market Share",
      data: [30, 25, 20, 15, 10],
      labels: ['A', 'B', 'C', 'D', 'E'],
      type: 'pie',
      color: '#ffc107'
    }
  ];

  const SimpleBarChart = ({ data, labels, color, width = 150, height = 100 }: any) => {
    const maxValue = Math.max(...data);
    const barWidth = width / data.length - 2;

    return (
      <svg width={width} height={height} style={{ background: 'white', borderRadius: '4px' }}>
        {data.map((value: number, index: number) => {
          const barHeight = (value / maxValue) * (height - 20);
          const x = index * (barWidth + 2) + 1;
          const y = height - barHeight - 10;

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                opacity={0.8}
              />
              <text
                x={x + barWidth / 2}
                y={height - 2}
                textAnchor="middle"
                fontSize="8"
                fill="#666"
              >
                {labels[index]}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const SimpleLineChart = ({ data, labels, color, width = 150, height = 100 }: any) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;

    const points = data.map((value: number, index: number) => {
      const x = (index / (data.length - 1)) * (width - 20) + 10;
      const y = height - 20 - ((value - minValue) / range) * (height - 40);
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} style={{ background: 'white', borderRadius: '4px' }}>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        {data.map((value: number, index: number) => {
          const x = (index / (data.length - 1)) * (width - 20) + 10;
          const y = height - 20 - ((value - minValue) / range) * (height - 40);
          
          return (
            <g key={index}>
              <circle cx={x} cy={y} r="3" fill={color} />
              <text
                x={x}
                y={height - 5}
                textAnchor="middle"
                fontSize="8"
                fill="#666"
              >
                {labels[index]}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const SimplePieChart = ({ data, labels, color, size = 100 }: any) => {
    const total = data.reduce((sum: number, value: number) => sum + value, 0);
    let currentAngle = 0;
    const radius = size / 2 - 10;
    const centerX = size / 2;
    const centerY = size / 2;

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];

    return (
      <svg width={size} height={size} style={{ background: 'white', borderRadius: '4px' }}>
        {data.map((value: number, index: number) => {
          const angle = (value / total) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          
          const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
          const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
          const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
          const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
          
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');

          currentAngle += angle;

          return (
            <path
              key={index}
              d={pathData}
              fill={colors[index % colors.length]}
              opacity={0.8}
            />
          );
        })}
      </svg>
    );
  };

  const ChartOverlay = ({ chart }: { chart: ChartData }) => {
    const isSelected = selectedChart === chart.id;

    const renderChart = () => {
      switch (chart.type) {
        case 'bar':
          return <SimpleBarChart {...chart} />;
        case 'line':
          return <SimpleLineChart {...chart} />;
        case 'pie':
          return <SimplePieChart {...chart} />;
        default:
          return null;
      }
    };

    return (
      <div
        onClick={() => setSelectedChart(isSelected ? null : chart.id)}
        style={{
          background: 'white',
          border: `2px solid ${chart.color}`,
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transform: 'translate(-50%, -100%)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', color: chart.color }}>
            {chart.name}
          </h4>
          <div style={{ fontSize: '10px', color: '#666', textTransform: 'capitalize' }}>
            {chart.type} Chart
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {renderChart()}
        </div>

        {isSelected && (
          <div style={{ marginTop: '10px', fontSize: '10px', color: '#666' }}>
            <div>Max: {Math.max(...chart.data)}</div>
            <div>Min: {Math.min(...chart.data)}</div>
            <div>Avg: {(chart.data.reduce((a, b) => a + b, 0) / chart.data.length).toFixed(1)}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Custom Chart Overlays</h3>
          <p>Interactive charts displayed as map overlays showing different data visualizations</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '15px' }}>
            {chartData.map(chart => (
              <div
                key={chart.id}
                style={{
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: `2px solid ${chart.color}`
                }}
              >
                <strong style={{ color: chart.color }}>{chart.name}</strong>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'capitalize' }}>
                  {chart.type} chart with {chart.data.length} data points
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Range: {Math.min(...chart.data)} - {Math.max(...chart.data)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
          onClick={() => setSelectedChart(null)}
        >
          {chartData.map(chart => (
            <OverlayView
              key={chart.id}
              position={chart.position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <ChartOverlay chart={chart} />
            </OverlayView>
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default CustomChartOverlays;
```

## Best Practices

### 1. Performance Optimization
```typescript
// Use React.memo for overlay content
const MemoizedOverlayContent = React.memo(({ data }: { data: any }) => (
  <div>{/* overlay content */}</div>
));

// Limit number of overlays
const MAX_OVERLAYS = 50;

// Use appropriate map panes
const getMapPane = (interactive: boolean) => {
  return interactive 
    ? OverlayView.OVERLAY_MOUSE_TARGET 
    : OverlayView.OVERLAY_LAYER;
};
```

### 2. Positioning and Styling
```typescript
// Center overlays properly
const centerOverlay = {
  transform: 'translate(-50%, -50%)'
};

// Position above markers
const aboveMarker = {
  transform: 'translate(-50%, -100%)'
};

// Responsive sizing
const getOverlaySize = () => {
  return window.innerWidth < 768 ? 'small' : 'large';
};
```

### 3. Event Handling
```typescript
// Prevent map events when interacting with overlay
const handleOverlayClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  // Handle overlay interaction
};

// Handle overlay visibility based on zoom
const useZoomBasedVisibility = (map: google.maps.Map, minZoom: number) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const listener = map.addListener('zoom_changed', () => {
      setVisible(map.getZoom() >= minZoom);
    });
    return () => listener.remove();
  }, [map, minZoom]);
  
  return visible;
};
```

## Common Issues and Solutions

### 1. Overlay positioning issues
- Use proper transform CSS for centering
- Consider map projection and zoom level
- Test positioning at different zoom levels

### 2. Performance problems with many overlays
- Limit the number of visible overlays
- Use virtualization for large datasets
- Choose appropriate map panes

### 3. Overlays not responding to clicks
- Ensure overlay is in OVERLAY_MOUSE_TARGET pane
- Check for CSS pointer-events settings
- Verify event handlers are properly attached

### 4. Overlays not updating with map changes
- Use proper React state management
- Implement cleanup in useEffect
- Handle map bounds changes appropriately

## Important Notes

- OverlayView must be a child of GoogleMap component
- Position prop is required for proper placement
- Choose appropriate mapPaneName for desired behavior
- Use OVERLAY_MOUSE_TARGET for interactive overlays
- Consider performance impact with many overlays
- Test responsiveness across different screen sizes
- Implement proper event handling to prevent conflicts
- Use CSS transforms for precise positioning