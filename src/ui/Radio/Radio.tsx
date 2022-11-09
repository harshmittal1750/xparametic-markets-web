import cn from 'classnames';

import { Icon } from 'components';

import RadioClasses from './Radio.module.scss';

export default function Radio(props: React.ComponentPropsWithoutRef<'input'>) {
  const { checked } = props;

  return (
    <span
      className={cn(RadioClasses.root, {
        [RadioClasses.checked]: checked
      })}
    >
      <input type="radio" className={RadioClasses.input} {...props} />
      <Icon
        className={RadioClasses.icon}
        name={checked ? 'CheckFilled' : 'Circle'}
      />
    </span>
  );
}
