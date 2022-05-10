import { SVGProps, memo } from 'react';

function RankUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <rect
        width="20"
        height="20"
        y="0"
        fill="#fff"
        fillOpacity="0.1"
        rx="10"
      />
      <g clipPath="url(#clip0_2442_57777)">
        <path
          fill="#3EBD93"
          d="M10 5.75c-.204 0-.396.1-.512.267l-4.375 6.25a.625.625 0 00.512.983h8.75a.624.624 0 00.512-.983l-4.375-6.25A.622.622 0 0010 5.75h-.002c.001 0 .001 0 0 0z"
        />
      </g>
      <defs>
        <clipPath id="clip0_2442_57777">
          <path fill="#fff" d="M0 0H10V10H0z" transform="translate(5 4.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default memo(RankUpIcon);
