import cn from 'classnames';
import { Market } from 'models/market';

import FavoriteMarket from 'components/FavoriteMarket';
import Icon from 'components/Icon';

type MarketFooterActionsProps = {
  market: Market;
  $variant: 'filled' | 'text';
};

export default function MarketFooterActions({
  market,
  $variant = 'text'
}: MarketFooterActionsProps) {
  return (
    <div className="pm-c-market-footer__actions">
      <a
        href={`https://twitter.com/intent/tweet?text=I%20just%20made%20a%20prediction%20on%20@polkamarkets!%20🔥💯%0D%0DCheck%20it%20out%20at%20app.polkamarkets.com/markets/${market.slug}%20%23polkamarkets`}
        target="_blank"
        rel="noreferrer"
        className={cn('pm-c-market-footer__actions-button', {
          'pm-c-market-footer__actions-button-filled': $variant === 'filled'
        })}
      >
        <Icon name="Share" title="Share" />
      </a>
      <FavoriteMarket
        market={market}
        className={cn({
          'pm-c-market-footer__actions-button-filled': $variant === 'filled'
        })}
      />
    </div>
  );
}
