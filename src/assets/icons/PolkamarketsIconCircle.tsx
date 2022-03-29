import { SVGProps, memo } from 'react';

function PolkamarketsIconCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <rect width="32" height="32" fill="#F3F4F6" rx="16" />
      <path
        fill="#5751FC"
        d="M15.894 6.912L8.386 15.95l7.522 9.138 7.561-9.12-7.575-9.056z"
      />
      <path
        fill="#3033BE"
        d="M15.908 25.088L8.386 15.95l9.45-2.286-1.928 11.424z"
      />
      <path
        fill="#51A0FC"
        d="M15.894 6.912l7.575 9.056-5.634-2.307-1.941-6.749z"
      />
    </svg>
  );
}

export default memo(PolkamarketsIconCircle);
