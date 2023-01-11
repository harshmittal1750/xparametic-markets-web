import { useCallback, useState, Fragment } from 'react';
import uuid from 'react-uuid';

import cn from 'classnames';
import { useFormikContext, getIn } from 'formik';
import { roundNumber } from 'helpers/math';

import { Button } from 'components/Button';
import { OutcomeInput, ProbabilityInput } from 'components/Input';

import CreateMarketFormOutcomesClasses from './CreateMarketFormOutcomes.module.scss';
import { ProbabilityDistribution } from './CreateMarketFormOutcomes.type';

function CreateMarketFormOutcomes() {
  const [probabilityDistribution, setProbabilityDistribution] =
    useState<ProbabilityDistribution>('uniform');

  const { values, setFieldValue } = useFormikContext();
  const outcomes = getIn(values, 'outcomes');

  const toggleProbabilityDistribution = useCallback(() => {
    if (probabilityDistribution === 'uniform') {
      setProbabilityDistribution('manual');
    } else {
      setProbabilityDistribution('uniform');

      const probability = roundNumber(100 / outcomes.length, 2);

      outcomes.forEach((_outcome, outcomeIndex) => {
        outcomes[outcomeIndex].probability = probability;
      });

      setFieldValue('outcomes', outcomes);
    }
  }, [outcomes, probabilityDistribution, setFieldValue]);

  const handleAddOutcome = useCallback(() => {
    if (probabilityDistribution === 'manual') {
      const newOutcomes = [
        ...outcomes,
        { id: uuid(), name: '', probability: 0.1 }
      ];
      setFieldValue('outcomes', newOutcomes);
    } else {
      const probability = roundNumber(100 / (outcomes.length + 1), 2);

      outcomes.forEach((_outcome, outcomeIndex) => {
        outcomes[outcomeIndex].probability = probability;
      });

      const newOutcomes = [...outcomes, { id: uuid(), name: '', probability }];
      setFieldValue('outcomes', newOutcomes);
    }
  }, [outcomes, probabilityDistribution, setFieldValue]);

  const handleRemoveOutcome = useCallback(
    (outcomeId: number) => {
      const index = outcomes.indexOf(
        outcomes.find(outcome => outcome.id === outcomeId)
      );

      outcomes.splice(index, 1);

      if (probabilityDistribution === 'uniform') {
        const probability = roundNumber(100 / outcomes.length, 2);

        outcomes.forEach((_outcome, outcomeIndex) => {
          outcomes[outcomeIndex].probability = probability;
        });
      }

      const newOutcomes = [...outcomes];

      setFieldValue('outcomes', newOutcomes);
    },
    [outcomes, probabilityDistribution, setFieldValue]
  );

  const hasMoreThanTwoOutcomes = outcomes.length > 2;

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
        {outcomes.map(outcome => (
          <Fragment key={outcome.id}>
            <OutcomeInput
              key={`${outcome.id}[0]`}
              name={outcome.id}
              placeholder="Outcome"
            />
            <ProbabilityInput
              key={`${outcome.id}[1]`}
              outcomeId={outcome.id}
              disabled={probabilityDistribution === 'uniform'}
            />
            <Button
              key={`${outcome.id}[2]`}
              variant="outline"
              color="default"
              size="xs"
              onClick={() => handleRemoveOutcome(outcome.id)}
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
