import { BaseControlProps, ComponentColor } from './base';

// Rectangle-specific types
export interface RectangleData {
  id: string;
  bounds: google.maps.LatLngBoundsLiteral;
  color: string;
}

// Rectangle Controls Props
export interface RectangleControlsProps extends BaseControlProps {
  rectangles: RectangleData[];
  isCreating: boolean;
  selectedColor: string;
  onStartCreating: () => void;
  onClearRectangles: () => void;
  onColorChange: (color: string) => void;
  componentColors: ComponentColor[];
}