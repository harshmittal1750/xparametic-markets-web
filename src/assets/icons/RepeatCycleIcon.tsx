import { memo } from 'react';

import { useTheme } from 'ui';

function RepeatCycleIcon(props: React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
  const accentColor = theme.mode === 'dark' ? '#637084' : '#8293AE';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
      style={{ transition: 'fill 0.2s ease-in-out' }}
      {...props}
    >
      <path fill={accentColor} d="M3.5 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      <path
        fill={accentColor}
        d="M8 .5c-1.873 0-3.65.758-4.948 2.052L.9.4.2 6.8l6.4-.7-2.135-2.135A5.023 5.023 0 018 2.5c2.757 0 5 2.243 5 5s-2.243 5-5 5v2c3.859 0 7-3.14 7-7s-3.141-7-7-7z"
      />
    </svg>
  );
}

export default memo(RepeatCycleIcon);
