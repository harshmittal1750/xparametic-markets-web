import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import sortOutcomes from 'helpers/sortOutcomes';
import type { Market } from 'models/market';
import { useTheme } from 'ui';

import OutcomeItem from 'components/OutcomeItem';

import { useAppDispatch, useAppSelector, useExpandableOutcomes } from 'hooks';

type MarketOutcomesProps = {
  market: Market;
};

export default function MarketOutcomes({ market }: MarketOutcomesProps) {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const trade = useAppSelector(state => state.trade);
  const theme = useTheme();
  const sortedOutcomes = sortOutcomes({
    outcomes: market.outcomes,
    timeframe: '7d'
  });
  const expandableOutcomes = useExpandableOutcomes({
    outcomes: sortedOutcomes,
    max: theme.device.isDesktop ? 2 : 1
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
        outcome => (
          <li key={outcome.id}>
            <OutcomeItem
              $size="sm"
              image={outcome.imageUrl}
              value={outcome.id}
              data={outcome.data}
              primary={outcome.title}
              isActive={getOutcomeActive(outcome.id)}
              onClick={handleOutcomeClick}
              secondary={{
                price: outcome.price,
                ticker: market.token.ticker,
                isPriceUp: outcome.isPriceUp
              }}
              resolved={(() => {
                if (market.voided) return 'voided';
                if (market.resolvedOutcomeId === outcome.id) return 'won';
                if (market.state === 'resolved') return 'lost';
                return undefined;
              })()}
            />
          </li>
        )
      )}
      {needExpandOutcomes && !expandableOutcomes.isExpanded && (
        <li>
          <OutcomeItem
            $size="sm"
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
