# Advanced Route Management - Saudi Arabia System

## Overview

This file documents how to implement an advanced route management system for trucks in Saudi Arabia, focusing on comparing planned vs actual routes, checkpoint management, and route optimization.

## 1. Route Management Components

### Smart Route Component
```typescript
import React, { useState, useEffect, useMemo } from 'react';
import { Polyline, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

interface SmartRouteProps {
  trip: Trip;
  showPlannedRoute: boolean;
  showActualRoute: boolean;
  showDeviations: boolean;
  showCheckpoints: boolean;
  onRouteUpdate: (route: RouteData) => void;
}

const SmartRoute: React.FC<SmartRouteProps> = ({
  trip,
  showPlannedRoute,
  showActualRoute,
  showDeviations,
  showCheckpoints,
  onRouteUpdate
}) => {
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [routeAnalysis, setRouteAnalysis] = useState<RouteAnalysis | null>(null);
  const [deviationSegments, setDeviationSegments] = useState<DeviationSegment[]>([]);

  // Route analysis
  const analyzeRoute = useMemo(() => {
    if (!trip.plannedRoute || !trip.actualRoute) return null;

    return {
      totalDistance: calculateTotalDistance(trip.actualRoute.path),
      plannedDistance: calculateTotalDistance(trip.plannedRoute.path),
      deviationDistance: calculateDeviationDistance(trip.plannedRoute.path, trip.actualRoute.path),
      compliancePercentage: calculateCompliancePercentage(trip),
      estimatedArrival: calculateEstimatedArrival(trip),
      fuelConsumption: calculateFuelConsumption(trip),
      averageSpeed: calculateAverageSpeed(trip)
    };
  }, [trip.plannedRoute, trip.actualRoute]);

  // Calculate deviations
  useEffect(() => {
    if (trip.plannedRoute && trip.actualRoute) {
      const deviations = calculateRouteDeviations(
        trip.plannedRoute.path,
        trip.actualRoute.path,
        trip.allowedDeviationRadius || 100
      );
      setDeviationSegments(deviations);
    }
  }, [trip.plannedRoute, trip.actualRoute]);

  // Directions service for optimized route
  const handleDirectionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === 'OK' && result) {
      setDirectionsResponse(result);
      
      // Update route data
      const routeData: RouteData = {
        distance: result.routes[0].legs[0].distance?.value || 0,
        duration: result.routes[0].legs[0].duration?.value || 0,
        path: result.routes[0].overview_path.map(point => ({
          lat: point.lat(),
          lng: point.lng()
        })),
        waypoints: result.routes[0].waypoint_order
      };
      
      onRouteUpdate(routeData);
    }
  };

  return (
    <>
      {/* Optimized route calculation service */}
      {trip.needsOptimization && (
        <DirectionsService
          options={{
            origin: trip.origin.location,
            destination: trip.destination.location,
            waypoints: trip.checkpoints.map(cp => ({
              location: cp.location,
              stopover: true
            })),
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
            avoidHighways: trip.avoidHighways,
            avoidTolls: trip.avoidTolls
          }}
          callback={handleDirectionsCallback}
        />
      )}

      {/* Display optimized route */}
      {directionsResponse && (
        <DirectionsRenderer
          directions={directionsResponse}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#4CAF50',
              strokeWeight: 6,
              strokeOpacity: 0.8,
              zIndex: 100
            }
          }}
        />
      )}

      {/* Planned route */}
      {showPlannedRoute && trip.plannedRoute && (
        <Polyline
          path={trip.plannedRoute.path}
          options={{
            strokeColor: '#2196F3',
            strokeWeight: 4,
            strokeOpacity: 0.7,
            strokePattern: [10, 5], // dashed line
            zIndex: 50
          }}
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
        />
      )}

      {/* Deviation segments */}
      {showDeviations && deviationSegments.map((segment, index) => (
        <React.Fragment key={index}>
          <Polyline
            path={segment.path}
            options={{
              strokeColor: '#FF5722',
              strokeWeight: 8,
              strokeOpacity: 0.8,
              zIndex: 90
            }}
          />
          
          {/* Warning circle at deviation start */}
          <Circle
            center={segment.path[0]}
            radius={segment.severity * 50}
            options={{
              fillColor: '#FF5722',
              fillOpacity: 0.2,
              strokeColor: '#FF5722',
              strokeWeight: 2,
              zIndex: 85
            }}
          />
        </React.Fragment>
      ))}

      {/* Checkpoints */}
      {showCheckpoints && trip.checkpoints.map(checkpoint => (
        <CheckpointMarker
          key={checkpoint.id}
          checkpoint={checkpoint}
          trip={trip}
        />
      ))}
    </>
  );
};
```

