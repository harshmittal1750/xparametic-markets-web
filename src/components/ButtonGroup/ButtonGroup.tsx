/* eslint-disable no-unused-vars */
import React, { useState, ReactNode } from 'react';

import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

type ButtonColor = 'default' | 'primary' | 'success' | 'danger';

type Button = {
  /**
   * Unique id of this button
   */
  id: string;
  /**
   * Name of this button
   */
  name: string | ReactNode;
  /**
   * Color of the component
   * @default 'default'
   */
  color: ButtonColor;
  enabled?: boolean;
};

type ButtonGroupSize = 'normal' | 'sm' | 'lg';

type ButtonGroupComponents = 'group' | 'button';

type ButtonGroupProps = {
  /**
   * Id of the default active button
   */
  defaultActiveId: string;
  /**
   * Array of buttons to be displayed
   */
  buttons: Button[];
  /**
   * The callback function triggered when click on button
   */
  /**
   * Size of the buttons
   * @default 'normal'
   */
  size?: ButtonGroupSize;
  /**
   * Shows a full width group
   */
  fullwidth?: boolean;
  onChange: (id: string) => void;
  /**
   * Aditional styles
   */
  style?: React.CSSProperties;
  className?: Partial<Record<ButtonGroupComponents, string>>;
};

function ButtonGroup({
  defaultActiveId,
  buttons,
  size = 'normal',
  fullwidth = false,
  onChange,
  style,
  className
}: ButtonGroupProps) {
  const initialState =
    buttons.find(button => button.id === defaultActiveId) || buttons[0];

  const [activeButton, setActiveButton] = useState(initialState);

  if (isUndefined(defaultActiveId) || isEmpty(buttons)) return null;

  function handleChangeActiveButton(button: Button) {
    setActiveButton(button);
    onChange(button.id);
  }

  return (
    <div
      className={classNames(
        {
          [`pm-c-button-group--${activeButton.color}`]: true,
          [`pm-c-button-group--${size}`]: true,
          'pm-c-button-group--fullwidth': fullwidth
        },
        className?.group
      )}
      style={style}
    >
      {buttons
        ?.filter(button => button.enabled ?? true)
        .map(button => (
          <button
            type="button"
            key={button.id}
            id={button.id}
            name={button.id}
            className={classNames(
              {
                'pm-c-button-group__item': true,
                active: button.id === activeButton.id
              },
              className?.button
            )}
            onClick={() => handleChangeActiveButton(button)}
          >
            {button.name}
          </button>
        ))}
    </div>
  );
}

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
