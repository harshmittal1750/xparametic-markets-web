import { forwardRef } from 'react';

import cn from 'classnames';

import ContainerClasses from './Container.module.scss';

const Container = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<'div'>
>(function Container({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(ContainerClasses.root, className)}
      {...props}
    />
  );
});

export default Container;
