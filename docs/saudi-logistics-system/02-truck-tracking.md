# Advanced Truck Tracking - Saudi Arabia System

## Overview

This file documents how to implement an advanced truck tracking system using Google Maps components, focusing on animated icons, dynamic directions, and real-time updates.

## 1. Animated Truck Icons

### Animated Truck Component
```typescript
import React, { useEffect, useState, useRef } from 'react';
import { Marker } from '@react-google-maps/api';

interface AnimatedTruckMarkerProps {
  truck: Truck;
  isSelected: boolean;
  onTruckClick: (truck: Truck) => void;
  animationSpeed: number; // milliseconds
}

const AnimatedTruckMarker: React.FC<AnimatedTruckMarkerProps> = ({
  truck,
  isSelected,
  onTruckClick,
  animationSpeed = 1000
}) => {
  const [currentPosition, setCurrentPosition] = useState(truck.currentLocation);
  const [rotation, setRotation] = useState(truck.heading);
  const animationRef = useRef<number>();
  const previousPosition = useRef(truck.currentLocation);

  // Calculate bearing between two points
  const calculateBearing = (start: LatLng, end: LatLng): number => {
    const startLat = start.lat * Math.PI / 180;
    const startLng = start.lng * Math.PI / 180;
    const endLat = end.lat * Math.PI / 180;
    const endLng = end.lng * Math.PI / 180;

    const dLng = endLng - startLng;
    const y = Math.sin(dLng) * Math.cos(endLat);
    const x = Math.cos(startLat) * Math.sin(endLat) - 
              Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);

    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360;
  };

  // Smooth truck animation
  const animateToNewPosition = (newPosition: LatLng) => {
    const startPosition = currentPosition;
    const startTime = Date.now();
    const newRotation = calculateBearing(startPosition, newPosition);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationSpeed, 1);

      // Animate position
      const lat = startPosition.lat + (newPosition.lat - startPosition.lat) * progress;
      const lng = startPosition.lng + (newPosition.lng - startPosition.lng) * progress;

      // Animate rotation
      let rotationDiff = newRotation - rotation;
      if (rotationDiff > 180) rotationDiff -= 360;
      if (rotationDiff < -180) rotationDiff += 360;
      const currentRotation = rotation + rotationDiff * progress;

      setCurrentPosition({ lat, lng });
      setRotation(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  // Update position when truck data changes
  useEffect(() => {
    if (
      truck.currentLocation.lat !== previousPosition.current.lat ||
      truck.currentLocation.lng !== previousPosition.current.lng
    ) {
      animateToNewPosition(truck.currentLocation);
      previousPosition.current = truck.currentLocation;
    }
  }, [truck.currentLocation]);

  // Cleanup animation
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Create truck icon
  const getTruckIcon = () => {
    const baseSize = isSelected ? 50 : 40;
    const iconUrl = getTruckIconUrl(truck);

    return {
      url: iconUrl,
      scaledSize: new google.maps.Size(baseSize, baseSize),
      anchor: new google.maps.Point(baseSize / 2, baseSize / 2),
      rotation: rotation,
      // Add shadow effect for selected truck
      ...(isSelected && {
        strokeColor: '#2196F3',
        strokeWeight: 3,
        fillOpacity: 0.8
      })
    };
  };

  return (
    <Marker
      position={currentPosition}
      icon={getTruckIcon()}
      title={`${truck.plateNumber} - ${truck.driver.name}`}
      onClick={() => onTruckClick(truck)}
      animation={isSelected ? google.maps.Animation.BOUNCE : undefined}
      zIndex={isSelected ? 1000 : truck.priority * 100}
    />
  );
};
```

