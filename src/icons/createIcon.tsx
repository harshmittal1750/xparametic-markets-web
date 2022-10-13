import type React from 'react';
import { memo } from 'react';

import { Icon, IconProps } from 'components';

export default function createIcon(
  name: string,
  paths: React.PropsWithChildren<{}>['children']
) {
  function IconRoot(props: IconProps) {
    const { accessible } = props;

    return (
      <Icon {...props}>
        {accessible && <title>{name}</title>}
        {paths}
      </Icon>
    );
  }

  IconRoot.displayName = `${name}Icon`;

  return memo(IconRoot, Object.is);
}
