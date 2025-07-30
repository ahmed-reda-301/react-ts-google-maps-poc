/**
 * Reusable page section component
 * Provides consistent section styling and structure
 */

import React, { FC, ReactNode } from 'react';
import { styles } from '../../styles/pageStyles';

interface PageSectionProps {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Section content */
  children: ReactNode;
  /** Custom section style */
  style?: React.CSSProperties;
  /** Section icon (emoji or component) */
  icon?: string | ReactNode;
  /** Whether to show bottom margin */
  marginBottom?: boolean;
  /** Custom title style */
  titleStyle?: React.CSSProperties;
  /** Custom content wrapper style */
  contentStyle?: React.CSSProperties;
}

/**
 * PageSection component provides consistent section structure
 */
const PageSection: FC<PageSectionProps> = ({
  title,
  subtitle,
  children,
  style,
  icon,
  marginBottom = true,
  titleStyle,
  contentStyle,
}) => {
  const sectionStyles: React.CSSProperties = {
    ...styles.page.section,
    ...(marginBottom ? {} : { marginBottom: 0 }),
    ...style,
  };

  const titleStyles: React.CSSProperties = {
    ...styles.page.sectionTitle,
    ...titleStyle,
  };

  const subtitleStyles: React.CSSProperties = {
    ...styles.page.sectionSubtitle,
  };

  return (
    <section style={sectionStyles}>
      {title && (
        <h2 style={titleStyles}>
          {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
          {title}
        </h2>
      )}
      
      {subtitle && (
        <p style={subtitleStyles}>{subtitle}</p>
      )}
      
      <div style={contentStyle}>
        {children}
      </div>
    </section>
  );
};

export default PageSection;