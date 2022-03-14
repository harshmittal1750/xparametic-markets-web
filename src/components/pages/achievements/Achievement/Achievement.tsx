import { ReactNode, useState } from 'react';

import { BeproService } from 'services';
import { Achievement as AchievementProps } from 'types/achievement';

import { CheckIcon, MedalIcon } from 'assets/icons';

import { Button, Divider, Toast, ToastNotification } from 'components';
import { ButtonColor, ButtonVariant } from 'components/Button';

import { useNetwork } from 'hooks';
import useToastNotification from 'hooks/useToastNotification';

type ButtonStatus = {
  title: string;
  color: ButtonColor;
  variant: ButtonVariant;
  icon: ReactNode;
  disabled: boolean;
};

const buttonsByStatus: { [key: string]: ButtonStatus } = {
  available: {
    title: 'Claim NFT',
    color: 'primary',
    variant: 'normal',
    icon: null,
    disabled: false
  },
  unavailable: {
    title: 'Claim NFT',
    color: 'default',
    variant: 'subtle',
    icon: null,
    disabled: true
  },
  claimed: {
    title: 'Claimed',
    color: 'success',
    variant: 'subtle',
    icon: <CheckIcon />,
    disabled: true
  }
};

type AditionalAchievementProps = {
  onClaimCompleted: () => void;
};

function Achievement({
  id,
  title,
  description,
  imageUrl,
  actionTitle,
  rarity,
  status,
  onClaimCompleted
}: AchievementProps & AditionalAchievementProps) {
  const { show, close } = useToastNotification();
  const { network, networkConfig } = useNetwork();

  const [isClaimingNFT, setIsClaimingNFT] = useState(false);
  const [claimNFTTransactionSuccess, setClaimNFTTransactionSuccess] =
    useState(false);
  const [claimNFTTransactionSuccessHash, setClaimNFTTransactionSuccessHash] =
    useState(undefined);

  const claimCount = 10;

  async function claimNFT() {
    setIsClaimingNFT(true);

    const beproService = new BeproService(networkConfig);

    try {
      await beproService.login();
      const response = await beproService.claimAchievement(id);

      if (response.status && response.transactionHash) {
        setClaimNFTTransactionSuccess(response.status);
        setClaimNFTTransactionSuccessHash(response.transactionHash);
        show(`claimNFT-${id}`);
        await onClaimCompleted();
      }

      setIsClaimingNFT(false);
    } catch (error) {
      setIsClaimingNFT(false);
    }
  }

  return (
    <div className="pm-c-achievement flex-column height-full border-radius-top-corners-small">
      <div className="pm-c-achievement__wrapper flex-column height-full border-solid border-radius-top-corners-small">
        <div className="pm-c-achievement__image-vignette relative border-radius-top-corners-small">
          <img
            src={imageUrl}
            alt={title}
            className={`pm-c-achievement__image--${status} border-radius-top-corners-small`}
          />
          <div
            className="absolute"
            style={{ top: '0.8rem', right: '0.767rem' }}
          >
            <div
              className={`pm-c-achievement__status--${status} border-radius-small`}
            >
              <span className="pm-c-achievement__status-title tiny-uppercase semibold">
                {status}
              </span>
            </div>
          </div>
        </div>
        <div className="pm-c-achievement__content flex-column gap-5 padding-6 height-full">
          <div className="flex-column grow gap-3">
            <div className="flex-row justify-start align-center gap-3">
              <MedalIcon
                className={`pm-c-achievement__medal-icon--${status}`}
              />
              <h1
                className={`pm-c-achievement__title--${status} tiny-uppercase semibold`}
              >
                {actionTitle}
              </h1>
            </div>
            <h4 className="pm-c-achievement__award-title heading-large bold">
              {title}
            </h4>
            <p className="pm-c-achievement__award-description caption medium">
              {description}
            </p>
          </div>
          <Button
            size="normal"
            color={buttonsByStatus[status].color}
            variant={buttonsByStatus[status].variant}
            loading={isClaimingNFT}
            disabled={buttonsByStatus[status].disabled}
            onClick={() => claimNFT()}
          >
            {buttonsByStatus[status].icon}
            {buttonsByStatus[status].title}
          </Button>
          {claimNFTTransactionSuccess && claimNFTTransactionSuccessHash ? (
            <ToastNotification id={`claimNFT-${id}`} duration={10000}>
              <Toast
                variant="success"
                title="Success"
                description="Your transaction is completed!"
              >
                <Toast.Actions>
                  <a
                    target="_blank"
                    href={`${network.explorerURL}/tx/${claimNFTTransactionSuccessHash}`}
                    rel="noreferrer"
                  >
                    <Button size="sm" color="success">
                      View on Explorer
                    </Button>
                  </a>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => close(`claimNFT-${id}`)}
                  >
                    Dismiss
                  </Button>
                </Toast.Actions>
              </Toast>
            </ToastNotification>
          ) : null}
        </div>
      </div>
      <div className="pm-c-achievement__footer flex-row gap-3 justify-center align-center padding-4 border-solid border-radius-bottom-corners-small">
        <span className="pm-c-achievement__claim-count tiny-uppercase semibold">
          {`${claimCount} claimed`}
        </span>
        <Divider variant="circle" />
        <span
          className={`pm-c-achievement__rarity--${rarity} tiny-uppercase semibold`}
        >
          {rarity}
        </span>
      </div>
    </div>
  );
}

export default Achievement;
