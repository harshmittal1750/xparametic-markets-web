import { forwardRef } from 'react';

import cn from 'classnames';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  /**
   * Variant to use
   * @default 'normal'
   */
  variant?: 'normal' | 'outline' | 'subtle' | 'ghost';
  /**
   * Color of the component
   * @default 'default'
   */
  color?:
    | 'base'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'noborder';
  /**
   * Size of the component
   * @default 'normal'
   */
  size?: 'normal' | 'sm' | 'xs';
  /**
   * Fill available width
   * @default 'false'
   */
  fullwidth?: boolean;
  /**
   * Disable hover actions
   * @default 'false'
   */
  noHover?: boolean;
  /**
   * Truncate text inside of button
   * @default 'false'
   */
  truncated?: boolean;
}

/**
 * Button to trigger an operation
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'normal',
    color = 'default',
    size = 'normal',
    fullwidth = false,
    noHover = false,
    truncated = false,
    children,
    className,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        {
          [`pm-c-button-${variant}--${color}`]: variant && color,
          [`pm-c-button--${size}`]: size,
          'pm-c-button--fullwidth': fullwidth,
          'pm-c-button--no-hover': noHover,
          'pm-c-button--truncated': truncated
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
