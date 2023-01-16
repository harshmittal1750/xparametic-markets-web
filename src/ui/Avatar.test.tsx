import { render, screen } from '@testing-library/react';

import Avatar, { avatarProps } from './Avatar';
import avatarClasses from './Avatar.module.scss';

it('render [$size] classes', () => {
  avatarProps.$size.forEach($size => {
    const name = `size ${$size}`;

    render(<Avatar src="" aria-label={name} $size={$size} />);
    expect(screen.getByRole('img', { name })).toHaveClass(
      {
        sm: avatarClasses.sizeSm,
        md: avatarClasses.sizeMd,
        lg: avatarClasses.sizeLg
      }[$size]
    );
  });
});
it('render [$radius] classes', () => {
  avatarProps.$radius.forEach($rad => {
    const name = `radius ${$rad}`;

    render(<Avatar src="" aria-label={name} $radius={$rad} />);
    expect(screen.getByRole('img', { name })).toHaveClass(
      {
        sm: avatarClasses.radiusSm,
        md: avatarClasses.radiusMd,
        lg: avatarClasses.radiusLg
      }[$rad]
    );
  });
});
