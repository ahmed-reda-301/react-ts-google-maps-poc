import { FC, memo, useMemo, useEffect, useState } from "react";
import { Polyline as GooglePolyline } from "@react-google-maps/api";
import { PolylineProps, RoutePolylineProps } from "../../types/maps";

/**
 * Default styling options for different route types
 */
/**
 * Get route styles - function to avoid google.maps reference at module level
 */
const getRouteStyles = (): Record<string, google.maps.PolylineOptions> => ({
  driving: {
    strokeColor: '#4285F4',
    strokeOpacity: 0.8,
    strokeWeight: 6,
  },
  walking: {
    strokeColor: '#34A853',
    strokeOpacity: 0.8,
    strokeWeight: 4,
    icons: [{
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1,
        scale: 2,
      },
      offset: '0',
      repeat: '10px',
    }],
  },
  cycling: {
    strokeColor: '#FBBC04',
    strokeOpacity: 0.8,
    strokeWeight: 4,
    icons: [{
      icon: {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4,
      },
      offset: '0',
      repeat: '20px',
    }],
  },
  transit: {
    strokeColor: '#EA4335',
    strokeOpacity: 0.8,
    strokeWeight: 5,
    icons: [{
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1,
        scale: 3,
      },
      offset: '0',
      repeat: '15px',
    }],
  },
});

/**
 * Traffic color mapping
 */
const TRAFFIC_COLORS: Record<string, string> = {
  light: '#34A853',
  moderate: '#FBBC04',
  heavy: '#EA4335',
};

/**
 * Basic Polyline component for drawing lines on the map
 * 
 * @component
 * @example
 * ```tsx
 * <Polyline
 *   path={[
 *     { lat: 24.7136, lng: 46.6753 },
 *     { lat: 24.7500, lng: 46.7000 }
 *   ]}
 *   options={{
 *     strokeColor: '#FF0000',
 *     strokeWeight: 4
 *   }}
 *   onClick={handlePolylineClick}
 * />
 * ```
 */
const Polyline: FC<PolylineProps> = ({
  path,
  options,
  onClick,
  editable = false,
  animation,
}) => {
  const [animatedPath, setAnimatedPath] = useState(path);

  // Animation effect
  useEffect(() => {
    if (!animation?.enabled || path.length < 2) return;

    const animatePolyline = () => {
      const speed = animation.speed || 1;
      const direction = animation.direction || 'forward';
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (direction === 'forward') {
          currentIndex = Math.min(currentIndex + 1, path.length - 1);
          setAnimatedPath(path.slice(0, currentIndex + 1));
        } else {
          currentIndex = Math.max(currentIndex - 1, 0);
          setAnimatedPath(path.slice(currentIndex));
        }

        if (
          (direction === 'forward' && currentIndex >= path.length - 1) ||
          (direction === 'backward' && currentIndex <= 0)
        ) {
          clearInterval(interval);
        }
      }, 1000 / speed);

      return () => clearInterval(interval);
    };

    const cleanup = animatePolyline();
    return cleanup;
  }, [path, animation]);

  const polylineOptions = useMemo(() => ({
    strokeColor: '#4285F4',
    strokeOpacity: 0.8,
    strokeWeight: 4,
    ...options,
  }), [options]);

  return (
    <GooglePolyline
      path={animation?.enabled ? animatedPath : path}
      options={{
        ...polylineOptions,
        editable,
      }}
      onClick={onClick}
    />
  );
};

/**
 * RoutePolyline component with route-specific styling and metadata
 * 
 * @component
 * @example
 * ```tsx
 * <RoutePolyline
 *   path={routePath}
 *   routeType="driving"
 *   metadata={{
 *     distance: '25.3 km',
 *     duration: '32 min',
 *     traffic: 'moderate'
 *   }}
 *   showDistance={true}
 *   animation={{ enabled: true, speed: 2 }}
 * />
 * ```
 */
const RoutePolyline: FC<RoutePolylineProps> = ({
  path,
  routeType = 'driving',
  showDistance = false,
  metadata,
  animation,
  onClick,
  editable = false,
  options,
}) => {
  // Get route-specific styling
  const routeOptions = useMemo(() => {
    const routeStyles = getRouteStyles();
    const baseStyle = routeStyles[routeType] || routeStyles.driving;
    
    // Apply traffic-based coloring if metadata is available
    if (metadata?.traffic && TRAFFIC_COLORS[metadata.traffic]) {
      return {
        ...baseStyle,
        strokeColor: TRAFFIC_COLORS[metadata.traffic],
        ...options,
      };
    }

    return {
      ...baseStyle,
      ...options,
    };
  }, [routeType, metadata, options]);

  return (
    <>
      <Polyline
        path={path}
        options={routeOptions}
        onClick={onClick}
        editable={editable}
        animation={animation}
      />
      
      {/* Distance markers */}
      {showDistance && metadata && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 12px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            fontSize: '14px',
            fontWeight: 'bold',
            zIndex: 1000,
          }}
        >
          <div>المسافة: {metadata.distance}</div>
          <div>الوقت: {metadata.duration}</div>
          {metadata.traffic && (
            <div style={{ color: TRAFFIC_COLORS[metadata.traffic] }}>
              الحركة المرورية: {
                metadata.traffic === 'light' ? 'خفيفة' :
                metadata.traffic === 'moderate' ? 'متوسطة' : 'كثيفة'
              }
            </div>
          )}
        </div>
      )}
    </>
  );
};

export { RoutePolyline };
export default memo(Polyline);