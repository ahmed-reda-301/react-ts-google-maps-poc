import React, { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { theme } from '../../styles/theme';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** Button content */
  children: ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether button is loading */
  loading?: boolean;
  /** Whether button is full width */
  fullWidth?: boolean;
  /** Icon to display before text */
  startIcon?: ReactNode;
  /** Icon to display after text */
  endIcon?: ReactNode;
}

/**
 * Reusable Button component with consistent styling
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * 
 * <Button variant="outline" startIcon="🔍" loading={isLoading}>
 *   Search
 * </Button>
 * ```
 */
const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  disabled,
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    const variants = {
      primary: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        border: `1px solid ${theme.colors.primary}`,
        '&:hover': {
          backgroundColor: theme.colors.primaryDark,
          borderColor: theme.colors.primaryDark,
        },
      },
      secondary: {
        backgroundColor: theme.colors.grey[100],
        color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.border.light}`,
        '&:hover': {
          backgroundColor: theme.colors.grey[200],
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.colors.primary,
        border: `1px solid ${theme.colors.primary}`,
        '&:hover': {
          backgroundColor: theme.colors.primary,
          color: theme.colors.white,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.colors.primary,
        border: '1px solid transparent',
        '&:hover': {
          backgroundColor: theme.colors.grey[100],
        },
      },
      danger: {
        backgroundColor: theme.colors.error,
        color: theme.colors.white,
        border: `1px solid ${theme.colors.error}`,
        '&:hover': {
          backgroundColor: '#d32f2f',
          borderColor: '#d32f2f',
        },
      },
    };

    return variants[variant];
  };

  const getSizeStyles = (): React.CSSProperties => {
    const sizes = {
      sm: {
        height: theme.components.button.height.sm,
        padding: theme.components.button.padding.sm,
        fontSize: theme.typography.fontSize.sm,
      },
      md: {
        height: theme.components.button.height.md,
        padding: theme.components.button.padding.md,
        fontSize: theme.typography.fontSize.md,
      },
      lg: {
        height: theme.components.button.height.lg,
        padding: theme.components.button.padding.lg,
        fontSize: theme.typography.fontSize.lg,
      },
    };

    return sizes[size];
  };

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    borderRadius: theme.borderRadius.md,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: `all ${theme.animations.duration.normal} ${theme.animations.easing.easeInOut}`,
    textDecoration: 'none',
    outline: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || loading ? 0.6 : 1,
    ...getSizeStyles(),
    ...getVariantStyles(),
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    const target = e.currentTarget;
    if (variant === 'primary') {
      target.style.backgroundColor = theme.colors.primaryDark;
    } else if (variant === 'secondary') {
      target.style.backgroundColor = theme.colors.grey[200];
    } else if (variant === 'outline') {
      target.style.backgroundColor = theme.colors.primary;
      target.style.color = theme.colors.white;
    } else if (variant === 'ghost') {
      target.style.backgroundColor = theme.colors.grey[100];
    } else if (variant === 'danger') {
      target.style.backgroundColor = '#d32f2f';
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    const target = e.currentTarget;
    const variantStyles = getVariantStyles();
    target.style.backgroundColor = variantStyles.backgroundColor || 'transparent';
    target.style.color = variantStyles.color || theme.colors.text.primary;
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      style={{ ...baseStyles, ...style }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {loading && (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      )}
      {!loading && startIcon && <span>{startIcon}</span>}
      <span>{children}</span>
      {!loading && endIcon && <span>{endIcon}</span>}
    </button>
  );
};

export default Button;