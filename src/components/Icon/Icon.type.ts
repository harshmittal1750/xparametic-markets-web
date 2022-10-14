import type React from 'react';

import * as Svgs from './__svgs__';

export interface IconProps extends React.ComponentPropsWithRef<'svg'> {
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  name: keyof typeof Svgs;
}
