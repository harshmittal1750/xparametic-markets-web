import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useMemo, useState } from 'react';

import { DatePickerProps } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useTheme } from 'ui';

import { Text } from 'components';

import RangePickerClasses from './RangePicker.module.scss';
import StyledDatePicker from './RangePicker.styles';

type RangePickerProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  onChange: (range: {
    start: MaterialUiPickersDate;
    end: MaterialUiPickersDate;
  }) => void;
  shouldCallOnChange?: boolean;
  disabled?: boolean;
};

function RangePicker({
  onChange,
  shouldCallOnChange = false,
  disabled = false,
  ...props
}: RangePickerProps) {
  const theme = useTheme();

  const [startDate, setStartDate] = useState<MaterialUiPickersDate>(null);
  const [endDate, setEndDate] = useState<MaterialUiPickersDate>(null);

  useEffect(() => {
    if (startDate || endDate) {
      onChange({
        start: startDate ? startDate.startOf('day') : startDate,
        end: endDate ? endDate.endOf('day') : endDate
      });
    }
  }, [startDate, endDate, onChange]);

  useEffect(() => {
    if (shouldCallOnChange && (startDate || endDate)) {
      onChange({
        start: startDate ? startDate.startOf('day') : null,
        end: endDate ? endDate.endOf('day') : null
      });
    }
  }, [endDate, onChange, shouldCallOnChange, startDate]);

  const error = useMemo(() => {
    if (startDate && endDate && startDate.isAfter(endDate))
      return 'Start must be before end';

    return null;
  }, [endDate, startDate]);

  return (
    <div className={RangePickerClasses.rangePicker}>
      <div className={RangePickerClasses.rangePickerGroup}>
        <StyledDatePicker
          name="start"
          theme={theme}
          variant="inline"
          inputVariant="outlined"
          disableToolbar
          autoOk
          $hasError={!!error}
          helperText={null}
          format="DD/MM/YYYY"
          emptyLabel="Start Date"
          value={startDate}
          onChange={date => setStartDate(date)}
          disabled={disabled}
          {...props}
        />
        <StyledDatePicker
          name="end"
          theme={theme}
          variant="inline"
          inputVariant="outlined"
          disableToolbar
          autoOk
          $hasError={!!error}
          helperText={null}
          format="DD/MM/YYYY"
          emptyLabel="End Date"
          value={endDate}
          onChange={date => setEndDate(date)}
          disabled={disabled}
          {...props}
        />
      </div>
      {error ? (
        <Text
          as="span"
          scale="tiny"
          fontWeight="medium"
          className="pm-c-input__error-message"
        >
          {error}
        </Text>
      ) : null}
    </div>
  );
}

export default RangePicker;
