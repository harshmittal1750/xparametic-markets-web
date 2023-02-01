import dayjs from 'dayjs';
import { roundNumber } from 'helpers/math';
import { Market } from 'models/market';

import Icon from 'components/Icon';

import Text from '../Text';
import Tooltip from '../Tooltip';
import marketClasses from './Market.module.scss';

type MarketFooterStatsProps = {
  market: Market;
};

export default function MarketFooterStats({ market }: MarketFooterStatsProps) {
  const { volume, expiresAt, liquidity, network } = market;
  const { currency } = network;

  return (
    <div className="pm-c-market-footer__stats">
      {network && (
        <>
          <Tooltip text={network.name}>{network.currency.icon}</Tooltip>
          <span className="pm-c-divider--circle" />
        </>
      )}
      {!!volume && (
        <>
          <Text
            as="span"
            scale="tiny-uppercase"
            fontWeight="semibold"
            color="gray"
          >
            <Icon
              name="Stats"
              title="Volume"
              className={marketClasses.footerStatsIcon}
            />
            <Text
              as="strong"
              scale="tiny-uppercase"
              fontWeight="semibold"
              color="lighter-gray"
            >
              {`${roundNumber(volume, 3)} ${currency?.ticker}`}
            </Text>
          </Text>
          <span className="pm-c-divider--circle" />
        </>
      )}
      {!!liquidity && (
        <>
          <Text as="span" scale="tiny-uppercase" fontWeight="semibold">
            <Icon
              name="Liquidity"
              title="Liquidity"
              className={marketClasses.footerStatsIcon}
            />
            <Text as="strong" scale="tiny-uppercase" fontWeight="semibold">
              {`${roundNumber(liquidity, 3)} ${currency?.ticker}`}
            </Text>
          </Text>
          <span className="pm-c-divider--circle" />
        </>
      )}
      {expiresAt && (
        <>
          <Text as="span" scale="tiny-uppercase" fontWeight="semibold">
            <Icon
              name="Calendar"
              title="Expires at"
              className={marketClasses.footerStatsIcon}
            />
            <Text as="strong" scale="tiny-uppercase" fontWeight="semibold">
              {dayjs(expiresAt).utc().format('MMMM D, YYYY')}
            </Text>
          </Text>
          <span className="pm-c-divider--circle" />
        </>
      )}
    </div>
  );
}
