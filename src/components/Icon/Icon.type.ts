import type React from 'react';

import { ICONS } from './Icon.utils';

export type Icons = keyof typeof ICONS;

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'x2l';
  accessible?: boolean;
}
