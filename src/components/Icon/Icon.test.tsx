import { render, screen } from '@testing-library/react';
import arrsAreEqual from 'helpers/arrsAreEqual';

import Icon from './Icon';
import IconClasses from './Icon.module.scss';
import { ICONS } from './Icon.utils';

let iconNames: Array<string> = [];

beforeAll(() => {
  iconNames = Object.keys(ICONS);
});
afterAll(() => {
  iconNames = [];
});
describe('Icon', () => {
  it('renders its paths throught namespace', () => {
    const iconNamespaces = Object.keys(Icon).filter(
      iconNamespace =>
        iconNamespace.charAt(0) !== iconNamespace.toUpperCase() &&
        iconNamespace !== 'displayName'
    );

    expect(iconNamespaces.length).toEqual(iconNames.length);
    expect(arrsAreEqual(iconNamespaces, iconNames)).toBe(true);
  });
  it('renders its paths elements', () => {
    iconNames.forEach(iconName => {
      const CurrentIcon = Icon[iconName];
      const { container } = render(<CurrentIcon />);

      expect(container.childNodes[0].childNodes[0]).toHaveAttribute(
        'd',
        ICONS[iconName]
      );
    });
  });
  it('renders its default props', () => {
    const { container } = render(<Icon.Menu />);

    expect(container.childNodes[0]).toHaveAttribute('viewBox', '0 0 24 24');
    expect(container.childNodes[0]).toHaveAttribute('focusable', 'false');
    expect(container.childNodes[0]).toHaveAttribute('aria-hidden', 'true');
    expect(container.childNodes[0]).toHaveClass(
      IconClasses.root,
      IconClasses.md
    );
  });
  it('is accessible if [accessible=true]', () => {
    render(<Icon.Menu accessible />);

    const iconMenu = screen.getByTitle('Menu');

    expect(iconMenu).toBeInTheDocument();
    expect(iconMenu).not.toHaveAttribute('aria-hidden');
  });
  it('is sizing responsive', () => {
    const sizes = ['sm', 'md'] as const;

    sizes.forEach(size => {
      const { container } = render(<Icon.Menu size={size} />);

      expect(container.childNodes[0]).toHaveClass(IconClasses[size]);
    });
  });
});
