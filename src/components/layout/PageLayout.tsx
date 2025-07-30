/**
 * Reusable page layout component
 * Provides consistent structure and styling for all pages
 */

import React, { FC, ReactNode } from 'react';
import { styles } from '../../styles/pageStyles';

interface PageLayoutProps {
  /** Page title */
  title: string;
  /** Page subtitle/description */
  subtitle?: string;
  /** Page content */
  children: ReactNode;
  /** Custom container style */
  containerStyle?: React.CSSProperties;
  /** Whether to center the header */
  centerHeader?: boolean;
  /** Maximum width of the container */
  maxWidth?: string;
  /** Custom padding */
  padding?: string;
}

/**
 * PageLayout component provides a consistent layout structure for all pages
 */
const PageLayout: FC<PageLayoutProps> = ({
  title,
  subtitle,
  children,
  containerStyle,
  centerHeader = true,
  maxWidth = '1200px',
  padding,
}) => {
  const containerStyles: React.CSSProperties = {
    ...styles.page.container,
    maxWidth,
    ...(padding && { padding }),
    ...containerStyle,
  };

  const headerStyles: React.CSSProperties = {
    ...styles.page.header,
    ...(centerHeader ? {} : { textAlign: 'left' }),
  };

  return (
    <div style={containerStyles}>
      {/* Page Header */}
      <header style={headerStyles}>
        <h1 style={styles.page.title}>{title}</h1>
        {subtitle && (
          <p style={styles.page.subtitle}>{subtitle}</p>
        )}
      </header>

      {/* Page Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;