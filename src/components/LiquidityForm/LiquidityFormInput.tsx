import { useCallback, useEffect } from 'react';

import {
  changeAmount,
  changeMaxAmount,
  setLiquidityDetails,
  setWrapped
} from 'redux/ducks/liquidity';
import { setTokenTicker } from 'redux/ducks/market';

import {
  useAppDispatch,
  useAppSelector,
  useERC20Balance,
  useNetwork
} from 'hooks';

import AmountInput from '../AmountInput';
import Text from '../Text';
import ToggleSwitch from '../ToggleSwitch';
import LiquidityFormClasses from './LiquidityForm.module.scss';
import { calculateLiquidityDetails } from './utils';

function LiquidityFormInput() {
  const dispatch = useAppDispatch();
  const { network } = useNetwork();
  const { currency } = network;
  const transactionType = useAppSelector(
    state => state.liquidity.transactionType
  );
  const market = useAppSelector(state => state.market.market);
  const marketId = useAppSelector(state => state.market.market.id);
  const marketNetworkId = useAppSelector(
    state => state.market.market.networkId
  );

  const isWrongNetwork = network.id !== `${marketNetworkId}`;
  const { token } = market;
  const { wrapped: tokenWrapped } = token;

  const { balance: erc20Balance, isLoadingBalance } = useERC20Balance(
    token.address
  );
  const ethBalance = useAppSelector(state => state.polkamarkets.ethBalance);
  const wrapped = useAppSelector(state => state.liquidity.wrapped);
  const balance = wrapped ? erc20Balance : ethBalance;

  const portfolio = useAppSelector(state => state.polkamarkets.portfolio);
  const amount = useAppSelector(state => state.liquidity.amount);

  const roundDown = (value: number) => Math.floor(value * 1e5) / 1e5;

  const max = useCallback(() => {
    let maxAmount = 0;

    // max for buy actions - eth balance
    if (transactionType === 'add') {
      maxAmount = balance;
    }
    // max for sell actions - number of outcome shares
    else if (transactionType === 'remove') {
      maxAmount = portfolio[marketId]?.liquidity?.shares || 0;
    }

    // rounding (down) to 5 decimals
    return roundDown(maxAmount);
  }, [transactionType, balance, portfolio, marketId]);

  useEffect(() => {
    dispatch(changeMaxAmount(max()));
    dispatch(changeAmount(0));
  }, [dispatch, max, transactionType, wrapped]);

  useEffect(() => {
    const liquidityDetails = calculateLiquidityDetails(
      transactionType,
      market,
      amount
    );

    dispatch(setLiquidityDetails(liquidityDetails));
  }, [dispatch, transactionType, market, amount]);

  // TODO: improve this
  function currentCurrency() {
    return transactionType === 'add'
      ? token
      : { name: 'Shares', ticker: 'Shares', iconName: 'shares' };
  }

  function handleChangeAmount(liquidityAmount: number) {
    dispatch(changeAmount(liquidityAmount));
  }

  const handleChangeWrapped = useCallback(() => {
    dispatch(setWrapped(!wrapped));
    dispatch(
      setTokenTicker({
        ticker: !wrapped ? token.symbol : token.symbol.substring(1)
      })
    );
  }, [dispatch, token.symbol, wrapped]);

  return (
    <div className="pm-c-liquidity-form__input">
      <AmountInput
        label="Liquidity Amount"
        max={max()}
        onChange={liquidityAmount => handleChangeAmount(liquidityAmount)}
        currency={currentCurrency()}
        disabled={isWrongNetwork || isLoadingBalance}
      />
      {!isWrongNetwork && tokenWrapped ? (
        <div className={LiquidityFormClasses.wrappedToggle}>
          <Text
            as="span"
            scale="caption"
            fontWeight="bold"
            className={LiquidityFormClasses.wrappedToggleTitle}
          >
            {`Wrap ${currency.name}`}
          </Text>
          <ToggleSwitch
            checked={wrapped}
            onChange={handleChangeWrapped}
            disabled={isWrongNetwork || isLoadingBalance}
          />
        </div>
      ) : null}
    </div>
  );
}

LiquidityFormInput.displayName = 'LiquidityFormInput';

export default LiquidityFormInput;
