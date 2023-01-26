import { useCallback } from 'react';

import cn from 'classnames';
import { Market } from 'models/market';

import Icon from 'components/Icon';

import { useFavoriteMarkets } from 'hooks';

type MarketFooterActionsProps = {
  market: Market;
  $variant: 'filled' | 'text';
};

const buttonProps = {
  filled: { variant: 'subtle', color: 'default', size: 'sm' },
  text: { variant: undefined, color: 'noborder', size: undefined }
} as const;

export default function MarketFooterActions({
  market,
  $variant = 'text'
}: MarketFooterActionsProps) {
  const favoriteMarkets = useFavoriteMarkets();
  const isFavoriteMarket = favoriteMarkets.favoriteMarkets[
    `${market.networkId}`
  ]?.includes(market.id);
  const handleFavClick = useCallback(
    () =>
      favoriteMarkets[
        isFavoriteMarket ? 'removeFavoriteMarket' : 'addFavoriteMarket'
      ](market.networkId, market.id),
    [favoriteMarkets, isFavoriteMarket, market.id, market.networkId]
  );
  const props = buttonProps[$variant];

  return (
    <div className="pm-c-market-footer__actions">
      <a
        href={`https://twitter.com/intent/tweet?text=I%20just%20made%20a%20prediction%20on%20a%20World%20Cup%20match%21%0A%0ACheck%20it%20out%20at%20ifl.polkamarkets.com%2Fmarkets%2F${market.slug}`}
        target="_blank"
        rel="noreferrer"
        className={cn('pm-c-market-footer__actions-button', {
          'pm-c-market-footer__actions-button-filled': $variant === 'filled'
        })}
      >
        <Icon name="Share" title="Share" />
      </a>
      <button
        type="button"
        onClick={handleFavClick}
        className={cn('pm-c-market-footer__actions-button', {
          'pm-c-market-footer__actions-button-filled': $variant === 'filled',
          'pm-c-market-footer__actions-favorite--active': isFavoriteMarket
        })}
        {...props}
      >
        <Icon name="Star" title="Bookmark market" />
      </button>
    </div>
  );
}
