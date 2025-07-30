# Core Components for Saudi Trip Tracking System

## Overview

This file documents the core Google Maps components used directly in the Saudi trip tracking system, explaining how to apply them to Saudi Arabia's requirements.

## 1. GoogleMap - Main Map Component

### System Usage
```typescript
import { GoogleMap } from '@react-google-maps/api';

const SaudiLogisticsMap: React.FC = () => {
  const mapOptions = {
    center: { lat: 24.7136, lng: 46.6753 }, // Riyadh
    zoom: 6, // Full Saudi view
    mapTypeId: 'roadmap',
    styles: saudiMapStyles, // Custom style for Saudi Arabia
    restriction: {
      latLngBounds: {
        north: 32.5, // Northern border
        south: 16.0, // Southern border  
        east: 55.0,  // Eastern border
        west: 34.0   // Western border
      },
      strictBounds: false
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100vh' }}
      options={mapOptions}
      onLoad={onMapLoad}
      onClick={onMapClick}
    >
      {/* Other components */}
    </GoogleMap>
  );
};
```

### Required Customizations
- **Map Boundaries**: Restrict view to Saudi Arabia
- **Default Center**: Riyadh as central point
- **Zoom Level**: 6 for full Saudi view
- **Custom Style**: Colors matching Saudi identity

## 2. Marker - Truck and Location Markers

### Marker Types

#### A) Truck Markers
```typescript
interface TruckMarkerProps {
  truck: Truck;
  isSelected: boolean;
  onClick: (truck: Truck) => void;
}

const TruckMarker: React.FC<TruckMarkerProps> = ({ truck, isSelected, onClick }) => {
  const getTruckIcon = () => {
    const baseIcon = {
      url: `/icons/truck-${truck.type}.svg`,
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 20),
      rotation: truck.heading // Truck direction
    };

    // Change color based on status
    if (truck.status === 'emergency') {
      baseIcon.url = `/icons/truck-emergency.svg`;
    } else if (truck.isOffRoute) {
      baseIcon.url = `/icons/truck-warning.svg`;
    }

    return baseIcon;
  };

  return (
    <Marker
      position={truck.currentLocation}
      icon={getTruckIcon()}
      title={`${truck.plateNumber} - ${truck.driver.name}`}
      onClick={() => onClick(truck)}
      animation={isSelected ? google.maps.Animation.BOUNCE : undefined}
    />
  );
};
```

#### B) Airport Markers
```typescript
const AirportMarker: React.FC<{ airport: Airport }> = ({ airport }) => {
  return (
    <Marker
      position={airport.location}
      icon={{
        url: '/icons/airport.svg',
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 16)
      }}
      title={`${airport.name} - ${airport.code}`}
    />
  );
};
```

#### C) Port Markers
```typescript
const PortMarker: React.FC<{ port: Port }> = ({ port }) => {
  return (
    <Marker
      position={port.location}
      icon={{
        url: '/icons/port.svg',
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 16)
      }}
      title={`${port.name} - ${port.type}`}
    />
  );
};
```

#### D) Border Crossing Markers
```typescript
const BorderCrossingMarker: React.FC<{ crossing: BorderCrossing }> = ({ crossing }) => {
  return (
    <Marker
      position={crossing.location}
      icon={{
        url: '/icons/border-crossing.svg',
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 16)
      }}
      title={`${crossing.name} - ${crossing.country}`}
    />
  );
};
```

### Required Customizations
- **Custom Icons**: Design icons reflecting Saudi identity
- **Icon Rotation**: Rotate truck icon based on direction
- **Status Colors**: Different colors based on truck status
- **Graduated Sizes**: Different sizes based on location importance

## 3. Polyline - Trip Routes

### Route Drawing
```typescript
interface RoutePolylineProps {
  route: Route;
  type: 'planned' | 'actual';
  isActive: boolean;
}

const RoutePolyline: React.FC<RoutePolylineProps> = ({ route, type, isActive }) => {
  const getPolylineOptions = () => {
    const baseOptions = {
      strokeWeight: isActive ? 6 : 4,
      strokeOpacity: isActive ? 0.9 : 0.6,
      zIndex: isActive ? 100 : 50
    };

    if (type === 'planned') {
      return {
        ...baseOptions,
        strokeColor: '#2196F3', // Blue for planned route
        strokePattern: [10, 5] // Dashed line
      };
    } else {
      // Actual route - color based on compliance
      const color = route.isCompliant ? '#4CAF50' : '#F44336';
      return {
        ...baseOptions,
        strokeColor: color,
        strokePattern: [] // Solid line
      };
    }
  };

  return (
    <Polyline
      path={route.path}
      options={getPolylineOptions()}
    />
  );
};
```

### Multiple Routes
```typescript
const TripRoutes: React.FC<{ trip: Trip }> = ({ trip }) => {
  return (
    <>
      {/* Planned route */}
      <RoutePolyline 
        route={trip.plannedRoute} 
        type="planned" 
        isActive={trip.isSelected} 
      />
      
      {/* Actual route */}
      <RoutePolyline 
        route={trip.actualRoute} 
        type="actual" 
        isActive={trip.isSelected} 
      />
      
      {/* Deviation route if exists */}
      {trip.deviationRoute && (
        <Polyline
          path={trip.deviationRoute.path}
          options={{
            strokeColor: '#FF9800', // Orange for deviation
            strokeWeight: 4,
            strokeOpacity: 0.8,
            strokePattern: [5, 5]
          }}
        />
      )}
    </>
  );
};
```

