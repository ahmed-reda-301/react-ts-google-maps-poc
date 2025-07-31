import { BaseControlProps } from './base';

// Google Map-specific types
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

// Google Map Controls Props
export interface GoogleMapControlsProps extends BaseControlProps {
  mapSettings: MapSettings;
  onMapSettingsChange: (settings: Partial<MapSettings>) => void;
  onResetSettings: () => void;
}