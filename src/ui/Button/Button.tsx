import { forwardRef } from 'react';

import cn from 'classnames';

import ButtonClasses from './Button.module.scss';
import { ButtonProps } from './Button.type';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, $variant, $color, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        ButtonClasses.root,
        {
          [ButtonClasses.outlined]: $variant === 'outlined',
          [ButtonClasses.text]: $color === 'text'
        },
        className
      )}
      {...props}
    />
  );
});

export default Button;