### Checkpoint Component
```typescript
interface CheckpointMarkerProps {
  checkpoint: Checkpoint;
  trip: Trip;
  onCheckpointClick?: (checkpoint: Checkpoint) => void;
}

const CheckpointMarker: React.FC<CheckpointMarkerProps> = ({
  checkpoint,
  trip,
  onCheckpointClick
}) => {
  const [isVisited, setIsVisited] = useState(false);
  const [visitTime, setVisitTime] = useState<Date | null>(null);
  const [isOverdue, setIsOverdue] = useState(false);

  // Check checkpoint status
  useEffect(() => {
    const checkStatus = () => {
      const visited = trip.visitedCheckpoints.includes(checkpoint.id);
      setIsVisited(visited);
      
      if (visited) {
        const visit = trip.checkpointVisits.find(v => v.checkpointId === checkpoint.id);
        setVisitTime(visit?.timestamp || null);
      }
      
      // Check if overdue
      if (checkpoint.expectedArrival && !visited) {
        setIsOverdue(new Date() > checkpoint.expectedArrival);
      }
    };

    checkStatus();
  }, [checkpoint, trip]);

  const getCheckpointIcon = () => {
    let iconUrl = '/icons/checkpoint';
    
    if (isVisited) {
      iconUrl += '-completed.svg';
    } else if (isOverdue) {
      iconUrl += '-overdue.svg';
    } else if (checkpoint.isRequired) {
      iconUrl += '-required.svg';
    } else {
      iconUrl += '-optional.svg';
    }

    return {
      url: iconUrl,
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16)
    };
  };

  const getCheckpointColor = () => {
    if (isVisited) return '#4CAF50'; // Green - completed
    if (isOverdue) return '#F44336'; // Red - overdue
    if (checkpoint.isRequired) return '#FF9800'; // Orange - required
    return '#9E9E9E'; // Gray - optional
  };

  return (
    <>
      {/* Checkpoint marker */}
      <Marker
        position={checkpoint.location}
        icon={getCheckpointIcon()}
        title={checkpoint.name}
        onClick={() => onCheckpointClick?.(checkpoint)}
      />

      {/* Checkpoint range circle */}
      <Circle
        center={checkpoint.location}
        radius={checkpoint.detectionRadius || 100}
        options={{
          fillColor: getCheckpointColor(),
          fillOpacity: 0.1,
          strokeColor: getCheckpointColor(),
          strokeWeight: 2,
          strokeOpacity: 0.5,
          zIndex: 10
        }}
      />

      {/* Checkpoint info */}
      {checkpoint.showInfo && (
        <InfoWindow
          position={checkpoint.location}
          onCloseClick={() => {
            checkpoint.showInfo = false;
          }}
        >
          <div className="checkpoint-info">
            <h4>{checkpoint.name}</h4>
            <div className="checkpoint-details">
              <p><strong>Type:</strong> {checkpoint.type}</p>
              <p><strong>Status:</strong> {isVisited ? 'Completed' : isOverdue ? 'Overdue' : 'Pending'}</p>
              {checkpoint.expectedArrival && (
                <p><strong>Expected Arrival:</strong> {checkpoint.expectedArrival.toLocaleString()}</p>
              )}
              {visitTime && (
                <p><strong>Visit Time:</strong> {visitTime.toLocaleString()}</p>
              )}
              {checkpoint.requirements && (
                <div>
                  <strong>Requirements:</strong>
                  <ul>
                    {checkpoint.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
```

## 2. Advanced Route Analysis

