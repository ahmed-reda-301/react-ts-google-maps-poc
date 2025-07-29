import React, { FC, ReactNode } from 'react';
import { theme } from '../../styles/theme';

export interface InfoBoxProps {
  /** InfoBox content */
  children: ReactNode;
  /** InfoBox variant/type */
  variant?: 'info' | 'success' | 'warning' | 'error' | 'tip';
  /** InfoBox title */
  title?: string;
  /** Custom icon */
  icon?: ReactNode;
  /** Whether InfoBox is dismissible */
  dismissible?: boolean;
  /** Dismiss handler */
  onDismiss?: () => void;
}

/**
 * Reusable InfoBox component for displaying contextual information
 * 
 * @example
 * ```tsx
 * <InfoBox variant="info" title="💡 What you'll learn">
 *   <ul>
 *     <li>How to set up Google Maps with React</li>
 *     <li>Basic map configuration and options</li>
 *   </ul>
 * </InfoBox>
 * 
 * <InfoBox variant="warning" title="🔑 API Key Required" dismissible>
 *   <p>You need a Google Maps API key to use this demo.</p>
 * </InfoBox>
 * ```
 */
const InfoBox: FC<InfoBoxProps> = ({
  children,
  variant = 'info',
  title,
  icon,
  dismissible = false,
  onDismiss,
}) => {
  const getVariantStyles = () => {
    const variants = {
      info: {
        backgroundColor: '#e3f2fd',
        borderColor: '#bbdefb',
        iconColor: theme.colors.info,
        icon: 'ℹ️',
      },
      success: {
        backgroundColor: '#e8f5e8',
        borderColor: '#c8e6c9',
        iconColor: theme.colors.success,
        icon: '✅',
      },
      warning: {
        backgroundColor: '#fff3e0',
        borderColor: '#ffcc02',
        iconColor: theme.colors.warning,
        icon: '⚠️',
      },
      error: {
        backgroundColor: '#ffebee',
        borderColor: '#ffcdd2',
        iconColor: theme.colors.error,
        icon: '❌',
      },
      tip: {
        backgroundColor: '#f3e5f5',
        borderColor: '#e1bee7',
        iconColor: '#9c27b0',
        icon: '💡',
      },
    };

    return variants[variant];
  };

  const variantStyles = getVariantStyles();

  const containerStyles: React.CSSProperties = {
    backgroundColor: variantStyles.backgroundColor,
    border: `1px solid ${variantStyles.borderColor}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    position: 'relative',
    display: 'flex',
    gap: theme.spacing.md,
  };

  const iconContainerStyles: React.CSSProperties = {
    flexShrink: 0,
    fontSize: theme.typography.fontSize.lg,
    color: variantStyles.iconColor,
    lineHeight: 1,
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
    color: theme.colors.text.primary,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    margin: '0 0 8px 0',
    color: theme.colors.text.primary,
  };

  const dismissButtonStyles: React.CSSProperties = {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    background: 'none',
    border: 'none',
    fontSize: theme.typography.fontSize.lg,
    cursor: 'pointer',
    color: theme.colors.text.secondary,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    transition: `all ${theme.animations.duration.normal}`,
  };

  const bodyStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.relaxed,
    color: theme.colors.text.primary,
  };

  return (
    <div style={containerStyles}>
      <div style={iconContainerStyles}>
        {icon || variantStyles.icon}
      </div>
      
      <div style={contentStyles}>
        {title && <div style={titleStyles}>{title}</div>}
        <div style={bodyStyles}>{children}</div>
      </div>
      
      {dismissible && (
        <button
          onClick={onDismiss}
          style={dismissButtonStyles}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default InfoBox;