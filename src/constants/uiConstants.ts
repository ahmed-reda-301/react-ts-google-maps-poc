/**
 * UI-related constants
 * Centralized location for UI text, labels, and configuration
 */

/**
 * Page titles and descriptions
 */
export const PAGE_CONTENT = {
  basicMap: {
    title: 'Basic Google Maps Integration',
    subtitle: 'Learn the fundamentals of integrating Google Maps with React and TypeScript',
    description: 'This page demonstrates basic Google Maps integration with React and TypeScript.',
  },
  customMarkers: {
    title: 'Custom Markers Demo',
    subtitle: 'This page demonstrates how to implement custom markers with different styles and types.',
    description: 'Learn how to create and manage custom markers with different icons and categories.',
  },
  infoWindows: {
    title: 'Info Windows Demo',
    subtitle: 'Interactive information windows with rich content and custom styling.',
    description: 'Explore how to create rich info windows with images, ratings, and interactive content.',
  },
  polylines: {
    title: 'Polylines & Routes Demo',
    subtitle: 'Visualize routes and paths using polylines with interactive features.',
    description: 'Learn how to draw routes, calculate distances, and create interactive polylines.',
  },
  polygons: {
    title: 'Polygons & Areas Demo',
    subtitle: 'Define and display areas using polygons with area calculations.',
    description: 'Explore polygon creation, area calculation, and zone management.',
  },
  geolocation: {
    title: 'Geolocation Demo',
    subtitle: 'User location tracking and geolocation services integration.',
    description: 'Learn how to implement geolocation features and track user movement.',
  },
  directions: {
    title: 'Directions Service Demo',
    subtitle: 'Route planning and navigation using Google Directions API.',
    description: 'Implement route calculation, turn-by-turn directions, and navigation features.',
  },
  entryPoints: {
    title: 'Entry Points & Checkpoints',
    subtitle: 'View airports, seaports, land borders and checkpoints in Saudi Arabia.',
    description: 'Monitor and manage entry points, checkpoints, and vehicle tracking.',
  },
  tripTracking: {
    title: 'Trip Tracking System',
    subtitle: 'Real-time trip monitoring and compliance tracking.',
    description: 'Track trips in real-time, monitor compliance, and manage logistics operations.',
  },
} as const;

/**
 * Common UI labels and text
 */
export const UI_LABELS = {
  // Form labels
  latitude: 'Latitude',
  longitude: 'Longitude',
  zoomLevel: 'Zoom Level',
  origin: 'Origin',
  destination: 'Destination',
  travelMode: 'Travel Mode',
  markerType: 'Marker Type',

  // Button labels
  reset: 'Reset to Default',
  clear: 'Clear All',
  save: 'Save',
  cancel: 'Cancel',
  submit: 'Submit',
  getDirections: 'Get Directions',
  getCurrentLocation: 'Get Current Location',
  startTracking: 'Start Tracking',
  stopTracking: 'Stop Tracking',
  swap: 'Swap',
  retry: 'Retry',

  // Status labels
  loading: 'Loading...',
  error: 'Error',
  success: 'Success',
  warning: 'Warning',
  info: 'Information',
  active: 'Active',
  inactive: 'Inactive',
  online: 'Online',
  offline: 'Offline',

  // Map controls
  zoomIn: 'Zoom In',
  zoomOut: 'Zoom Out',
  fullscreen: 'Fullscreen',
  streetView: 'Street View',
  satellite: 'Satellite',
  terrain: 'Terrain',
  roadmap: 'Roadmap',
  hybrid: 'Hybrid',

  // Measurement units
  kilometers: 'km',
  meters: 'm',
  miles: 'mi',
  feet: 'ft',
  hours: 'hours',
  minutes: 'mins',
  seconds: 'secs',
  kmh: 'km/h',
  mph: 'mph',
} as const;

/**
 * Placeholder text for inputs
 */
export const PLACEHOLDERS = {
  latitude: 'Enter latitude',
  longitude: 'Enter longitude',
  search: 'Search locations',
  origin: 'Enter starting location',
  destination: 'Enter destination',
  address: 'Enter address',
  city: 'Enter city name',
  country: 'Enter country',
  zipCode: 'Enter ZIP code',
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  // API errors
  apiKeyMissing: 'Google Maps API key is required',
  apiKeyInvalid: 'Invalid Google Maps API key',
  apiQuotaExceeded: 'API quota exceeded',
  networkError: 'Network error occurred',
  
  // Location errors
  locationNotFound: 'Location not found',
  geolocationDenied: 'Geolocation permission denied',
  geolocationUnavailable: 'Geolocation unavailable',
  geolocationTimeout: 'Geolocation timeout',
  
  // Input validation errors
  invalidCoordinates: 'Invalid coordinates',
  invalidLatitude: 'Latitude must be between -90 and 90',
  invalidLongitude: 'Longitude must be between -180 and 180',
  invalidZoom: 'Zoom level must be between 1 and 20',
  requiredField: 'This field is required',
  
  // Route errors
  routeNotFound: 'Route not found',
  directionsError: 'Failed to get directions',
  noRouteAvailable: 'No route available',
  
  // General errors
  loadingFailed: 'Failed to load data',
  saveFailed: 'Failed to save data',
  unknownError: 'An unknown error occurred',
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  locationFound: 'Location found successfully',
  routeCalculated: 'Route calculated successfully',
  dataSaved: 'Data saved successfully',
  dataLoaded: 'Data loaded successfully',
  locationUpdated: 'Location updated',
  settingsSaved: 'Settings saved',
} as const;

