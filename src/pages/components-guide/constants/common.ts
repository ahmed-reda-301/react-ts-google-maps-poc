// Common constants used across all guide components

// Component titles and descriptions
export const COMPONENT_INFO = {
  GOOGLE_MAP: {
    title: 'GoogleMap Component Guide',
    subtitle: 'Complete guide to using the GoogleMap component for displaying interactive maps',
    icon: '🗺️'
  },
  MARKER: {
    title: 'Marker Component Guide', 
    subtitle: 'Learn how to add and customize markers on your Google Maps',
    icon: '📍'
  },
  INFO_WINDOW: {
    title: 'InfoWindow Component Guide',
    subtitle: 'Complete guide to using InfoWindow components for displaying rich information and interactive content',
    icon: '💬'
  },
  POLYLINE: {
    title: 'Polyline Component Guide',
    subtitle: 'Learn how to draw lines and paths on your Google Maps using Polyline components',
    icon: '📏'
  },
  POLYGON: {
    title: 'Polygon Component Guide',
    subtitle: 'Create and customize polygon shapes to represent areas and regions on your maps',
    icon: '🔷'
  },
  CIRCLE: {
    title: 'Circle Component Guide',
    subtitle: 'Add circular overlays to represent areas, ranges, or zones on your Google Maps',
    icon: '⭕'
  },
  RECTANGLE: {
    title: 'Rectangle Component Guide',
    subtitle: 'Create rectangular overlays for highlighting specific areas or regions',
    icon: '▭'
  }
};

// Common example types
export const EXAMPLE_TYPES = {
  BASIC: 'basic',
  INTERACTIVE: 'interactive',
  ADVANCED: 'advanced',
  CUSTOM_STYLING: 'customStyling',
  MULTIPLE: 'multiple',
  ANIMATED: 'animated',
  DRAGGABLE: 'draggable',
  RICH_CONTENT: 'richContent',
  MARKER_BASED: 'markerBased'
};

// Common difficulty levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate', 
  ADVANCED: 'advanced'
} as const;

// Common task categories
export const TASK_CATEGORIES = {
  IMPLEMENTATION: 'implementation',
  STYLING: 'styling',
  INTERACTION: 'interaction',
  OPTIMIZATION: 'optimization'
};

// Common use case categories
export const USE_CASE_CATEGORIES = {
  BUSINESS: {
    icon: '🏢',
    color: '#007bff',
    title: 'Business Applications'
  },
  NAVIGATION: {
    icon: '🧭',
    color: '#28a745', 
    title: 'Navigation & Routing'
  },
  VISUALIZATION: {
    icon: '📊',
    color: '#ffc107',
    title: 'Data Visualization'
  },
  REAL_ESTATE: {
    icon: '🏠',
    color: '#dc3545',
    title: 'Real Estate'
  },
  LOGISTICS: {
    icon: '🚚',
    color: '#6f42c1',
    title: 'Logistics & Delivery'
  },
  TOURISM: {
    icon: '🗺️',
    color: '#20c997',
    title: 'Tourism & Travel'
  }
};

// Common best practice categories
export const BEST_PRACTICE_CATEGORIES = {
  PERFORMANCE: 'Performance',
  ACCESSIBILITY: 'Accessibility',
  USER_EXPERIENCE: 'User Experience',
  SECURITY: 'Security',
  MAINTENANCE: 'Maintenance'
};

// Common error messages
export const ERROR_MESSAGES = {
  GOOGLE_MAPS_NOT_LOADED: 'Google Maps API not loaded',
  INVALID_COORDINATES: 'Invalid coordinates provided',
  INSUFFICIENT_POINTS: 'Insufficient points for polygon (minimum 3 required)',
  NETWORK_ERROR: 'Network error occurred',
  PERMISSION_DENIED: 'Location permission denied'
};

// Common success messages
export const SUCCESS_MESSAGES = {
  LOCATION_FOUND: 'Location found successfully',
  MARKER_ADDED: 'Marker added successfully',
  PATH_CREATED: 'Path created successfully',
  AREA_DEFINED: 'Area defined successfully'
};

// Common loading states
export const LOADING_STATES = {
  LOADING_MAP: 'Loading map...',
  LOADING_LOCATION: 'Getting your location...',
  PROCESSING: 'Processing...',
  SAVING: 'Saving...'
};

// Common time estimates for tasks
export const TIME_ESTIMATES = {
  QUICK: '5-10 minutes',
  MEDIUM: '15-30 minutes', 
  LONG: '30-60 minutes',
  EXTENDED: '1-2 hours'
};

// Common file extensions and types
export const FILE_TYPES = {
  TYPESCRIPT: '.tsx',
  JAVASCRIPT: '.jsx',
  JSON: '.json',
  CSS: '.css'
};

// Common code example categories
export const CODE_CATEGORIES = {
  BASIC_SETUP: 'Basic Setup',
  ADVANCED_CONFIG: 'Advanced Configuration',
  EVENT_HANDLING: 'Event Handling',
  STYLING: 'Styling & Customization',
  INTEGRATION: 'Integration Examples'
};