### Truck Icon Types
```typescript
// Different truck types
enum TruckType {
  CONTAINER = 'container',
  TANKER = 'tanker',
  FLATBED = 'flatbed',
  REFRIGERATED = 'refrigerated',
  HEAVY_EQUIPMENT = 'heavy_equipment'
}

// Truck states
enum TruckStatus {
  MOVING = 'moving',
  STOPPED = 'stopped',
  LOADING = 'loading',
  UNLOADING = 'unloading',
  MAINTENANCE = 'maintenance',
  EMERGENCY = 'emergency'
}

const getTruckIconUrl = (truck: Truck): string => {
  const baseUrl = '/icons/trucks/';
  
  // Select icon based on type and status
  let iconName = `${truck.type}`;
  
  // Add special state for emergency
  if (truck.status === TruckStatus.EMERGENCY) {
    iconName += '-emergency';
  } else if (truck.isOffRoute) {
    iconName += '-warning';
  } else if (truck.status === TruckStatus.STOPPED) {
    iconName += '-stopped';
  }
  
  // Add color based on company or region
  if (truck.company) {
    iconName += `-${truck.company.colorCode}`;
  }
  
  return `${baseUrl}${iconName}.svg`;
};
```

## 2. Direction and Speed Tracking

### Speed Display Component
```typescript
interface SpeedIndicatorProps {
  truck: Truck;
  position: LatLng;
  visible: boolean;
}

const SpeedIndicator: React.FC<SpeedIndicatorProps> = ({ truck, position, visible }) => {
  if (!visible) return null;

  const getSpeedColor = (speed: number, limit: number): string => {
    if (speed > limit * 1.1) return '#F44336'; // Red - speed violation
    if (speed > limit * 0.9) return '#FF9800'; // Orange - near limit
    return '#4CAF50'; // Green - safe speed
  };

  return (
    <OverlayView
      position={position}
      mapPaneName="overlayMouseTarget"
    >
      <div className="speed-indicator">
        <div 
          className="speed-value"
          style={{ 
            color: getSpeedColor(truck.currentSpeed, truck.speedLimit),
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            border: `2px solid ${getSpeedColor(truck.currentSpeed, truck.speedLimit)}`
          }}
        >
          {truck.currentSpeed} km/h
        </div>
        
        {truck.currentSpeed > truck.speedLimit && (
          <div className="speed-warning">
            ⚠️ Speed Violation
          </div>
        )}
      </div>
    </OverlayView>
  );
};
```

### Direction Indicator
```typescript
const DirectionIndicator: React.FC<{ truck: Truck }> = ({ truck }) => {
  const getDirectionArrow = () => {
    return {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 4,
      fillColor: '#2196F3',
      fillOpacity: 0.8,
      strokeColor: '#1976D2',
      strokeWeight: 2,
      rotation: truck.heading
    };
  };

  return (
    <Marker
      position={truck.currentLocation}
      icon={getDirectionArrow()}
      zIndex={999}
    />
  );
};
```

## 3. Real-time Update System

### Live Updates Service
```typescript
class TruckTrackingService {
  private websocket: WebSocket | null = null;
  private updateInterval: NodeJS.Timeout | null = null;
  private subscribers: Map<string, (truck: Truck) => void> = new Map();

  // Connect to live updates service
  connect(apiUrl: string): void {
    this.websocket = new WebSocket(apiUrl);
    
    this.websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleTruckUpdate(data);
    };

    this.websocket.onclose = () => {
      // Auto-reconnect
      setTimeout(() => this.connect(apiUrl), 5000);
    };

    // Periodic updates as backup
    this.startPeriodicUpdates();
  }

  // Periodic updates
  private startPeriodicUpdates(): void {
    this.updateInterval = setInterval(async () => {
      try {
        const trucks = await this.fetchAllTrucks();
        trucks.forEach(truck => this.handleTruckUpdate(truck));
      } catch (error) {
        console.error('Failed to fetch truck updates:', error);
      }
    }, 30000); // Every 30 seconds
  }

  // Handle truck update
  private handleTruckUpdate(truck: Truck): void {
    // Update subscribers
    this.subscribers.forEach(callback => callback(truck));
    
    // Save to local storage
    this.saveTruckToCache(truck);
    
    // Check for alerts
    this.checkTruckAlerts(truck);
  }

  // Check alerts
  private checkTruckAlerts(truck: Truck): void {
    const alerts: Alert[] = [];

    // Check speed violation
    if (truck.currentSpeed > truck.speedLimit) {
      alerts.push({
        id: `speed-${truck.id}`,
        type: 'speed_violation',
        severity: 'high',
        message: `Truck ${truck.plateNumber} exceeding speed limit`,
        timestamp: new Date(),
        truckId: truck.id
      });
    }

    // Check route deviation
    if (truck.isOffRoute) {
      alerts.push({
        id: `route-${truck.id}`,
        type: 'route_deviation',
        severity: 'medium',
        message: `Truck ${truck.plateNumber} off designated route`,
        timestamp: new Date(),
        truckId: truck.id
      });
    }

    // Check delay
    if (truck.isDelayed) {
      alerts.push({
        id: `delay-${truck.id}`,
        type: 'delay',
        severity: 'low',
        message: `Truck ${truck.plateNumber} behind schedule`,
        timestamp: new Date(),
        truckId: truck.id
      });
    }

    // Send alerts
    if (alerts.length > 0) {
      this.notifyAlerts(alerts);
    }
  }

  // Subscribe to specific truck updates
  subscribe(truckId: string, callback: (truck: Truck) => void): void {
    this.subscribers.set(truckId, callback);
  }

  // Unsubscribe
  unsubscribe(truckId: string): void {
    this.subscribers.delete(truckId);
  }

  // Disconnect
  disconnect(): void {
    if (this.websocket) {
      this.websocket.close();
    }
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}
```