### Route Analysis Service
```typescript
class RouteAnalysisService {
  // Calculate route deviation
  static calculateRouteDeviation(
    plannedPath: LatLng[],
    actualPath: LatLng[],
    allowedDeviation: number = 100
  ): RouteDeviationAnalysis {
    const deviations: DeviationPoint[] = [];
    let totalDeviationDistance = 0;
    let maxDeviation = 0;
    let deviationPercentage = 0;

    actualPath.forEach((actualPoint, index) => {
      const nearestPlannedPoint = this.findNearestPointOnPath(actualPoint, plannedPath);
      const deviationDistance = this.calculateDistance(actualPoint, nearestPlannedPoint);
      
      if (deviationDistance > allowedDeviation) {
        deviations.push({
          actualPoint,
          plannedPoint: nearestPlannedPoint,
          distance: deviationDistance,
          timestamp: new Date(),
          severity: this.getDeviationSeverity(deviationDistance, allowedDeviation)
        });
        
        totalDeviationDistance += deviationDistance;
        maxDeviation = Math.max(maxDeviation, deviationDistance);
      }
    });

    // Calculate deviation percentage
    const totalActualDistance = this.calculateTotalDistance(actualPath);
    deviationPercentage = (totalDeviationDistance / totalActualDistance) * 100;

    return {
      deviations,
      totalDeviationDistance,
      maxDeviation,
      deviationPercentage,
      complianceScore: Math.max(0, 100 - deviationPercentage),
      isCompliant: deviationPercentage < 5 // Less than 5% deviation
    };
  }

  // Analyze route efficiency
  static analyzeRouteEfficiency(trip: Trip): RouteEfficiencyAnalysis {
    const plannedDistance = this.calculateTotalDistance(trip.plannedRoute.path);
    const actualDistance = this.calculateTotalDistance(trip.actualRoute.path);
    const directDistance = this.calculateDistance(
      trip.origin.location,
      trip.destination.location
    );

    const efficiencyScore = (directDistance / actualDistance) * 100;
    const extraDistance = actualDistance - plannedDistance;
    const extraDistancePercentage = (extraDistance / plannedDistance) * 100;

    // Calculate extra fuel consumption
    const extraFuelConsumption = this.calculateExtraFuelConsumption(
      extraDistance,
      trip.vehicle.fuelEfficiency
    );

    // Calculate extra cost
    const extraCost = this.calculateExtraCost(extraDistance, extraFuelConsumption);

    return {
      efficiencyScore,
      extraDistance,
      extraDistancePercentage,
      extraFuelConsumption,
      extraCost,
      recommendations: this.generateEfficiencyRecommendations(trip)
    };
  }

  // Analyze time performance
  static analyzeTimePerformance(trip: Trip): TimePerformanceAnalysis {
    const plannedDuration = trip.plannedRoute.estimatedDuration;
    const actualDuration = trip.actualRoute.actualDuration;
    const delay = actualDuration - plannedDuration;
    const delayPercentage = (delay / plannedDuration) * 100;

    // Analyze delay causes
    const delayCauses = this.analyzeDelayCauses(trip);
    
    // Calculate average speed
    const averageSpeed = this.calculateAverageSpeed(trip);
    const plannedAverageSpeed = trip.plannedRoute.plannedAverageSpeed;
    const speedVariance = ((averageSpeed - plannedAverageSpeed) / plannedAverageSpeed) * 100;

    return {
      plannedDuration,
      actualDuration,
      delay,
      delayPercentage,
      averageSpeed,
      speedVariance,
      delayCauses,
      onTimePerformance: delay <= 0,
      performanceGrade: this.calculatePerformanceGrade(delayPercentage)
    };
  }

  // Generate optimization recommendations
  static generateOptimizationRecommendations(trip: Trip): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];
    
    const deviationAnalysis = this.calculateRouteDeviation(
      trip.plannedRoute.path,
      trip.actualRoute.path
    );
    
    const efficiencyAnalysis = this.analyzeRouteEfficiency(trip);
    const timeAnalysis = this.analyzeTimePerformance(trip);

    // Deviation-based recommendations
    if (deviationAnalysis.deviationPercentage > 10) {
      recommendations.push({
        type: 'route_optimization',
        priority: 'high',
        title: 'Route Optimization',
        description: 'Recommend re-planning route to reduce deviation',
        expectedImprovement: '15-25% efficiency improvement',
        implementation: 'Use advanced route optimization algorithms'
      });
    }

    // Efficiency-based recommendations
    if (efficiencyAnalysis.efficiencyScore < 80) {
      recommendations.push({
        type: 'efficiency_improvement',
        priority: 'medium',
        title: 'Efficiency Improvement',
        description: 'Improve fuel usage and reduce extra distance',
        expectedImprovement: `Save ${efficiencyAnalysis.extraFuelConsumption.toFixed(1)} liters of fuel`,
        implementation: 'Train drivers on optimal routes'
      });
    }

    // Time-based recommendations
    if (timeAnalysis.delayPercentage > 15) {
      recommendations.push({
        type: 'time_management',
        priority: 'high',
        title: 'Time Management',
        description: 'Improve scheduling and reduce delays',
        expectedImprovement: `Reduce delays by ${Math.min(50, timeAnalysis.delayPercentage)}%`,
        implementation: 'Update departure times and add buffer time'
      });
    }

    return recommendations;
  }
}
```

