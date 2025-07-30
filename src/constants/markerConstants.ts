/**
 * Marker-related constants
 * Centralized location for marker icons, types, and configurations
 */

/**
 * Google Maps marker icon URLs
 */
export const MARKER_ICONS = {
  // Basic markers
  default: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  blue: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  green: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  yellow: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  purple: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
  orange: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
  pink: 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png',

  // Category-specific markers
  restaurant: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
  hotel: 'https://maps.google.com/mapfiles/ms/icons/lodging.png',
  attraction: 'https://maps.google.com/mapfiles/ms/icons/camera.png',
  hospital: 'https://maps.google.com/mapfiles/ms/icons/hospitals.png',
  school: 'https://maps.google.com/mapfiles/ms/icons/schools.png',
  shopping: 'https://maps.google.com/mapfiles/ms/icons/shopping.png',
  gas: 'https://maps.google.com/mapfiles/ms/icons/gas.png',
  parking: 'https://maps.google.com/mapfiles/ms/icons/parking.png',
  bank: 'https://maps.google.com/mapfiles/ms/icons/dollar.png',
  atm: 'https://maps.google.com/mapfiles/ms/icons/atm.png',

  // Transportation
  airport: 'https://maps.google.com/mapfiles/ms/icons/airports.png',
  train: 'https://maps.google.com/mapfiles/ms/icons/train.png',
  bus: 'https://maps.google.com/mapfiles/ms/icons/bus.png',
  taxi: 'https://maps.google.com/mapfiles/ms/icons/taxi.png',
  truck: 'https://maps.google.com/mapfiles/ms/icons/truck.png',

  // Logistics and borders
  seaport: 'https://maps.google.com/mapfiles/ms/icons/marina.png',
  border: 'https://maps.google.com/mapfiles/ms/icons/flag.png',
  checkpoint: 'https://maps.google.com/mapfiles/ms/icons/caution.png',
  warehouse: 'https://maps.google.com/mapfiles/ms/icons/warehouse.png',

  // Status indicators
  start: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  end: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  waypoint: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  current: 'https://maps.google.com/mapfiles/ms/icons/man.png',
} as const;

/**
 * Marker categories and their corresponding icons
 */
export const MARKER_CATEGORIES = {
  restaurant: {
    icon: MARKER_ICONS.restaurant,
    label: 'Restaurant',
    color: '#FF5722',
  },
  hotel: {
    icon: MARKER_ICONS.hotel,
    label: 'Hotel',
    color: '#2196F3',
  },
  attraction: {
    icon: MARKER_ICONS.attraction,
    label: 'Tourist Attraction',
    color: '#9C27B0',
  },
  hospital: {
    icon: MARKER_ICONS.hospital,
    label: 'Hospital',
    color: '#F44336',
  },
  school: {
    icon: MARKER_ICONS.school,
    label: 'School',
    color: '#4CAF50',
  },
  shopping: {
    icon: MARKER_ICONS.shopping,
    label: 'Shopping',
    color: '#FF9800',
  },
  gas: {
    icon: MARKER_ICONS.gas,
    label: 'Gas Station',
    color: '#795548',
  },
  parking: {
    icon: MARKER_ICONS.parking,
    label: 'Parking',
    color: '#607D8B',
  },
  bank: {
    icon: MARKER_ICONS.bank,
    label: 'Bank',
    color: '#4CAF50',
  },
  airport: {
    icon: MARKER_ICONS.airport,
    label: 'Airport',
    color: '#2196F3',
  },
  seaport: {
    icon: MARKER_ICONS.seaport,
    label: 'Seaport',
    color: '#00BCD4',
  },
  border: {
    icon: MARKER_ICONS.border,
    label: 'Border Crossing',
    color: '#FF9800',
  },
  checkpoint: {
    icon: MARKER_ICONS.checkpoint,
    label: 'Checkpoint',
    color: '#9C27B0',
  },
} as const;

/**
 * Default marker sizes
 */
export const MARKER_SIZES = {
  small: { width: 24, height: 24 },
  medium: { width: 32, height: 32 },
  large: { width: 40, height: 40 },
  extraLarge: { width: 48, height: 48 },
} as const;

/**
 * Helper function to get marker icon by category
 */
export const getMarkerIcon = (category: keyof typeof MARKER_CATEGORIES): string => {
  return MARKER_CATEGORIES[category]?.icon || MARKER_ICONS.default;
};

/**
 * Helper function to get marker color by category
 */
export const getMarkerColor = (category: keyof typeof MARKER_CATEGORIES): string => {
  return MARKER_CATEGORIES[category]?.color || '#F44336';
};

/**
 * Helper function to get marker label by category
 */
export const getMarkerLabel = (category: keyof typeof MARKER_CATEGORIES): string => {
  return MARKER_CATEGORIES[category]?.label || 'Unknown';
};

/**
 * Default marker data for demonstrations
 */
export const DEFAULT_MARKERS = {
  cairo: [
    {
      id: '1',
      position: { lat: 30.0444, lng: 31.2357 },
      type: 'restaurant',
      title: 'Restaurant in Cairo',
    },
    {
      id: '2',
      position: { lat: 30.0626, lng: 31.2497 },
      type: 'hotel',
      title: 'Hotel in Cairo',
    },
    {
      id: '3',
      position: { lat: 30.0131, lng: 31.2089 },
      type: 'attraction',
      title: 'Tourist Attraction',
    },
  ],
  riyadh: [
    {
      id: '1',
      position: { lat: 24.7136, lng: 46.6753 },
      type: 'restaurant',
      title: 'Restaurant in Riyadh',
    },
    {
      id: '2',
      position: { lat: 24.7236, lng: 46.6853 },
      type: 'hotel',
      title: 'Hotel in Riyadh',
    },
    {
      id: '3',
      position: { lat: 24.7036, lng: 46.6653 },
      type: 'shopping',
      title: 'Shopping Mall in Riyadh',
    },
  ],
} as const;