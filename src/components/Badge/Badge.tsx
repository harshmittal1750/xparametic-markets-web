import React from 'react';

import type { CategoricalColor } from 'helpers/color';

import Text from '../Text';

export type BadgeVariant = 'normal' | 'filled';

export type BadgeColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'pink'
  | 'blue'
  | 'purple';

type BadgeProps = {
  /**
   * Variant to use
   * @default 'normal'
   */
  variant?: BadgeVariant;
  /**
   * Color of the circle
   * @default 'default'
   */
  color?: BadgeColor | CategoricalColor;
  /**
   * Label to show
   */
  label?: string;
  style?: React.CSSProperties;
};

function Badge({
  variant = 'normal',
  color = 'default',
  label,
  style
}: BadgeProps) {
  return (
    <div
      className={
        variant === 'normal'
          ? `pm-c-badge-${variant}--${color}`
          : `pm-c-badge-${variant}`
      }
      style={style}
    >
      <div className="pm-c-badge__circle" />
      {label ? (
        <Text className="pm-c-badge__label" as="label">
          {label}
        </Text>
      ) : null}
    </div>
  );
}

export default Badge;
