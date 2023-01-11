import { forwardRef, InputHTMLAttributes } from 'react';

import cn from 'classnames';
import { useField } from 'formik';

import InputErrorMessage from './InputErrorMessage';

type OutcomeInputProps = {
  name: string;
};

const OutcomeInput = forwardRef<
  HTMLInputElement,
  OutcomeInputProps & InputHTMLAttributes<HTMLInputElement>
>(({ name, ...props }, ref) => {
  const [outcomesField] = useField('outcomes');

  const outcomes = outcomesField.value;

  const outcomeIndex = outcomes.indexOf(
    outcomesField.value.find(outcome => outcome.id === name)
  );

  const [field, meta] = useField(`outcomes[${outcomeIndex}].name`);

  const hasError = meta.touched && meta.error;

  return (
    <div className="pm-c-outcome-input--default__group">
      <div
        className={cn({
          'pm-c-outcome-input--error__wrapper': hasError,
          'pm-c-outcome-input--default__wrapper': !hasError
        })}
      >
        <input
          id={`outcomes[${outcomeIndex}].name`}
          ref={ref}
          className={cn({
            'pm-c-outcome-input--error': hasError,
            'pm-c-outcome-input--default': !hasError
          })}
          {...field}
          {...props}
        />
      </div>
      {hasError && meta.error ? (
        <InputErrorMessage message={meta.error} />
      ) : null}
    </div>
  );
});

OutcomeInput.displayName = 'OutcomeInput';

export default OutcomeInput;
