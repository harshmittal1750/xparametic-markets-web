import { SVGProps, memo } from 'react';

function VerifiedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" fill="#fff" rx="9" />
      <path
        fill="#7069FA"
        d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9zm-1.125 12.825L7.05 12l1.575-1.575 2.25 2.25 4.5-4.5L16.95 9.75l-6.075 6.075z"
      />
      <rect
        width="21"
        height="21"
        x="1.5"
        y="1.5"
        stroke="#7069FA"
        strokeOpacity="0.4"
        strokeWidth="3"
        rx="10.5"
      />
    </svg>
  );
}

export default memo(VerifiedIcon);
