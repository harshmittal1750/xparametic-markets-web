import { useState, useEffect } from 'react';

import { WalletIcon } from 'assets/icons';

import { Button } from '../Button';
import StepSlider from '../StepSlider';
import Text from '../Text';

type AmountInputProps = Partial<
  Record<'customHeaderItem' | 'endAdornment', React.ReactNode>
> & {
  label: string;
  max: number;
  onChange(value: number): void;
  currency: any;
  disabled?: boolean;
};

function round(value) {
  return Math.floor(value * 1e5) / 1e5;
}

/**
 * TODO: SEE IMPACT
 */
export default function AmountInput({
  label,
  max,
  onChange,
  currency,
  customHeaderItem,
  disabled = false,
  endAdornment
}: AmountInputProps) {
  const [amount, setAmount] = useState(0);
  const [stepAmount, setStepAmount] = useState(0);

  useEffect(() => {
    onChange(0);
    setAmount(0);
    setStepAmount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max]);

  function handleChangeAmount(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(event.currentTarget.value);

    setAmount(value);
    setStepAmount(100 * ((value || 0) / max));
    onChange(value || 0);
  }
  function handleSetMaxAmount() {
    const roundedMax = round(max);

    setAmount(roundedMax);
    setStepAmount(100);
    onChange(roundedMax);
  }
  function handleChangeSlider(value: number) {
    const percentage = value / 100;
    const newAmount = round(max * percentage);

    setAmount(newAmount);
    onChange(newAmount);
    setStepAmount(value);
  }

  return (
    <div className="pm-c-amount-input">
      <div className="pm-c-amount-input__header">
        <label className="pm-c-amount-input__header-title" htmlFor={label}>
          {label}
        </label>
        {!disabled &&
          (customHeaderItem || (
            <div className="pm-c-amount-input__header-wallet">
              <figure aria-label="Wallet">
                <WalletIcon />
              </figure>
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
      <div className="pm-c-amount-input__group">
        <input
          className="pm-c-amount-input__input"
          type="number"
          id={label}
          value={amount}
          lang="en"
          step=".0001"
          min={0}
          max={max}
          onChange={handleChangeAmount}
          onWheel={event => event.currentTarget.blur()}
          disabled={disabled}
        />
        <div className="pm-c-amount-input__actions">
          <button
            type="button"
            onClick={handleSetMaxAmount}
            disabled={disabled}
          >
            Max
          </button>
          {endAdornment}
        </div>
      </div>
      <StepSlider
        currentValue={stepAmount}
        onChange={value => handleChangeSlider(value)}
        disabled={disabled}
      />
    </div>
  );
}
