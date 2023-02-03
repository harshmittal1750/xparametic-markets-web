import { useCallback, useEffect, useState } from 'react';

import { login } from 'redux/ducks/polkamarkets';
import { Token } from 'types/currency';

import { QuestionIcon } from 'assets/icons';

import {
  useAppDispatch,
  useAppSelector,
  useNetwork,
  usePolkamarketsService
} from 'hooks';
import useToastNotification from 'hooks/useToastNotification';

import { Button, ButtonLoading } from '../Button';
import Toast from '../Toast';
import ToastNotification from '../ToastNotification';
import Tooltip from '../Tooltip';

type ApproveTokenProps = {
  token: Token;
  children: JSX.Element;
};

function ApproveToken({
  token,
  children
}: ApproveTokenProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const { network } = useNetwork();
  const polkamarketsService = usePolkamarketsService();
  const { show, close } = useToastNotification();

  const userEthAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  const [isTokenApproved, setIsTokenApproved] = useState(false);
  const [isApprovingToken, setIsApprovingToken] = useState(false);
  const [approveTokenTransactionSuccess, setApproveTokenTransactionSuccess] =
    useState(false);
  const [
    approveTokenTransactionSuccessHash,
    setApproveTokenTransactionSuccessHash
  ] = useState(undefined);

  const { address } = token;

  useEffect(() => {
    async function checkTokenApproval() {
      const isApproved = await polkamarketsService.isERC20Approved(
        address,
        userEthAddress
      );

      setIsTokenApproved(isApproved);
    }

    checkTokenApproval();
  }, [address, polkamarketsService, userEthAddress]);

  const handleApproveToken = useCallback(async () => {
    setIsApprovingToken(true);

    try {
      const response = await polkamarketsService.approveERC20(
        token.address,
        userEthAddress
      );

      const { status, transactionHash } = response;

      if (status && transactionHash) {
        setApproveTokenTransactionSuccess(status);
        setApproveTokenTransactionSuccessHash(transactionHash);
        show(`approve-${token.ticker}`);
      }

      await dispatch(login(polkamarketsService));
      setIsApprovingToken(false);
    } catch (error) {
      setIsApprovingToken(false);
    }
  }, [
    dispatch,
    polkamarketsService,
    show,
    token.address,
    token.ticker,
    userEthAddress
  ]);

  if (!isTokenApproved) {
    return (
      <>
        <ButtonLoading
          color="primary"
          size="sm"
          fullwidth
          style={{
            justifyContent: isApprovingToken ? 'center' : 'space-between'
          }}
          onClick={handleApproveToken}
          loading={isApprovingToken}
          disabled={isApprovingToken}
        >
          {`Allow Polkamarkets to use your ${token.ticker}`}
          <Tooltip text="You only have to do this once.">
            <QuestionIcon
              style={{ width: '1.4rem', height: '1.4rem', opacity: 0.35 }}
            />
          </Tooltip>
        </ButtonLoading>
        {approveTokenTransactionSuccess &&
        approveTokenTransactionSuccessHash ? (
          <ToastNotification id={`approve-${token.ticker}`} duration={10000}>
            <Toast
              variant="success"
              title="Success"
              description="Your transaction is completed!"
            >
              <Toast.Actions>
                <a
                  target="_blank"
                  href={`${network.explorerURL}/tx/${approveTokenTransactionSuccessHash}`}
                  rel="noreferrer"
                >
                  <Button size="sm" color="success">
                    View on Explorer
                  </Button>
                </a>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => close(`approve-${token.ticker}`)}
                >
                  Dismiss
                </Button>
              </Toast.Actions>
            </Toast>
          </ToastNotification>
        ) : null}
      </>
    );
  }

  return children;
}

export default ApproveToken;
