import { useCallback } from 'react';

import type { Market } from 'models/market';

import { CheckIcon, RemoveIcon, RepeatCycleIcon } from 'assets/icons';

import OutcomeItem from 'components/OutcomeItem';
import OutcomeItemText from 'components/OutcomeItemText';

import { useAppSelector, useExpandableOutcomes } from 'hooks';

type MarketOutcomesProps = {
  market: Market;
};

function MarketOutcomes({ market }: MarketOutcomesProps) {
  const selectedMarketId = useAppSelector(
    state => state.trade.selectedMarketId
  );
  const selectedMarketNetworkId = useAppSelector(
    state => state.trade.selectedMarketNetworkId
  );
  const selectedOutcomeId = useAppSelector(
    state => state.trade.selectedOutcomeId
  );
  const isCurrentSelectedMarketNetwork =
    market.networkId === selectedMarketNetworkId;
  const isMarketResolved = market.state === 'resolved';
  const expandableOutcomes = useExpandableOutcomes({
    outcomes: market.outcomes,
    max: 2
  });
  const handleOutcomeClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // TODO: USE ID TO OPEN MARKET SLUG + OUTCOME
    },
    []
  );

  return (
    <ul className="pm-c-market-outcomes">
      {expandableOutcomes.onseted.map(outcome => {
        const price = outcome.price.toFixed(3);
        const isPositive = /^\+/.test(outcome.pricesDiff.value);
        const isWinningOutcome =
          isMarketResolved && market.resolvedOutcomeId === outcome.id;

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
              isActive={
                market.id === selectedMarketId &&
                outcome.id === selectedOutcomeId &&
                isCurrentSelectedMarketNetwork
              }
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
