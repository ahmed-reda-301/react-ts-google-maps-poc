import { BaseControlProps } from './base';

// InfoWindow-specific types
export interface FormData {
  rating: number;
  comment: string;
}

// InfoWindow Controls Props
export interface InfoWindowControlsProps extends BaseControlProps {
  formData: FormData;
}