import React from 'react';

import classNames from 'classnames';

export type LinkVariant = 'information' | 'success' | 'warning' | 'error';

export type LinkScale =
  | 'heading-large'
  | 'heading'
  | 'body'
  | 'caption'
  | 'tiny'
  | 'tiny-uppercase';

export type LinkFontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type LinkProps = {
  title: string;
  href: string;
  variant?: LinkVariant;
  scale?: LinkScale;
  fontWeight?: LinkFontWeight;
};

const Link = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(
  (
    {
      title,
      href,
      variant = 'information',
      scale = 'caption',
      fontWeight = 'medium',
      className,
      ...props
    },
    ref
  ) => (
    <a
      ref={ref}
      href={href}
      className={classNames(
        `pm-c-link--${variant}`,
        scale,
        fontWeight,
        className
      )}
      {...props}
    >
      {title}
    </a>
  )
);

Link.displayName = 'Link';

export default Link;
