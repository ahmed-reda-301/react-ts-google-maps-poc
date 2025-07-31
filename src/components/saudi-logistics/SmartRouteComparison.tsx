import React, { useState, useEffect, useMemo } from 'react';
import { Polyline, Circle, Marker, InfoWindow } from '@react-google-maps/api';

export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface Route {
  id: string;
  name: string;
  path: RoutePoint[];
  distance: number;
  estimatedDuration: number;
  actualDuration?: number;
  color: string;
  type: 'planned' | 'actual' | 'optimized';
}

export interface Checkpoint {
  id: string;
  name: string;
  location: RoutePoint;
  type: 'security' | 'customs' | 'weight_station' | 'toll' | 'inspection';
  isRequired: boolean;
  expectedArrival?: Date;
  actualArrival?: Date;
  status: 'pending' | 'completed' | 'overdue' | 'skipped';
  detectionRadius: number;
}

export interface RouteDeviation {
  id: string;
  location: RoutePoint;
  distance: number;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  reason?: string;
}

export interface Trip {
  id: string;
  plannedRoute: Route;
  actualRoute: Route;
  optimizedRoute?: Route;
  checkpoints: Checkpoint[];
  deviations: RouteDeviation[];
  complianceStatus: 'compliant' | 'minor_deviation' | 'major_deviation';
  compliancePercentage: number;
  isSelected: boolean;
}

interface SmartRouteComparisonProps {
  trip: Trip;
  showPlannedRoute: boolean;
  showActualRoute: boolean;
  showOptimizedRoute: boolean;
  showDeviations: boolean;
  showCheckpoints: boolean;
  onRouteAnalysis: (analysis: RouteAnalysis) => void;
}

export interface RouteAnalysis {
  totalDistance: number;
  plannedDistance: number;
  deviationDistance: number;
  compliancePercentage: number;
  estimatedArrival: Date;
  fuelConsumption: number;
  averageSpeed: number;
  deviations: RouteDeviation[];
}

