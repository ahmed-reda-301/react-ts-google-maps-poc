import React, { FC, InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { theme } from '../../styles/theme';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Input variant */
  variant?: 'default' | 'outlined' | 'filled';
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Whether input is full width */
  fullWidth?: boolean;
  /** Icon to display before input */
  startIcon?: ReactNode;
  /** Icon to display after input */
  endIcon?: ReactNode;
  /** Whether input is required */
  required?: boolean;
}

/**
 * Reusable Input component with consistent styling
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Latitude"
 *   type="number"
 *   value={lat}
 *   onChange={handleLatChange}
 *   placeholder="Enter latitude"
 * />
 * 
 * <Input
 *   label="Search"
 *   startIcon="🔍"
 *   error={searchError}
 *   helperText="Enter location to search"
 * />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  size = 'md',
  variant = 'default',
  error,
  helperText,
  fullWidth = false,
  startIcon,
  endIcon,
  required = false,
  style,
  className,
  ...props
}, ref) => {
  const getVariantStyles = (): React.CSSProperties => {
    const variants = {
      default: {
        backgroundColor: theme.colors.white,
        border: `1px solid ${error ? theme.colors.error : theme.colors.border.light}`,
        '&:focus': {
          borderColor: error ? theme.colors.error : theme.colors.primary,
          boxShadow: `0 0 0 2px ${error ? theme.colors.error : theme.colors.primary}20`,
        },
      },
      outlined: {
        backgroundColor: 'transparent',
        border: `2px solid ${error ? theme.colors.error : theme.colors.border.medium}`,
        '&:focus': {
          borderColor: error ? theme.colors.error : theme.colors.primary,
        },
      },
      filled: {
        backgroundColor: theme.colors.grey[100],
        border: `1px solid transparent`,
        borderBottom: `2px solid ${error ? theme.colors.error : theme.colors.border.medium}`,
        borderRadius: `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`,
        '&:focus': {
          borderBottomColor: error ? theme.colors.error : theme.colors.primary,
          backgroundColor: theme.colors.grey[50],
        },
      },
    };

    return variants[variant];
  };

  const getSizeStyles = (): React.CSSProperties => {
    const sizes = {
      sm: {
        height: theme.components.input.height.sm,
        padding: theme.components.input.padding.sm,
        fontSize: theme.typography.fontSize.sm,
      },
      md: {
        height: theme.components.input.height.md,
        padding: theme.components.input.padding.md,
        fontSize: theme.typography.fontSize.md,
      },
      lg: {
        height: theme.components.input.height.lg,
        padding: theme.components.input.padding.lg,
        fontSize: theme.typography.fontSize.lg,
      },
    };

    return sizes[size];
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  };

  const inputWrapperStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyles: React.CSSProperties = {
    fontFamily: theme.typography.fontFamily.primary,
    borderRadius: theme.borderRadius.md,
    outline: 'none',
    transition: `all ${theme.animations.duration.normal} ${theme.animations.easing.easeInOut}`,
    color: theme.colors.text.primary,
    width: '100%',
    paddingLeft: startIcon ? '40px' : undefined,
    paddingRight: endIcon ? '40px' : undefined,
    ...getSizeStyles(),
    ...getVariantStyles(),
  };

  const iconStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.md,
    pointerEvents: 'none',
  };

  const startIconStyles: React.CSSProperties = {
    ...iconStyles,
    left: theme.spacing.md,
  };

  const endIconStyles: React.CSSProperties = {
    ...iconStyles,
    right: theme.spacing.md,
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xs,
    color: error ? theme.colors.error : theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    if (variant === 'default') {
      target.style.borderColor = error ? theme.colors.error : theme.colors.primary;
      target.style.boxShadow = `0 0 0 2px ${error ? theme.colors.error : theme.colors.primary}20`;
    } else if (variant === 'outlined') {
      target.style.borderColor = error ? theme.colors.error : theme.colors.primary;
    } else if (variant === 'filled') {
      target.style.borderBottomColor = error ? theme.colors.error : theme.colors.primary;
      target.style.backgroundColor = theme.colors.grey[50];
    }
    
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const variantStyles = getVariantStyles();
    
    if (variant === 'default') {
      target.style.borderColor = error ? theme.colors.error : theme.colors.border.light;
      target.style.boxShadow = 'none';
    } else if (variant === 'outlined') {
      target.style.borderColor = error ? theme.colors.error : theme.colors.border.medium;
    } else if (variant === 'filled') {
      target.style.borderBottomColor = error ? theme.colors.error : theme.colors.border.medium;
      target.style.backgroundColor = theme.colors.grey[100];
    }
    
    props.onBlur?.(e);
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: theme.colors.error }}> *</span>}
        </label>
      )}
      
      <div style={inputWrapperStyles}>
        {startIcon && <span style={startIconStyles}>{startIcon}</span>}
        
        <input
          {...props}
          ref={ref}
          style={{ ...inputStyles, ...style }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        {endIcon && <span style={endIconStyles}>{endIcon}</span>}
      </div>
      
      {(error || helperText) && (
        <span style={helperTextStyles}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;