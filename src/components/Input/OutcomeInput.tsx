import { forwardRef, InputHTMLAttributes, useMemo } from 'react';

import cn from 'classnames';
import { getIn, useField, useFormikContext } from 'formik';
import { colorByOutcomeId } from 'helpers/color';

import Badge from '../Badge';
import InputErrorMessage from './InputErrorMessage';

type OutcomeInputProps = {
  outcomeId: string;
};

const OutcomeInput = forwardRef<
  HTMLInputElement,
  OutcomeInputProps & InputHTMLAttributes<HTMLInputElement>
>(({ outcomeId, ...props }, ref) => {
  const { values } = useFormikContext();

  const outcomes = getIn(values, 'outcomes');

  const outcomeIndex = useMemo(
    () => outcomes.indexOf(outcomes.find(outcome => outcome.id === outcomeId)),
    [outcomes, outcomeId]
  );

  const fieldByOutcomeIndex = `outcomes[${outcomeIndex}].name`;

  const [field, meta] = useField(fieldByOutcomeIndex);

  const hasError = meta.touched && meta.error;

  return (
    <div className="pm-c-outcome-input--default__group">
      <div
        className={cn({
          'pm-c-outcome-input--error__wrapper': hasError,
          'pm-c-outcome-input--default__wrapper': !hasError
        })}
      >
        <Badge color={colorByOutcomeId(outcomeIndex)} />
        <input
          id={fieldByOutcomeIndex}
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