export const SmartRouteComparison: React.FC<SmartRouteComparisonProps> = ({
  trip,
  showPlannedRoute,
  showActualRoute,
  showOptimizedRoute,
  showDeviations,
  showCheckpoints,
  onRouteAnalysis
}) => {
  const [selectedDeviation, setSelectedDeviation] = useState<RouteDeviation | null>(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | null>(null);

  // Route analysis
  const analysis = useMemo(() => {
    if (!trip.plannedRoute || !trip.actualRoute) return null;

    const totalDistance = calculateTotalDistance(trip.actualRoute.path);
    const plannedDistance = calculateTotalDistance(trip.plannedRoute.path);
    const deviationDistance = calculateDeviationDistance(trip.plannedRoute.path, trip.actualRoute.path);
    
    return {
      totalDistance,
      plannedDistance,
      deviationDistance,
      compliancePercentage: trip.compliancePercentage,
      estimatedArrival: new Date(Date.now() + (trip.actualRoute.estimatedDuration || 0)),
      fuelConsumption: calculateFuelConsumption(totalDistance),
      averageSpeed: calculateAverageSpeed(trip.actualRoute),
      deviations: trip.deviations
    };
  }, [trip]);

  // Notify parent of analysis updates
  useEffect(() => {
    if (analysis) {
      onRouteAnalysis(analysis);
    }
  }, [analysis, onRouteAnalysis]);

  const getRouteColor = (complianceStatus: string): string => {
    const colors: Record<string, string> = {
      compliant: '#4CAF50',
      minor_deviation: '#FF9800',
      major_deviation: '#F44336'
    };
    return colors[complianceStatus] || '#666';
  };

  const getDeviationColor = (severity: string): string => {
    const colors: Record<string, string> = {
      low: '#FFC107',
      medium: '#FF9800',
      high: '#F44336'
    };
    return colors[severity] || '#666';
  };

  const getCheckpointColor = (status: string): string => {
    const colors: Record<string, string> = {
      pending: '#9E9E9E',
      completed: '#4CAF50',
      overdue: '#F44336',
      skipped: '#FF9800'
    };
    return colors[status] || '#666';
  };

  return (
    <>
      {/* Planned route */}
      {showPlannedRoute && trip.plannedRoute && (
        <Polyline
          path={trip.plannedRoute.path}
          options={{
            strokeColor: '#2196F3',
            strokeWeight: 4,
            strokeOpacity: 0.7,
            zIndex: 50
          }}
          onClick={(e) => handleRouteClick(e, 'planned')}
        />
      )}

      {/* Actual route */}
      {showActualRoute && trip.actualRoute && (
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

      {/* Optimized route */}
      {showOptimizedRoute && trip.optimizedRoute && (
        <Polyline
          path={trip.optimizedRoute.path}
          options={{
            strokeColor: '#9C27B0',
            strokeWeight: 5,
            strokeOpacity: 0.8,
            zIndex: 60
          }}
          onClick={(e) => handleRouteClick(e, 'optimized')}
        />
      )}

      {/* Deviation points */}
      {showDeviations && trip.deviations.map((deviation, index) => (
        <React.Fragment key={deviation.id}>
          <Circle
            center={deviation.location}
            radius={deviation.severity === 'high' ? 100 : deviation.severity === 'medium' ? 75 : 50}
            options={{
              fillColor: getDeviationColor(deviation.severity),
              fillOpacity: 0.3,
              strokeColor: getDeviationColor(deviation.severity),
              strokeWeight: 2,
              strokeOpacity: 0.8,
              zIndex: 90
            }}
            onClick={() => setSelectedDeviation(deviation)}
          />
          
          <Marker
            position={deviation.location}
            icon={{
              url: '/icons/deviation-warning.svg',
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12)
            }}
            onClick={() => setSelectedDeviation(deviation)}
          />
        </React.Fragment>
      ))}

      {/* Checkpoints */}
      {showCheckpoints && trip.checkpoints.map(checkpoint => (
        <React.Fragment key={checkpoint.id}>
          <Circle
            center={checkpoint.location}
            radius={checkpoint.detectionRadius}
            options={{
              fillColor: getCheckpointColor(checkpoint.status),
              fillOpacity: 0.1,
              strokeColor: getCheckpointColor(checkpoint.status),
              strokeWeight: 2,
              strokeOpacity: 0.5,
              zIndex: 30
            }}
          />
          
          <Marker
            position={checkpoint.location}
            icon={{
              url: `/icons/checkpoint-${checkpoint.type}.svg`,
              scaledSize: new google.maps.Size(32, 32),
              anchor: new google.maps.Point(16, 16)
            }}
            title={checkpoint.name}
            onClick={() => setSelectedCheckpoint(checkpoint)}
          />
        </React.Fragment>
      ))}

      {/* Selected deviation info window */}
      {selectedDeviation && (
        <InfoWindow
          position={selectedDeviation.location}
          onCloseClick={() => setSelectedDeviation(null)}
        >
          <div style={{ minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Route Deviation</h4>
            <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
              <div><strong>Severity:</strong> {selectedDeviation.severity.toUpperCase()}</div>
              <div><strong>Distance:</strong> {selectedDeviation.distance.toFixed(0)} meters</div>
              <div><strong>Time:</strong> {selectedDeviation.timestamp.toLocaleString()}</div>
              {selectedDeviation.reason && (
                <div><strong>Reason:</strong> {selectedDeviation.reason}</div>
              )}
            </div>
          </div>
        </InfoWindow>
      )}

      {/* Selected checkpoint info window */}
      {selectedCheckpoint && (
        <InfoWindow
          position={selectedCheckpoint.location}
          onCloseClick={() => setSelectedCheckpoint(null)}
        >
          <div style={{ minWidth: '250px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{selectedCheckpoint.name}</h4>
            <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
              <div><strong>Type:</strong> {selectedCheckpoint.type}</div>
              <div><strong>Status:</strong> 
                <span style={{ 
                  color: getCheckpointColor(selectedCheckpoint.status),
                  fontWeight: 'bold',
                  marginLeft: '4px'
                }}>
                  {selectedCheckpoint.status.toUpperCase()}
                </span>
              </div>
              <div><strong>Required:</strong> {selectedCheckpoint.isRequired ? 'Yes' : 'No'}</div>
              {selectedCheckpoint.expectedArrival && (
                <div><strong>Expected:</strong> {selectedCheckpoint.expectedArrival.toLocaleString()}</div>
              )}
              {selectedCheckpoint.actualArrival && (
                <div><strong>Actual:</strong> {selectedCheckpoint.actualArrival.toLocaleString()}</div>
              )}
            </div>
          </div>
        </InfoWindow>
      )}

      {/* Route analysis overlay */}
      {analysis && trip.isSelected && (
        <RouteAnalysisOverlay analysis={analysis} />
      )}
    </>
  );
};

// Route analysis overlay component
const RouteAnalysisOverlay: React.FC<{ analysis: RouteAnalysis }> = ({ analysis }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '12px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      fontSize: '12px',
      minWidth: '200px',
      zIndex: 1000
    }}>
      <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Route Analysis</h4>
      
      <div style={{ marginBottom: '6px' }}>
        <strong>Compliance:</strong> 
        <span style={{ 
          color: analysis.compliancePercentage > 90 ? '#4CAF50' : 
                analysis.compliancePercentage > 70 ? '#FF9800' : '#F44336',
          fontWeight: 'bold',
          marginLeft: '4px'
        }}>
          {analysis.compliancePercentage.toFixed(1)}%
        </span>
      </div>
      
      <div style={{ marginBottom: '6px' }}>
        <strong>Total Distance:</strong> {(analysis.totalDistance / 1000).toFixed(1)} km
      </div>
      
      <div style={{ marginBottom: '6px' }}>
        <strong>Deviation:</strong> {(analysis.deviationDistance / 1000).toFixed(1)} km
      </div>
      
      <div style={{ marginBottom: '6px' }}>
        <strong>Avg Speed:</strong> {analysis.averageSpeed.toFixed(1)} km/h
      </div>
      
      <div style={{ marginBottom: '6px' }}>
        <strong>Fuel:</strong> {analysis.fuelConsumption.toFixed(1)} L
      </div>
      
      <div>
        <strong>ETA:</strong> {analysis.estimatedArrival.toLocaleTimeString()}
      </div>
    </div>
  );
};

// Helper functions
const handleRouteClick = (e: google.maps.MapMouseEvent, routeType: string) => {
  console.log(`${routeType} route clicked at:`, e.latLng?.toJSON());
};

const calculateTotalDistance = (path: RoutePoint[]): number => {
  let totalDistance = 0;
  for (let i = 1; i < path.length; i++) {
    totalDistance += calculateDistance(path[i - 1], path[i]);
  }
  return totalDistance;
};

const calculateDistance = (point1: RoutePoint, point2: RoutePoint): number => {
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
};

const calculateDeviationDistance = (plannedPath: RoutePoint[], actualPath: RoutePoint[]): number => {
  // Simplified calculation - in real implementation, this would be more sophisticated
  const plannedDistance = calculateTotalDistance(plannedPath);
  const actualDistance = calculateTotalDistance(actualPath);
  return Math.abs(actualDistance - plannedDistance);
};

const calculateFuelConsumption = (distance: number): number => {
  // Simplified calculation: 25L per 100km
  return (distance / 1000) * 0.25;
};

const calculateAverageSpeed = (route: Route): number => {
  if (!route.actualDuration) return 0;
  const distanceKm = route.distance / 1000;
  const durationHours = route.actualDuration / (1000 * 60 * 60);
  return distanceKm / durationHours;
};

export default SmartRouteComparison;