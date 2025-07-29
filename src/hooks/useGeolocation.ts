import { useState, useEffect, useCallback } from 'react';
import { GeolocationProps } from '../types/maps';

/**
 * Geolocation state interface
 */
interface GeolocationState {
  /** Current position */
  position: GeolocationPosition | null;
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: GeolocationPositionError | null;
  /** Whether geolocation is supported */
  supported: boolean;
}

/**
 * Custom hook for handling geolocation functionality
 * 
 * @param options Geolocation options and callbacks
 * @returns Geolocation state and control functions
 * 
 * @example
 * ```tsx
 * const {
 *   position,
 *   loading,
 *   error,
 *   getCurrentLocation,
 *   watchPosition,
 *   clearWatch
 * } = useGeolocation({
 *   enableTracking: true,
 *   onLocationFound: (pos) => console.log('Location:', pos),
 *   onLocationError: (err) => console.error('Error:', err)
 * });
 * ```
 */
export const useGeolocation = (options: GeolocationProps = {}) => {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    loading: false,
    error: null,
    supported: 'geolocation' in navigator,
  });

  const [watchId, setWatchId] = useState<number | null>(null);

  const {
    enableTracking = false,
    options: positionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    },
    onLocationFound,
    onLocationError,
  } = options;

  /**
   * Success callback for geolocation
   */
  const handleSuccess = useCallback((position: GeolocationPosition) => {
    setState(prev => ({
      ...prev,
      position,
      loading: false,
      error: null,
    }));
    onLocationFound?.(position);
  }, [onLocationFound]);

  /**
   * Error callback for geolocation
   */
  const handleError = useCallback((error: GeolocationPositionError) => {
    setState(prev => ({
      ...prev,
      position: null,
      loading: false,
      error,
    }));
    onLocationError?.(error);
  }, [onLocationError]);

  /**
   * Get current position once
   */
  const getCurrentLocation = useCallback(() => {
    if (!state.supported) {
      const error = {
        code: 2,
        message: 'Geolocation is not supported by this browser.',
      } as GeolocationPositionError;
      handleError(error);
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      positionOptions
    );
  }, [state.supported, handleSuccess, handleError, positionOptions]);

  /**
   * Start watching position
   */
  const watchPosition = useCallback(() => {
    if (!state.supported) {
      const error = {
        code: 2,
        message: 'Geolocation is not supported by this browser.',
      } as GeolocationPositionError;
      handleError(error);
      return;
    }

    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    const id = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      positionOptions
    );
    setWatchId(id);
  }, [state.supported, watchId, handleSuccess, handleError, positionOptions]);

  /**
   * Clear position watch
   */
  const clearWatch = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [watchId]);

  /**
   * Calculate distance between two positions
   */
  const calculateDistance = useCallback((
    pos1: { lat: number; lng: number },
    pos2: { lat: number; lng: number }
  ): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = pos1.lat * Math.PI / 180;
    const φ2 = pos2.lat * Math.PI / 180;
    const Δφ = (pos2.lat - pos1.lat) * Math.PI / 180;
    const Δλ = (pos2.lng - pos1.lng) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }, []);

  /**
   * Check if position is within geofence
   */
  const isWithinGeofence = useCallback((
    center: { lat: number; lng: number },
    radius: number,
    currentPos?: { lat: number; lng: number }
  ): boolean => {
    if (!currentPos && !state.position) return false;
    
    const pos = currentPos || {
      lat: state.position!.coords.latitude,
      lng: state.position!.coords.longitude,
    };

    const distance = calculateDistance(center, pos);
    return distance <= radius;
  }, [state.position, calculateDistance]);

  // Auto-start tracking if enabled
  useEffect(() => {
    if (enableTracking) {
      watchPosition();
    } else {
      clearWatch();
    }

    return () => {
      clearWatch();
    };
  }, [enableTracking, watchPosition, clearWatch]);

  return {
    ...state,
    getCurrentLocation,
    watchPosition,
    clearWatch,
    calculateDistance,
    isWithinGeofence,
  };
};

/**
 * Geofence hook for monitoring entry/exit of specific areas
 */
export const useGeofence = (
  center: { lat: number; lng: number },
  radius: number,
  onEnter?: () => void,
  onExit?: () => void
) => {
  const [isInside, setIsInside] = useState(false);
  const { position, isWithinGeofence } = useGeolocation({ enableTracking: true });

  useEffect(() => {
    if (!position) return;

    const currentPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    const withinFence = isWithinGeofence(center, radius, currentPos);

    if (withinFence && !isInside) {
      setIsInside(true);
      onEnter?.();
    } else if (!withinFence && isInside) {
      setIsInside(false);
      onExit?.();
    }
  }, [position, center, radius, isInside, isWithinGeofence, onEnter, onExit]);

  return {
    isInside,
    position,
  };
};

export default useGeolocation;