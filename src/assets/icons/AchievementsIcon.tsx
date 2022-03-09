import { memo } from 'react';

function AchievementsIcon() {
  return (
    <svg
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.025 6.049L7 0H0l4.3 8.6a9.954 9.954 0 015.725-2.551zM11.975 6.049L15 0h7l-4.3 8.6a9.954 9.954 0 00-5.725-2.551zM11 8a8 8 0 100 16 8 8 0 000-16zm2.351 11.618L11 18.382l-2.351 1.236L9.1 17l-1.9-1.854 2.628-.382L11 12.382l1.176 2.382 2.628.382L12.9 17l.451 2.618z" />
    </svg>
  );
}

export default memo(AchievementsIcon);
