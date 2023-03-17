import 'react-datepicker/dist/react-datepicker.css';
import { DateTimePickerProps, DateTimePicker } from '@material-ui/pickers';
import { useField, useFormikContext } from 'formik';
import styled from 'styled-components';
import { ThemeProps, isThemeDark, useTheme } from 'ui';

import InputErrorMessage from './InputErrorMessage';

type StyledDateTimePickerProps = { theme: ThemeProps; $hasError: boolean };

const StyledDateTimePicker = styled(DateTimePicker)<StyledDateTimePickerProps>`
  .MuiOutlinedInput-input {
    padding: 1.2rem;

    font-family: 'Gilroy', sans-serif;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -0.014rem;

    color: ${props =>
      isThemeDark(props.theme.device.mode) ? '#f9fafb' : '#171b23'};
    border: 0.1rem solid transparent;

    &:hover,
    &:focus {
      border: 0.1rem solid transparent;
    }
  }

  .MuiOutlinedInput-root {
    outline: none;
    border: 0.1rem solid
      ${props => {
        if (props.$hasError) return '#e12d39';
        if (isThemeDark(props.theme.device.mode)) return '#252c3b';
        return '#e0e2e7';
      }};
    transition: 0.2s border ease-out;

    &:hover {
      outline: none;
      border: 0.1rem solid
        ${props => {
          if (props.$hasError) return '#e12d39';
          if (isThemeDark(props.theme.device.mode)) return '#637084';
          return '#c2cad6';
        }};
    }

    &.Mui-focused fieldset {
      outline: none;
      border: none;
    }

    &.Mui-selected {
      outline: none;
      border: none;
    }
  }
`;

interface DateInputProps
  extends Omit<DateTimePickerProps, 'value' | 'onChange'> {
  label?: string;
  name: string;
  description?: string;
}

function DateInput({ label, name, description, ...props }: DateInputProps) {
  const theme = useTheme();
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const hasError = meta.touched && meta.error;

  function handleChange(date) {
    setFieldValue(name, new Date(date));
  }

  return (
    <div className="pm-c-date-input__group">
      {!!label && (
        <label
          htmlFor={name}
          className={`pm-c-date-input__label--${
            hasError ? 'error' : 'default'
          }`}
        >
          {label}
        </label>
      )}
      <StyledDateTimePicker
        theme={theme}
        $hasError={!!hasError}
        inputVariant="outlined"
        disablePast
        error={false}
        helperText={null}
        ampm
        format="DD/MM/YYYY, hh:mm a"
        emptyLabel="DD/MM/YYYY, --:-- --"
        value={field.value}
        onChange={date => handleChange(date)}
        {...props}
      />
      {hasError && meta.error ? (
        <InputErrorMessage message={meta.error} />
      ) : null}
      {description && !hasError ? (
        <span className="pm-c-input__description">{description}</span>
      ) : null}
    </div>
  );
}

export default DateInput;
