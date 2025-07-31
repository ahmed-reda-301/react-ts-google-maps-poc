/**
 * Guide Constants
 * Constants specific to the components guide system
 */

// Component information
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
} as const;

// Example types
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
} as const;

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate', 
  ADVANCED: 'advanced'
} as const;

// Task categories
export const TASK_CATEGORIES = {
  IMPLEMENTATION: 'implementation',
  STYLING: 'styling',
  INTERACTION: 'interaction',
  OPTIMIZATION: 'optimization'
} as const;

// Use case categories
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
} as const;

// Time estimates for tasks
export const TIME_ESTIMATES = {
  QUICK: '5-10 minutes',
  MEDIUM: '15-30 minutes', 
  LONG: '30-60 minutes',
  EXTENDED: '1-2 hours'
} as const;

// Code example categories
export const CODE_CATEGORIES = {
  BASIC_SETUP: 'Basic Setup',
  ADVANCED_CONFIG: 'Advanced Configuration',
  EVENT_HANDLING: 'Event Handling',
  STYLING: 'Styling & Customization',
  INTEGRATION: 'Integration Examples'
} as const;