### Required Customizations
- **Distinctive Colors**: Different colors for planned and actual routes
- **Line Patterns**: Dashed for planned, solid for actual
- **Variable Thickness**: Thicker for selected trip
- **Multiple Layers**: Display order by importance

## 4. InfoWindow - Information Windows

### Truck Details Window
```typescript
interface TruckInfoWindowProps {
  truck: Truck;
  isOpen: boolean;
  onClose: () => void;
}

const TruckInfoWindow: React.FC<TruckInfoWindowProps> = ({ truck, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <InfoWindow
      position={truck.currentLocation}
      onCloseClick={onClose}
    >
      <div className="truck-info-window">
        <div className="header">
          <h3>{truck.plateNumber}</h3>
          <span className={`status ${truck.status}`}>
            {getStatusText(truck.status)}
          </span>
        </div>
        
        <div className="details">
          <div className="row">
            <span>Driver:</span>
            <span>{truck.driver.name}</span>
          </div>
          <div className="row">
            <span>Speed:</span>
            <span>{truck.currentSpeed} km/h</span>
          </div>
          <div className="row">
            <span>Destination:</span>
            <span>{truck.trip.destination.name}</span>
          </div>
          <div className="row">
            <span>Progress:</span>
            <span>{truck.trip.progress}%</span>
          </div>
        </div>

        {truck.alerts.length > 0 && (
          <div className="alerts">
            <h4>Alerts:</h4>
            {truck.alerts.map(alert => (
              <div key={alert.id} className={`alert ${alert.severity}`}>
                {alert.message}
              </div>
            ))}
          </div>
        )}

        <div className="actions">
          <button onClick={() => viewTripDetails(truck.trip)}>
            Trip Details
          </button>
          <button onClick={() => contactDriver(truck.driver)}>
            Contact Driver
          </button>
        </div>
      </div>
    </InfoWindow>
  );
};
```

### Location Details Window
```typescript
const LocationInfoWindow: React.FC<{ location: Location }> = ({ location }) => {
  return (
    <InfoWindow position={location.coordinates}>
      <div className="location-info">
        <h3>{location.name}</h3>
        <p><strong>Type:</strong> {location.type}</p>
        <p><strong>Capacity:</strong> {location.capacity} vehicles</p>
        <p><strong>Operating Hours:</strong> {location.operatingHours}</p>
        
        {location.currentOccupancy && (
          <div className="occupancy">
            <p><strong>Current Occupancy:</strong></p>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${(location.currentOccupancy / location.capacity) * 100}%` }}
              />
            </div>
            <span>{location.currentOccupancy} / {location.capacity}</span>
          </div>
        )}
      </div>
    </InfoWindow>
  );
};
```

### Required Customizations
- **Custom Design**: Interface matching Saudi design
- **Dynamic Content**: Display different information based on element type
- **Interactive Buttons**: Quick actions from window
- **Arabic Support**: Right-to-left text support

## 5. MarkerClusterer - Marker Clustering

### Truck Clustering
```typescript
import { MarkerClusterer } from '@react-google-maps/api';

const TruckClusterer: React.FC<{ trucks: Truck[] }> = ({ trucks }) => {
  const clusterOptions = {
    gridSize: 60,
    maxZoom: 15,
    styles: [
      {
        textColor: 'white',
        url: '/icons/cluster-small.svg',
        height: 40,
        width: 40,
        textSize: 12
      },
      {
        textColor: 'white',
        url: '/icons/cluster-medium.svg',
        height: 50,
        width: 50,
        textSize: 14
      },
      {
        textColor: 'white',
        url: '/icons/cluster-large.svg',
        height: 60,
        width: 60,
        textSize: 16
      }
    ]
  };

  return (
    <MarkerClusterer options={clusterOptions}>
      {(clusterer) =>
        trucks.map(truck => (
          <TruckMarker
            key={truck.id}
            truck={truck}
            clusterer={clusterer}
          />
        ))
      }
    </MarkerClusterer>
  );
};
```

### Required Customizations
- **Custom Icons**: Design clusters with Saudi identity
- **Status-based Colors**: Different colors based on clustered truck status
- **Dynamic Size**: Different sizes based on element count
- **Additional Information**: Display quick statistics on hover

## Benefits and Advantages

### 1. Enhanced Performance
- **Fast Loading**: Display thousands of trucks efficiently
- **Optimized Memory**: Optimal memory usage
- **Smooth Updates**: Update data without affecting performance

### 2. Superior User Experience
- **Intuitive Interface**: Easy navigation and use
- **Comprehensive Information**: Display all required details
- **Quick Interaction**: Instant response to actions

### 3. Accurate Tracking
- **Precise Location**: High-precision location determination
- **Correct Direction**: Display actual truck direction
- **Clear Routes**: Clear distinction between different routes

### 4. Comprehensive Monitoring
- **Complete Coverage**: All areas of Saudi Arabia
- **Official Locations**: All airports, ports, and crossings
- **Checkpoints**: Monitor all checkpoints

## Challenges and Solutions

### 1. Data Volume
**Challenge**: Display thousands of trucks and locations
**Solution**: Use MarkerClusterer and performance optimization

### 2. Continuous Updates
**Challenge**: Update locations every 30 seconds
**Solution**: Smart updates for changed elements only

### 3. Direction Accuracy
**Challenge**: Display truck direction accurately
**Solution**: Calculate direction from last two GPS points

### 4. Mobile Performance
**Challenge**: Smooth performance on phones
**Solution**: Optimize graphics and reduce displayed elements

## Conclusion

Core components provide a strong foundation for the Saudi trip tracking system, with extensive customization and development capabilities to meet Saudi Arabia's specific requirements.