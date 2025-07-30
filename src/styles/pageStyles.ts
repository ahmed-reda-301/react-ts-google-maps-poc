/**
 * Centralized page styling utilities
 * This file contains reusable style objects for consistent page layouts
 */

import { theme } from './theme';

/**
 * Common page layout styles
 */
export const pageStyles = {
  // Main page container
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
  } as React.CSSProperties,

  // Responsive container for smaller screens
  containerResponsive: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
    '@media (max-width: 768px)': {
      padding: `${theme.spacing.lg} ${theme.spacing.md}`,
    },
  } as React.CSSProperties,

  // Page header section
  header: {
    marginBottom: theme.spacing.xl,
    textAlign: 'center' as const,
  } as React.CSSProperties,

  // Main page title
  title: {
    fontSize: theme.typography.fontSize.display,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    lineHeight: theme.typography.lineHeight.tight,
  } as React.CSSProperties,

  // Page subtitle
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
    lineHeight: theme.typography.lineHeight.normal,
  } as React.CSSProperties,

  // Section container
  section: {
    marginBottom: theme.spacing.xl,
  } as React.CSSProperties,

  // Section title
  sectionTitle: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    borderBottom: `2px solid ${theme.colors.primary}`,
    paddingBottom: theme.spacing.sm,
  } as React.CSSProperties,

  // Section subtitle
  sectionSubtitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  } as React.CSSProperties,
};

/**
 * Map-specific styles
 */
export const mapStyles = {
  // Standard map container
  container: {
    width: '100%',
    height: '500px',
  } as React.CSSProperties,

  // Map wrapper with border and styling
  wrapper: {
    border: `1px solid ${theme.colors.border.light}`,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
    boxShadow: theme.shadows.sm,
  } as React.CSSProperties,

  // Large map container
  containerLarge: {
    width: '100%',
    height: '600px',
  } as React.CSSProperties,

  // Small map container
  containerSmall: {
    width: '100%',
    height: '400px',
  } as React.CSSProperties,

  // Full height map container
  containerFullHeight: {
    width: '100%',
    height: '100vh',
  } as React.CSSProperties,
};

/**
 * Control panel styles
 */
export const controlStyles = {
  // Grid layout for controls
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  } as React.CSSProperties,

  // Flex layout for controls
  flex: {
    display: 'flex',
    gap: theme.spacing.md,
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  } as React.CSSProperties,

  // Control group
  group: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.sm,
  } as React.CSSProperties,

  // Control row
  row: {
    display: 'flex',
    gap: theme.spacing.md,
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,

  // Button group
  buttonGroup: {
    display: 'flex',
    gap: theme.spacing.sm,
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
};

/**
 * Card layout styles
 */
export const cardStyles = {
  // Two column grid
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  } as React.CSSProperties,

  // Three column grid
  threeColumn: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  } as React.CSSProperties,

  // Four column grid
  fourColumn: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  } as React.CSSProperties,

  // Auto-fit grid
  autoFit: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  } as React.CSSProperties,
};

/**
 * Statistics and metrics styles
 */
export const statsStyles = {
  // Stats container
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  } as React.CSSProperties,

  // Individual stat card
  card: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.border.light}`,
    textAlign: 'center' as const,
  } as React.CSSProperties,

  // Stat value
  value: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  } as React.CSSProperties,

  // Stat label
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  } as React.CSSProperties,
};

/**
 * List styles
 */
export const listStyles = {
  // Basic list
  basic: {
    margin: 0,
    paddingLeft: theme.spacing.lg,
    lineHeight: theme.typography.lineHeight.relaxed,
  } as React.CSSProperties,

  // Styled list
  styled: {
    margin: 0,
    paddingLeft: theme.spacing.lg,
    lineHeight: theme.typography.lineHeight.relaxed,
    '& li': {
      marginBottom: theme.spacing.xs,
    },
  } as React.CSSProperties,

  // No bullets list
  noBullets: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    lineHeight: theme.typography.lineHeight.relaxed,
  } as React.CSSProperties,
};

/**
 * Form styles
 */
export const formStyles = {
  // Form container
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.md,
  } as React.CSSProperties,

  // Form row
  row: {
    display: 'flex',
    gap: theme.spacing.md,
    alignItems: 'end',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  } as React.CSSProperties,

  // Form group
  group: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.sm,
    flex: 1,
  } as React.CSSProperties,

  // Label
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  } as React.CSSProperties,
};

/**
 * Utility styles
 */
export const utilityStyles = {
  // Text alignment
  textCenter: { textAlign: 'center' as const },
  textLeft: { textAlign: 'left' as const },
  textRight: { textAlign: 'right' as const },

  // Margins
  marginBottom: {
    xs: { marginBottom: theme.spacing.xs },
    sm: { marginBottom: theme.spacing.sm },
    md: { marginBottom: theme.spacing.md },
    lg: { marginBottom: theme.spacing.lg },
    xl: { marginBottom: theme.spacing.xl },
    xxl: { marginBottom: theme.spacing.xxl },
  },

  // Padding
  padding: {
    xs: { padding: theme.spacing.xs },
    sm: { padding: theme.spacing.sm },
    md: { padding: theme.spacing.md },
    lg: { padding: theme.spacing.lg },
    xl: { padding: theme.spacing.xl },
    xxl: { padding: theme.spacing.xxl },
  },

  // Display
  hidden: { display: 'none' },
  block: { display: 'block' },
  flex: { display: 'flex' },
  inlineBlock: { display: 'inline-block' },

  // Flex utilities
  flexCenter: theme.mixins.flexCenter,
  flexBetween: theme.mixins.flexBetween,
  flexColumn: theme.mixins.flexColumn,

  // Width utilities
  fullWidth: { width: '100%' },
  halfWidth: { width: '50%' },
  autoWidth: { width: 'auto' },
};

/**
 * Animation styles
 */
export const animationStyles = {
  // Fade in
  fadeIn: {
    animation: `fadeIn ${theme.animations.duration.normal} ${theme.animations.easing.easeOut}`,
  } as React.CSSProperties,

  // Slide in from top
  slideInTop: {
    animation: `slideInTop ${theme.animations.duration.normal} ${theme.animations.easing.easeOut}`,
  } as React.CSSProperties,

  // Hover effects
  hoverScale: {
    transition: `transform ${theme.animations.duration.fast} ${theme.animations.easing.easeOut}`,
    '&:hover': {
      transform: 'scale(1.02)',
    },
  } as React.CSSProperties,

  // Loading pulse
  pulse: {
    animation: `pulse ${theme.animations.duration.slow} ${theme.animations.easing.easeInOut} infinite`,
  } as React.CSSProperties,
};

/**
 * Responsive breakpoint utilities
 */
export const responsiveStyles = {
  // Hide on mobile
  hideOnMobile: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  } as React.CSSProperties,

  // Hide on desktop
  hideOnDesktop: {
    '@media (min-width: 769px)': {
      display: 'none',
    },
  } as React.CSSProperties,

  // Mobile only
  mobileOnly: {
    '@media (min-width: 769px)': {
      display: 'none',
    },
  } as React.CSSProperties,

  // Desktop only
  desktopOnly: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  } as React.CSSProperties,
};

/**
 * Export all styles as a single object for easy importing
 */
export const styles = {
  page: pageStyles,
  map: mapStyles,
  controls: controlStyles,
  cards: cardStyles,
  stats: statsStyles,
  lists: listStyles,
  forms: formStyles,
  utils: utilityStyles,
  animations: animationStyles,
  responsive: responsiveStyles,
};

export default styles;