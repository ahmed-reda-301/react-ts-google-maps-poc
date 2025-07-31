/**
 * Map-specific constants
 * Constants specific to Google Maps functionality
 */

import { MAP_CONTAINERS, ZOOM_LEVELS, DEFAULT_MAP_OPTIONS, APP_STYLES } from './coreConstants';

// Re-export core map constants for backward compatibility
export {
  MAP_CONTAINERS as MAP_CONTAINER_STYLES,
  ZOOM_LEVELS,
  DEFAULT_MAP_OPTIONS,
} from './coreConstants';

// Legacy support - use core constants
export const MAP_CONTAINER_STYLE = MAP_CONTAINERS.FULL;

export const MAP_ZOOM_LEVELS = {
  world: ZOOM_LEVELS.WORLD,
  continent: ZOOM_LEVELS.CONTINENT,
  country: ZOOM_LEVELS.COUNTRY,
  region: ZOOM_LEVELS.REGION,
  city: ZOOM_LEVELS.CITY,
  district: ZOOM_LEVELS.DISTRICT,
  street: ZOOM_LEVELS.STREET,
  building: ZOOM_LEVELS.BUILDING,
  detail: ZOOM_LEVELS.DETAIL,
} as const;

/**
 * Common styling options for map elements
 */
export const COMMON_STYLES = {
  FILL_OPACITY: APP_STYLES.OPACITY,
  STROKE_OPACITY: APP_STYLES.OPACITY,
  STROKE_WEIGHT: APP_STYLES.STROKE_WEIGHT,
} as const;

/**
 * Default zoom levels for different contexts
 */
export const DEFAULT_ZOOM_LEVELS = {
  country: ZOOM_LEVELS.COUNTRY,
  city: ZOOM_LEVELS.CITY,
  district: ZOOM_LEVELS.DISTRICT,
  street: ZOOM_LEVELS.STREET,
} as const;