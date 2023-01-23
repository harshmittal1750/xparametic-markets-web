import { useCallback, useState } from 'react';

import { login } from 'redux/ducks/polkamarkets';
import { Transaction } from 'types/transaction';

import Toast from 'components/Toast';
import ToastNotification from 'components/ToastNotification';

import { useAppDispatch, useAppSelector, usePolkamarketsService } from 'hooks';
import useToastNotification from 'hooks/useToastNotification';

import { Button, ButtonLoading } from '../Button';

function WalletInfoClaim() {
  const dispatch = useAppDispatch();
  const polkamarketsService = usePolkamarketsService();
  const { show: showToastNotification, close: closeToastNotification } =
    useToastNotification();

  const [transaction, setTransaction] = useState<Transaction>({
    state: 'not_started'
  });

  const isPolkClaimed = useAppSelector(state => state.polkamarkets.polkClaimed);

  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaim = useCallback(async () => {
    try {
      setTransaction({ state: 'request' });
      setIsClaiming(true);

      // performing claim action on smart contract
      await polkamarketsService.claimPolk();
      setTransaction({ state: 'success' });
      setIsClaiming(false);

      showToastNotification('claim-success');

      // updating wallet
      await dispatch(login(polkamarketsService));
    } catch (error) {
      setIsClaiming(false);
      setTransaction({ state: 'failure' });
    }
  }, [dispatch, polkamarketsService, showToastNotification]);

  return (
    <>
      {transaction.state === 'success' ? (
        <ToastNotification id="claim-success" duration={10000}>
          <Toast
            variant="success"
            title="Success"
            description="Your transaction is completed!"
          >
            <Toast.Actions>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => closeToastNotification('claim-success')}
              >
                Dismiss
              </Button>
            </Toast.Actions>
          </Toast>
        </ToastNotification>
      ) : null}
      <ButtonLoading
        className="pm-c-button-normal--primary pm-c-button--sm pm-c-wallet-info__currency__button pm-c-wallet-info__currency__transak"
        loading={isClaiming}
        disabled={isPolkClaimed || isClaiming}
        onClick={handleClaim}
      >
        {isPolkClaimed ? '$IFL Claimed' : 'Claim $IFL'}
      </ButtonLoading>
    </>
  );
}

export default WalletInfoClaim;
