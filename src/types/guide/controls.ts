import { ReactNode } from 'react';

/**
 * Control section interface for GeneralGuideControls
 */
export interface ControlSection {
  title: string;
  content: ReactNode;
  condition?: boolean;
}