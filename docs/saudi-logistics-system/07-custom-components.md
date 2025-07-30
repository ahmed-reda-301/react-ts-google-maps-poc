# Required Custom Components - Saudi Arabia System

## Overview

This file documents the custom components that need to be created or modified from basic Google Maps components to meet the requirements of the advanced Saudi trip tracking system.

## 1. Components Requiring Major Modifications

### A) Marker → AnimatedTruckMarker (Major Modification)
**Reason**: The basic component doesn't support smooth movement and dynamic rotation

```typescript
import React, { useEffect, useState, useRef } from 'react';
import { Marker } from '@react-google-maps/api';

interface AnimatedTruckMarkerProps extends Omit<google.maps.MarkerOptions, 'position'> {
  truck: Truck;
  animationDuration?: number;
  showSpeedIndicator?: boolean;
  showDirectionArrow?: boolean;
  onTruckClick?: (truck: Truck) => void;
  onTruckHover?: (truck: Truck) => void;
}

const AnimatedTruckMarker: React.FC<AnimatedTruckMarkerProps> = ({
  truck,
  animationDuration = 1000,
  showSpeedIndicator = true,
  showDirectionArrow = true,
  onTruckClick,
  onTruckHover,
  ...markerOptions
}) => {
  const [currentPosition, setCurrentPosition] = useState(truck.currentLocation);
  const [rotation, setRotation] = useState(truck.heading);
  const [isAnimating, setIsAnimating] = useState(false);
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
    if (isAnimating) return;

    const startPosition = currentPosition;
    const startTime = Date.now();
    const newRotation = calculateBearing(startPosition, newPosition);
    const startRotation = rotation;

    setIsAnimating(true);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Use easing function for natural movement
      const easedProgress = easeInOutCubic(progress);

      // Animate position
      const lat = startPosition.lat + (newPosition.lat - startPosition.lat) * easedProgress;
      const lng = startPosition.lng + (newPosition.lng - startPosition.lng) * easedProgress;

      // Animate rotation
      let rotationDiff = newRotation - startRotation;
      if (rotationDiff > 180) rotationDiff -= 360;
      if (rotationDiff < -180) rotationDiff += 360;
      const currentRotation = startRotation + rotationDiff * easedProgress;

      setCurrentPosition({ lat, lng });
      setRotation(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  // Easing function for natural movement
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  // Update position when truck data changes
  useEffect(() => {د
    const hasPositionChanged = 
      truck.currentLocation.lat !== previousPosition.current.lat ||
      truck.currentLocation.lng !== previousPosition.current.lng;

    if (hasPositionChanged && !isAnimating) {
      animateToNewPosition(truck.currentLocation);
      previousPosition.current = truck.currentLocation;
    }
  }, [truck.currentLocation, isAnimating]);

  // Cleanup animation
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Create custom truck icon
  const getTruckIcon = (): google.maps.Icon => {
    const baseSize = truck.isSelected ? 50 : 40;
    const iconUrl = getTruckIconUrl(truck);

    return {
      url: iconUrl,
      scaledSize: new google.maps.Size(baseSize, baseSize),
      anchor: new google.maps.Point(baseSize / 2, baseSize / 2),
      rotation: rotation,
      // Add visual effects for selected truck
      ...(truck.isSelected && {
        strokeColor: '#2196F3',
        strokeWeight: 3,
        fillOpacity: 0.8
      })
    };
  };

  return (
    <>
      {/* Main truck marker */}
      <Marker
        position={currentPosition}
        icon={getTruckIcon()}
        title={`${truck.plateNumber} - ${truck.driver.name}`}
        onClick={() => onTruckClick?.(truck)}
        onMouseOver={() => onTruckHover?.(truck)}
        zIndex={truck.isSelected ? 1000 : truck.priority * 100}
        {...markerOptions}
      />

      {/* Speed indicator */}
      {showSpeedIndicator && (
        <SpeedIndicator
          truck={truck}
          position={currentPosition}
          visible={truck.isSelected || truck.currentSpeed > truck.speedLimit}
        />
      )}

      {/* Direction arrow */}
      {showDirectionArrow && truck.isSelected && (
        <DirectionArrow
          position={currentPosition}
          heading={rotation}
          speed={truck.currentSpeed}
        />
      )}

      {/* Truck alerts */}
      {truck.alerts.length > 0 && (
        <TruckAlertBadges
          truck={truck}
          position={currentPosition}
          onAlertClick={(alert) => console.log('Alert clicked:', alert)}
        />
      )}
    </>
  );
};

// Speed indicator component
const SpeedIndicator: React.FC<{
  truck: Truck;
  position: LatLng;
  visible: boolean;
}> = ({ truck, position, visible }) => {
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
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          color: getSpeedColor(truck.currentSpeed, truck.speedLimit),
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 'bold',
          border: `2px solid ${getSpeedColor(truck.currentSpeed, truck.speedLimit)}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transform: 'translate(-50%, -100%)',
          marginTop: '-35px',
          whiteSpace: 'nowrap'
        }}
      >
        {truck.currentSpeed} km/h
        {truck.currentSpeed > truck.speedLimit && (
          <div style={{ fontSize: '10px', color: '#F44336' }}>
            ⚠️ Speed Violation
          </div>
        )}
      </div>
    </OverlayView>
  );
};

