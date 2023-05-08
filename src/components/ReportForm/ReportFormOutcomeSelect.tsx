import { useCallback } from 'react';

import { useField } from 'formik';
import { colorByOutcomeId } from 'helpers/color';
import { selectOutcome } from 'redux/ducks/trade';
import { PolkamarketsService } from 'services';
import { useTheme } from 'ui';

import { Alert } from 'components/Alert';
import Link from 'components/Link';
import Outcome from 'components/Outcome';
import VirtualizedList from 'components/VirtualizedList';

import { useAppSelector } from 'hooks';

import tradeFormClasses from '../TradeForm/TradeForm.module.scss';

function OutcomeHeader() {
  return (
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
  );
}

function ReportFormOutcomeSelect() {
  const theme = useTheme();
  const market = useAppSelector(state => state.market.market);
  const polkamarkets = useAppSelector(state => state.polkamarkets);
  const [field, _meta, helpers] = useField('outcome');
  const handleOutcomeSelect = useCallback(
    (id: string) => {
      selectOutcome(market.id, market.networkId, id);
      helpers.setValue(id);
    },
    [helpers, market.id, market.networkId]
  );
  const resolvedOutcomeId = PolkamarketsService.bytes32ToInt(
    market.question.bestAnswer
  );
  const checkOutcomeState = useCallback(
    outcome => {
      if (
        market.question.isFinalized &&
        `${resolvedOutcomeId}` === `${outcome.id}`
      )
        return 'won';
      if (market.question.isFinalized) return 'default';
      if (field.value && `${field.value}` === `${outcome.id}`)
        return 'selected';
      return 'default';
    },
    [field.value, market.question.isFinalized, resolvedOutcomeId]
  );
  const getOutcomeBond = useCallback(
    outcomeId => {
      const answerId = PolkamarketsService.intToBytes32(outcomeId);

      if (!polkamarkets.bonds[market.questionId]) return 0;

      return polkamarkets.bonds[market.questionId].answers[answerId] || 0;
    },
    [polkamarkets.bonds, market.questionId]
  );
  const isStarted = market.question.bond > 0;

  const OutcomeFooter = useCallback(
    () => (
      <Outcome
        id="-1"
        title="Invalid"
        helpText="A market is invalid when no outcome is correct"
        color="warning"
        state={checkOutcomeState({ id: '-1' })}
        bond={getOutcomeBond(-1)}
        resolvedOutcomeId={resolvedOutcomeId}
        marketQuestionFinalized={market.question.isFinalized}
        onSelect={handleOutcomeSelect}
        isStarted={isStarted}
      />
    ),
    [
      checkOutcomeState,
      getOutcomeBond,
      handleOutcomeSelect,
      market.question.isFinalized,
      isStarted,
      resolvedOutcomeId
    ]
  );

  return (
    <div className="pm-c-trade-form-predictions">
      {theme.device.isDesktop ? (
        <VirtualizedList
          height="100%"
          data={market.outcomes}
          components={{
            Header: OutcomeHeader,
            Footer: OutcomeFooter
          }}
          itemContent={(_index, outcome) => (
            <div className="pm-c-report-form-outcome-select__item">
              <Outcome
                id={`${outcome.id}`}
                title={outcome.title}
                shares={
                  polkamarkets.portfolio[market.id]?.outcomes[outcome.id]
                    ?.shares || 0
                }
                bond={getOutcomeBond(outcome.id)}
                color={colorByOutcomeId(outcome.id)}
                state={checkOutcomeState(outcome)}
                resolvedOutcomeId={resolvedOutcomeId}
                marketQuestionFinalized={market.question.isFinalized}
                onSelect={handleOutcomeSelect}
                isStarted={isStarted}
              />
            </div>
          )}
        />
      ) : (
        <>
          <OutcomeHeader />
          <ul className={tradeFormClasses.horizontal}>
            {market.outcomes.map(outcome => (
              <li
                key={outcome.title}
                className={tradeFormClasses.horizontalItem}
              >
                <Outcome
                  id={`${outcome.id}`}
                  title={outcome.title}
                  shares={
                    polkamarkets.portfolio[market.id]?.outcomes[outcome.id]
                      ?.shares || 0
                  }
                  bond={getOutcomeBond(outcome.id)}
                  color={colorByOutcomeId(outcome.id)}
                  state={checkOutcomeState(outcome)}
                  resolvedOutcomeId={resolvedOutcomeId}
                  marketQuestionFinalized={market.question.isFinalized}
                  onSelect={handleOutcomeSelect}
                  isStarted={isStarted}
                />
              </li>
            ))}
            <li className={tradeFormClasses.horizontalItem}>
              <OutcomeFooter />
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default ReportFormOutcomeSelect;
