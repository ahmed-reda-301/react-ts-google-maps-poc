/**
 * Guide helper functions
 * Shared utility functions for guide components
 */

import { LatLng } from '../types/common/LatLng';
import { GuideMarker, GuideZone, GuideCoverageArea, GuideAnimationPath } from '../types/guide/common';
import { GUIDE_POSITIONS, GUIDE_STYLES, GUIDE_CONFIG } from '../constants/guideConstants';

/**
 * Create a map click handler for interactive examples
 */
export const createMapClickHandler = (
  selectedExample: string,
  targetExample: string,
  callback: (position: LatLng) => void
) => {
  return (e: google.maps.MapMouseEvent) => {
    if (e.latLng && selectedExample === targetExample) {
      const position: LatLng = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      callback(position);
    }
  };
};

/**
 * Create a marker click handler
 */
export const createMarkerClickHandler = (
  callback: (markerId: string | number) => void
) => {
  return (markerId: string | number) => {
    callback(markerId);
  };
};

/**
 * Create a zone click handler
 */
export const createZoneClickHandler = (
  selectedZone: string | null,
  callback: (zoneId: string) => void
) => {
  return (zoneId: string) => {
    callback(selectedZone === zoneId ? '' : zoneId);
  };
};

/**
 * Create drag end handler for markers
 */
export const createDragEndHandler = (
  callback: (position: LatLng) => void
) => {
  return (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition: LatLng = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      callback(newPosition);
    }
  };
};

/**
 * Reset guide state to default values
 */
export const resetGuideState = (
  setters: Record<string, (value: any) => void>,
  defaultValues: Record<string, any>
) => {
  Object.entries(defaultValues).forEach(([key, value]) => {
    if (setters[key]) {
      setters[key](value);
    }
  });
};

/**
 * Create animation sequence for paths
 */
export const createAnimationSequence = (
  path: LatLng[],
  onStep: (currentPath: LatLng[], index: number) => void,
  onComplete: () => void,
  stepDelay: number = GUIDE_CONFIG.ANIMATION_STEP_DELAY
): (() => void) => {
  let currentIndex = 0;
  let intervalId: NodeJS.Timeout;

  const start = () => {
    if (path.length === 0) {
      onComplete();
      return;
    }

    currentIndex = 1;
    onStep([path[0]], 0);

    intervalId = setInterval(() => {
      if (currentIndex < path.length) {
        onStep(path.slice(0, currentIndex + 1), currentIndex);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        onComplete();
      }
    }, stepDelay);
  };

  // Return cleanup function
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
};

/**
 * Calculate distance between two points
 */
export const calculateDistance = (point1: LatLng, point2: LatLng): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Calculate area of a circle
 */
export const calculateCircleArea = (radius: number): string => {
  const area = Math.PI * Math.pow(radius / 1000, 2);
  return area.toFixed(2);
};

/**
 * Calculate area of a polygon
 */
export const calculatePolygonArea = (path: LatLng[]): number => {
  if (path.length < 3) return 0;
  
  let area = 0;
  const n = path.length;
  
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += path[i].lat * path[j].lng;
    area -= path[j].lat * path[i].lng;
  }
  
  return Math.abs(area) / 2;
};

/**
 * Format distance for display
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m`;
  }
  return `${distance.toFixed(2)}km`;
};

/**
 * Format area for display
 */
export const formatArea = (area: number): string => {
  if (area < 1) {
    return `${(area * 1000000).toFixed(0)}m²`;
  }
  return `${area.toFixed(2)}km²`;
};

/**
 * Get center point of multiple positions
 */
export const getCenterPoint = (positions: LatLng[]): LatLng => {
  if (positions.length === 0) {
    return GUIDE_POSITIONS.DEFAULT_CENTER;
  }
  
  if (positions.length === 1) {
    return positions[0];
  }
  
  const totalLat = positions.reduce((sum, pos) => sum + pos.lat, 0);
  const totalLng = positions.reduce((sum, pos) => sum + pos.lng, 0);
  
  return {
    lat: totalLat / positions.length,
    lng: totalLng / positions.length
  };
};

