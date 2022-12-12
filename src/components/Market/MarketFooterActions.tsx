import classNames from 'classnames';
import { Market } from 'models/market';

import { FavoriteIcon, NetworkCommunicationIcon } from 'assets/icons';

import { useFavoriteMarkets } from 'hooks';

import { Button } from '../Button';

type MarketFooterActionsProps = {
  market: Market;
};

function MarketFooterActions({ market }: MarketFooterActionsProps) {
  const { id, networkId } = market;
  const { favoriteMarkets, addFavoriteMarket, removeFavoriteMarket } =
    useFavoriteMarkets();

  const isFavoriteMarket =
    favoriteMarkets[`${networkId}`] &&
    favoriteMarkets[`${networkId}`].includes(id);

  return (
    <div className="pm-c-market-footer__actions">
      <a
        href={`https://twitter.com/intent/tweet?text=I%20just%20made%20a%20prediction%20on%20a%20World%20Cup%20match%21%0A%0ACheck%20it%20out%20at%20ifl.polkamarkets.com%2Fmarkets%2F${market.slug}`}
        target="_blank"
        rel="noreferrer"
      >
        <NetworkCommunicationIcon className="pm-c-market-footer__actions-share--default" />
      </a>
      <Button
        color="noborder"
        onClick={
          isFavoriteMarket
            ? () => removeFavoriteMarket(networkId, id)
            : () => addFavoriteMarket(networkId, id)
        }
      >
        <FavoriteIcon
          className={classNames({
            'pm-c-market-footer__actions-favorite--default': !isFavoriteMarket,
            'pm-c-market-footer__actions-favorite--active': isFavoriteMarket
          })}
        />
      </Button>
    </div>
  );
}

export default MarketFooterActions;
