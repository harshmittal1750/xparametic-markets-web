import { memo } from 'react';

import { isThemeDark, useTheme } from 'ui';

function RankStableIcon(props: React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      fill="none"
      viewBox="0 0 21 21"
      {...props}
    >
      <rect
        width="21"
        height="21"
        y="0"
        fill={isThemeDark(theme.device.mode) ? '#FFFFFF' : '#000000'}
        fillOpacity="0.1"
        rx="10"
      />
      <rect width="11" height="3" x="4.5" y="8.5" fill="#8B96A7" rx="1.5" />
    </svg>
  );
}

export default memo(RankStableIcon);
