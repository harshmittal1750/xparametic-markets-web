import cn from 'classnames';

import { Icon } from 'components';

import ToggleClasses from './Toggle.module.scss';

export default function Toggle(props: React.ComponentPropsWithoutRef<'input'>) {
  const { checked } = props;

  return (
    <span
      className={cn(ToggleClasses.root, {
        [ToggleClasses.checked]: checked
      })}
    >
      <input type="radio" className={ToggleClasses.input} {...props} />
      <Icon
        className={ToggleClasses.icon}
        name={checked ? 'CheckFilled' : 'Circle'}
      />
    </span>
  );
}
