import { useCallback, useEffect, useState } from 'react';

import { QuestionIcon } from 'assets/icons';

import { useNetwork, usePolkamarketsService } from 'hooks';
import useToastNotification from 'hooks/useToastNotification';

import { Button, ButtonLoading } from '../Button';
import Toast from '../Toast';
import ToastNotification from '../ToastNotification';
import Tooltip from '../Tooltip';

type ApproveTokenProps = {
  address: string;
  ticker: string;
  wrapped?: boolean;
  children: JSX.Element;
  onApprove?(isApproved: boolean): void;
};

function ApproveToken({
  address,
  ticker,
  wrapped = false,
  children,
  onApprove
}: ApproveTokenProps): JSX.Element | null {
  const { network } = useNetwork();
  const polkamarketsService = usePolkamarketsService();
  const { show, close } = useToastNotification();

  const predictionMarketContractAddress =
    polkamarketsService.contracts.pm.getAddress();

  const [isTokenApproved, setIsTokenApproved] = useState(false);
  const [isApprovingToken, setIsApprovingToken] = useState(false);
  const [approveTokenTransactionSuccess, setApproveTokenTransactionSuccess] =
    useState(false);
  const [
    approveTokenTransactionSuccessHash,
    setApproveTokenTransactionSuccessHash
  ] = useState(undefined);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function checkTokenApproval(tokenAddress, spenderAddress) {
    const isApproved =
      wrapped ||
      !tokenAddress ||
      (await polkamarketsService.isERC20Approved(tokenAddress, spenderAddress));

    setIsTokenApproved(isApproved);
    onApprove?.(isApproved);
  }

  useEffect(() => {
    checkTokenApproval(address, predictionMarketContractAddress);
  }, [address, checkTokenApproval, predictionMarketContractAddress]);

  const handleApproveToken = useCallback(async () => {
    setIsApprovingToken(true);

    try {
      const response = await polkamarketsService.approveERC20(
        address,
        predictionMarketContractAddress
      );

      const { status, transactionHash } = response;

      if (status && transactionHash) {
        setApproveTokenTransactionSuccess(status);
        setApproveTokenTransactionSuccessHash(transactionHash);
        show(`approve-${ticker}`);
      }

      setIsApprovingToken(false);

      checkTokenApproval(address, predictionMarketContractAddress);
    } catch (error) {
      setIsApprovingToken(false);
    }
  }, [
    polkamarketsService,
    address,
    ticker,
    predictionMarketContractAddress,
    checkTokenApproval,
    show
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
          {`Allow Polkamarkets to use your ${ticker}`}
          <Tooltip text="You only have to do this once.">
            <QuestionIcon
              style={{ width: '1.4rem', height: '1.4rem', opacity: 0.35 }}
            />
          </Tooltip>
        </ButtonLoading>
        {approveTokenTransactionSuccess &&
        approveTokenTransactionSuccessHash ? (
          <ToastNotification id={`approve-${ticker}`} duration={10000}>
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
                  onClick={() => close(`approve-${ticker}`)}
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