/**
 * Create bounds from positions
 */
export const createBoundsFromPositions = (positions: LatLng[]): google.maps.LatLngBoundsLiteral => {
  if (positions.length === 0) {
    const center = GUIDE_POSITIONS.DEFAULT_CENTER;
    return {
      north: center.lat + 0.01,
      south: center.lat - 0.01,
      east: center.lng + 0.01,
      west: center.lng - 0.01
    };
  }
  
  const lats = positions.map(pos => pos.lat);
  const lngs = positions.map(pos => pos.lng);
  
  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs)
  };
};

/**
 * Validate polygon path
 */
export const validatePolygonPath = (path: LatLng[]): boolean => {
  return path.length >= 3;
};

/**
 * Validate rectangle bounds
 */
export const validateRectangleBounds = (bounds: google.maps.LatLngBoundsLiteral): boolean => {
  return bounds.north > bounds.south && bounds.east > bounds.west;
};

/**
 * Create default marker options
 */
export const createDefaultMarkerOptions = (
  color: string = GUIDE_STYLES.COLORS.PRIMARY
): google.maps.MarkerOptions => {
  return {
    clickable: true,
    draggable: false,
    optimized: true,
  };
};

/**
 * Create default polyline options
 */
export const createDefaultPolylineOptions = (
  color: string = GUIDE_STYLES.COLORS.PRIMARY
): google.maps.PolylineOptions => {
  return {
    strokeColor: color,
    strokeOpacity: GUIDE_STYLES.OPACITY.HIGH,
    strokeWeight: GUIDE_STYLES.STROKE_WEIGHT.NORMAL,
    clickable: true,
    geodesic: false,
  };
};

/**
 * Create default polygon options
 */
export const createDefaultPolygonOptions = (
  fillColor: string = GUIDE_STYLES.COLORS.PRIMARY,
  strokeColor: string = GUIDE_STYLES.COLORS.PRIMARY
): google.maps.PolygonOptions => {
  return {
    fillColor,
    fillOpacity: GUIDE_STYLES.OPACITY.MEDIUM,
    strokeColor,
    strokeOpacity: GUIDE_STYLES.OPACITY.HIGH,
    strokeWeight: GUIDE_STYLES.STROKE_WEIGHT.NORMAL,
    clickable: true,
    draggable: false,
    editable: false,
  };
};

/**
 * Create default circle options
 */
export const createDefaultCircleOptions = (
  fillColor: string = GUIDE_STYLES.COLORS.PRIMARY,
  strokeColor: string = GUIDE_STYLES.COLORS.PRIMARY
): google.maps.CircleOptions => {
  return {
    fillColor,
    fillOpacity: GUIDE_STYLES.OPACITY.MEDIUM,
    strokeColor,
    strokeOpacity: GUIDE_STYLES.OPACITY.HIGH,
    strokeWeight: GUIDE_STYLES.STROKE_WEIGHT.NORMAL,
    clickable: true,
    draggable: false,
    editable: false,
  };
};

/**
 * Create default rectangle options
 */
export const createDefaultRectangleOptions = (
  fillColor: string = GUIDE_STYLES.COLORS.PRIMARY,
  strokeColor: string = GUIDE_STYLES.COLORS.PRIMARY
): google.maps.RectangleOptions => {
  return {
    fillColor,
    fillOpacity: GUIDE_STYLES.OPACITY.MEDIUM,
    strokeColor,
    strokeOpacity: GUIDE_STYLES.OPACITY.HIGH,
    strokeWeight: GUIDE_STYLES.STROKE_WEIGHT.NORMAL,
    clickable: true,
    draggable: false,
    editable: false,
  };
};