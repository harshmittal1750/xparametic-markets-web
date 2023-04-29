import { useEffect, useRef } from 'react';

import { FormikTouched, useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import type { CreateMarketFormData } from '../CreateMarketForm';

function FormikPersist() {
  const { values, setValues, touched, setTouched } =
    useFormikContext<CreateMarketFormData>();

  const valuesRef = useRef<CreateMarketFormData>();
  const touchedValuesRef = useRef<FormikTouched<CreateMarketFormData>>();

  const onSaveValues = async () => {
    window.localStorage.setItem('createMarketValues', JSON.stringify(values));
  };

  const onSaveTouched = () => {
    window.localStorage.setItem('createMarketTouched', JSON.stringify(touched));
  };

  const debouncedOnSaveValues = debounce(onSaveValues, 300);
  const debouncedOnSaveTouched = debounce(onSaveTouched, 300);

  useEffect(() => {
    const savedValues = window.localStorage.getItem('createMarketValues');

    if (savedValues) {
      const parsedValues = JSON.parse(savedValues);

      valuesRef.current = parsedValues;

      setValues(parsedValues);
    }
  }, [setValues]);

  useEffect(() => {
    const savedTouched = window.localStorage.getItem('createMarketTouched');

    if (savedTouched) {
      const parsedTouched = JSON.parse(savedTouched);

      touchedValuesRef.current = parsedTouched;

      setTouched(parsedTouched, false);
    }
  }, [setTouched]);

  useEffect(() => {
    if (!isEqual(valuesRef.current, values)) {
      debouncedOnSaveValues();
    }
  });

  useEffect(() => {
    if (!isEqual(touchedValuesRef.current, touched)) {
      debouncedOnSaveTouched();
    }
  });

  useEffect(() => {
    valuesRef.current = values;
    touchedValuesRef.current = touched;
  });

  return null;
}

export default FormikPersist;
