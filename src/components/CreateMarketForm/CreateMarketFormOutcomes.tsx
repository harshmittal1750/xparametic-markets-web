import { useCallback, useState, Fragment } from 'react';
import uuid from 'react-uuid';

import cn from 'classnames';
import { useField, useFormikContext } from 'formik';

import { Button } from 'components/Button';
import { OutcomeInput, ProbabilityInput } from 'components/Input';

import CreateMarketFormOutcomesClasses from './CreateMarketFormOutcomes.module.scss';
import { ProbabilityDistribution } from './CreateMarketFormOutcomes.type';

function CreateMarketFormOutcomes() {
  const [probabilityDistribution, setProbabilityDistribution] =
    useState<ProbabilityDistribution>('uniform');

  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField('outcomes');

  const toggleProbabilityDistribution = useCallback(() => {
    if (probabilityDistribution === 'uniform') {
      setProbabilityDistribution('manual');
    } else {
      setProbabilityDistribution('uniform');
      const values = [...field.value];

      const probability = (100 / (values.length + 1)).toFixed(2);

      values.forEach((_outcome, outcomeIndex) => {
        values[outcomeIndex].probability = probability;
      });

      setFieldValue('outcomes', values);
      setFieldTouched('outcomes', true, true);
    }
  }, [field.value, probabilityDistribution, setFieldTouched, setFieldValue]);

  const handleAddOutcome = useCallback(() => {
    const values = [...field.value];

    if (probabilityDistribution === 'manual') {
      setFieldValue('outcomes', [
        ...values,
        { id: uuid(), name: '', probability: 0 }
      ]);
    } else {
      const probability = (100 / (values.length + 1)).toFixed(2);

      values.forEach((_outcome, outcomeIndex) => {
        values[outcomeIndex].probability = probability;
      });

      setFieldValue('outcomes', [
        ...values,
        { id: uuid(), name: '', probability }
      ]);
      setFieldTouched('outcomes', true, true);
    }
  }, [field.value, probabilityDistribution, setFieldTouched, setFieldValue]);

  const handleRemoveOutcome = useCallback(
    (index: number) => {
      const values = [...field.value];
      values.splice(index, 1);

      if (probabilityDistribution === 'uniform') {
        const probability = (100 / values.length).toFixed(2);

        values.forEach((_outcome, outcomeIndex) => {
          values[outcomeIndex].probability = probability;
        });
      }

      setFieldValue('outcomes', values);
      setFieldTouched('outcomes', true, true);
    },
    [field.value, probabilityDistribution, setFieldTouched, setFieldValue]
  );

  const hasMoreThanTwoOutcomes = field.value.length > 2;

  return (
    <div>
      <div className={CreateMarketFormOutcomesClasses.header}>
        <span className="pm-c-input__label--default">Outcomes</span>
        <span className="pm-c-input__label--default">Probability</span>
        <button
          type="button"
          className={cn(
            CreateMarketFormOutcomesClasses.action,
            'text-primary',
            'caption',
            'medium'
          )}
          onClick={toggleProbabilityDistribution}
        >
          {probabilityDistribution === 'uniform'
            ? 'Set manually'
            : 'Set uniformly'}
        </button>
      </div>
      <div className={CreateMarketFormOutcomesClasses.outcomes}>
        {field.value.map((outcome, index) => (
          <Fragment key={outcome.id}>
            <OutcomeInput
              key={`${outcome.id}[0]`}
              name={outcome.id}
              placeholder="Outcome"
            />
            <ProbabilityInput
              key={`${outcome.id}[1]`}
              name={outcome.id}
              disabled={probabilityDistribution === 'uniform'}
            />
            <Button
              key={`${outcome.id}[2]`}
              variant="outline"
              color="default"
              size="xs"
              onClick={() => handleRemoveOutcome(index)}
              disabled={!hasMoreThanTwoOutcomes}
            >
              -
            </Button>
          </Fragment>
        ))}
      </div>
      <Button
        variant="outline"
        color="default"
        size="sm"
        onClick={handleAddOutcome}
      >
        +
      </Button>
    </div>
  );
}

export default CreateMarketFormOutcomes;
