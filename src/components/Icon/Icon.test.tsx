import { render, screen } from '@testing-library/react';

import Icon from './Icon';
import IconClasses from './Icon.module.scss';

describe('Icon', () => {
  it('renders its default props', () => {
    const { container } = render(<Icon />);

    expect(container.childNodes[0]).toHaveAttribute('viewBox', '0 0 24 24');
    expect(container.childNodes[0]).toHaveAttribute('focusable', 'false');
    expect(container.childNodes[0]).toHaveAttribute('aria-hidden', 'true');
    expect(container.childNodes[0]).toHaveClass(
      IconClasses.root,
      IconClasses.md
    );
  });
  it('renders a path element', () => {
    const path = 'path';
    const { container } = render(
      <Icon>
        <path d={path} />
      </Icon>
    );

    expect(container.childNodes[0].childNodes[0]).toHaveAttribute('d', path);
  });
  it('is accessible if [accessible=true]', () => {
    const title = 'title';
    render(
      <Icon accessible>
        <title>{title}</title>
      </Icon>
    );

    const icon = screen.getByTitle(title);

    expect(icon).toBeInTheDocument();
    expect(icon).not.toHaveAttribute('aria-hidden');
  });
  it('is sizing responsive', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      const { container } = render(<Icon size={size} />);

      expect(container.childNodes[0]).toHaveClass(IconClasses[size]);
    });
  });
});
