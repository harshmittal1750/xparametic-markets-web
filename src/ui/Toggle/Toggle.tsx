import cn from 'classnames';

import { Icon } from 'components';

import ToggleClasses from './Toggle.module.scss';

export default function Toggle(props: React.ComponentPropsWithoutRef<'input'>) {
  const { checked, type } = props;
  const renderIcon = {
    checkbox: checked ? 'CheckboxFilled' : 'Checkbox',
    radio: checked ? 'RadioFilled' : 'Radio'
  } as const;

  return (
    <span
      className={cn(ToggleClasses.root, {
        [ToggleClasses.checked]: checked
      })}
    >
      <input type="radio" className={ToggleClasses.input} {...props} />
      <Icon className={ToggleClasses.icon} name={renderIcon[type!]} />
    </span>
  );
}