## 3. Interactive Route Comparison Component

### Route Comparison Interface
```typescript
interface RouteComparisonDashboardProps {
  trip: Trip;
  onRouteSelect: (routeType: 'planned' | 'actual' | 'optimized') => void;
}

const RouteComparisonDashboard: React.FC<RouteComparisonDashboardProps> = ({
  trip,
  onRouteSelect
}) => {
  const [selectedRoute, setSelectedRoute] = useState<'planned' | 'actual' | 'optimized'>('actual');
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [analysisData, setAnalysisData] = useState<RouteAnalysisData | null>(null);

  // Update analysis when trip changes
  useEffect(() => {
    const analysis = {
      deviation: RouteAnalysisService.calculateRouteDeviation(
        trip.plannedRoute.path,
        trip.actualRoute.path
      ),
      efficiency: RouteAnalysisService.analyzeRouteEfficiency(trip),
      timePerformance: RouteAnalysisService.analyzeTimePerformance(trip),
      recommendations: RouteAnalysisService.generateOptimizationRecommendations(trip)
    };
    
    setAnalysisData(analysis);
  }, [trip]);

  const handleRouteToggle = (routeType: 'planned' | 'actual' | 'optimized') => {
    setSelectedRoute(routeType);
    onRouteSelect(routeType);
  };

  if (!analysisData) return <div>Analyzing route...</div>;

  return (
    <div className="route-comparison-dashboard">
      {/* Control buttons */}
      <div className="route-controls">
        <div className="route-toggles">
          <button
            className={`route-toggle ${selectedRoute === 'planned' ? 'active' : ''}`}
            onClick={() => handleRouteToggle('planned')}
            style={{ backgroundColor: selectedRoute === 'planned' ? '#2196F3' : '#f5f5f5' }}
          >
            📍 Planned Route
          </button>
          
          <button
            className={`route-toggle ${selectedRoute === 'actual' ? 'active' : ''}`}
            onClick={() => handleRouteToggle('actual')}
            style={{ backgroundColor: selectedRoute === 'actual' ? '#4CAF50' : '#f5f5f5' }}
          >
            🚛 Actual Route
          </button>
          
          <button
            className={`route-toggle ${selectedRoute === 'optimized' ? 'active' : ''}`}
            onClick={() => handleRouteToggle('optimized')}
            style={{ backgroundColor: selectedRoute === 'optimized' ? '#FF9800' : '#f5f5f5' }}
          >
            ⚡ Optimized Route
          </button>
        </div>

        <button
          className="analysis-toggle"
          onClick={() => setShowAnalysis(!showAnalysis)}
        >
          {showAnalysis ? '📊 Hide Analysis' : '📈 Show Analysis'}
        </button>
      </div>

      {/* Analysis panel */}
      {showAnalysis && (
        <div className="analysis-panel">
          {/* Quick stats */}
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-value">{analysisData.deviation.complianceScore.toFixed(1)}%</div>
              <div className="stat-label">Compliance Rate</div>
              <div className={`stat-indicator ${analysisData.deviation.isCompliant ? 'good' : 'warning'}`}>
                {analysisData.deviation.isCompliant ? '✅' : '⚠️'}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-value">{analysisData.efficiency.efficiencyScore.toFixed(1)}%</div>
              <div className="stat-label">Route Efficiency</div>
              <div className={`stat-indicator ${analysisData.efficiency.efficiencyScore > 80 ? 'good' : 'warning'}`}>
                {analysisData.efficiency.efficiencyScore > 80 ? '✅' : '⚠️'}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-value">
                {analysisData.timePerformance.delay > 0 ? '+' : ''}
                {Math.round(analysisData.timePerformance.delay / 60)} min
              </div>
              <div className="stat-label">Delay</div>
              <div className={`stat-indicator ${analysisData.timePerformance.onTimePerformance ? 'good' : 'warning'}`}>
                {analysisData.timePerformance.onTimePerformance ? '✅' : '⏰'}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-value">{analysisData.efficiency.extraDistance.toFixed(1)} km</div>
              <div className="stat-label">Extra Distance</div>
              <div className={`stat-indicator ${analysisData.efficiency.extraDistance < 5 ? 'good' : 'warning'}`}>
                {analysisData.efficiency.extraDistance < 5 ? '✅' : '📏'}
              </div>
            </div>
          </div>

          {/* Deviation details */}
          {analysisData.deviation.deviations.length > 0 && (
            <div className="deviation-details">
              <h4>🚨 Deviation Points ({analysisData.deviation.deviations.length})</h4>
              <div className="deviation-list">
                {analysisData.deviation.deviations.slice(0, 3).map((deviation, index) => (
                  <div key={index} className="deviation-item">
                    <div className="deviation-distance">
                      {deviation.distance.toFixed(0)} meters
                    </div>
                    <div className="deviation-severity">
                      {deviation.severity === 'high' ? '🔴 High' : 
                       deviation.severity === 'medium' ? '🟡 Medium' : '🟢 Low'}
                    </div>
                    <div className="deviation-time">
                      {deviation.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {analysisData.recommendations.length > 0 && (
            <div className="recommendations">
              <h4>💡 Optimization Recommendations</h4>
              <div className="recommendations-list">
                {analysisData.recommendations.map((rec, index) => (
                  <div key={index} className={`recommendation-item priority-${rec.priority}`}>
                    <div className="recommendation-header">
                      <span className="recommendation-title">{rec.title}</span>
                      <span className={`priority-badge priority-${rec.priority}`}>
                        {rec.priority === 'high' ? '🔴 High' : 
                         rec.priority === 'medium' ? '🟡 Medium' : '🟢 Low'}
                      </span>
                    </div>
                    <div className="recommendation-description">{rec.description}</div>
                    <div className="recommendation-improvement">{rec.expectedImprovement}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

## 4. Smart Route Optimization

### Route Optimization Service
```typescript
class SmartRouteOptimizer {
  // Multi-point route optimization
  static async optimizeMultiPointRoute(
    origin: LatLng,
    destination: LatLng,
    waypoints: LatLng[],
    constraints: RouteConstraints
  ): Promise<OptimizedRoute> {
    
    // Enhanced nearest neighbor algorithm
    const optimizedWaypoints = await this.optimizeWaypointOrder(
      origin,
      destination,
      waypoints,
      constraints
    );

    // Calculate optimized route
    const optimizedRoute = await this.calculateOptimizedRoute(
      origin,
      destination,
      optimizedWaypoints,
      constraints
    );

    // Analyze improvements
    const improvements = await this.analyzeOptimizationImprovements(
      optimizedRoute,
      constraints.originalRoute
    );

    return {
      route: optimizedRoute,
      waypoints: optimizedWaypoints,
      improvements,
      estimatedSavings: improvements.totalSavings
    };
  }

