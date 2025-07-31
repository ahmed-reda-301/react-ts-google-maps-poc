// UI Constants for Components Guide

// Common colors for UI elements
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
  BACKGROUND: '#f5f5f5'
};

// Component styling constants
export const COMPONENT_STYLES = {
  BORDER_RADIUS: {
    SMALL: '6px',
    MEDIUM: '8px',
    LARGE: '12px',
    EXTRA_LARGE: '16px'
  },
  PADDING: {
    SMALL: '8px',
    MEDIUM: '12px',
    LARGE: '16px',
    EXTRA_LARGE: '20px',
    SECTION: '24px'
  },
  MARGIN: {
    SMALL: '8px',
    MEDIUM: '12px',
    LARGE: '16px',
    EXTRA_LARGE: '20px',
    SECTION: '24px'
  },
  SHADOW: {
    LIGHT: '0 2px 4px rgba(0,0,0,0.05)',
    MEDIUM: '0 2px 8px rgba(0,0,0,0.1)',
    HEAVY: '0 4px 12px rgba(0,0,0,0.1)',
    EXTRA_HEAVY: '0 8px 25px rgba(0,0,0,0.15)'
  },
  TRANSITION: {
    FAST: '0.15s ease',
    NORMAL: '0.2s ease',
    SLOW: '0.3s ease'
  }
};

// Typography constants
export const TYPOGRAPHY = {
  FONT_SIZE: {
    EXTRA_SMALL: '11px',
    SMALL: '12px',
    NORMAL: '14px',
    MEDIUM: '16px',
    LARGE: '18px',
    EXTRA_LARGE: '20px',
    TITLE: '24px',
    HEADING: '28px'
  },
  FONT_WEIGHT: {
    LIGHT: '300',
    NORMAL: '400',
    MEDIUM: '500',
    SEMI_BOLD: '600',
    BOLD: '700'
  },
  LINE_HEIGHT: {
    TIGHT: '1.2',
    NORMAL: '1.4',
    RELAXED: '1.5',
    LOOSE: '1.6'
  }
};

// Layout constants
export const LAYOUT = {
  MAX_WIDTH: '1400px',
  CONTAINER_PADDING: '20px',
  GRID_GAP: {
    SMALL: '12px',
    MEDIUM: '16px',
    LARGE: '20px',
    EXTRA_LARGE: '24px'
  },
  BREAKPOINTS: {
    MOBILE: '480px',
    TABLET: '768px',
    DESKTOP: '1024px',
    LARGE_DESKTOP: '1200px'
  }
};

// Animation constants
export const ANIMATIONS = {
  DURATION: {
    FAST: '150ms',
    NORMAL: '200ms',
    SLOW: '300ms',
    EXTRA_SLOW: '500ms'
  },
  EASING: {
    EASE: 'ease',
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out'
  }
};

// Z-index constants
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070
};

// Common button styles
export const BUTTON_STYLES = {
  PRIMARY: {
    backgroundColor: UI_COLORS.PRIMARY,
    color: UI_COLORS.WHITE,
    border: `2px solid ${UI_COLORS.PRIMARY}`,
    borderRadius: COMPONENT_STYLES.BORDER_RADIUS.MEDIUM,
    padding: `${COMPONENT_STYLES.PADDING.MEDIUM} ${COMPONENT_STYLES.PADDING.LARGE}`,
    fontSize: TYPOGRAPHY.FONT_SIZE.NORMAL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
    cursor: 'pointer',
    transition: COMPONENT_STYLES.TRANSITION.NORMAL
  },
  SECONDARY: {
    backgroundColor: 'transparent',
    color: UI_COLORS.SECONDARY,
    border: `2px solid ${UI_COLORS.SECONDARY}`,
    borderRadius: COMPONENT_STYLES.BORDER_RADIUS.MEDIUM,
    padding: `${COMPONENT_STYLES.PADDING.MEDIUM} ${COMPONENT_STYLES.PADDING.LARGE}`,
    fontSize: TYPOGRAPHY.FONT_SIZE.NORMAL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
    cursor: 'pointer',
    transition: COMPONENT_STYLES.TRANSITION.NORMAL
  },
  SUCCESS: {
    backgroundColor: UI_COLORS.SUCCESS,
    color: UI_COLORS.WHITE,
    border: `2px solid ${UI_COLORS.SUCCESS}`,
    borderRadius: COMPONENT_STYLES.BORDER_RADIUS.MEDIUM,
    padding: `${COMPONENT_STYLES.PADDING.MEDIUM} ${COMPONENT_STYLES.PADDING.LARGE}`,
    fontSize: TYPOGRAPHY.FONT_SIZE.NORMAL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
    cursor: 'pointer',
    transition: COMPONENT_STYLES.TRANSITION.NORMAL
  }
};

// Common card styles
export const CARD_STYLES = {
  DEFAULT: {
    backgroundColor: UI_COLORS.WHITE,
    borderRadius: COMPONENT_STYLES.BORDER_RADIUS.LARGE,
    padding: COMPONENT_STYLES.PADDING.SECTION,
    marginTop: COMPONENT_STYLES.MARGIN.LARGE,
    boxShadow: COMPONENT_STYLES.SHADOW.HEAVY,
    border: '1px solid #e0e0e0'
  },
  COLLAPSIBLE: {
    backgroundColor: UI_COLORS.WHITE,
    borderRadius: COMPONENT_STYLES.BORDER_RADIUS.LARGE,
    padding: COMPONENT_STYLES.PADDING.SECTION,
    marginTop: COMPONENT_STYLES.MARGIN.LARGE,
    boxShadow: COMPONENT_STYLES.SHADOW.HEAVY,
    border: '1px solid #e0e0e0',
    cursor: 'pointer',
    transition: COMPONENT_STYLES.TRANSITION.NORMAL
  }
};

// Icon constants
export const ICONS = {
  EXPAND: '▶',
  COLLAPSE: '▼',
  BACK: '←',
  FORWARD: '→',
  UP: '▲',
  DOWN: '▼',
  CHECK: '✓',
  CROSS: '✗',
  STAR: '⭐',
  HEART: '❤️',
  THUMBS_UP: '👍',
  THUMBS_DOWN: '👎',
  WARNING: '⚠️',
  INFO: 'ℹ️',
  SUCCESS: '✅',
  ERROR: '❌',
  QUESTION: '❓',
  EXCLAMATION: '❗'
};