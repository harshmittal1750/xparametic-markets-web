import { CSSProperties, ReactNode, createElement } from 'react';

import classNames from 'classnames';

type TextType =
  | 'p'
  | 'span'
  | 'br'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'strong'
  | 'em'
  | 'blockquote'
  | 'q'
  | 'hr'
  | 'code'
  | 'pre'
  | 'mark'
  | 'ins'
  | 'del'
  | 'sup'
  | 'sub'
  | 'small'
  | 'label'
  | 'i'
  | 'b';

type TextFontSize = 'heading-1' | 'heading-2';

type TextFontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type TextColor =
  | '1'
  | '2'
  | '3'
  | 'inverse'
  | 'warning'
  | 'violetes-are-blue'
  | 'maximum-blue-green';

type TextProps = {
  as?: TextType;
  fontSize?: TextFontSize;
  fontWeight?: TextFontWeight;
  color?: TextColor;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

function Text({
  as = 'p',
  fontSize = 'heading-1',
  fontWeight = 'regular',
  color,
  className,
  style,
  children
}: TextProps) {
  return createElement(
    as,
    {
      className: classNames(
        className,
        `text-${fontSize}`,
        `font-${fontWeight}`,
        color && `text-${color}`
      ),
      style
    },
    children
  );
}

export default Text;
