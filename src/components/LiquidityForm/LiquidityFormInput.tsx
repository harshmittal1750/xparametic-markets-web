import { useCallback, useEffect } from 'react';

import {
  changeAmount,
  changeMaxAmount,
  setLiquidityDetails
} from 'redux/ducks/liquidity';

import {
  useAppDispatch,
  useAppSelector,
  useERC20Balance,
  useNetwork
} from 'hooks';

import AmountInput from '../AmountInput';
import { calculateLiquidityDetails } from './utils';

function LiquidityFormInput() {
  const dispatch = useAppDispatch();
  const { network } = useNetwork();
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

  const { balance: erc20Balance, isLoadingBalance } = useERC20Balance(
    token.address
  );
  const ethBalance = useAppSelector(state => state.polkamarkets.ethBalance);
  const balance = token.wrapped ? ethBalance : erc20Balance;

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
  }, [dispatch, max, transactionType]);

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
      : { name: 'Shares', ticker: 'Shares' };
  }

  function handleChangeAmount(liquidityAmount: number) {
    dispatch(changeAmount(liquidityAmount));
  }

  return (
    <div className="pm-c-liquidity-form__input">
      <AmountInput
        label="Liquidity Amount"
        max={max()}
        onChange={liquidityAmount => handleChangeAmount(liquidityAmount)}
        currency={currentCurrency()}
        disabled={isWrongNetwork || isLoadingBalance}
      />
    </div>
  );
}

LiquidityFormInput.displayName = 'LiquidityFormInput';

export default LiquidityFormInput;
