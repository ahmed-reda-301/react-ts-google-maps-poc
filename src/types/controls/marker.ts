import { BaseControlProps } from './base';

// Marker-specific types
export interface InteractiveMarker {
  id: number;
  position: google.maps.LatLngLiteral;
  title: string;
}

// Marker Controls Props
export interface MarkerControlsProps extends BaseControlProps {
  selectedMarker: number | null;
  markerPosition: google.maps.LatLngLiteral;
  interactiveMarkers: InteractiveMarker[];
  onMarkerClick: (markerId: number) => void;
  onResetPosition: () => void;
}