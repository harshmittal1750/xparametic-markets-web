import { useEffect, useRef } from 'react';

import { FormikTouched, useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

function FormikPersist<T>({ name }) {
  const { values, setValues, touched, setTouched } = useFormikContext<T>();
  const valuesRef = useRef<T>();
  const touchedValuesRef = useRef<FormikTouched<T>>();

  const onSave = () => {
    window.localStorage.setItem(`${name}Values`, JSON.stringify(values));
    window.localStorage.setItem(`${name}Touched`, JSON.stringify(touched));
  };

  const debouncedOnSave = debounce(onSave, 300);

  useEffect(() => {
    const savedValues = window.localStorage.getItem(`${name}Values`);
    const savedTouched = window.localStorage.getItem(`${name}Touched`);

    if (savedValues && savedTouched) {
      const parsedValues = JSON.parse(savedValues);
      const parsedTouched = JSON.parse(savedTouched);

      valuesRef.current = parsedValues;
      touchedValuesRef.current = parsedTouched;

      setValues(parsedValues);
      setTouched(parsedTouched, false);
    }
  }, [name, setTouched, setValues]);

  useEffect(() => {
    if (
      !isEqual(valuesRef.current, values) ||
      !isEqual(touchedValuesRef.current, touched)
    ) {
      debouncedOnSave();
    }
  });

  useEffect(() => {
    valuesRef.current = values;
    touchedValuesRef.current = touched;
  });

  return null;
}

export default FormikPersist;
