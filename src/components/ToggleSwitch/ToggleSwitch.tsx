import { ComponentPropsWithoutRef, forwardRef } from 'react';

type ToggleSwitchProps = ComponentPropsWithoutRef<'input'>;

type Ref = HTMLInputElement;

const ToggleSwitch = forwardRef<Ref, ToggleSwitchProps>(
  ({ id, ...props }, ref) => {
    return (
      <label className="toggle-switch" htmlFor={id}>
        <input ref={ref} type="checkbox" id={id} {...props} />
        <span className="slider" />
      </label>
    );
  }
);

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
