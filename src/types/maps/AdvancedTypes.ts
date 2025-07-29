import { LatLng } from "../common/LatLng";
import { MarkerProps } from "./MapTypes";

/**
 * Custom marker properties with advanced features
 */
export interface CustomMarkerProps extends MarkerProps {
  /** Custom icon URL or Google Maps icon */
  customIcon?: string | google.maps.Icon | google.maps.Symbol;
  /** Marker animation type */
  animation?: google.maps.Animation;
  /** Marker size scaling */
  scale?: number;
  /** Marker color for default icons */
  color?: string;
  /** Marker category for styling */
  category?: 'restaurant' | 'hotel' | 'attraction' | 'hospital' | 'school' | 'custom';
}

/**
 * Info window action button
 */
export interface InfoWindowAction {
  label: string;
  onClick: () => void;
  type?: 'primary' | 'secondary' | 'danger';
}

/**
 * Info window properties
 */
export interface InfoWindowProps {
  /** Info window position */
  position: LatLng;
  /** Info window content */
  content: React.ReactNode;
  /** Whether info window is visible */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
  /** Info window options */
  options?: google.maps.InfoWindowOptions;
  /** Custom template type */
  template?: 'default' | 'detailed' | 'minimal' | 'custom';
}

/**
 * Marker with integrated info window
 */
export interface MarkerWithInfoProps extends CustomMarkerProps {
  /** Info window configuration */
  infoWindow?: {
    title: string;
    description: string;
    image?: string;
    actions?: InfoWindowAction[];
  };
}

/**
 * Polyline properties
 */
export interface PolylineProps {
  /** Array of coordinates defining the line */
  path: LatLng[];
  /** Line styling options */
  options?: google.maps.PolylineOptions;
  /** Click handler */
  onClick?: (e: google.maps.MapMouseEvent) => void;
  /** Whether line is editable */
  editable?: boolean;
  /** Animation settings */
  animation?: {
    enabled: boolean;
    speed?: number;
    direction?: 'forward' | 'backward';
  };
}

/**
 * Route-specific polyline properties
 */
export interface RoutePolylineProps extends PolylineProps {
  /** Route type for styling */
  routeType?: 'driving' | 'walking' | 'cycling' | 'transit';
  /** Show distance markers */
  showDistance?: boolean;
  /** Route metadata */
  metadata?: {
    distance: string;
    duration: string;
    traffic?: 'light' | 'moderate' | 'heavy';
  };
}

/**
 * Polygon properties
 */
export interface PolygonProps {
  /** Array of coordinates defining the polygon */
  paths: LatLng[] | LatLng[][];
  /** Polygon styling options */
  options?: google.maps.PolygonOptions;
  /** Click handler */
  onClick?: (e: google.maps.MapMouseEvent) => void;
  /** Whether polygon is editable */
  editable?: boolean;
  /** Polygon category for styling */
  category?: 'zone' | 'boundary' | 'area' | 'restriction' | 'custom';
}

/**
 * Area-specific polygon properties
 */
export interface AreaPolygonProps extends PolygonProps {
  /** Area information */
  areaInfo?: {
    name: string;
    type: string;
    area: number; // in square meters
    perimeter: number; // in meters
  };
  /** Show area calculation */
  showAreaInfo?: boolean;
}

/**
 * Geolocation properties
 */
export interface GeolocationProps {
  /** Enable location tracking */
  enableTracking?: boolean;
  /** Location options */
  options?: PositionOptions;
  /** Success callback */
  onLocationFound?: (position: GeolocationPosition) => void;
  /** Error callback */
  onLocationError?: (error: GeolocationPositionError) => void;
  /** Show current location marker */
  showCurrentLocation?: boolean;
  /** Current location marker options */
  currentLocationMarker?: CustomMarkerProps;
}

/**
 * Geofence properties
 */
export interface GeofenceProps {
  /** Geofence center */
  center: LatLng;
  /** Geofence radius in meters */
  radius: number;
  /** Geofence name */
  name: string;
  /** Entry callback */
  onEnter?: () => void;
  /** Exit callback */
  onExit?: () => void;
  /** Geofence styling */
  style?: google.maps.CircleOptions;
}

/**
 * Directions properties
 */
export interface DirectionsProps {
  /** Starting point */
  origin: LatLng | string | google.maps.LatLng | google.maps.LatLngLiteral;
  /** Destination point */
  destination: LatLng | string | google.maps.LatLng | google.maps.LatLngLiteral;
  /** Waypoints along the route */
  waypoints?: google.maps.DirectionsWaypoint[];
  /** Travel mode */
  travelMode?: google.maps.TravelMode;
  /** Directions options */
  options?: Partial<google.maps.DirectionsRequest>;
  /** Route result callback */
  onRouteCalculated?: (result: google.maps.DirectionsResult) => void;
  /** Error callback */
  onError?: (error: google.maps.DirectionsStatus) => void;
}

/**
 * Route step information
 */
export interface RouteStep {
  instruction: string;
  distance: string;
  duration: string;
  maneuver?: string;
}

/**
 * Directions calculation result
 */
export interface DirectionsResult {
  routes: google.maps.DirectionsRoute[];
  selectedRouteIndex: number;
  totalDistance: string;
  totalDuration: string;
  steps: RouteStep[];
}

/**
 * Marker clustering properties
 */
export interface MarkerClusterProps {
  /** Enable marker clustering */
  enableClustering?: boolean;
  /** Cluster options */
  clusterOptions?: {
    gridSize?: number;
    maxZoom?: number;
    styles?: Array<{
      url: string;
      height: number;
      width: number;
      textColor?: string;
      textSize?: number;
    }>;
  };
}