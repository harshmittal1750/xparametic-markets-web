import { toggleAcceptedTerms } from 'redux/ducks/liquidity';

import { useAppDispatch, useAppSelector } from 'hooks';

import Checkbox from '../Checkbox';

function LiquidityFormTerms() {
  const dispatch = useAppDispatch();
  const acceptedTerms = useAppSelector(state => state.liquidity.acceptedTerms);

  function handleChangeAcceptedTerms() {
    dispatch(toggleAcceptedTerms(!acceptedTerms));
  }

  return (
    <div className="pm-c-liquidity-form__terms">
      <Checkbox
        label="By using Parametric you are agreeing to our Terms of Service and Privacy Policy"
        checked={acceptedTerms}
        onChange={handleChangeAcceptedTerms}
      />
    </div>
  );
}

LiquidityFormTerms.displayName = 'LiquidityFormTerms';

export default LiquidityFormTerms;
