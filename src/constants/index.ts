/**
 * Constants barrel export
 * Centralized export for all application constants
 */

// Map-related constants
export * from './mapConstants';
export * from './locationConstants';
export * from './markerConstants';

// UI and content constants
export * from './uiConstants';
export * from './codeExamples';

// Re-export commonly used constants with aliases for convenience
export {
  SAUDI_ARABIA_LOCATIONS as LOCATIONS,
  DEFAULT_MAP_CENTERS as MAP_CENTERS,
} from './locationConstants';

export {
  MAP_CONTAINER_STYLES as CONTAINER_STYLES,
} from './mapConstants';

export {
  MARKER_ICONS as ICONS,
} from './markerConstants';

export {
  PAGE_CONTENT as CONTENT,
  UI_LABELS as LABELS,
  ERROR_MESSAGES as ERRORS,
} from './uiConstants';

export {
  CODE_EXAMPLES as EXAMPLES,
} from './codeExamples';

export {
  MAP_CONTAINER_STYLES,
  DEFAULT_MAP_OPTIONS,
  MAP_ZOOM_LEVELS,
} from './mapConstants';

export {
  MARKER_ICONS,
  MARKER_CATEGORIES,
  getMarkerIcon,
  getMarkerColor,
  getMarkerLabel,
} from './markerConstants';

export {
  PAGE_CONTENT,
  UI_LABELS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TRAVEL_MODES,
} from './uiConstants';