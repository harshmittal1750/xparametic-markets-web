import type React from 'react';

export interface IconProps extends React.ComponentPropsWithRef<'svg'> {
  size?: 'sm' | 'md' | 'lg';
  accessible?: boolean;
}
