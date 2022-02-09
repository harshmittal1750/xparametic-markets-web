import { useCallback, useEffect } from 'react';

import {
  changeAmount,
  changeMaxAmount,
  setLiquidityDetails
} from 'redux/ducks/liquidity';

import { useAppDispatch, useAppSelector } from 'hooks';

import AmountInput from '../AmountInput';
import { calculateLiquidityDetails } from './utils';

function LiquidityFormInput() {
  const dispatch = useAppDispatch();
  const transactionType = useAppSelector(
    state => state.liquidity.transactionType
  );
  const market = useAppSelector(state => state.market.market);
  const marketId = useAppSelector(state => state.market.market.id);

  // buy and sell have different maxes
  const balance = useAppSelector(state => state.bepro.ethBalance);
  const portfolio = useAppSelector(state => state.bepro.portfolio);
  const currency = useAppSelector(state => state.market.market.currency);

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
      ? currency
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
      />
    </div>
  );
}

LiquidityFormInput.displayName = 'LiquidityFormInput';

export default LiquidityFormInput;
