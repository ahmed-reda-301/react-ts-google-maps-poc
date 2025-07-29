import React, { FC, ReactNode, HTMLAttributes } from 'react';
import { theme } from '../../styles/theme';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card content */
  children: ReactNode;
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Card variant */
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  /** Card padding size */
  padding?: 'sm' | 'md' | 'lg';
  /** Whether card is hoverable */
  hoverable?: boolean;
  /** Whether card is clickable */
  clickable?: boolean;
  /** Header content */
  header?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
}

/**
 * Reusable Card component for consistent content containers
 * 
 * @example
 * ```tsx
 * <Card title="Basic Map" subtitle="Learn the fundamentals" hoverable>
 *   <p>Card content goes here</p>
 * </Card>
 * 
 * <Card variant="outlined" padding="lg" clickable onClick={handleClick}>
 *   <h3>Custom Content</h3>
 * </Card>
 * ```
 */
const Card: FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  header,
  footer,
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    const variants = {
      default: {
        backgroundColor: theme.colors.white,
        border: `1px solid ${theme.colors.border.light}`,
        boxShadow: theme.shadows.sm,
      },
      outlined: {
        backgroundColor: theme.colors.white,
        border: `1px solid ${theme.colors.border.medium}`,
        boxShadow: 'none',
      },
      elevated: {
        backgroundColor: theme.colors.white,
        border: 'none',
        boxShadow: theme.shadows.lg,
      },
      filled: {
        backgroundColor: theme.colors.background.paper,
        border: 'none',
        boxShadow: 'none',
      },
    };

    return variants[variant];
  };

  const getPaddingStyles = (): React.CSSProperties => {
    const paddings = {
      sm: { padding: theme.components.card.padding.sm },
      md: { padding: theme.components.card.padding.md },
      lg: { padding: theme.components.card.padding.lg },
    };

    return paddings[padding];
  };

  const baseStyles: React.CSSProperties = {
    borderRadius: theme.borderRadius.lg,
    transition: `all ${theme.animations.duration.normal} ${theme.animations.easing.easeInOut}`,
    cursor: clickable ? 'pointer' : 'default',
    ...getVariantStyles(),
    ...getPaddingStyles(),
  };

  const hoverStyles: React.CSSProperties = hoverable || clickable ? {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows.lg,
  } : {};

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverable || clickable) {
      const target = e.currentTarget;
      target.style.transform = 'translateY(-2px)';
      target.style.boxShadow = theme.shadows.lg;
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverable || clickable) {
      const target = e.currentTarget;
      target.style.transform = 'translateY(0)';
      target.style.boxShadow = getVariantStyles().boxShadow || 'none';
    }
  };

  const headerStyles: React.CSSProperties = {
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.border.light}`,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    margin: '0 0 8px 0',
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    margin: '0',
  };

  const footerStyles: React.CSSProperties = {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTop: `1px solid ${theme.colors.border.light}`,
  };

  return (
    <div
      {...props}
      style={{ ...baseStyles, ...style }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {(header || title || subtitle) && (
        <div style={headerStyles}>
          {header}
          {title && <h3 style={titleStyles}>{title}</h3>}
          {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        </div>
      )}
      
      <div>{children}</div>
      
      {footer && (
        <div style={footerStyles}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;