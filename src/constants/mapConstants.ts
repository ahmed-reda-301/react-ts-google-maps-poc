/**
 * Map-related constants
 * Centralized location for all map configuration and coordinate constants
 */

import { LatLng } from '../types/common/LatLng';

/**
 * Standard map container styles
 */
export const MAP_CONTAINER_STYLES = {
  default: {
    width: '100%',
    height: '500px',
  },
  small: {
    width: '100%',
    height: '400px',
  },
  large: {
    width: '100%',
    height: '600px',
  },
  fullHeight: {
    width: '100%',
    height: '100vh',
  },
} as const;

/**
 * Default map options for Google Maps
 */
export const DEFAULT_MAP_OPTIONS: google.maps.MapOptions = {
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  disableDefaultUI: false,
};

/**
 * Map zoom levels
 */
export const MAP_ZOOM_LEVELS = {
  world: 2,
  continent: 4,
  country: 6,
  region: 8,
  city: 10,
  district: 12,
  street: 14,
  building: 16,
  detail: 18,
  maximum: 20,
} as const;

/**
 * Default zoom level for different map types
 */
export const DEFAULT_ZOOM_LEVELS = {
  country: MAP_ZOOM_LEVELS.country,
  city: MAP_ZOOM_LEVELS.city,
  district: MAP_ZOOM_LEVELS.district,
  street: MAP_ZOOM_LEVELS.street,
} as const;