export default AnimatedTruckMarker;
```

### B) InfoWindow → TruckDetailInfoWindow (Major Modification)
**Reason**: The basic component doesn't support complex interactive content and custom design

```typescript
interface TruckDetailInfoWindowProps {
  truck: Truck;
  isOpen: boolean;
  onClose: () => void;
  onActionClick: (action: string, truck: Truck) => void;
}

const TruckDetailInfoWindow: React.FC<TruckDetailInfoWindowProps> = ({
  truck,
  isOpen,
  onClose,
  onActionClick
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'route' | 'alerts'>('details');

  if (!isOpen) return null;

  return (
    <InfoWindow
      position={truck.currentLocation}
      onCloseClick={onClose}
      options={{
        maxWidth: 400,
        pixelOffset: new google.maps.Size(0, -40)
      }}
    >
      <div className="truck-detail-window">
        {/* Window header */}
        <div className="window-header">
          <div className="truck-info">
            <div className="truck-plate">{truck.plateNumber}</div>
            <div className="truck-status">
              <span className={`status-badge ${truck.status}`}>
                {getStatusIcon(truck.status)} {getStatusText(truck.status)}
              </span>
            </div>
          </div>
          <div className="truck-avatar">
            <img src={truck.driver.avatar || '/default-driver.png'} alt={truck.driver.name} />
          </div>
        </div>

        {/* Content tabs */}
        <div className="content-tabs">
          <button
            className={`tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            📋 Details
          </button>
          <button
            className={`tab ${activeTab === 'route' ? 'active' : ''}`}
            onClick={() => setActiveTab('route')}
          >
            🗺️ Route
          </button>
          <button
            className={`tab ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            🚨 Alerts ({truck.alerts.length})
          </button>
        </div>

        {/* Tab content */}
        <div className="tab-content">
          {activeTab === 'details' && (
            <TruckDetailsTab truck={truck} />
          )}
          
          {activeTab === 'route' && (
            <TruckRouteTab truck={truck} />
          )}
          
          {activeTab === 'alerts' && (
            <TruckAlertsTab truck={truck} />
          )}
        </div>

        {/* Action buttons */}
        <div className="action-buttons">
          <button
            className="action-btn primary"
            onClick={() => onActionClick('view-trip', truck)}
          >
            📊 Trip Details
          </button>
          <button
            className="action-btn secondary"
            onClick={() => onActionClick('contact-driver', truck)}
          >
            📞 Contact Driver
          </button>
          <button
            className="action-btn secondary"
            onClick={() => onActionClick('track-route', truck)}
          >
            🎯 Track Route
          </button>
        </div>
      </div>
    </InfoWindow>
  );
};
```

## 2. New Required Components

### A) TruckFleetManager (New Component)
**Reason**: Comprehensive fleet management with advanced filtering and search

```typescript
interface TruckFleetManagerProps {
  trucks: Truck[];
  onTruckSelect: (truck: Truck) => void;
  onFilterChange: (filters: FleetFilters) => void;
  onBulkAction: (action: string, trucks: Truck[]) => void;
}

const TruckFleetManager: React.FC<TruckFleetManagerProps> = ({
  trucks,
  onTruckSelect,
  onFilterChange,
  onBulkAction
}) => {
  const [filters, setFilters] = useState<FleetFilters>({
    status: 'all',
    region: 'all',
    alertLevel: 'all',
    searchTerm: ''
  });
  
  const [selectedTrucks, setSelectedTrucks] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Apply filters
  const filteredTrucks = useMemo(() => {
    return trucks.filter(truck => {
      // Status filter
      if (filters.status !== 'all' && truck.status !== filters.status) {
        return false;
      }

      // Region filter
      if (filters.region !== 'all' && truck.currentRegion !== filters.region) {
        return false;
      }

      // Alert level filter
      if (filters.alertLevel !== 'all') {
        const hasAlertLevel = truck.alerts.some(alert => alert.severity === filters.alertLevel);
        if (!hasAlertLevel) return false;
      }

      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          truck.plateNumber.toLowerCase().includes(searchLower) ||
          truck.driver.name.toLowerCase().includes(searchLower) ||
          truck.trip?.destination.name.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [trucks, filters]);

  return (
    <div className="truck-fleet-manager">
      {/* Search and filters bar */}
      <FleetFiltersBar
        filters={filters}
        onFiltersChange={(newFilters) => {
          setFilters(newFilters);
          onFilterChange(newFilters);
        }}
        trucksCount={filteredTrucks.length}
        totalTrucks={trucks.length}
      />

      {/* Management tools */}
      <FleetManagementTools
        selectedTrucks={Array.from(selectedTrucks)}
        onBulkAction={onBulkAction}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Trucks list */}
      <TrucksList
        trucks={filteredTrucks}
        selectedTrucks={selectedTrucks}
        viewMode={viewMode}
        onTruckSelect={onTruckSelect}
        onTruckToggleSelect={(truckId) => {
          const newSelected = new Set(selectedTrucks);
          if (newSelected.has(truckId)) {
            newSelected.delete(truckId);
          } else {
            newSelected.add(truckId);
          }
          setSelectedTrucks(newSelected);
        }}
      />
    </div>
  );
};
```

### B) RouteComparisonViewer (New Component)
**Reason**: Interactive comparison between planned and actual routes

```typescript
interface RouteComparisonViewerProps {
  trip: Trip;
  showPlannedRoute: boolean;
  showActualRoute: boolean;
  showDeviations: boolean;
  onRouteAnalysis: (analysis: RouteAnalysis) => void;
}

const RouteComparisonViewer: React.FC<RouteComparisonViewerProps> = ({
  trip,
  showPlannedRoute,
  showActualRoute,
  showDeviations,
  onRouteAnalysis
}) => {
  const [analysis, setAnalysis] = useState<RouteAnalysis | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<RouteSegment | null>(null);

  // Analyze route
  useEffect(() => {
    if (trip.plannedRoute && trip.actualRoute) {
      const routeAnalysis = analyzeRouteComparison(trip.plannedRoute, trip.actualRoute);
      setAnalysis(routeAnalysis);
      onRouteAnalysis(routeAnalysis);
    }
  }, [trip.plannedRoute, trip.actualRoute]);

  return (
    <div className="route-comparison-viewer">
      {/* Planned route */}
      {showPlannedRoute && (
        <Polyline
          path={trip.plannedRoute.path}
          options={{
            strokeColor: '#2196F3',
            strokeWeight: 4,
            strokeOpacity: 0.7,
            strokePattern: [10, 5],
            zIndex: 50
          }}
          onClick={(e) => handleRouteClick(e, 'planned')}
        />
      )}

      {/* Actual route */}
      {showActualRoute && (
        <Polyline
          path={trip.actualRoute.path}
          options={{
            strokeColor: getRouteColor(trip.complianceStatus),
            strokeWeight: 6,
            strokeOpacity: 0.9,
            zIndex: 75
          }}
          onClick={(e) => handleRouteClick(e, 'actual')}
        />
      )}

      {/* Deviation points */}
      {showDeviations && analysis?.deviations.map((deviation, index) => (
        <Circle
          key={index}
          center={deviation.location}
          radius={deviation.severity * 25}
          options={{
            fillColor: getDeviationColor(deviation.severity),
            fillOpacity: 0.3,
            strokeColor: getDeviationColor(deviation.severity),
            strokeWeight: 2,
            zIndex: 90
          }}
          onClick={() => setSelectedSegment(deviation)}
        />
      ))}

      {/* Selected segment info */}
      {selectedSegment && (
        <RouteSegmentInfo
          segment={selectedSegment}
          onClose={() => setSelectedSegment(null)}
        />
      )}
    </div>
  );
};
```

### C) AlertsManagementSystem (New Component)
**Reason**: Comprehensive alerts management with classification and priorities

```typescript
interface AlertsManagementSystemProps {
  alerts: Alert[];
  onAlertAction: (action: string, alert: Alert) => void;
  onBulkAlertAction: (action: string, alerts: Alert[]) => void;
}

const AlertsManagementSystem: React.FC<AlertsManagementSystemProps> = ({
  alerts,
  onAlertAction,
  onBulkAlertAction
}) => {
  const [filterSeverity, setFilterSeverity] = useState<AlertSeverity | 'all'>('all');
  const [filterType, setFilterType] = useState<AlertType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'severity' | 'type'>('timestamp');
  const [selectedAlerts, setSelectedAlerts] = useState<Set<string>>(new Set());

  // Sort and filter alerts
  const processedAlerts = useMemo(() => {
    let filtered = alerts;

    // Apply filters
    if (filterSeverity !== 'all') {
      filtered = filtered.filter(alert => alert.severity === filterSeverity);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(alert => alert.type === filterType);
    }

    // Sort alerts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'timestamp':
          return b.timestamp.getTime() - a.timestamp.getTime();
        case 'severity':
          return getSeverityWeight(b.severity) - getSeverityWeight(a.severity);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    return filtered;
  }, [alerts, filterSeverity, filterType, sortBy]);

  return (
    <div className="alerts-management-system">
      {/* Filters bar */}
      <div className="alerts-filters">
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value as AlertSeverity | 'all')}
        >
          <option value="all">All Levels</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as AlertType | 'all')}
        >
          <option value="all">All Types</option>
          <option value="speed_violation">Speed Violation</option>
          <option value="route_deviation">Route Deviation</option>
          <option value="delay">Delay</option>
          <option value="maintenance">Maintenance</option>
          <option value="emergency">Emergency</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'timestamp' | 'severity' | 'type')}
        >
          <option value="timestamp">Time</option>
          <option value="severity">Priority</option>
          <option value="type">Type</option>
        </select>
      </div>

      {/* Alerts statistics */}
      <AlertsStatistics alerts={processedAlerts} />

      {/* Alerts list */}
      <div className="alerts-list">
        {processedAlerts.map(alert => (
          <AlertCard
            key={alert.id}
            alert={alert}
            isSelected={selectedAlerts.has(alert.id)}
            onSelect={(selected) => {
              const newSelected = new Set(selectedAlerts);
              if (selected) {
                newSelected.add(alert.id);
              } else {
                newSelected.delete(alert.id);
              }
              setSelectedAlerts(newSelected);
            }}
            onAction={(action) => onAlertAction(action, alert)}
          />
        ))}
      </div>

      {/* Bulk actions tools */}
      {selectedAlerts.size > 0 && (
        <BulkAlertsActions
          selectedCount={selectedAlerts.size}
          onBulkAction={(action) => {
            const selectedAlertObjects = alerts.filter(alert => 
              selectedAlerts.has(alert.id)
            );
            onBulkAlertAction(action, selectedAlertObjects);
          }}
        />
      )}
    </div>
  );
};
```

## 3. Components Requiring Minor Enhancements

### A) MarkerClusterer → SmartTruckClusterer (Enhancement)
**Reason**: Improve clustering to reflect truck statuses

```typescript
const SmartTruckClusterer: React.FC<{ trucks: Truck[] }> = ({ trucks }) => {
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
    ],
    // Customize cluster color based on truck status
    calculator: (markers: google.maps.Marker[], numStyles: number) => {
      const trucks = markers.map(marker => 
        // Extract truck data from marker
        getTruckFromMarker(marker)
      );
      
      const alertCount = trucks.filter(truck => truck.alerts.length > 0).length;
      const alertPercentage = alertCount / trucks.length;
      
      let styleIndex = 0;
      if (trucks.length < 10) styleIndex = 0;
      else if (trucks.length < 50) styleIndex = 1;
      else styleIndex = 2;
      
      // Change cluster color based on alert percentage
      const clusterColor = alertPercentage > 0.5 ? 'red' : 
                          alertPercentage > 0.2 ? 'orange' : 'green';
      
      return {
        text: trucks.length.toString(),
        index: styleIndex,
        title: `${trucks.length} trucks - ${alertCount} alerts`
      };
    }
  };

  return (
    <MarkerClusterer options={clusterOptions}>
      {(clusterer) =>
        trucks.map(truck => (
          <AnimatedTruckMarker
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

### B) Circle → CheckpointZone (Enhancement)
**Reason**: Add interactivity and different states for checkpoints

```typescript
interface CheckpointZoneProps {
  checkpoint: Checkpoint;
  isActive: boolean;
  onTruckEnter: (truck: Truck) => void;
  onTruckExit: (truck: Truck) => void;
}

const CheckpointZone: React.FC<CheckpointZoneProps> = ({
  checkpoint,
  isActive,
  onTruckEnter,
  onTruckExit
}) => {
  const [trucksInZone, setTrucksInZone] = useState<Truck[]>([]);

  const getZoneColor = () => {
    if (!isActive) return '#9E9E9E';
    if (checkpoint.type === 'security') return '#F44336';
    if (checkpoint.type === 'customs') return '#FF9800';
    return '#4CAF50';
  };

  return (
    <>
      {/* Checkpoint zone */}
      <Circle
        center={checkpoint.location}
        radius={checkpoint.detectionRadius}
        options={{
          fillColor: getZoneColor(),
          fillOpacity: isActive ? 0.2 : 0.1,
          strokeColor: getZoneColor(),
          strokeWeight: isActive ? 3 : 1,
          strokeOpacity: isActive ? 0.8 : 0.5,
          zIndex: isActive ? 100 : 50
        }}
      />

      {/* Inner activation circle */}
      {isActive && (
        <Circle
          center={checkpoint.location}
          radius={checkpoint.detectionRadius * 0.3}
          options={{
            fillColor: getZoneColor(),
            fillOpacity: 0.4,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
            strokeOpacity: 1,
            zIndex: 101
          }}
        />
      )}

      {/* Trucks counter in zone */}
      {trucksInZone.length > 0 && (
        <OverlayView
          position={checkpoint.location}
          mapPaneName="overlayMouseTarget"
        >
          <div className="checkpoint-counter">
            {trucksInZone.length} trucks
          </div>
        </OverlayView>
      )}
    </>
  );
};
```

## 4. New Service Components

### A) RealTimeDataService (New Service)
**Reason**: Manage real-time data and instant updates

```typescript
class RealTimeDataService {
  private websocket: WebSocket | null = null;
  private subscribers: Map<string, Function[]> = new Map();
  private dataCache: Map<string, any> = new Map();

  // Connect to real-time data service
  connect(wsUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.websocket = new WebSocket(wsUrl);
      
      this.websocket.onopen = () => {
        console.log('Connected to real-time data service');
        resolve();
      };

      this.websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleDataUpdate(data);
      };

      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      this.websocket.onclose = () => {
        console.log('WebSocket connection closed');
        // Auto-reconnect
        setTimeout(() => this.connect(wsUrl), 5000);
      };
    });
  }

  // Subscribe to specific data type updates
  subscribe(dataType: string, callback: Function): () => void {
    if (!this.subscribers.has(dataType)) {
      this.subscribers.set(dataType, []);
    }
    
    this.subscribers.get(dataType)!.push(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(dataType);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  // Handle data update
  private handleDataUpdate(data: any): void {
    const { type, payload } = data;
    
    // Update cache
    this.dataCache.set(`${type}_${payload.id}`, payload);
    
    // Notify subscribers
    const callbacks = this.subscribers.get(type);
    if (callbacks) {
      callbacks.forEach(callback => callback(payload));
    }
  }

  // Send request to server
  sendRequest(type: string, data: any): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify({ type, data }));
    }
  }
}
```

### B) GeofencingService (New Service)
**Reason**: Monitor truck entry and exit from designated areas

```typescript
class GeofencingService {
  private geofences: Map<string, Geofence> = new Map();
  private trackedVehicles: Map<string, LatLng> = new Map();
  private eventCallbacks: Map<string, Function[]> = new Map();

  // Add geofence
  addGeofence(geofence: Geofence): void {
    this.geofences.set(geofence.id, geofence);
  }

  // Update vehicle position
  updateVehiclePosition(vehicleId: string, position: LatLng): void {
    const previousPosition = this.trackedVehicles.get(vehicleId);
    this.trackedVehicles.set(vehicleId, position);

    // Check geofence entry/exit
    this.geofences.forEach(geofence => {
      const wasInside = previousPosition ? 
        this.isPointInGeofence(previousPosition, geofence) : false;
      const isInside = this.isPointInGeofence(position, geofence);

      if (!wasInside && isInside) {
        // Entering geofence
        this.triggerEvent('geofence_enter', {
          vehicleId,
          geofenceId: geofence.id,
          position,
          timestamp: new Date()
        });
      } else if (wasInside && !isInside) {
        // Exiting geofence
        this.triggerEvent('geofence_exit', {
          vehicleId,
          geofenceId: geofence.id,
          position,
          timestamp: new Date()
        });
      }
    });
  }

  // Check if point is inside geofence
  private isPointInGeofence(point: LatLng, geofence: Geofence): boolean {
    switch (geofence.type) {
      case 'circle':
        return this.isPointInCircle(point, geofence.center!, geofence.radius!);
      case 'polygon':
        return this.isPointInPolygon(point, geofence.polygon!);
      default:
        return false;
    }
  }

  // Check if point is inside circle
  private isPointInCircle(point: LatLng, center: LatLng, radius: number): boolean {
    const distance = this.calculateDistance(point, center);
    return distance <= radius;
  }

  // Calculate distance between two points
  private calculateDistance(point1: LatLng, point2: LatLng): number {
    const R = 6371000; // Earth radius in meters
    const lat1Rad = point1.lat * Math.PI / 180;
    const lat2Rad = point2.lat * Math.PI / 180;
    const deltaLatRad = (point2.lat - point1.lat) * Math.PI / 180;
    const deltaLngRad = (point2.lng - point1.lng) * Math.PI / 180;

    const a = Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(deltaLngRad / 2) * Math.sin(deltaLngRad / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}
```

## Benefits of Custom Components

### 1. Performance Enhancement
- **Optimized Updates**: Update only changed elements
- **Optimized Memory**: Optimal memory usage
- **Fast Rendering**: Avoid unnecessary rendering

### 2. Advanced User Experience
- **Smooth Interaction**: Natural and smooth element movement
- **Comprehensive Information**: Display all required data
- **Intuitive Interface**: Easy to use and navigate

### 3. Customization Flexibility
- **Custom Design**: Interface matching Saudi identity
- **Advanced Functions**: Capabilities not available in basic components
- **Scalability**: Easy to add new features

### 4. Monitoring Accuracy
- **Real-time Data**: Instant information updates
- **Advanced Analysis**: Comprehensive performance and behavior analysis
- **Smart Alerts**: Accurate and appropriate notifications

## Conclusion

Custom components are essential for achieving the requirements of the advanced Saudi trip tracking system, providing advanced capabilities not available in basic components, while improving performance and user experience.