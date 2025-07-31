/**
 * Core Constants
 * Base constants used across the entire application
 */

import { LatLng } from '../types/common/LatLng';

/**
 * Application-wide styling constants
 */
export const APP_STYLES = {
  COLORS: {
    PRIMARY: '#1976d2',
    SECONDARY: '#4caf50',
    ACCENT: '#ff9800',
    ERROR: '#f44336',
    WARNING: '#ff9800',
    SUCCESS: '#4caf50',
    INFO: '#2196f3',
    NEUTRAL: '#6c757d',
  },
  OPACITY: {
    TRANSPARENT: 0,
    LOW: 0.2,
    MEDIUM: 0.35,
    HIGH: 0.6,
    VERY_HIGH: 0.8,
    OPAQUE: 1.0,
  },
  STROKE_WEIGHT: {
    THIN: 1,
    NORMAL: 2,
    THICK: 3,
    VERY_THICK: 4,
    EXTRA_THICK: 5,
  },
  BORDER_RADIUS: {
    NONE: '0',
    SMALL: '4px',
    MEDIUM: '8px',
    LARGE: '12px',
    EXTRA_LARGE: '16px',
    ROUND: '50%',
  },
  SPACING: {
    XS: '4px',
    SM: '8px',
    MD: '12px',
    LG: '16px',
    XL: '20px',
    XXL: '24px',
  },
} as const;

/**
 * Map container styles
 */
export const MAP_CONTAINERS = {
  FULL: {
    width: '100%',
    height: '100%'
  },
  DEFAULT: {
    width: '100%',
    height: '500px',
  },
  SMALL: {
    width: '100%',
    height: '400px',
  },
  LARGE: {
    width: '100%',
    height: '600px',
  },
  FULL_HEIGHT: {
    width: '100%',
    height: '100vh',
  },
} as const;

/**
 * Zoom levels for different map views
 */
export const ZOOM_LEVELS = {
  WORLD: 2,
  CONTINENT: 4,
  COUNTRY: 6,
  REGION: 8,
  CITY: 11,
  DISTRICT: 12,
  STREET: 15,
  BUILDING: 18,
  DETAIL: 20,
} as const;

/**
 * Default map center (Riyadh, Saudi Arabia)
 */
export const DEFAULT_CENTER: LatLng = { lat: 24.7136, lng: 46.6753 };

/**
 * Key locations in Riyadh
 */
export const RIYADH_LANDMARKS = {
  KINGDOM_CENTRE: { lat: 24.7136, lng: 46.6753 } as LatLng,
  AL_FAISALIAH_TOWER: { lat: 24.6877, lng: 46.6857 } as LatLng,
  MASMAK_FORTRESS: { lat: 24.6308, lng: 46.7073 } as LatLng,
  NATIONAL_MUSEUM: { lat: 24.6465, lng: 46.7169 } as LatLng,
  KING_FAHD_STADIUM: { lat: 24.6889, lng: 46.7219 } as LatLng,
  RIYADH_AIRPORT: { lat: 24.9576, lng: 46.6988 } as LatLng,
} as const;

/**
 * Animation and timing constants
 */
export const TIMING = {
  ANIMATION_FAST: 300,
  ANIMATION_NORMAL: 500,
  ANIMATION_SLOW: 800,
  DEBOUNCE_DELAY: 300,
  TOOLTIP_DELAY: 1000,
} as const;

/**
 * Default Google Maps options
 */
export const DEFAULT_MAP_OPTIONS: google.maps.MapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  disableDefaultUI: false,
} as const;