### Live Updates Hook
```typescript
const useLiveTruckTracking = (truckIds: string[]) => {
  const [trucks, setTrucks] = useState<Map<string, Truck>>(new Map());
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  
  const trackingService = useRef(new TruckTrackingService());

  useEffect(() => {
    setConnectionStatus('connecting');
    
    // Connect to service
    trackingService.current.connect(process.env.REACT_APP_TRACKING_WS_URL!);
    
    // Subscribe to truck updates
    truckIds.forEach(truckId => {
      trackingService.current.subscribe(truckId, (updatedTruck) => {
        setTrucks(prev => new Map(prev.set(truckId, updatedTruck)));
      });
    });

    setConnectionStatus('connected');

    return () => {
      trackingService.current.disconnect();
      setConnectionStatus('disconnected');
    };
  }, [truckIds]);

  return {
    trucks: Array.from(trucks.values()),
    alerts,
    connectionStatus,
    refreshTruck: (truckId: string) => {
      // Manual refresh for specific truck
      trackingService.current.fetchTruck(truckId);
    }
  };
};
```

## 4. Actual vs Planned Route Comparison

### Route Comparison Component
```typescript
interface RouteComparisonProps {
  trip: Trip;
  showDeviations: boolean;
}

const RouteComparison: React.FC<RouteComparisonProps> = ({ trip, showDeviations }) => {
  const [deviationPoints, setDeviationPoints] = useState<LatLng[]>([]);

  // Calculate deviation points
  useEffect(() => {
    const deviations = calculateRouteDeviations(
      trip.plannedRoute.path,
      trip.actualRoute.path,
      100 // deviation distance in meters
    );
    setDeviationPoints(deviations);
  }, [trip.plannedRoute, trip.actualRoute]);

  return (
    <>
      {/* Planned route */}
      <Polyline
        path={trip.plannedRoute.path}
        options={{
          strokeColor: '#2196F3',
          strokeWeight: 4,
          strokeOpacity: 0.7,
          strokePattern: [10, 5], // dashed line
          zIndex: 1
        }}
      />

      {/* Actual route */}
      <Polyline
        path={trip.actualRoute.path}
        options={{
          strokeColor: trip.isOnRoute ? '#4CAF50' : '#F44336',
          strokeWeight: 6,
          strokeOpacity: 0.9,
          zIndex: 2
        }}
      />

      {/* Deviation points */}
      {showDeviations && deviationPoints.map((point, index) => (
        <Circle
          key={index}
          center={point}
          radius={50}
          options={{
            fillColor: '#FF9800',
            fillOpacity: 0.3,
            strokeColor: '#FF9800',
            strokeWeight: 2,
            zIndex: 3
          }}
        />
      ))}

      {/* Checkpoints */}
      {trip.checkpoints.map(checkpoint => (
        <Marker
          key={checkpoint.id}
          position={checkpoint.location}
          icon={{
            url: '/icons/checkpoint.svg',
            scaledSize: new google.maps.Size(24, 24)
          }}
          title={checkpoint.name}
        />
      ))}
    </>
  );
};

// Calculate deviation points
const calculateRouteDeviations = (
  plannedPath: LatLng[],
  actualPath: LatLng[],
  maxDeviationDistance: number
): LatLng[] => {
  const deviations: LatLng[] = [];

  actualPath.forEach(actualPoint => {
    const nearestPlannedPoint = findNearestPoint(actualPoint, plannedPath);
    const distance = calculateDistance(actualPoint, nearestPlannedPoint);
    
    if (distance > maxDeviationDistance) {
      deviations.push(actualPoint);
    }
  });

  return deviations;
};
```

