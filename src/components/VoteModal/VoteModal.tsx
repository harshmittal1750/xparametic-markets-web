import { useCallback, useEffect, useState } from 'react';

import cn from 'classnames';
import { PolkamarketsService } from 'services';

import { TwarningIcon, VerifiedIcon } from 'assets/icons';

import { Button } from 'components/Button';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalFooter from 'components/ModalFooter';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderTitle from 'components/ModalHeaderTitle';
import ModalSection from 'components/ModalSection';
import ModalSectionText from 'components/ModalSectionText';
import NetworkSwitch from 'components/Networks/NetworkSwitch';

import { useAppSelector, useNetwork } from 'hooks';

import Text from '../new/Text';
import VoteModalClasses from './VoteModal.module.scss';
import { voteModalProps } from './VoteModal.util';

type VoteModalProps = {
  marketNetworkId: string;
};

function VoteModal({ marketNetworkId }: VoteModalProps) {
  // Custom hooks
  const { network, networkConfig } = useNetwork();
  const { buyEc20Url } = network;

  // Redux selectors
  const polkBalance = useAppSelector(state => state.polkamarkets.polkBalance);

  // Local state
  const [show, _setShow] = useState(false);
  const [requiredBalance, setRequiredBalance] = useState(0);
  const [isLoadingBuyPolk, setIsLoadingBuyPolk] = useState(false);

  // Async actions
  useEffect(() => {
    async function getMinimumRequiredBalance() {
      const polkamarketsService = new PolkamarketsService(networkConfig);

      const response = await polkamarketsService.getMinimumRequiredBalance();
      setRequiredBalance(response);
    }
    getMinimumRequiredBalance();
  }, [polkBalance, networkConfig]);

  // Derivated state
  const isWrongNetwork = network.id !== marketNetworkId;
  const needsBuyPolk = polkBalance < requiredBalance;

  // Actions
  const handleBuyPolk = useCallback(async () => {
    setIsLoadingBuyPolk(true);

    window.open(buyEc20Url, '_blank');

    setIsLoadingBuyPolk(false);
  }, [buyEc20Url]);

  return (
    <Modal show={show} className={{ dialog: VoteModalClasses.dialog }}>
      <ModalContent>
        <ModalHeader>
          <div className={VoteModalClasses.verifyMarket}>
            <VerifiedIcon size="sm" />
            <Text
              as="span"
              fontSize="body-4"
              fontWeight="semibold"
              transform="uppercase"
              color="violets-are-blue"
            >
              Verify market
            </Text>
          </div>
          <ModalHeaderTitle
            className={VoteModalClasses.headerTitle}
            id={voteModalProps['aria-labelledby']}
          >
            {`Polkamarkets is running in Beta is currently underdoing `}
            <a
              className={cn(
                'pm-c-link',
                'text-heading-2',
                'font-medium',
                'text-violets-are-blue'
              )}
              href="www.polkamarkets.com"
            >
              auditing procedures
            </a>
            .
          </ModalHeaderTitle>
        </ModalHeader>
        <ModalSection>
          <ModalSectionText id={voteModalProps['aria-describedby']}>
            {`I'm baby mlkshk cornhole cray selvage vaporware pinterest typewriter
            tonx messenger bag chia leggings. Cronut affogato vinyl cold-pressed
            shaman fashion axe thundercats.`}
          </ModalSectionText>
        </ModalSection>
        <ModalFooter>
          {isWrongNetwork ? (
            <NetworkSwitch targetNetworkId={marketNetworkId} />
          ) : null}
          <Text as="p" fontSize="body-2" fontWeight="medium" color="3">
            {`By clicking you’re agreeing to our `}
            <a
              className={cn(
                'pm-c-link',
                'text-body-2',
                'font-medium',
                'text-3'
              )}
              href="https://www.polkamarkets.com/legal/terms-conditions"
            >
              Terms and Conditions
            </a>
            .
          </Text>
        </ModalFooter>
      </ModalContent>
      {needsBuyPolk ? (
        <ModalContent>
          <div className={VoteModalClasses.alertHeader}>
            <div className={VoteModalClasses.alertHeaderTitle}>
              <TwarningIcon
                size={24}
                className={VoteModalClasses.warningIcon}
              />
              <Text as="p" fontSize="body-2" fontWeight="semibold" color="1">
                {`To be able to vote you need to have at least ${requiredBalance} POLK`}
              </Text>
            </div>
            <Button
              size="xs"
              color="primary"
              onClick={handleBuyPolk}
              disabled={isLoadingBuyPolk}
            >
              Buy $POLK
            </Button>
          </div>
        </ModalContent>
      ) : null}
    </Modal>
  );
}

export default VoteModal;
