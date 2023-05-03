import { useEffect, useRef } from 'react';

import { FormikTouched, useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { changeCreateMarketToken } from 'redux/ducks/polkamarkets';
import type { Currency } from 'types/currency';
import type { Token } from 'types/token';

import { useAppDispatch, useAppSelector } from 'hooks';

import type { CreateMarketFormData } from '../CreateMarketForm';

type FormikPersistProps = {
  currentStep: number;
  onChangeCurrentStep: (step: number) => void;
};

function FormikPersist({
  currentStep,
  onChangeCurrentStep
}: FormikPersistProps) {
  const { values, setValues, touched, setTouched } =
    useFormikContext<CreateMarketFormData>();

  const token = useAppSelector(state => state.polkamarkets.createMarketToken);
  const dispatch = useAppDispatch();

  const valuesRef = useRef<CreateMarketFormData>();
  const touchedValuesRef = useRef<FormikTouched<CreateMarketFormData>>();
  const currentStepRef = useRef<number>();
  const tokenRef = useRef<Currency | Token | null>();

  const onSaveValues = async () => {
    window.localStorage.setItem('createMarketValues', JSON.stringify(values));
  };

  const onSaveTouched = () => {
    window.localStorage.setItem('createMarketTouched', JSON.stringify(touched));
  };

  const onSaveCurrentStep = () => {
    window.localStorage.setItem(
      'createMarketCurrentStep',
      currentStep.toString()
    );
  };

  const onSaveToken = () => {
    window.localStorage.setItem('createMarketToken', JSON.stringify(token));
  };

  const debouncedOnSaveValues = debounce(onSaveValues, 300);
  const debouncedOnSaveTouched = debounce(onSaveTouched, 300);
  const debouncedOnSaveCurrentStep = debounce(onSaveCurrentStep, 300);
  const debouncedOnSaveToken = debounce(onSaveToken, 300);

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
    const savedCurrentStep = window.localStorage.getItem(
      'createMarketCurrentStep'
    );

    if (savedCurrentStep) {
      const parsedCurrentStep = parseInt(savedCurrentStep, 10);

      currentStepRef.current = parsedCurrentStep;

      onChangeCurrentStep(parsedCurrentStep);
    }
  }, [onChangeCurrentStep]);

  useEffect(() => {
    const savedToken = window.localStorage.getItem('createMarketToken');

    if (savedToken) {
      const parsedToken = JSON.parse(savedToken);

      tokenRef.current = parsedToken;

      dispatch(changeCreateMarketToken(parsedToken));
    }
  }, [dispatch]);

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
    if (currentStepRef.current !== currentStep) {
      debouncedOnSaveCurrentStep();
    }
  });

  useEffect(() => {
    if (!isEqual(tokenRef.current, token)) {
      debouncedOnSaveToken();
    }
  });

  useEffect(() => {
    valuesRef.current = values;
    touchedValuesRef.current = touched;
    currentStepRef.current = currentStep;
    tokenRef.current = token;
  });

  return null;
}

export default FormikPersist;
