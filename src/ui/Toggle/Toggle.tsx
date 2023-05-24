import { forwardRef } from 'react';

import cn from 'classnames';

import { Icon } from 'components';

import ToggleClasses from './Toggle.module.scss';

type ReactInputProps = React.ComponentPropsWithoutRef<'input'>;

type Ref = HTMLInputElement;

type ToggleProps = Omit<ReactInputProps, 'type'> & {
  type: Extract<ReactInputProps['type'], 'radio' | 'checkbox'>;
};

const Toggle = forwardRef<Ref, ToggleProps>(
  ({ type, checked, ...props }, ref) => {
    const renderIconName = {
      checkbox: checked ? 'CheckboxFilled' : 'Checkbox',
      radio: checked ? 'RadioFilled' : 'Radio'
    } as const;

    return (
      <span
        className={cn(ToggleClasses.root, {
          [ToggleClasses.checked]: checked
        })}
      >
        <input
          ref={ref}
          type={type}
          checked={checked}
          className={ToggleClasses.input}
          {...props}
        />
        <Icon className={ToggleClasses.icon} name={renderIconName[type]} />
      </span>
    );
  }
);

export default Toggle;