## 5. Advanced Alert System

### Alerts Component
```typescript
interface TruckAlertsProps {
  truck: Truck;
  onAlertClick: (alert: Alert) => void;
}

const TruckAlerts: React.FC<TruckAlertsProps> = ({ truck, onAlertClick }) => {
  const getAlertIcon = (alert: Alert) => {
    const icons = {
      speed_violation: '🚨',
      route_deviation: '⚠️',
      delay: '⏰',
      maintenance: '🔧',
      emergency: '🆘',
      fuel_low: '⛽',
      temperature: '🌡️'
    };
    return icons[alert.type] || '❗';
  };

  const getAlertColor = (severity: string) => {
    const colors = {
      low: '#4CAF50',
      medium: '#FF9800',
      high: '#F44336',
      critical: '#9C27B0'
    };
    return colors[severity as keyof typeof colors] || '#666';
  };

  if (truck.alerts.length === 0) return null;

  return (
    <OverlayView
      position={truck.currentLocation}
      mapPaneName="overlayMouseTarget"
    >
      <div className="truck-alerts">
        {truck.alerts.map(alert => (
          <div
            key={alert.id}
            className="alert-badge"
            style={{
              backgroundColor: getAlertColor(alert.severity),
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              margin: '2px',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onClick={() => onAlertClick(alert)}
          >
            <span>{getAlertIcon(alert)}</span>
            <span>{alert.message}</span>
          </div>
        ))}
      </div>
    </OverlayView>
  );
};
```

## 6. Performance Optimization

### Render Optimization
```typescript
// Use React.memo to avoid unnecessary renders
const OptimizedTruckMarker = React.memo(AnimatedTruckMarker, (prevProps, nextProps) => {
  // Compare only important props
  return (
    prevProps.truck.id === nextProps.truck.id &&
    prevProps.truck.currentLocation.lat === nextProps.truck.currentLocation.lat &&
    prevProps.truck.currentLocation.lng === nextProps.truck.currentLocation.lng &&
    prevProps.truck.heading === nextProps.truck.heading &&
    prevProps.truck.status === nextProps.truck.status &&
    prevProps.isSelected === nextProps.isSelected
  );
});

// Batch updates
const useBatchedTruckUpdates = (trucks: Truck[]) => {
  const [batchedTrucks, setBatchedTrucks] = useState(trucks);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setBatchedTrucks(trucks);
    }, 100); // 100ms delay to batch updates

    return () => clearTimeout(timeoutId);
  }, [trucks]);

  return batchedTrucks;
};
```

## Benefits and Advantages

### 1. Accurate and Advanced Tracking
- **Instant Location**: Location updates every 30 seconds
- **Precise Direction**: Display actual truck direction
- **Smooth Movement**: Smooth transitions between locations
- **Comprehensive Information**: Display speed, status, and alerts

### 2. Comprehensive Monitoring
- **Instant Alerts**: Real-time notifications for violations
- **Route Comparison**: Compare actual vs planned routes
- **Checkpoints**: Monitor passage through designated points
- **Detailed Reports**: Comprehensive performance statistics

### 3. Superior User Experience
- **Interactive Interface**: Easy interaction with elements
- **Clear Information**: Display information in understandable way
- **Quick Response**: Fast performance even with thousands of trucks
- **Responsive Design**: Works on all devices

### 4. Security and Reliability
- **Data Encryption**: Protect truck information
- **Backup Sources**: Multiple data sources
- **Continuous Monitoring**: 24/7 tracking without interruption
- **Security Alerts**: Notifications for emergency situations

## Conclusion

The advanced truck tracking system provides comprehensive and accurate monitoring of all vehicles in Saudi Arabia, with advanced capabilities for analysis, prediction, and operations optimization.