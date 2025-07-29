import { FC, memo, useMemo } from "react";
import { Polygon as GooglePolygon } from "@react-google-maps/api";
import { PolygonProps, AreaPolygonProps } from "../../types/maps";

/**
 * Default styling options for different polygon categories
 */
const POLYGON_STYLES: Record<string, google.maps.PolygonOptions> = {
  zone: {
    fillColor: '#4285F4',
    fillOpacity: 0.3,
    strokeColor: '#4285F4',
    strokeOpacity: 0.8,
    strokeWeight: 2,
  },
  boundary: {
    fillColor: '#34A853',
    fillOpacity: 0.2,
    strokeColor: '#34A853',
    strokeOpacity: 0.9,
    strokeWeight: 3,
  },
  area: {
    fillColor: '#FBBC04',
    fillOpacity: 0.25,
    strokeColor: '#FBBC04',
    strokeOpacity: 0.8,
    strokeWeight: 2,
  },
  restriction: {
    fillColor: '#EA4335',
    fillOpacity: 0.4,
    strokeColor: '#EA4335',
    strokeOpacity: 0.9,
    strokeWeight: 2,
  },
  custom: {
    fillColor: '#9C27B0',
    fillOpacity: 0.3,
    strokeColor: '#9C27B0',
    strokeOpacity: 0.8,
    strokeWeight: 2,
  },
};

/**
 * Calculate polygon area using the Shoelace formula
 * @param paths Array of LatLng coordinates
 * @returns Area in square meters (approximate)
 */
const calculatePolygonArea = (paths: google.maps.LatLng[] | google.maps.LatLngLiteral[]): number => {
  if (paths.length < 3) return 0;

  const earthRadius = 6371000; // Earth's radius in meters
  let area = 0;

  for (let i = 0; i < paths.length; i++) {
    const j = (i + 1) % paths.length;
    const point1 = paths[i] as any;
    const point2 = paths[j] as any;
    const lat1 = typeof point1.lat === 'function' ? point1.lat() : point1.lat;
    const lng1 = typeof point1.lng === 'function' ? point1.lng() : point1.lng;
    const lat2 = typeof point2.lat === 'function' ? point2.lat() : point2.lat;
    const lng2 = typeof point2.lng === 'function' ? point2.lng() : point2.lng;

    area += (lng2 - lng1) * (2 + Math.sin(lat1 * Math.PI / 180) + Math.sin(lat2 * Math.PI / 180));
  }

  area = Math.abs(area * earthRadius * earthRadius / 2);
  return area;
};

/**
 * Calculate polygon perimeter
 * @param paths Array of LatLng coordinates
 * @returns Perimeter in meters (approximate)
 */
const calculatePolygonPerimeter = (paths: google.maps.LatLng[] | google.maps.LatLngLiteral[]): number => {
  if (paths.length < 2) return 0;

  const earthRadius = 6371000; // Earth's radius in meters
  let perimeter = 0;

  for (let i = 0; i < paths.length; i++) {
    const j = (i + 1) % paths.length;
    const point1 = paths[i] as any;
    const point2 = paths[j] as any;
    const lat1 = typeof point1.lat === 'function' ? point1.lat() : point1.lat;
    const lng1 = typeof point1.lng === 'function' ? point1.lng() : point1.lng;
    const lat2 = typeof point2.lat === 'function' ? point2.lat() : point2.lat;
    const lng2 = typeof point2.lng === 'function' ? point2.lng() : point2.lng;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    perimeter += earthRadius * c;
  }

  return perimeter;
};

/**
 * Format area for display
 */
const formatArea = (area: number): string => {
  if (area < 10000) {
    return `${Math.round(area)} م²`;
  } else if (area < 1000000) {
    return `${(area / 10000).toFixed(2)} هكتار`;
  } else {
    return `${(area / 1000000).toFixed(2)} كم²`;
  }
};

/**
 * Format distance for display
 */
