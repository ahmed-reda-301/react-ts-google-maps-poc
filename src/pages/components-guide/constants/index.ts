// Re-export all constants from different modules
export * from './ui';
export * from './common';

// Map configuration constants
export const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%'
};

// Default map center (Riyadh, Saudi Arabia)
export const DEFAULT_CENTER = { 
  lat: 24.7136, 
  lng: 46.6753 
};

// Common zoom levels
export const ZOOM_LEVELS = {
  CITY: 8,
  DISTRICT: 11,
  STREET: 12,
  BUILDING: 15
};

// Common colors for components
export const COMPONENT_COLORS = [
  { name: 'Blue', value: '#007bff' },
  { name: 'Green', value: '#28a745' },
  { name: 'Yellow', value: '#ffc107' },
  { name: 'Red', value: '#dc3545' },
  { name: 'Purple', value: '#6f42c1' },
  { name: 'Teal', value: '#20c997' },
  { name: 'Orange', value: '#fd7e14' },
  { name: 'Pink', value: '#e83e8c' }
];

// Common marker icons (functions to avoid google undefined error)
export const getMarkerIcons = () => ({
  DEFAULT: {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: '#007bff',
    fillOpacity: 1,
    strokeColor: '#FFFFFF',
    strokeWeight: 2
  },
  SELECTED: {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 12,
    fillColor: '#FFD700',
    fillOpacity: 1,
    strokeColor: '#FFFFFF',
    strokeWeight: 2
  },
  WIFI: {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: '#007bff',
    fillOpacity: 1,
    strokeColor: '#FFFFFF',
    strokeWeight: 2
  },
  DELIVERY: {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: '#28a745',
    fillOpacity: 1,
    strokeColor: '#FFFFFF',
    strokeWeight: 2
  },
  SERVICE: {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: '#ffc107',
    fillOpacity: 1,
    strokeColor: '#FFFFFF',
    strokeWeight: 2
  },
  EMERGENCY: {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: '#dc3545',
    fillOpacity: 1,
    strokeColor: '#FFFFFF',
    strokeWeight: 2
  }
});

// Common locations in Riyadh
export const RIYADH_LOCATIONS = {
  KINGDOM_CENTRE: { lat: 24.7136, lng: 46.6753 },
  AL_FAISALIAH_TOWER: { lat: 24.6877, lng: 46.6857 },
  MASMAK_FORTRESS: { lat: 24.6308, lng: 46.7073 },
  NATIONAL_MUSEUM: { lat: 24.6465, lng: 46.7169 },
  KING_FAHD_STADIUM: { lat: 24.6889, lng: 46.7219 },
  RIYADH_AIRPORT: { lat: 24.9576, lng: 46.6988 }
};

// Animation constants (functions to avoid google undefined error)
export const getAnimations = () => ({
  DROP: google.maps.Animation.DROP,
  BOUNCE: google.maps.Animation.BOUNCE
});

// Common styling options
export const COMMON_STYLES = {
  FILL_OPACITY: {
    LOW: 0.2,
    MEDIUM: 0.35,
    HIGH: 0.6,
    VERY_HIGH: 0.8
  },
  STROKE_OPACITY: {
    LOW: 0.5,
    MEDIUM: 0.8,
    HIGH: 1.0
  },
  STROKE_WEIGHT: {
    THIN: 1,
    NORMAL: 2,
    THICK: 3,
    VERY_THICK: 4
  }
};