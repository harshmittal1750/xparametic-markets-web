import dayjs from 'dayjs';
import { roundNumber } from 'helpers/math';
import isEmpty from 'lodash/isEmpty';
import { Market } from 'models/market';

import Icon from 'components/Icon';

import Text from '../Text';
import Tooltip from '../Tooltip';
import marketClasses from './Market.module.scss';

type MarketFooterStatsProps = {
  market: Market;
};

export default function MarketFooterStats({ market }: MarketFooterStatsProps) {
  const {
    volume,
    volumeEur,
    expiresAt,
    liquidity,
    liquidityEur,
    token,
    network
  } = market;

  return (
    <div className="pm-c-market-footer__stats">
      <>
        {!isEmpty(network.currency) ? (
          <>
            <Tooltip text={network.name}>
              <Icon name={network.currency.iconName} />
            </Tooltip>
            <span className="pm-c-divider--circle" />
          </>
        ) : null}
      </>
      {!!volume && (
        <>
          <Text
            as="span"
            scale="tiny-uppercase"
            fontWeight="semibold"
            className={marketClasses.footerStatsText}
          >
            <Tooltip
              className={marketClasses.footerStatsTooltip}
              text={`Volume: ${roundNumber(volumeEur, 3)} EUR`}
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
                className={marketClasses.footerStatsText}
              >
                {`${roundNumber(volume, 3)} `}
              </Text>
            </Tooltip>
            <Tooltip
              className={marketClasses.footerStatsTooltip}
              text={token.name}
            >
              <Text
                as="strong"
                scale="tiny-uppercase"
                fontWeight="semibold"
                className={marketClasses.footerStatsText}
              >{`${token.ticker}`}</Text>
            </Tooltip>
          </Text>
          <span className="pm-c-divider--circle" />
        </>
      )}
      {!!liquidity && (
        <>
          <Text
            as="span"
            scale="tiny-uppercase"
            fontWeight="semibold"
            className={marketClasses.footerStatsText}
          >
            <Tooltip
              className={marketClasses.footerStatsTooltip}
              text={`Liquidity: ${roundNumber(liquidityEur, 3)} EUR`}
            >
              <Icon
                name="Liquidity"
                title="Liquidity"
                className={marketClasses.footerStatsIcon}
              />
              <Text
                as="strong"
                scale="tiny-uppercase"
                fontWeight="semibold"
                className={marketClasses.footerStatsText}
              >
                {`${roundNumber(liquidity, 3)} `}
              </Text>
            </Tooltip>
            <Tooltip
              className={marketClasses.footerStatsTooltip}
              text={token.name}
            >
              <Text
                as="strong"
                scale="tiny-uppercase"
                fontWeight="semibold"
                className={marketClasses.footerStatsText}
              >{`${token.ticker}`}</Text>
            </Tooltip>
          </Text>
          <span className="pm-c-divider--circle" />
        </>
      )}
      {expiresAt && (
        <Text as="span" scale="tiny-uppercase" fontWeight="semibold">
          <Tooltip
            className={marketClasses.footerStatsTooltip}
            text={`Expires on ${dayjs(expiresAt).utc().format('MMMM D, YYYY')}`}
          >
            <Icon
              name="Calendar"
              title="Expires at"
              className={marketClasses.footerStatsIcon}
            />
            <Text
              as="strong"
              scale="tiny-uppercase"
              fontWeight="semibold"
              className={marketClasses.footerStatsText}
            >
              {dayjs(expiresAt).utc().format('MMMM D, YYYY')}
            </Text>
          </Tooltip>
        </Text>
      )}
    </div>
  );
}
