import { LatLng } from "../common/LatLng";

/**
 * Properties for the main map component
 */
export interface MapProps {
  /** Center coordinates of the map */
  center: LatLng;
  /** Zoom level (1-20) */
  zoom: number;
  /** Optional click handler for map clicks */
  onClick?: (e: google.maps.MapMouseEvent) => void;
  /** Optional style overrides */
  style?: React.CSSProperties;
}

/**
 * Properties for map markers
 */
export interface MarkerProps {
  /** Marker position on the map */
  position: LatLng;
  /** Optional marker title */
  title?: string;
  /** Optional click handler */
  onClick?: (e: google.maps.MapMouseEvent) => void;
  /** Optional marker icon */
  icon?: string;
  /** Optional marker label */
  label?: string;
  /** Unique identifier for the marker */
  id: string;
}