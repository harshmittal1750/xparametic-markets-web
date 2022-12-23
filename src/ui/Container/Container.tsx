import cn from 'classnames';

import ContainerClasses from './Container.module.scss';

export default function Container({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return <div className={cn(ContainerClasses.root, className)} {...props} />;
}