const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${Math.round(distance)} م`;
  } else {
    return `${(distance / 1000).toFixed(2)} كم`;
  }
};

/**
 * Basic Polygon component for drawing areas on the map
 * 
 * @component
 * @example
 * ```tsx
 * <Polygon
 *   paths={[
 *     { lat: 24.7000, lng: 46.6500 },
 *     { lat: 24.7200, lng: 46.6500 },
 *     { lat: 24.7200, lng: 46.6800 },
 *     { lat: 24.7000, lng: 46.6800 }
 *   ]}
 *   category="zone"
 *   onClick={handlePolygonClick}
 *   editable={true}
 * />
 * ```
 */
const Polygon: FC<PolygonProps> = ({
  paths,
  options,
  onClick,
  editable = false,
  category = 'custom',
}) => {
  const polygonOptions = useMemo(() => {
    const categoryStyle = POLYGON_STYLES[category] || POLYGON_STYLES.custom;
    return {
      ...categoryStyle,
      ...options,
    };
  }, [category, options]);

  return (
    <GooglePolygon
      paths={paths}
      options={{
        ...polygonOptions,
        editable,
      }}
      onClick={onClick}
    />
  );
};

/**
 * AreaPolygon component with area calculation and information display
 * 
 * @component
 * @example
 * ```tsx
 * <AreaPolygon
 *   paths={zonePaths}
 *   category="zone"
 *   areaInfo={{
 *     name: 'منطقة الملز',
 *     type: 'residential',
 *     area: 2500000,
 *     perimeter: 6000
 *   }}
 *   showAreaInfo={true}
 *   editable={true}
 * />
 * ```
 */
const AreaPolygon: FC<AreaPolygonProps> = ({
  paths,
  category = 'area',
  areaInfo,
  showAreaInfo = false,
  onClick,
  editable = false,
  options,
}) => {
  // Calculate area and perimeter if not provided
  const calculatedArea = useMemo(() => {
    if (areaInfo?.area) return areaInfo.area;
    const pathArray = Array.isArray(paths[0]) ? paths[0] : paths;
    return calculatePolygonArea(pathArray as any);
  }, [paths, areaInfo]);

  const calculatedPerimeter = useMemo(() => {
    if (areaInfo?.perimeter) return areaInfo.perimeter;
    const pathArray = Array.isArray(paths[0]) ? paths[0] : paths;
    return calculatePolygonPerimeter(pathArray as any);
  }, [paths, areaInfo]);

  // Get polygon center for info display
  const polygonCenter = useMemo(() => {
    const pathArray = Array.isArray(paths[0]) ? paths[0] : paths;
    if (pathArray.length === 0) return { lat: 0, lng: 0 };

    const bounds = new google.maps.LatLngBounds();
    pathArray.forEach((point: any) => {
      const lat = typeof point.lat === 'function' ? point.lat() : point.lat;
      const lng = typeof point.lng === 'function' ? point.lng() : point.lng;
      bounds.extend(new google.maps.LatLng(lat, lng));
    });

    const center = bounds.getCenter();
    return {
      lat: center.lat(),
      lng: center.lng(),
    };
  }, [paths]);

  return (
    <>
      <Polygon
        paths={paths}
        category={category}
        options={options}
        onClick={onClick}
        editable={editable}
      />
      
      {/* Area information display */}
      {showAreaInfo && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '10px',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            fontSize: '14px',
            minWidth: '200px',
            zIndex: 1000,
          }}
        >
          {areaInfo?.name && (
            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>
              {areaInfo.name}
            </div>
          )}
          {areaInfo?.type && (
            <div style={{ marginBottom: '4px', color: '#666' }}>
              النوع: {areaInfo.type}
            </div>
          )}
          <div style={{ marginBottom: '4px' }}>
            المساحة: {formatArea(calculatedArea)}
          </div>
          <div>
            المحيط: {formatDistance(calculatedPerimeter)}
          </div>
        </div>
      )}
    </>
  );
};

export { AreaPolygon, calculatePolygonArea, calculatePolygonPerimeter, formatArea, formatDistance };
export default memo(Polygon);