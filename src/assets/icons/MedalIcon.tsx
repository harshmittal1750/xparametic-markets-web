import { SVGProps, memo } from 'react';

function MedalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 12 12"
      {...props}
    >
      <g clipPath="url(#clip0_2108_45504)">
        <path d="M5.513 3.025L4 0H.5l2.15 4.3a4.977 4.977 0 012.863-1.275zM6.487 3.025L8 0h3.5L9.35 4.3a4.977 4.977 0 00-2.863-1.275zM6 4a4 4 0 100 8 4 4 0 000-8zm1.176 5.809L6 9.191l-1.176.618L5.05 8.5l-.95-.927 1.314-.191L6 6.191l.588 1.191 1.314.191-.952.927.226 1.309z" />
      </g>
    </svg>
  );
}

export default memo(MedalIcon);
