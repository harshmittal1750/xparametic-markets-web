import { forwardRef, InputHTMLAttributes } from 'react';

import cn from 'classnames';
import { useField } from 'formik';

import Text from '../Text';
import InputErrorMessage from './InputErrorMessage';

type ProbabilityInputProps = {
  name: string;
};

const ProbabilityInput = forwardRef<
  HTMLInputElement,
  ProbabilityInputProps & InputHTMLAttributes<HTMLInputElement>
>(({ name, ...props }, ref) => {
  const [outcomesField] = useField('outcomes');

  const outcomes = outcomesField.value;

  const outcomeIndex = outcomes.indexOf(
    outcomesField.value.find(outcome => outcome.id === name)
  );

  const [field, meta] = useField(`outcomes[${outcomeIndex}].probability`);

  const hasError = meta.touched && meta.error;

  return (
    <div className="pm-c-probability-input--default__group">
      <div
        className={cn({
          'pm-c-probability-input--error__wrapper': hasError,
          'pm-c-probability-input--default__wrapper': !hasError
        })}
      >
        <input
          id={`outcomes[${outcomeIndex}].probability`}
          ref={ref}
          type="number"
          min={0}
          max={100}
          step={0.1}
          onWheel={event => event.currentTarget.blur()}
          className={cn({
            'pm-c-probability-input--error': hasError,
            'pm-c-probability-input--default': !hasError
          })}
          {...field}
          {...props}
        />
        <Text as="span" scale="caption" fontWeight="medium" color="primary">
          %
        </Text>
      </div>
      {hasError && meta.error ? (
        <InputErrorMessage message={meta.error} />
      ) : null}
    </div>
  );
});

ProbabilityInput.displayName = 'ProbabilityInput';

export default ProbabilityInput;
