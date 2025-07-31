import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Marker, OverlayView } from '@react-google-maps/api';

// Types for Saudi Logistics System
export interface Truck {
  id: string;
  plateNumber: string;
  currentLocation: { lat: number; lng: number };
  heading: number;
  currentSpeed: number;
  speedLimit: number;
  status: 'moving' | 'stopped' | 'loading' | 'maintenance' | 'emergency';
  type: 'container' | 'tanker' | 'flatbed' | 'refrigerated' | 'heavy_equipment';
  driver: {
    id: string;
    name: string;
    avatar?: string;
  };
  company?: {
    id: string;
    name: string;
    colorCode: string;
  };
  alerts: Alert[];
  isSelected: boolean;
  lastUpdateTime: Date;
  fuelLevel: number;
  continuousDrivingTime: number;
  emergencyButtonPressed: boolean;
  currentRegion: string;
  priority: number;
}

export interface Alert {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  timestamp: Date;
}

interface AnimatedTruckMarkerProps {
  truck: Truck;
  animationDuration?: number;
  showSpeedIndicator?: boolean;
  showDirectionArrow?: boolean;
  onTruckClick?: (truck: Truck) => void;
  onTruckHover?: (truck: Truck) => void;
}

export const AnimatedTruckMarker: React.FC<AnimatedTruckMarkerProps> = ({
  truck,
  animationDuration = 1000,
  showSpeedIndicator = true,
  showDirectionArrow = true,
  onTruckClick,
  onTruckHover,
}) => {
  const [currentPosition, setCurrentPosition] = useState(truck.currentLocation);
  const [rotation, setRotation] = useState(truck.heading);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const previousPosition = useRef(truck.currentLocation);

  // Calculate bearing between two points
  const calculateBearing = useCallback((start: { lat: number; lng: number }, end: { lat: number; lng: number }): number => {
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
  }, []);

  // Easing function for natural movement
  const easeInOutCubic = useCallback((t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }, []);

  // Smooth truck animation
  const animateToNewPosition = useCallback((newPosition: { lat: number; lng: number }) => {
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
  }, [currentPosition, rotation, animationDuration, calculateBearing, easeInOutCubic, isAnimating]);

  // Update position when truck data changes
  useEffect(() => {
    const hasPositionChanged = 
      truck.currentLocation.lat !== previousPosition.current.lat ||
      truck.currentLocation.lng !== previousPosition.current.lng;

    if (hasPositionChanged && !isAnimating) {
      animateToNewPosition(truck.currentLocation);
      previousPosition.current = truck.currentLocation;
    }
  }, [truck.currentLocation, isAnimating, animateToNewPosition]);

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
      // Note: rotation is handled via CSS transform in real implementation
    };
  };

  // Get truck icon URL based on type and status
  const getTruckIconUrl = (truck: Truck): string => {
    const baseUrl = '/icons/trucks/';
    let iconName = `${truck.type}`;
    
    if (truck.status === 'emergency') {
      iconName += '-emergency';
    } else if (truck.alerts.length > 0) {
      iconName += '-warning';
    } else if (truck.status === 'stopped') {
      iconName += '-stopped';
    }
    
    if (truck.company) {
      iconName += `-${truck.company.colorCode}`;
    }
    
    return `${baseUrl}${iconName}.svg`;
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
  position: { lat: number; lng: number };
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

// Direction arrow component
const DirectionArrow: React.FC<{
  position: { lat: number; lng: number };
  heading: number;
  speed: number;
}> = ({ position, heading, speed }) => {
  return (
    <OverlayView
      position={position}
      mapPaneName="overlayMouseTarget"
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          transform: `translate(-50%, -50%) rotate(${heading}deg)`,
          pointerEvents: 'none'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path
            d="M10 2 L16 18 L10 14 L4 18 Z"
            fill="#2196F3"
            stroke="#1976D2"
            strokeWidth="1"
            opacity={speed > 0 ? 0.8 : 0.3}
          />
        </svg>
      </div>
    </OverlayView>
  );
};

// Truck alert badges component
const TruckAlertBadges: React.FC<{
  truck: Truck;
  position: { lat: number; lng: number };
  onAlertClick: (alert: Alert) => void;
}> = ({ truck, position, onAlertClick }) => {
  const getAlertIcon = (alert: Alert) => {
    const icons: Record<string, string> = {
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
    const colors: Record<string, string> = {
      low: '#4CAF50',
      medium: '#FF9800',
      high: '#F44336',
      critical: '#9C27B0'
    };
    return colors[severity] || '#666';
  };

  return (
    <OverlayView
      position={position}
      mapPaneName="overlayMouseTarget"
    >
      <div style={{ transform: 'translate(-50%, 100%)', marginTop: '25px' }}>
        {truck.alerts.slice(0, 3).map(alert => (
          <div
            key={alert.id}
            style={{
              backgroundColor: getAlertColor(alert.severity),
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              margin: '2px',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            onClick={() => onAlertClick(alert)}
          >
            <span>{getAlertIcon(alert)}</span>
            <span>{alert.message.substring(0, 20)}...</span>
          </div>
        ))}
      </div>
    </OverlayView>
  );
};

export default AnimatedTruckMarker;