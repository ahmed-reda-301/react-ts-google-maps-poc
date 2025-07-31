/**
 * Common types for guide system
 * Shared types used across all guide components
 */

import { ReactNode } from 'react';
import { LatLng } from '../common/LatLng';

/**
 * Base guide configuration
 */
export interface GuideConfig {
  defaultExample: string;
  mapContainerStyle: React.CSSProperties;
  resetDelay: number;
  animationDuration: number;
}

/**
 * Guide position with optional metadata
 */
export interface GuidePosition extends LatLng {
  id?: string | number;
  title?: string;
  description?: string;
}

/**
 * Guide marker configuration
 */
export interface GuideMarker {
  id: string | number;
  position: LatLng;
  title: string;
  description?: string;
  icon?: google.maps.Icon | google.maps.Symbol | string;
  clickable?: boolean;
  draggable?: boolean;
}

/**
 * Guide zone configuration
 */
export interface GuideZone {
  id: string;
  name: string;
  paths: LatLng[];
  bounds?: google.maps.LatLngBoundsLiteral;
  fillColor: string;
  strokeColor: string;
  fillOpacity?: number;
  strokeOpacity?: number;
  strokeWeight?: number;
  clickable?: boolean;
}

/**
 * Guide coverage area configuration
 */
export interface GuideCoverageArea {
  id: string;
  name: string;
  center: LatLng;
  radius: number;
  color: string;
  type: string;
  description: string;
  fillOpacity?: number;
  strokeOpacity?: number;
  strokeWeight?: number;
}

/**
 * Guide animation path
 */
export interface GuideAnimationPath {
  name: string;
  points: LatLng[];
  duration?: number;
  stepDelay?: number;
}

/**
 * Guide styling example
 */
export interface GuideStylingExample {
  title: string;
  color: string;
  description: string;
  code: string;
}

/**
 * Guide control button configuration
 */
export interface GuideControlButton {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
}

/**
 * Guide state management
 */
export interface GuideState {
  selectedExample: string;
  isLoading: boolean;
  error: string | null;
  mapKey: number;
}

/**
 * Guide example state
 */
export interface GuideExampleState {
  [key: string]: any;
}

/**
 * Guide reset configuration
 */
export interface GuideResetConfig {
  resetState: () => void;
  resetDelay?: number;
}

/**
 * Guide interaction handlers
 */
export interface GuideInteractionHandlers {
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  onMarkerClick?: (markerId: string | number) => void;
  onZoneClick?: (zoneId: string) => void;
  onReset?: () => void;
}

/**
 * Guide component props base
 */
export interface GuideComponentProps {
  selectedExample: string;
  onExampleChange: (example: string) => void;
  onReset?: () => void;
}

/**
 * Guide map options
 */
export interface GuideMapOptions extends google.maps.MapOptions {
  center: LatLng;
  zoom: number;
  mapContainerStyle?: React.CSSProperties;
}

/**
 * Guide color scheme
 */
export interface GuideColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

/**
 * Guide opacity levels
 */
export interface GuideOpacityLevels {
  low: number;
  medium: number;
  high: number;
  veryHigh: number;
}

/**
 * Guide stroke weights
 */
export interface GuideStrokeWeights {
  thin: number;
  normal: number;
  thick: number;
  veryThick: number;
}