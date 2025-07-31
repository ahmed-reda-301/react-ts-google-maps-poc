import { BaseControlProps, ComponentColor } from './base';

// Circle-specific types
export interface CoverageArea {
  id: string;
  name: string;
  center: google.maps.LatLngLiteral;
  radius: number;
  color: string;
  description: string;
  type: string;
  icon: string;
}

export interface CircleData {
  id: string;
  center: google.maps.LatLngLiteral;
  radius: number;
  color: string;
}

export interface EditableCircle {
  center: google.maps.LatLngLiteral;
  radius: number;
}

// Circle Controls Props
export interface CircleControlsProps extends BaseControlProps {
  basicRadius?: number;
  onBasicRadiusChange?: (radius: number) => void;
  selectedArea?: string | null;
  coverageAreas?: CoverageArea[];
  onAreaClick?: (areaId: string) => void;
  circles?: CircleData[];
  isCreating?: boolean;
  selectedRadius?: number;
  selectedColor?: string;
  onStartCreating?: () => void;
  onClearCircles?: () => void;
  onRadiusChange?: (radius: number) => void;
  onColorChange?: (color: string) => void;
  editableCircle?: EditableCircle | null;
  isEditable?: boolean;
  onToggleEditable?: () => void;
  calculateArea?: (radius: number) => string;
  calculateTotalArea?: () => string;
  componentColors?: ComponentColor[];
  // Animation properties for animated circles
  animatedPath?: google.maps.LatLngLiteral[];
  fullAnimationPath?: google.maps.LatLngLiteral[];
  isAnimating?: boolean;
  onStartAnimation?: () => void;
  onResetAnimation?: () => void;
}