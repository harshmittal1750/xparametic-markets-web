import { ReactNode } from 'react';

import { Achievement as AchievementProps } from 'types/achievement';

import { CheckIcon, MedalIcon } from 'assets/icons';

import { Button, Divider } from 'components';
import { ButtonColor, ButtonVariant } from 'components/Button';

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

function Achievement({
  title,
  award,
  status,
  claimCount,
  rarity
}: AchievementProps) {
  return (
    <div className="pm-c-achievement flex-column border-radius-top-corners-small">
      <div className="pm-c-achievement__wrapper flex-column border-solid border-radius-top-corners-small">
        <div className="relative">
          <img
            src={award.imageURL}
            alt={award.title}
            className="width-full border-radius-top-corners-small"
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
        <div className="pm-c-achievement__content flex-column gap-5 padding-6">
          <div className="flex-column gap-3">
            <div className="flex-row  justify-start align-center gap-3">
              <MedalIcon
                className={`pm-c-achievement__medal-icon--${status}`}
              />
              <h1
                className={`pm-c-achievement__title--${status} tiny-uppercase semibold`}
              >
                {title}
              </h1>
            </div>
            <h4 className="pm-c-achievement__award-title heading-large bold">
              {award.title}
            </h4>
            <p className="pm-c-achievement__award-description caption medium">
              {award.description}
            </p>
          </div>
          <Button
            size="normal"
            color={buttonsByStatus[status].color}
            variant={buttonsByStatus[status].variant}
            disabled={buttonsByStatus[status].disabled}
          >
            {buttonsByStatus[status].icon}
            {buttonsByStatus[status].title}
          </Button>
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
