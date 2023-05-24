import type React from 'react';
import { createElement, forwardRef } from 'react';

import cn from 'classnames';

import HeroClasses from './Hero.module.scss';

type HeroProps = {
  $image?: React.CSSProperties['backgroundImage'];
  $rounded?: boolean;
  $backdrop?: 'main' | (string & {});
} & (
  | ({ $as?: 'div' } & Pick<
      React.ComponentPropsWithRef<'div'>,
      'className' | 'style' | 'children'
    >)
  | ({
      $as?: 'a';
    } & Pick<
      React.ComponentPropsWithRef<'a'>,
      'className' | 'style' | 'children' | 'href' | 'target'
    >)
);

function isMain(params: HeroProps['$backdrop']): params is 'main' {
  return params === 'main';
}

export default forwardRef(function Hero(
  { $image, $rounded, $backdrop, $as, className, style, ...props }: HeroProps,
  ref: React.Ref<Element>
) {
  return createElement($as || 'div', {
    ref,
    className: cn(
      HeroClasses.root,
      {
        [HeroClasses.rounded]: $rounded,
        [HeroClasses.backdropMain]: isMain($backdrop),
        [HeroClasses.backdropCustom]: !isMain($backdrop)
      },
      className
    ),
    style: {
      '--hero-image': `url('${$image}')`,
      ...(!isMain($backdrop) && {
        '--hero-backdrop-color': $backdrop
      }),
      ...style
    },
    ...props
  });
});
