import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import sortOutcomes from 'helpers/sortOutcomes';
import type { Market } from 'models/market';
import { useTheme } from 'ui';

import OutcomeItem from 'components/OutcomeItem';
import OutcomeItemText from 'components/OutcomeItemText';

import { useAppDispatch, useAppSelector, useExpandableOutcomes } from 'hooks';

type MarketOutcomesProps = {
  market: Market;
};

export default function MarketOutcomes({ market }: MarketOutcomesProps) {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const trade = useAppSelector(state => state.trade);
  const theme = useTheme();
  const MAX_OUTCOMES_EXPANDABLE = theme.device.isDesktop ? 2 : 1;
  const isMarketResolved = market.state === 'resolved';
  const sortedOutcomes = sortOutcomes({
    outcomes: market.outcomes,
    timeframe: '7d'
  });
  const expandableOutcomes = useExpandableOutcomes({
    outcomes: sortedOutcomes,
    max: MAX_OUTCOMES_EXPANDABLE,
    truncateMax: MAX_OUTCOMES_EXPANDABLE
  });
  const needExpandOutcomes =
    sortedOutcomes.length > (theme.device.isDesktop ? 3 : 2);
  const getOutcomeActive = useCallback(
    (id: string | number) =>
      market.id === trade.selectedMarketId &&
      id === +trade.selectedOutcomeId &&
      market.networkId === trade.selectedMarketNetworkId,
    [
      market.id,
      market.networkId,
      trade.selectedMarketId,
      trade.selectedMarketNetworkId,
      trade.selectedOutcomeId
    ]
  );
  const handleOutcomeClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      const { value } = event.currentTarget;
      const isOutcomeActive = getOutcomeActive(value);
      const { marketSelected } = await import('redux/ducks/market');
      const { selectOutcome } = await import('redux/ducks/trade');

      dispatch(marketSelected(market));
      dispatch(
        selectOutcome(market.id, market.networkId, isOutcomeActive ? '' : value)
      );

      if (market.state === 'closed') {
        const { openReportForm } = await import('redux/ducks/ui');

        dispatch(openReportForm());
      } else {
        const { openTradeForm } = await import('redux/ducks/ui');

        dispatch(openTradeForm());
      }
      if (isOutcomeActive) {
        const { closeTradeForm } = await import('redux/ducks/ui');

        dispatch(closeTradeForm());
      }
      history.push(`/markets/${market.slug}`);
    },
    [dispatch, getOutcomeActive, history, market]
  );

  return (
    <ul className="pm-c-market-outcomes">
      {(needExpandOutcomes ? expandableOutcomes.onseted : sortedOutcomes).map(
        outcome => {
          const isWinningOutcome =
            isMarketResolved && market.resolvedOutcomeId === outcome.id;
          const isOutcomeActive = getOutcomeActive(outcome.id);

          return (
            <li key={outcome.id}>
              <OutcomeItem
                $size="sm"
                primary={outcome.title}
                image={outcome.imageUrl}
                secondary={
                  <OutcomeItemText
                    price={outcome.price}
                    symbol={market.token.ticker}
                    isPositive={outcome.isPriceUp}
                  />
                }
                percent={+outcome.price * 100}
                isActive={isOutcomeActive}
                isPositive={outcome.isPriceUp}
                isResolved={isMarketResolved}
                isWinning={isWinningOutcome}
                value={outcome.id}
                onClick={handleOutcomeClick}
                data={outcome.data}
              />
            </li>
          );
        }
      )}
      {needExpandOutcomes && !expandableOutcomes.isExpanded && (
        <li>
          <OutcomeItem
            $variant="dashed"
            value={expandableOutcomes.onseted[0].id}
            onClick={handleOutcomeClick}
            {...expandableOutcomes.offseted}
          />
        </li>
      )}
    </ul>
  );
}
