import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import type { Market } from 'models/market';

import { CheckIcon, RemoveIcon, RepeatCycleIcon } from 'assets/icons';

import OutcomeItem from 'components/OutcomeItem';
import OutcomeItemText from 'components/OutcomeItemText';

import { useAppSelector, useExpandableOutcomes } from 'hooks';

type MarketOutcomesProps = {
  market: Market;
};

function MarketOutcomes({ market }: MarketOutcomesProps) {
  const history = useHistory();
  const trade = useAppSelector(state => state.trade);
  const isMarketResolved = market.state === 'resolved';
  const expandableOutcomes = useExpandableOutcomes({
    outcomes: market.outcomes,
    max: 2
  });
  const getActive = useCallback(
    (id: string | number) =>
      market.id === trade.selectedMarketId &&
      id === trade.selectedOutcomeId &&
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
    (event: React.MouseEvent<HTMLButtonElement>) =>
      history.push(
        `/markets/${market.slug}?outcome=${+event.currentTarget.value}`
      ),
    [history, market.slug]
  );

  return (
    <ul className="pm-c-market-outcomes">
      {expandableOutcomes.onseted.map(outcome => {
        const price = outcome.price.toFixed(3);
        const isPositive = /^\+/.test(outcome.pricesDiff.value);
        const isWinningOutcome =
          isMarketResolved && market.resolvedOutcomeId === outcome.id;
        const isActive = getActive(outcome.id);

        return (
          <li key={outcome.id}>
            <OutcomeItem
              primary={outcome.title}
              secondary={
                <OutcomeItemText
                  price={price}
                  symbol={market.network.currency.symbol}
                  isPositive={isPositive}
                />
              }
              percent={+price * 100}
              isActive={isActive}
              isPositive={isPositive}
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
          <OutcomeItem {...expandableOutcomes.offseted} />
        </li>
      )}
    </ul>
  );
}

export default MarketOutcomes;
