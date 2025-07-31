/**
 * Constants barrel export
 * Centralized export for all application constants
 */

// Core constants (base for all other constants)
export * from './coreConstants';

// Specialized constants
export * from './locationConstants';
export * from './markerConstants';
export * from './uiConstants';
export * from './codeExamples';
export * from './guide';

// Guide-specific constants (uses core constants)
export * from './guideConstants';

// Legacy aliases for backward compatibility
export {
  MAP_CONTAINERS as MAP_CONTAINER_STYLES,
  MAP_CONTAINERS,
  RIYADH_LANDMARKS as RIYADH_LOCATIONS,
  DEFAULT_CENTER,
} from './coreConstants';

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