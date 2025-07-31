/**
 * Common guide data
 * Shared data used across all guide components
 */

import { 
  GUIDE_MARKERS, 
  GUIDE_ZONES, 
  GUIDE_COVERAGE_AREAS, 
  GUIDE_ANIMATION_PATHS,
  GUIDE_STYLING_EXAMPLES,
  APP_STYLES,
  DEFAULT_MAP_OPTIONS
} from '../../constants';
import { GuideMarker, GuideZone, GuideCoverageArea } from '../../types/guide/common';

/**
 * Common markers for all guides
 */
export const commonMarkers: GuideMarker[] = GUIDE_MARKERS.RIYADH_LANDMARKS;

/**
 * Common zones for polygon and rectangle guides
 */
export const commonZones: GuideZone[] = [
  GUIDE_ZONES.BUSINESS_DISTRICT,
  GUIDE_ZONES.RESIDENTIAL_AREA,
  GUIDE_ZONES.HISTORICAL_DISTRICT,
  GUIDE_ZONES.COMMERCIAL_ZONE,
];

/**
 * Common coverage areas for circle guides
 */
export const commonCoverageAreas: GuideCoverageArea[] = [
  GUIDE_COVERAGE_AREAS.WIFI_HOTSPOT,
  GUIDE_COVERAGE_AREAS.DELIVERY_ZONE,
  GUIDE_COVERAGE_AREAS.EMERGENCY_ZONE,
  GUIDE_COVERAGE_AREAS.SECURITY_ZONE,
];

/**
 * Common animation paths
 */
export const commonAnimationPaths = {
  riyadhTour: GUIDE_ANIMATION_PATHS.RIYADH_TOUR,
  historicalRoute: GUIDE_ANIMATION_PATHS.HISTORICAL_ROUTE,
};

/**
 * Common styling examples templates
 */
export const commonStylingExamples = {
  basic: {
    ...GUIDE_STYLING_EXAMPLES.BASIC,
    code: (componentName: string, props: string) => 
      `<${componentName}\n  ${props}\n/>`
  },
  advanced: {
    ...GUIDE_STYLING_EXAMPLES.ADVANCED,
    code: (componentName: string, props: string, options: string) => 
      `<${componentName}\n  ${props}\n  options={{\n    ${options}\n  }}\n/>`
  },
  interactive: {
    ...GUIDE_STYLING_EXAMPLES.INTERACTIVE,
    code: (componentName: string, props: string, handlers: string) => 
      `<${componentName}\n  ${props}\n  ${handlers}\n/>`
  },
};

/**
 * Common color schemes for examples
 */
export const commonColorSchemes = [
  { name: 'Blue', value: APP_STYLES.COLORS.PRIMARY },
  { name: 'Green', value: APP_STYLES.COLORS.SUCCESS },
  { name: 'Red', value: APP_STYLES.COLORS.ERROR },
  { name: 'Orange', value: APP_STYLES.COLORS.WARNING },
  { name: 'Purple', value: '#9c27b0' },
  { name: 'Teal', value: '#20c997' },
];

/**
 * Common difficulty colors
 */
export const difficultyColors = {
  beginner: APP_STYLES.COLORS.SUCCESS,
  intermediate: APP_STYLES.COLORS.WARNING,
  advanced: APP_STYLES.COLORS.ERROR,
};

/**
 * Common difficulty icons
 */
export const difficultyIcons = {
  beginner: '🟢',
  intermediate: '🟡',
  advanced: '🔴',
};

/**
 * Common status colors
 */
export const statusColors = {
  completed: APP_STYLES.COLORS.SUCCESS,
  'in-progress': APP_STYLES.COLORS.WARNING,
  planned: '#9E9E9E',
};

/**
 * Common map options for guides
 */
export const commonMapOptions: google.maps.MapOptions = {
  ...DEFAULT_MAP_OPTIONS,
  mapTypeControl: false,
  streetViewControl: false,
  rotateControl: false,
};

/**
 * Common info window content templates
 */
export const infoWindowTemplates = {
  basic: (title: string, description: string) => `
    <div>
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `,
  
  detailed: (title: string, description: string, details: Record<string, string>) => `
    <div style="max-width: 300px;">
      <h3 style="margin: 0 0 10px 0; color: #333;">${title}</h3>
      <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">${description}</p>
      ${Object.entries(details).map(([key, value]) => 
        `<div style="margin-bottom: 5px;"><strong>${key}:</strong> ${value}</div>`
      ).join('')}
    </div>
  `,
  
  interactive: (title: string, description: string, buttons: Array<{label: string, action: string}>) => `
    <div style="min-width: 280px;">
      <h3 style="margin: 0 0 15px 0; color: #333;">${title}</h3>
      <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">${description}</p>
      <div style="display: flex; gap: 8px;">
        ${buttons.map(button => 
          `<button onclick="${button.action}" style="
            padding: 6px 12px;
            background-color: ${APP_STYLES.COLORS.INFO};
            color: white;
            border: none;
            border-radius: ${APP_STYLES.BORDER_RADIUS.SMALL};
            font-size: 12px;
            cursor: pointer;
          ">${button.label}</button>`
        ).join('')}
      </div>
    </div>
  `,
};

/**
 * Common control panel styles
 */
export const controlPanelStyles = {
  panel: {
    backgroundColor: 'white',
    borderRadius: APP_STYLES.BORDER_RADIUS.LARGE,
    padding: APP_STYLES.SPACING.XL,
    marginTop: APP_STYLES.SPACING.XL,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
  },
  
  section: {
    marginBottom: APP_STYLES.SPACING.XL,
  },
  
  title: {
    margin: `0 0 ${APP_STYLES.SPACING.LG} 0`,
    color: '#333',
    fontSize: '16px',
    fontWeight: '600',
  },
  
  instruction: {
    margin: `0 0 ${APP_STYLES.SPACING.LG} 0`,
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  
  buttonGroup: {
    display: 'flex',
    gap: APP_STYLES.SPACING.MD,
    flexWrap: 'wrap' as const,
    marginBottom: APP_STYLES.SPACING.LG,
  },
  
  infoDisplay: {
    padding: APP_STYLES.SPACING.MD,
    backgroundColor: '#f8f9fa',
    borderRadius: APP_STYLES.BORDER_RADIUS.MEDIUM,
    border: '1px solid #e9ecef',
    fontSize: '14px',
    color: '#495057',
  },
};

/**
 * Common form input styles
 */
export const formInputStyles = {
  input: {
    width: '100%',
    padding: APP_STYLES.SPACING.SM + ' ' + APP_STYLES.SPACING.MD,
    border: '1px solid #ddd',
    borderRadius: APP_STYLES.BORDER_RADIUS.MEDIUM,
    fontSize: '14px',
  },
  
  label: {
    display: 'block' as const,
    marginBottom: APP_STYLES.SPACING.XS,
    fontSize: '14px',
    fontWeight: 'bold' as const,
    color: '#333',
  },
  
  range: {
    width: '100%',
    margin: APP_STYLES.SPACING.MD + ' 0',
  },
  
  textarea: {
    width: '100%',
    minHeight: '60px',
    padding: APP_STYLES.SPACING.SM + ' ' + APP_STYLES.SPACING.MD,
    border: '1px solid #ddd',
    borderRadius: APP_STYLES.BORDER_RADIUS.MEDIUM,
    fontSize: '14px',
    resize: 'vertical' as const,
  },
};