/**
 * Info messages
 */
export const INFO_MESSAGES = {
  clickToAdd: 'Click anywhere on the map to add a marker',
  selectType: 'Select marker type before clicking',
  gettingLocation: 'Getting your current location...',
  calculatingRoute: 'Calculating route...',
  trackingStarted: 'Location tracking started',
  trackingStopped: 'Location tracking stopped',
} as const;

/**
 * Travel modes for directions
 */
export const TRAVEL_MODES = {
  driving: {
    value: 'DRIVING',
    label: 'Driving',
    icon: '🚗',
  },
  walking: {
    value: 'WALKING',
    label: 'Walking',
    icon: '🚶',
  },
  bicycling: {
    value: 'BICYCLING',
    label: 'Bicycling',
    icon: '🚴',
  },
  transit: {
    value: 'TRANSIT',
    label: 'Transit',
    icon: '🚌',
  },
} as const;

/**
 * Map type options
 */
export const MAP_TYPES = {
  roadmap: {
    value: 'roadmap',
    label: 'Roadmap',
    description: 'Default road map view',
  },
  satellite: {
    value: 'satellite',
    label: 'Satellite',
    description: 'Satellite imagery',
  },
  hybrid: {
    value: 'hybrid',
    label: 'Hybrid',
    description: 'Satellite with road overlay',
  },
  terrain: {
    value: 'terrain',
    label: 'Terrain',
    description: 'Topographical features',
  },
} as const;

/**
 * Feature lists for different pages
 */
export const FEATURE_LISTS = {
  basicMap: [
    'How to set up Google Maps with React',
    'Basic map configuration and options',
    'Adding markers to the map',
    'Controlling map center and zoom level',
    'TypeScript integration best practices',
  ],
  customMarkers: [
    'Custom Icons: Different marker types with custom icons',
    'Interactive Placement: Click to add markers dynamically',
    'Marker Management: Add, clear, and reset markers',
    'Type Selection: Choose marker type before placement',
    'Hover Effects: Titles appear on hover',
    'TypeScript Integration: Fully typed marker interfaces',
  ],
  directions: [
    'Route Calculation: Get directions between two points',
    'Multiple Travel Modes: Driving, walking, bicycling, transit',
    'Route Planning Interface: Input fields for origin and destination',
    'Quick Route Selection: Predefined popular routes',
    'Location Swapping: Easy origin/destination switching',
    'Loading States: User feedback during route calculation',
    'Error Handling: Graceful error management',
    'Map Visualization: Display origin and destination markers',
  ],
} as const;

/**
 * Component colors for interactive elements
 */
export const COMPONENT_COLORS = [
  { name: 'Blue', value: '#007bff' },
  { name: 'Green', value: '#28a745' },
  { name: 'Yellow', value: '#ffc107' },
  { name: 'Red', value: '#dc3545' },
  { name: 'Purple', value: '#6f42c1' },
  { name: 'Teal', value: '#20c997' },
  { name: 'Orange', value: '#fd7e14' },
  { name: 'Pink', value: '#e83e8c' }
] as const;

/**
 * UI color scheme
 */
export const UI_COLORS = {
  PRIMARY: '#1976d2',
  SECONDARY: '#6c757d',
  SUCCESS: '#28a745',
  WARNING: '#ffc107',
  DANGER: '#dc3545',
  INFO: '#17a2b8',
  LIGHT: '#f8f9fa',
  DARK: '#343a40',
  WHITE: '#ffffff',
  BACKGROUND: '#f5f5f5',
  
  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    dark: '#343a40',
    light: '#e9ecef'
  },
  
  // Text colors
  text: {
    primary: '#212529',
    secondary: '#6c757d',
    muted: '#868e96',
    white: '#ffffff'
  },
  
  // Border colors
  border: {
    light: '#dee2e6',
    medium: '#ced4da',
    dark: '#6c757d'
  }
} as const;

/**
 * Map element colors
 */
export const MAP_COLORS = {
  marker: {
    default: '#007bff',
    selected: '#FFD700',
    wifi: '#007bff',
    delivery: '#28a745',
    service: '#ffc107',
    emergency: '#dc3545'
  },
  
  polygon: {
    fill: {
      default: '#007bff',
      selected: '#FFD700',
      zone1: '#007bff',
      zone2: '#28a745',
      zone3: '#ffc107',
      zone4: '#dc3545'
    },
    stroke: {
      default: '#0056b3',
      selected: '#FFA500',
      zone1: '#0056b3',
      zone2: '#1e7e34',
      zone3: '#e0a800',
      zone4: '#c82333'
    }
  },
  
  polyline: {
    default: '#007bff',
    animated: '#28a745',
    interactive: '#ffc107',
    route: '#dc3545'
  },
  
  circle: {
    fill: {
      default: '#007bff',
      coverage: '#28a745',
      service: '#ffc107',
      emergency: '#dc3545'
    },
    stroke: {
      default: '#0056b3',
      coverage: '#1e7e34',
      service: '#e0a800',
      emergency: '#c82333'
    }
  }
} as const;