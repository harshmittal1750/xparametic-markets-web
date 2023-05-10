import { useCallback, useState } from 'react';

import cn from 'classnames';
import { useField } from 'formik';

import { Button } from '../../Button';
import StepSlider from '../../StepSlider';
import Text from '../../Text';
import AmountInputClasses from './AmountInput.module.scss';

type AmountInputProps = Partial<
  Record<'customHeaderItem' | 'endAdornment', React.ReactNode>
> & {
  label: string;
  max: number;
  currency: any;
  disabled?: boolean;
};

function round(value) {
  return Math.floor(value * 1e5) / 1e5;
}

export default function AmountInput({
  label,
  max,
  currency,
  customHeaderItem,
  disabled = false
}: AmountInputProps) {
  const [field, meta, helpers] = useField('liquidity');
  const { value: liquidity } = field;
  const { touched } = meta;
  const [amount, setAmount] = useState(liquidity);

  const handleChangeAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      const newAmount = value ? parseFloat(value) : undefined;

      if (!touched) {
        helpers.setTouched(true);
      }

      helpers.setValue(newAmount || 0);
      setAmount(newAmount);
    },
    [helpers, touched]
  );

  const handleSetMaxAmount = useCallback(() => {
    const roundedMax = round(max);

    if (!touched) {
      helpers.setTouched(true);
    }

    helpers.setValue(roundedMax);
    setAmount(roundedMax);
  }, [helpers, max, touched]);

  const handleChangeSlider = useCallback(
    (value: number) => {
      const percentage = value / 100;
      const newAmount = round(max * percentage);

      if (!touched) {
        helpers.setTouched(true);
      }

      helpers.setValue(newAmount);
      setAmount(newAmount);
    },
    [helpers, max, touched]
  );

  const step = 100 * ((amount || 0) / max);

  return (
    <div className="pm-c-amount-input">
      <div className="pm-c-amount-input__header">
        <label className="pm-c-amount-input__header-title" htmlFor={label}>
          {label}
        </label>
        {!disabled &&
          (customHeaderItem || (
            <div className="pm-c-amount-input__header-wallet">
              <Button
                color="noborder"
                style={{ gap: '0.2rem' }}
                onClick={handleSetMaxAmount}
                disabled={disabled}
              >
                <Text
                  as="strong"
                  scale="tiny"
                  fontWeight="semibold"
                  color="light"
                >
                  {max}
                </Text>
                <Text as="span" scale="tiny" fontWeight="semibold" color="gray">
                  {currency.ticker}
                </Text>
              </Button>
            </div>
          ))}
      </div>
      <div className={AmountInputClasses.root}>
        <input
          className={cn(AmountInputClasses.input, 'pm-c-amount-input__input')}
          type="number"
          id={label}
          value={amount}
          lang="en"
          step="any"
          min={0}
          max={max}
          onChange={handleChangeAmount}
          onWheel={event => event.currentTarget.blur()}
          disabled={disabled}
        />
        <Button
          className={AmountInputClasses.maxAction}
          variant="subtle"
          onClick={handleSetMaxAmount}
          disabled={disabled}
        >
          Max
        </Button>
      </div>
      <StepSlider
        currentValue={step}
        onChange={value => handleChangeSlider(value)}
        disabled={disabled}
      />
    </div>
  );
}
