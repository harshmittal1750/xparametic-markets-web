import { SVGProps, memo } from 'react';

function CaretDownFilledIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="13"
      fill="none"
      viewBox="0 0 12 13"
      {...props}
    >
      <path d="M5.435 8.855L1.838 4.743A.75.75 0 012.403 3.5h7.194a.75.75 0 01.565 1.244l-3.597 4.11a.75.75 0 01-1.13 0v.001z" />
    </svg>
  );
}

export default memo(CaretDownFilledIcon);
