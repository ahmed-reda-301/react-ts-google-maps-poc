import { BaseControlProps } from './base';

// Polygon-specific types
export interface Zone {
  id: string;
  name: string;
  paths: google.maps.LatLngLiteral[];
  fillColor: string;
  strokeColor: string;
  description: string;
}

// Polygon Controls Props
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