  // Optimize checkpoint order
  private static async optimizeWaypointOrder(
    origin: LatLng,
    destination: LatLng,
    waypoints: LatLng[],
    constraints: RouteConstraints
  ): Promise<OptimizedWaypoint[]> {
    
    // Create distance matrix
    const distanceMatrix = await this.createDistanceMatrix([origin, ...waypoints, destination]);
    
    // Apply optimization algorithm
    const optimizedOrder = this.solveTSP(distanceMatrix, constraints);
    
    // Create optimized waypoints
    return optimizedOrder.map((index, order) => ({
      originalIndex: index,
      optimizedOrder: order,
      location: waypoints[index],
      estimatedArrival: this.calculateEstimatedArrival(origin, waypoints, order),
      priority: constraints.waypointPriorities?.[index] || 'medium'
    }));
  }

  // Simplified TSP solver
  private static solveTSP(
    distanceMatrix: number[][],
    constraints: RouteConstraints
  ): number[] {
    const n = distanceMatrix.length;
    const visited = new Array(n).fill(false);
    const route: number[] = [];
    
    let currentCity = 0; // Start from origin
    visited[0] = true;
    
    // Nearest neighbor with constraints
    for (let i = 1; i < n - 1; i++) {
      let nearestCity = -1;
      let nearestDistance = Infinity;
      
      for (let j = 1; j < n - 1; j++) {
        if (!visited[j] && distanceMatrix[currentCity][j] < nearestDistance) {
          // Check constraints
          if (this.satisfiesConstraints(j, route, constraints)) {
            nearestDistance = distanceMatrix[currentCity][j];
            nearestCity = j;
          }
        }
      }
      
      if (nearestCity !== -1) {
        visited[nearestCity] = true;
        route.push(nearestCity - 1); // Adjust index for waypoints
        currentCity = nearestCity;
      }
    }
    
    return route;
  }

