/**
 * Guide-specific constants
 * Specialized constants for guide pages and components
 */

import { LatLng } from '../types/common/LatLng';
import { GuideMarker, GuideZone, GuideCoverageArea } from '../types/guide/common';
import { APP_STYLES, MAP_CONTAINERS, RIYADH_LANDMARKS, TIMING, ZOOM_LEVELS } from './coreConstants';

/**
 * Guide page configurations
 */
export const GUIDE_CONFIG = {
  DEFAULT_EXAMPLE: 'basic',
  MAP_CONTAINER_STYLE: MAP_CONTAINERS.FULL,
  MAP_CONTAINERS: MAP_CONTAINERS,
  RESET_DELAY: TIMING.DEBOUNCE_DELAY,
  ANIMATION_DURATION: TIMING.ANIMATION_SLOW,
  ANIMATION_STEP_DELAY: TIMING.ANIMATION_NORMAL,
} as const;

/**
 * Guide-specific zoom levels
 */
export const GUIDE_ZOOM_LEVELS = {
  OVERVIEW: ZOOM_LEVELS.REGION,
  CITY: ZOOM_LEVELS.CITY,
  DISTRICT: ZOOM_LEVELS.DISTRICT,
  STREET: ZOOM_LEVELS.STREET,
} as const;

/**
 * Interactive markers for guides
 */
export const GUIDE_MARKERS = {
  RIYADH_LANDMARKS: [
    { 
      id: 1, 
      position: { ...RIYADH_LANDMARKS.KINGDOM_CENTRE }, 
      title: "Kingdom Centre",
      description: "Iconic skyscraper in Riyadh"
    },
    { 
      id: 2, 
      position: { ...RIYADH_LANDMARKS.AL_FAISALIAH_TOWER }, 
      title: "Al Faisaliah Tower",
      description: "Business district landmark"
    },
    { 
      id: 3, 
      position: { ...RIYADH_LANDMARKS.MASMAK_FORTRESS }, 
      title: "Masmak Fortress",
      description: "Historical fortress"
    },
    { 
      id: 4, 
      position: { ...RIYADH_LANDMARKS.NATIONAL_MUSEUM }, 
      title: "National Museum",
      description: "Cultural heritage center"
    }
  ] as GuideMarker[],
};

/**
 * Animation paths for guide examples
 */
export const GUIDE_ANIMATION_PATHS = {
  RIYADH_TOUR: [
    { ...RIYADH_LANDMARKS.KINGDOM_CENTRE },
    { lat: 24.7100, lng: 46.6800 },
    { lat: 24.7050, lng: 46.6850 },
    { lat: 24.7000, lng: 46.6900 },
    { lat: 24.6950, lng: 46.6920 },
    { lat: 24.6900, lng: 46.6940 },
    { ...RIYADH_LANDMARKS.AL_FAISALIAH_TOWER },
  ] as LatLng[],
  HISTORICAL_ROUTE: [
    { ...RIYADH_LANDMARKS.MASMAK_FORTRESS },
    { lat: 24.6350, lng: 46.7100 },
    { lat: 24.6400, lng: 46.7150 },
    { ...RIYADH_LANDMARKS.NATIONAL_MUSEUM },
  ] as LatLng[],
};

/**
 * Zone configurations for guide examples
 */
export const GUIDE_ZONES = {
  BUSINESS_DISTRICT: {
    id: 'business',
    name: 'Business District',
    paths: [
      { lat: 24.7200, lng: 46.6700 },
      { lat: 24.7300, lng: 46.6700 },
      { lat: 24.7300, lng: 46.6900 },
      { lat: 24.7200, lng: 46.6900 }
    ],
    bounds: {
      north: 24.7400,
      south: 24.7100,
      east: 46.6900,
      west: 46.6600
    },
    fillColor: APP_STYLES.COLORS.PRIMARY,
    strokeColor: '#0056b3',
  } as GuideZone,
  RESIDENTIAL_AREA: {
    id: 'residential',
    name: 'Residential Area',
    paths: [
      { lat: 24.6800, lng: 46.6500 },
      { lat: 24.7000, lng: 46.6500 },
      { lat: 24.7000, lng: 46.6700 },
      { lat: 24.6800, lng: 46.6700 }
    ],
    bounds: {
      north: 24.7000,
      south: 24.6700,
      east: 46.6800,
      west: 46.6500
    },
    fillColor: APP_STYLES.COLORS.SUCCESS,
    strokeColor: '#1e7e34',
  } as GuideZone,
  HISTORICAL_DISTRICT: {
    id: 'historical',
    name: 'Historical District',
    paths: [
      { lat: 24.6200, lng: 46.7000 },
      { lat: 24.6500, lng: 46.7000 },
      { lat: 24.6500, lng: 46.7300 },
      { lat: 24.6200, lng: 46.7300 }
    ],
    bounds: {
      north: 24.6600,
      south: 24.6300,
      east: 46.7200,
      west: 46.6900
    },
    fillColor: APP_STYLES.COLORS.WARNING,
    strokeColor: '#e0a800',
  } as GuideZone,
  COMMERCIAL_ZONE: {
    id: 'commercial',
    name: 'Commercial Zone',
    paths: [
      { lat: 24.6400, lng: 46.6800 },
      { lat: 24.6600, lng: 46.6800 },
      { lat: 24.6600, lng: 46.7000 },
      { lat: 24.6400, lng: 46.7000 }
    ],
    bounds: {
      north: 24.6600,
      south: 24.6300,
      east: 46.7200,
      west: 46.6900
    },
    fillColor: '#9c27b0',
    strokeColor: '#7b1fa2',
  } as GuideZone,
};

