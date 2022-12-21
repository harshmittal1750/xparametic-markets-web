/* eslint-disable react/button-has-type */
import { forwardRef } from 'react';

import classNames from 'classnames';

export type ButtonVariant = 'normal' | 'outline' | 'subtle' | 'ghost';

export type ButtonColor =
  | 'base'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'noborder';

type ButtonSize = 'normal' | 'sm' | 'xs';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  /**
   * Variant to use
   * @default 'normal'
   */
  variant?: ButtonVariant;
  /**
   * Color of the component
   * @default 'default'
   */
  color?: ButtonColor;
  /**
   * Size of the component
   * @default 'normal'
   */
  size?: ButtonSize;
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
    type = 'button',
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
      type={type}
      className={classNames(
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
