import { useCallback, useEffect, useRef } from 'react';

import cn from 'classnames';
import { useField, useFormikContext } from 'formik';

import Icon from '../Icon';
import { InputErrorMessage } from '../Input';
import NumberInputClasses from './NumberInput.module.scss';

type NumberInputProps = {
  name: string;
  min: number;
  max: number;
  step?: number;
};

function NumberInput({ name, min, max, step = 1 }: NumberInputProps) {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFieldTouched(name, true);
  }, [name, setFieldTouched]);

  const handleDecrease = useCallback(() => {
    setFieldTouched(name, true, false);
    setFieldValue(name, meta.value - step);
  }, [meta.value, name, setFieldTouched, setFieldValue, step]);

  const handleIncrease = useCallback(() => {
    setFieldTouched(name, true, false);
    setFieldValue(name, meta.value + step);
  }, [meta.value, name, setFieldTouched, setFieldValue, step]);

  const hasError = meta.touched && meta.error;

  return (
    <div className={NumberInputClasses.root}>
      <div
        className={cn(NumberInputClasses.group, {
          [NumberInputClasses.error]: hasError
        })}
      >
        <button
          type="button"
          className={NumberInputClasses.buttonMinus}
          onClick={handleDecrease}
          disabled={meta.value <= min}
        >
          <Icon name="Minus" size="sm" />
        </button>
        <button
          type="button"
          className={NumberInputClasses.buttonPlus}
          onClick={handleIncrease}
          disabled={meta.value >= max}
        >
          <Icon name="Plus" size="sm" />
        </button>
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.focus()}
          onKeyPress={() => inputRef.current?.focus()}
          className={NumberInputClasses.inputGroup}
        >
          <input
            id={name}
            ref={inputRef}
            type="number"
            className={NumberInputClasses.input}
            min={min}
            max={max}
            step="any"
            {...field}
          />
          <span className={NumberInputClasses.inputAdornment}>%</span>
        </div>
      </div>
      {hasError && meta.error ? (
        <InputErrorMessage message={meta.error} />
      ) : null}
    </div>
  );
}

export default NumberInput;