/**
 * Coverage areas for guide examples
 */
export const GUIDE_COVERAGE_AREAS = {
  WIFI_HOTSPOT: {
    id: 'wifi-1',
    name: 'WiFi Hotspot',
    center: { ...RIYADH_LANDMARKS.KINGDOM_CENTRE },
    radius: 500,
    color: APP_STYLES.COLORS.INFO,
    type: 'wifi',
    description: 'High-speed internet access',
    icon: '📶'
  } as GuideCoverageArea,
  DELIVERY_ZONE: {
    id: 'delivery-1',
    name: 'Delivery Zone',
    center: { ...RIYADH_LANDMARKS.AL_FAISALIAH_TOWER },
    radius: 3000,
    color: APP_STYLES.COLORS.SUCCESS,
    type: 'delivery',
    description: 'Fast delivery service area',
    icon: '🚚'
  } as GuideCoverageArea,
  EMERGENCY_ZONE: {
    id: 'emergency-1',
    name: 'Emergency Zone',
    center: { ...RIYADH_LANDMARKS.MASMAK_FORTRESS },
    radius: 1500,
    color: APP_STYLES.COLORS.ERROR,
    type: 'emergency',
    description: 'Emergency response coverage',
    icon: '🚨'
  } as GuideCoverageArea,
  SECURITY_ZONE: {
    id: 'security-1',
    name: 'Security Zone',
    center: { ...RIYADH_LANDMARKS.NATIONAL_MUSEUM },
    radius: 800,
    color: APP_STYLES.COLORS.WARNING,
    type: 'security',
    description: 'Enhanced security monitoring',
    icon: '🔒'
  } as GuideCoverageArea,
};

/**
 * Styling examples templates
 */
export const GUIDE_STYLING_EXAMPLES = {
  BASIC: {
    title: 'Basic Styling',
    color: APP_STYLES.COLORS.PRIMARY,
    description: 'Simple styling with basic properties.',
  },
  ADVANCED: {
    title: 'Advanced Styling',
    color: APP_STYLES.COLORS.SECONDARY,
    description: 'Advanced styling with interactive features.',
  },
  INTERACTIVE: {
    title: 'Interactive Styling',
    color: APP_STYLES.COLORS.ACCENT,
    description: 'Interactive styling with user feedback.',
  },
  CUSTOM: {
    title: 'Custom Styling',
    color: APP_STYLES.COLORS.INFO,
    description: 'Custom styling with unique design.',
  },
} as const;

/**
 * Control button styles
 */
export const GUIDE_CONTROL_STYLES = {
  PRIMARY_BUTTON: {
    padding: APP_STYLES.SPACING.MD + ' ' + APP_STYLES.SPACING.XL,
    backgroundColor: APP_STYLES.COLORS.PRIMARY,
    color: 'white',
    border: 'none',
    borderRadius: APP_STYLES.BORDER_RADIUS.MEDIUM,
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  SECONDARY_BUTTON: {
    padding: APP_STYLES.SPACING.MD + ' ' + APP_STYLES.SPACING.XL,
    backgroundColor: APP_STYLES.COLORS.NEUTRAL,
    color: 'white',
    border: 'none',
    borderRadius: APP_STYLES.BORDER_RADIUS.MEDIUM,
    cursor: 'pointer',
    fontSize: '14px',
  },
  DISABLED_BUTTON: {
    padding: APP_STYLES.SPACING.MD + ' ' + APP_STYLES.SPACING.XL,
    backgroundColor: '#e9ecef',
    color: APP_STYLES.COLORS.NEUTRAL,
    border: 'none',
    borderRadius: APP_STYLES.BORDER_RADIUS.MEDIUM,
    cursor: 'not-allowed',
    fontSize: '14px',
  },
} as const;

// Legacy aliases for backward compatibility
export const GUIDE_STYLES = {
  COLORS: APP_STYLES.COLORS,
  OPACITY: APP_STYLES.OPACITY,
  STROKE_WEIGHT: APP_STYLES.STROKE_WEIGHT,
  BORDER_RADIUS: APP_STYLES.BORDER_RADIUS,
} as const;

export const GUIDE_POSITIONS = {
  DEFAULT_CENTER: RIYADH_LANDMARKS.KINGDOM_CENTRE,
  ...RIYADH_LANDMARKS,
} as const;