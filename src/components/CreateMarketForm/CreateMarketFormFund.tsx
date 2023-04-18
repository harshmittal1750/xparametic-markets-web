import { useState, useEffect } from 'react';

import { useField } from 'formik';
import { roundDown, roundNumber } from 'helpers/math';
import { PolkamarketsService } from 'services';
import { Token } from 'types/token';

import { InfoIcon } from 'assets/icons';

import { AlertMini } from 'components/Alert';
import AmountInput from 'components/AmountInput';
import Link from 'components/Link';
import NetworkSelector from 'components/NetworkSelector';
import SelectTokenModal from 'components/SelectTokenModal';
import Text from 'components/Text';
import Tooltip from 'components/Tooltip';

import { useAppSelector, useNetwork, useERC20Balance } from 'hooks';

function CreateMarketFormFund() {
  const network = useNetwork();
  const { ethBalance, createMarketToken } = useAppSelector(
    state => state.polkamarkets
  );
  let erc20Address = '';

  if (createMarketToken && (createMarketToken as Token).addresses) {
    erc20Address = (createMarketToken as Token).addresses[network.network.key];
  }

  const { balance: erc20Balance } = useERC20Balance(erc20Address);

  const balance = erc20Address ? erc20Balance : ethBalance;
  const currency = createMarketToken || network.network.currency;

  const [field, _meta, helpers] = useField('liquidity');
  const [fee, setFee] = useState(0);

  useEffect(() => {
    (async function getMarketFee() {
      const polkamarketsService = new PolkamarketsService(
        network.networkConfig
      );

      const response = await polkamarketsService.getMarketFee();
      setFee(response);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleChangeAmount(amount: number) {
    helpers.setValue(amount);
  }

  return (
    <>
      <div className="pm-c-create-market-form__card">
        <Text
          as="h5"
          scale="body"
          fontWeight="medium"
          className="pm-c-create-market-form__card-title"
        >
          Fund Market
        </Text>
        <AlertMini
          variant="information"
          styles="outline"
          description={
            <>
              {`Providing liquidity is risky and can lead to near total loss. Market prices can move abruptly at any time. `}
              <Link
                title="More Info"
                href="//help.polkamarkets.com/en/articles/6153227-strategies-and-risks-for-liquidity-providers"
                aria-label="More Info"
                target="_blank"
                rel="noreferrer"
                variant="information"
                scale="tiny"
                fontWeight="medium"
              />
            </>
          }
        />
        <NetworkSelector size="sm" />
        <AmountInput
          label="Add Liquidity"
          max={roundDown(balance)}
          currency={currency}
          onChange={handleChangeAmount}
          endAdornment={<SelectTokenModal network={network.network} />}
        />
        <div className="pm-c-create-market-form__card-liquidity-details">
          <div className="pm-c-create-market-form__card-liquidity-details__group">
            <div className="pm-c-create-market-form__card-liquidity-details__liquidity-value">
              <Text
                as="span"
                scale="caption"
                fontWeight="semibold"
                className="pm-c-create-market-form__card-liquidity-details__liquidity-value__title"
              >
                Liquidity Value
                <Tooltip text="Amount added to liquidity pool" position="top">
                  <InfoIcon />
                </Tooltip>
              </Text>
              <Text
                as="span"
                scale="caption"
                fontWeight="semibold"
                className="pm-c-create-market-form__card-liquidity-details__liquidity-value__amount"
              >
                {`${roundNumber(field.value, 3)} ${currency.symbol}`}
              </Text>
            </div>
            <div className="pm-c-create-market-form__card-liquidity-details__shares-added">
              <Text
                as="span"
                scale="tiny"
                fontWeight="semibold"
                className="pm-c-create-market-form__card-liquidity-details__shares-added__title"
              >
                Est. Liquidity Shares Added
              </Text>

              <Text
                as="span"
                scale="tiny"
                fontWeight="semibold"
                className="pm-c-create-market-form__card-liquidity-details__shares-added__amount"
              >
                {roundNumber(field.value, 3)}
              </Text>
            </div>
          </div>
          <hr className="pm-c-create-market-form__card-liquidity-details__separator" />

          <div className="pm-c-create-market-form__card-liquidity-details__earn-trading-fee">
            <Text
              as="span"
              scale="caption"
              fontWeight="semibold"
              className="pm-c-create-market-form__card-liquidity-details__earn-trading-fee__title"
            >
              Trading Fee Earnings
              <Tooltip
                text="Fee given to liquidity providers on every buy/sell transaction"
                position="top"
              >
                <InfoIcon />
              </Tooltip>
            </Text>

            <Text
              as="span"
              scale="caption"
              fontWeight="semibold"
              className="pm-c-create-market-form__card-liquidity-details__earn-trading-fee__amount"
            >
              {`${roundNumber(fee * 100, 3)} %`}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateMarketFormFund;
