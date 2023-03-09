import { ComponentPropsWithoutRef, memo } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  size?: string | number;
  ticker: string;
};

function TokenIcon({ size = 16, ticker, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        verticalAlign: 'middle'
      }}
      {...props}
    >
      <path
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
        fill="var(--color-bg-4)"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fontSize="8"
        fill="var(--color-text-primary)"
        stroke="var(--color-text-primary)"
        strokeWidth=".4"
        dy=".3em"
      >
        {ticker.slice(0, 3).toUpperCase()}
      </text>
    </svg>
  );
}

export default memo(TokenIcon);
