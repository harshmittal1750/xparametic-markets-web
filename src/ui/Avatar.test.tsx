import { render, screen } from '@testing-library/react';

import Avatar from './Avatar';
import type { AvatarProps } from './Avatar';
import avatarClasses from './Avatar.module.scss';

function renderAvatar(props: AvatarProps) {
  render(<Avatar src="" aria-label="avatar" {...props} />);

  return screen.getByRole('img', { name: /avatar/i });
}
it(`render [$size=sm] classes`, () => {
  const avatar = renderAvatar({ $size: 'sm' });

  expect(avatar).toHaveClass(avatarClasses.sizeSm);
});
it(`render [$size=md] classes`, () => {
  const avatar = renderAvatar({ $size: 'md' });

  expect(avatar).toHaveClass(avatarClasses.sizeMd);
});
it(`render [$size=lg] classes`, () => {
  const avatar = renderAvatar({ $size: 'lg' });

  expect(avatar).toHaveClass(avatarClasses.sizeLg);
});
it(`render [$radius=sm] classes`, () => {
  const avatar = renderAvatar({ $radius: 'sm' });

  expect(avatar).toHaveClass(avatarClasses.radiusSm);
});
it(`render [$radius=md] classes`, () => {
  const avatar = renderAvatar({ $radius: 'md' });

  expect(avatar).toHaveClass(avatarClasses.radiusMd);
});
it(`render [$radius=lg] classes`, () => {
  const avatar = renderAvatar({ $radius: 'lg' });

  expect(avatar).toHaveClass(avatarClasses.radiusLg);
});
