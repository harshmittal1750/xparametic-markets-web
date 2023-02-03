import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import type { Market } from 'models/market';
import { useMedia } from 'ui';

import { CheckIcon, RemoveIcon, RepeatCycleIcon } from 'assets/icons';

import OutcomeItem from 'components/OutcomeItem';
import OutcomeItemText from 'components/OutcomeItemText';

import { useAppDispatch, useAppSelector, useExpandableOutcomes } from 'hooks';

type MarketOutcomesProps = {
  market: Market;
};

function MarketOutcomes({ market }: MarketOutcomesProps) {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isDesktop = useMedia('(min-width: 1024px)');
  const maxExpandableOutcomes = isDesktop ? 2 : 1;
  const trade = useAppSelector(state => state.trade);
  const isMarketResolved = market.state === 'resolved';
  const expandableOutcomes = useExpandableOutcomes({
    outcomes: market.outcomes,
    max: maxExpandableOutcomes,
    truncateMax: maxExpandableOutcomes
  });
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
      {expandableOutcomes.onseted.map(outcome => {
        const isWinningOutcome =
          isMarketResolved && market.resolvedOutcomeId === outcome.id;
        const isOutcomeActive = getOutcomeActive(outcome.id);

        return (
          <li key={outcome.id}>
            <OutcomeItem
              primary={outcome.title}
              secondary={
                <OutcomeItemText
                  price={outcome.price}
                  symbol={market.token.symbol}
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
              endAdornment={
                isMarketResolved && (
                  <div className="pm-c-market-outcomes__item-result">
                    {(() => {
                      if (isWinningOutcome && !market.voided)
                        return <CheckIcon />;
                      if (!isWinningOutcome && !market.voided)
                        return <RemoveIcon />;
                      if (market.voided) return <RepeatCycleIcon />;
                      return null;
                    })()}
                  </div>
                )
              }
            />
          </li>
        );
      })}
      {!expandableOutcomes.isExpanded && (
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

export default MarketOutcomes;
