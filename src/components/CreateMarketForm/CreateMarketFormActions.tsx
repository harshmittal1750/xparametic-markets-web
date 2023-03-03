import { useHistory } from 'react-router-dom';

import { useFormikContext } from 'formik';
import has from 'lodash/has';
import { Token } from 'types/token';

import { ApproveToken } from 'components';

import { useAppSelector, useNetwork } from 'hooks';

import { Button, ButtonLoading } from '../Button';

function CreateMarketFormActions() {
  const { isSubmitting, errors } = useFormikContext();
  const history = useHistory();
  const { network } = useNetwork();
  const { createMarketToken } = useAppSelector(state => state.polkamarkets);
  let address = '';

  const token = createMarketToken || network.currency;
  if (createMarketToken && (createMarketToken as Token).addresses) {
    address = (createMarketToken as Token).addresses[network.key];
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div className="pm-c-create-market-form__actions">
      <Button color="default" onClick={handleCancel}>
        Cancel
      </Button>
      <ApproveToken address={address} ticker={token.ticker}>
        <ButtonLoading
          color="primary"
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting || has(errors, 'liquidity')}
        >
          Create Market
        </ButtonLoading>
      </ApproveToken>
    </div>
  );
}

export default CreateMarketFormActions;
