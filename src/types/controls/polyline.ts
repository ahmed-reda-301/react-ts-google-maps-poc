import { BaseControlProps } from './base';

// Polyline Controls Props
export interface PolylineControlsProps extends BaseControlProps {
  interactivePath: google.maps.LatLngLiteral[];
  onClearPath: () => void;
  animatedPath: google.maps.LatLngLiteral[];
  fullAnimationPath: google.maps.LatLngLiteral[];
  isAnimating: boolean;
  onStartAnimation: () => void;
  onResetAnimation: () => void;
}