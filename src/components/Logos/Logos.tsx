import { useTheme } from 'ui';

interface LogosProps extends React.ComponentPropsWithoutRef<'svg'> {
  standard: 'mono' | 'poly';
  size: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 24,
  md: 48,
  lg: 96
};
const modes = {
  light: ['0 0 0', '0.2', '0.4', '0.1'],
  dark: ['255 255 255', '0.2', '0.1', '0.4']
} as const;

function getStandards(channel: string, ...alphas: number[]) {
  return {
    mono: [
      `rgb(${channel} / ${alphas[0]})`,
      `rgb(${channel} / ${alphas[1]})`,
      `rgb(${channel} / ${alphas[2]})`
    ],
    poly: ['#5751FC', '#3033BE', '#51A0FC']
  };
}

export default function Logos({ standard, size, ...props }: LogosProps) {
  const theme = useTheme();
  // @ts-expect-error
  const standards = getStandards(...modes[theme.device.mode]);

  return (
    <svg
      width={sizes[size]}
      height={sizes[size]}
      viewBox="0 0 474 569"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M473.374 283.002L237.077 568L297.274 210.892L2.00342 282.443L236.602 0.0371094L297.274 210.892L473.374 283.002Z"
        fill={standards[standard][0]}
      />
      <path
        d="M237.035 568.003L1.95874 282.45L297.274 211.007L237.035 568.003Z"
        fill={standards[standard][1]}
      />
      <path
        d="M236.592 0L473.332 283.002L297.274 210.892L236.592 0Z"
        fill={standards[standard][2]}
      />
    </svg>
  );
}
