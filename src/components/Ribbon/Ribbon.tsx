import { ReactNode } from 'react';

import type { CategoricalColor } from 'helpers/color';

import Text from '../Text';

export type RibbonColor =
  | 'pink'
  | 'blue'
  | 'purple'
  | 'warning'
  | 'success'
  | CategoricalColor;

type RibbonProps = {
  color?: RibbonColor;
  icon?: ReactNode;
  text?: string;
};

function Ribbon({ color = 'pink', icon, text }: RibbonProps) {
  return (
    <div className={`pm-c-ribbon--${color}`}>
      {icon || null}
      {text ? (
        <Text
          as="span"
          scale="tiny-uppercase"
          fontWeight="semibold"
          className="pm-c-ribbon__text"
        >
          {text}
        </Text>
      ) : null}
    </div>
  );
}

export default Ribbon;
