/**
 * Reusable controls panel component
 * Provides consistent layout for form controls and buttons
 */

import React, { FC, ReactNode } from 'react';
import { styles } from '../../styles/pageStyles';

interface ControlsPanelProps {
  /** Panel content */
  children: ReactNode;
  /** Layout type */
  layout?: 'grid' | 'flex' | 'column';
  /** Custom style */
  style?: React.CSSProperties;
  /** Grid columns (for grid layout) */
  columns?: number;
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg';
  /** Whether to show bottom margin */
  marginBottom?: boolean;
}

/**
 * Get layout styles based on layout type
 */
const getLayoutStyles = (
  layout: string,
  columns?: number,
  gap: string = 'md'
): React.CSSProperties => {
  const gapValue = {
    sm: '8px',
    md: '16px',
    lg: '24px',
  }[gap];

  switch (layout) {
    case 'grid':
      return {
        display: 'grid',
        gridTemplateColumns: columns 
          ? `repeat(${columns}, 1fr)` 
          : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: gapValue,
      };
    
    case 'flex':
      return {
        display: 'flex',
        gap: gapValue,
        flexWrap: 'wrap',
        alignItems: 'center',
      };
    
    case 'column':
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: gapValue,
      };
    
    default:
      return styles.controls.grid;
  }
};

/**
 * ControlsPanel component provides consistent layout for controls
 */
const ControlsPanel: FC<ControlsPanelProps> = ({
  children,
  layout = 'grid',
  style,
  columns,
  gap = 'md',
  marginBottom = true,
}) => {
  const panelStyles: React.CSSProperties = {
    ...getLayoutStyles(layout, columns, gap),
    ...(marginBottom ? { marginBottom: '24px' } : {}),
    ...style,
  };

  return (
    <div style={panelStyles}>
      {children}
    </div>
  );
};

export default ControlsPanel;