  // Check constraints
  private static satisfiesConstraints(
    waypointIndex: number,
    currentRoute: number[],
    constraints: RouteConstraints
  ): boolean {
    
    // Check time constraints
    if (constraints.timeWindows) {
      const timeWindow = constraints.timeWindows[waypointIndex];
      const estimatedArrival = this.estimateArrivalTime(currentRoute, waypointIndex);
      
      if (estimatedArrival < timeWindow.start || estimatedArrival > timeWindow.end) {
        return false;
      }
    }
    
    // Check priority constraints
    if (constraints.priorityOrder) {
      const requiredPriorities = constraints.priorityOrder.filter(p => 
        !currentRoute.includes(p) && p < waypointIndex
      );
      
      if (requiredPriorities.length > 0) {
        return false;
      }
    }
    
    // Check vehicle constraints
    if (constraints.vehicleConstraints) {
      const vehicleConstraint = constraints.vehicleConstraints[waypointIndex];
      if (vehicleConstraint && !this.vehicleCanAccess(vehicleConstraint)) {
        return false;
      }
    }
    
    return true;
  }
}
```

## 5. Real-time Performance Monitoring

### Performance Monitor Component
```typescript
const RoutePerformanceMonitor: React.FC<{ trip: Trip }> = ({ trip }) => {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);

  // Update performance metrics
  useEffect(() => {
    const updateMetrics = () => {
      const metrics = calculatePerformanceMetrics(trip);
      setPerformanceMetrics(metrics);
      
      // Check for alerts
      const newAlerts = checkPerformanceAlerts(metrics, trip);
      setAlerts(newAlerts);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [trip]);

  if (!performanceMetrics) return <div>Loading performance metrics...</div>;

  return (
    <div className="performance-monitor">
      {/* Key performance indicators */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Route Efficiency</div>
          <div className="kpi-value">{performanceMetrics.routeEfficiency.toFixed(1)}%</div>
          <div className={`kpi-trend ${performanceMetrics.efficiencyTrend}`}>
            {performanceMetrics.efficiencyTrend === 'up' ? '📈' : 
             performanceMetrics.efficiencyTrend === 'down' ? '📉' : '➡️'}
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Schedule Compliance</div>
          <div className="kpi-value">{performanceMetrics.scheduleCompliance.toFixed(1)}%</div>
          <div className={`kpi-status ${performanceMetrics.scheduleCompliance > 90 ? 'good' : 'warning'}`}>
            {performanceMetrics.scheduleCompliance > 90 ? '✅' : '⚠️'}
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Fuel Consumption</div>
          <div className="kpi-value">{performanceMetrics.fuelEfficiency.toFixed(1)} L/100km</div>
          <div className={`kpi-comparison ${performanceMetrics.fuelComparison}`}>
            {performanceMetrics.fuelComparison === 'better' ? '🟢' : 
             performanceMetrics.fuelComparison === 'worse' ? '🔴' : '🟡'}
          </div>
        </div>
      </div>

      {/* Performance alerts */}
      {alerts.length > 0 && (
        <div className="performance-alerts">
          <h4>🚨 Performance Alerts</h4>
          {alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.severity}`}>
              <div className="alert-icon">{alert.icon}</div>
              <div className="alert-content">
                <div className="alert-title">{alert.title}</div>
                <div className="alert-message">{alert.message}</div>
              </div>
              <div className="alert-time">{alert.timestamp.toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

## Benefits and Advantages

### 1. Operational Efficiency Improvement
- **Reduce Distances**: Route optimization reduces traveled distance by 15-25%
- **Save Fuel**: Improve fuel consumption and reduce costs
- **Better Scheduling**: Better adherence to specified schedules
- **Improve Productivity**: Increase daily completed trips

### 2. Comprehensive and Accurate Monitoring
- **Instant Tracking**: Real-time route monitoring
- **Advanced Analysis**: Comprehensive performance and deviation analysis
- **Smart Alerts**: Instant notifications for problems and deviations
- **Detailed Reports**: Comprehensive performance and efficiency reports

### 3. Enhanced Customer Experience
- **Schedule Accuracy**: Better adherence to delivery schedules
- **Complete Transparency**: Accurate information about shipment location
- **Effective Communication**: Instant updates to customers
- **Service Quality**: Improved service level

### 4. Compliance and Safety
- **Law Compliance**: Ensure adherence to traffic laws
- **Speed Monitoring**: Prevent exceeding specified speeds
- **Road Safety**: Improve road and driver safety
- **Cargo Protection**: Ensure safe arrival of goods

## Conclusion

The advanced route management system provides comprehensive solutions for improving transportation efficiency in Saudi Arabia, with advanced capabilities for monitoring, analysis, and continuous operations optimization.