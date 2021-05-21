/* eslint-disable react/jsx-key */
import { roundNumber } from 'helpers/math';

import { InfoIcon } from 'assets/icons';

import { useAppSelector } from 'hooks';
import useCurrency from 'hooks/useCurrency';

import Text from '../Text';
import Tooltip from '../Tooltip';

function LiquidityFormDetails() {
  const currency = useCurrency();
  const liquidityDetails = useAppSelector(
    state => state.liquidity.liquidityDetails
  );
  const market = useAppSelector(state => state.market.market);

  return (
    <div className="pm-c-liquidity-form__details">
      <div className="pm-c-liquidity-form__details-total-stake">
        <Text
          as="span"
          scale="body"
          fontWeight="semibold"
          color="lighter-gray-50"
        >
          Total Stake
        </Text>

        <Text
          as="span"
          scale="body"
          fontWeight="semibold"
          color="lighter-gray-50"
        >
          {`${roundNumber(liquidityDetails.totalStake, 3)} ${currency.symbol}`}
        </Text>
      </div>

      <hr className="pm-c-liquidity-form__details-separator" />

      <div className="pm-c-liquidity-form__details-group">
        <div className="pm-c-liquidity-form__details-liquidity-value">
          <Text
            as="span"
            scale="caption"
            fontWeight="semibold"
            color="lighter-gray-50"
          >
            Liquidity Value
            <Tooltip text="Example" position="top">
              <InfoIcon />
            </Tooltip>
          </Text>

          <Text
            as="span"
            scale="body"
            fontWeight="semibold"
            color="lighter-gray-50"
          >
            {
              // eslint-disable-next-line prettier/prettier
              `${roundNumber(liquidityDetails.liquidityStake, 3)} ${currency.symbol}`
            }
          </Text>
        </div>
        <div className="pm-c-liquidity-form__details-shares-added">
          <Text as="span" scale="tiny" fontWeight="semibold" color="gray">
            Est. Liquidity Shares
          </Text>

          <Text as="span" scale="tiny" fontWeight="semibold" color="gray">
            {roundNumber(liquidityDetails.liquidityShares, 3)}
          </Text>
        </div>
      </div>

      {liquidityDetails.outcomeDetails.map(outcomeDetails => {
        const outcomeColorCondition =
          market?.outcomes[0] === outcomeDetails.outcome;

        return [
          <hr className="pm-c-liquidity-form__details-separator" />,

          <div className="pm-c-liquidity-form__details-outcome">
            <Text
              as="span"
              scale="caption"
              fontWeight="semibold"
              color="lighter-gray-50"
            >
              Outcome
            </Text>

            <Text
              as="span"
              scale="caption"
              fontWeight="semibold"
              color="lighter-gray-50"
            >
              <div
                className={`pm-c-liquidity-form__details-outcome-marker--${
                  outcomeColorCondition ? 'primary' : 'secondary'
                }`}
              />
              {outcomeDetails.outcome.title}
            </Text>
          </div>,

          <div className="pm-c-liquidity-form__details-group">
            <div className="pm-c-liquidity-form__details-outcome-shares-value">
              <Text
                as="span"
                scale="caption"
                fontWeight="semibold"
                color="lighter-gray-50"
              >
                Outcome Shares Value
                <Tooltip text="Example" position="top">
                  <InfoIcon />
                </Tooltip>
              </Text>

              <Text
                as="span"
                scale="body"
                fontWeight="semibold"
                color="lighter-gray-50"
              >
                {`${roundNumber(outcomeDetails.stake, 3)} ${currency.symbol}`}
              </Text>
            </div>

            <div className="pm-c-liquidity-form__details-shares-received">
              <Text as="span" scale="tiny" fontWeight="semibold" color="gray">
                Est. Outcome Shares Received
              </Text>

              <Text as="span" scale="tiny" fontWeight="semibold" color="gray">
                {roundNumber(outcomeDetails.shares, 3)}
              </Text>
            </div>
          </div>
        ];
      })}
    </div>
  );
}

LiquidityFormDetails.displayName = 'LiquidityFormDetails';

export default LiquidityFormDetails;
