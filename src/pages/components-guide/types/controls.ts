// Types for control components

// Base Control Props
export interface BaseControlProps {
  selectedExample: string;
}

// Circle Control Types
export interface CoverageArea {
  id: string;
  name: string;
  center: google.maps.LatLngLiteral;
  radius: number;
  color: string;
  description: string;
  type: string;
  icon: string;
}

export interface CircleData {
  id: string;
  center: google.maps.LatLngLiteral;
  radius: number;
  color: string;
}

export interface EditableCircle {
  center: google.maps.LatLngLiteral;
  radius: number;
}

export interface CircleControlsProps extends BaseControlProps {
  basicRadius?: number;
  onBasicRadiusChange?: (radius: number) => void;
  selectedArea?: string | null;
  coverageAreas?: CoverageArea[];
  onAreaClick?: (areaId: string) => void;
  circles?: CircleData[];
  isCreating?: boolean;
  selectedRadius?: number;
  selectedColor?: string;
  onStartCreating?: () => void;
  onClearCircles?: () => void;
  onRadiusChange?: (radius: number) => void;
  onColorChange?: (color: string) => void;
  editableCircle?: EditableCircle | null;
  isEditable?: boolean;
  onToggleEditable?: () => void;
  calculateArea?: (radius: number) => string;
  calculateTotalArea?: () => string;
  componentColors?: Array<{ name: string; value: string }>;
  // Animation properties for animated circles
  animatedPath?: google.maps.LatLngLiteral[];
  fullAnimationPath?: google.maps.LatLngLiteral[];
  isAnimating?: boolean;
  onStartAnimation?: () => void;
  onResetAnimation?: () => void;
}

// Polygon Control Types
export interface Zone {
  id: string;
  name: string;
  paths: google.maps.LatLngLiteral[];
  fillColor: string;
  strokeColor: string;
  description: string;
}

export interface PolygonControlsProps extends BaseControlProps {
  selectedZone: string | null;
  zones: Zone[];
  onZoneClick: (zoneId: string) => void;
  polygonPath: google.maps.LatLngLiteral[];
  isBuilding: boolean;
  onStartBuilding: () => void;
  onFinishPolygon: () => void;
  onClearPolygon: () => void;
}

// Polyline Control Types
export interface PolylineControlsProps extends BaseControlProps {
  interactivePath: google.maps.LatLngLiteral[];
  onClearPath: () => void;
  animatedPath: google.maps.LatLngLiteral[];
  fullAnimationPath: google.maps.LatLngLiteral[];
  isAnimating: boolean;
  onStartAnimation: () => void;
  onResetAnimation: () => void;
}

// Marker Control Types
export interface InteractiveMarker {
  id: number;
  position: google.maps.LatLngLiteral;
  title: string;
}

export interface MarkerControlsProps extends BaseControlProps {
  selectedMarker: number | null;
  markerPosition: google.maps.LatLngLiteral;
  interactiveMarkers: InteractiveMarker[];
  onMarkerClick: (markerId: number) => void;
  onResetPosition: () => void;
}

// InfoWindow Control Types
export interface FormData {
  rating: number;
  comment: string;
}

export interface InfoWindowControlsProps extends BaseControlProps {
  formData: FormData;
}

// Rectangle Control Types
export interface RectangleData {
  id: string;
  bounds: google.maps.LatLngBoundsLiteral;
  color: string;
}

export interface RectangleControlsProps extends BaseControlProps {
  rectangles: RectangleData[];
  isCreating: boolean;
  selectedColor: string;
  onStartCreating: () => void;
  onClearRectangles: () => void;
  onColorChange: (color: string) => void;
  componentColors: Array<{ name: string; value: string }>;
}

// Google Map Control Types
export interface MapSettings {
  mapTypeId: google.maps.MapTypeId;
  zoom: number;
  center: google.maps.LatLngLiteral;
  disableDefaultUI: boolean;
  zoomControl: boolean;
  streetViewControl: boolean;
  fullscreenControl: boolean;
  mapTypeControl: boolean;
}

export interface GoogleMapControlsProps extends BaseControlProps {
  mapSettings: MapSettings;
  onMapSettingsChange: (settings: Partial<MapSettings>) => void;
  onResetSettings: () => void;
}