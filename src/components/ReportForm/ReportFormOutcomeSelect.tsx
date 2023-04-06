import { useField } from 'formik';
import { colorByOutcomeId } from 'helpers/color';
import { selectOutcome } from 'redux/ducks/trade';
import { PolkamarketsService } from 'services';

import { Alert, Link, Outcome, VirtualizedList } from 'components';

import { useAppSelector } from 'hooks';

import { ReportFormOutcomeSelectType } from './ReportFormOutcomeSelect.type';

type ReportFormOutcomeSelectProps = {
  type: ReportFormOutcomeSelectType;
};

function ReportFormOutcomeSelect({ type }: ReportFormOutcomeSelectProps) {
  // Selectors
  const { outcomes, questionId } = useAppSelector(state => state.market.market);
  const marketId = useAppSelector(state => state.market.market.id);
  const marketNetworkId = useAppSelector(
    state => state.market.market.networkId
  );
  const isMarketQuestionFinalized = useAppSelector(
    state => state.market.market.question.isFinalized
  );
  const { bestAnswer, bond } = useAppSelector(
    state => state.market.market.question
  );
  const { bonds, portfolio } = useAppSelector(state => state.polkamarkets);

  // Form state
  const [field, _meta, helpers] = useField('outcome');

  // converting bytes32 to int
  const resolvedOutcomeId = PolkamarketsService.bytes32ToInt(bestAnswer);
  const isStarted = bond > 0;

  function handleOutcomeSelect(id: string) {
    selectOutcome(marketId, marketNetworkId, id);
    helpers.setValue(id);
  }

  const isSelected = outcome =>
    field.value && `${field.value}` === `${outcome.id}`;

  const isWinningOutcome = outcome =>
    `${resolvedOutcomeId}` === `${outcome.id}`;

  const isWon = outcome =>
    isMarketQuestionFinalized && isWinningOutcome(outcome);

  const checkOutcomeState = outcome => {
    if (isWon(outcome)) return 'won';
    if (isMarketQuestionFinalized) return 'default';
    if (isSelected(outcome)) return 'selected';
    return 'default';
  };

  const getOutcomeBond = outcomeId => {
    const answerId = PolkamarketsService.intToBytes32(outcomeId);

    if (!bonds[questionId]) return 0;

    return bonds[questionId].answers[answerId] || 0;
  };

  return (
    <div className={`pm-c-report-form-outcome-select--${type}`}>
      <VirtualizedList
        height="100%"
        data={outcomes}
        components={{
          Header: () => (
            <Alert
              style={{ marginBottom: 'var(--grid-margin)' }}
              variant="information"
              description={
                <>
                  Earn POLK by reporting the correct outcome.
                  <Link
                    title="Learn more"
                    href="https://help.polkamarkets.com/en/articles/5610525-how-market-resolution-works"
                    aria-label="Learn more"
                    target="_blank"
                    rel="noreferrer"
                    variant="information"
                  />
                </>
              }
            />
          ),
          Footer: () => (
            <Outcome
              id="-1"
              title="Invalid"
              helpText="A market is invalid when no outcome is correct"
              color="warning"
              state={checkOutcomeState({ id: '-1' })}
              bond={getOutcomeBond(-1)}
              resolvedOutcomeId={resolvedOutcomeId}
              marketQuestionFinalized={isMarketQuestionFinalized}
              onSelect={handleOutcomeSelect}
              isStarted={isStarted}
            />
          )
        }}
        itemContent={(_index, outcome) => (
          <div className="pm-c-report-form-outcome-select__item">
            <Outcome
              id={`${outcome.id}`}
              title={outcome.title}
              shares={portfolio[marketId]?.outcomes[outcome.id]?.shares || 0}
              bond={getOutcomeBond(outcome.id)}
              color={colorByOutcomeId(outcome.id)}
              state={checkOutcomeState(outcome)}
              resolvedOutcomeId={resolvedOutcomeId}
              marketQuestionFinalized={isMarketQuestionFinalized}
              onSelect={handleOutcomeSelect}
              isStarted={isStarted}
            />
          </div>
        )}
      />
    </div>
  );
}

export default ReportFormOutcomeSelect;
