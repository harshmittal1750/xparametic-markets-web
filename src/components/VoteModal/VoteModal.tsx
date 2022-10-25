import { useCallback, useReducer } from 'react';

import cn from 'classnames';
import { Market } from 'models/market';
import { PolkamarketsApiService, PolkamarketsService } from 'services';

import { TwarningIcon, VerifiedIcon } from 'assets/icons';
import { ArrowDown, ArrowUp } from 'assets/icons/components/vote';

import { Button } from 'components/Button';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalFooter from 'components/ModalFooter';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderHide from 'components/ModalHeaderHide';
import ModalHeaderTitle from 'components/ModalHeaderTitle';
import ModalSection from 'components/ModalSection';
import ModalSectionText from 'components/ModalSectionText';
import NetworkSwitch from 'components/Networks/NetworkSwitch';

import { useVote } from 'contexts/vote';

import { useAppDispatch } from 'hooks';

import Text from '../new/Text';
import VoteModalClasses from './VoteModal.module.scss';
import voteArrowsReducer, {
  downvote,
  removeDownvote,
  removeUpvote,
  upvote,
  VoteArrowsState
} from './VoteModal.reducer';
import { VoteArrowsSentiment } from './VoteModal.type';
import { voteModalProps } from './VoteModal.util';

type VoteModalProps = {
  show: boolean;
  onHide: () => void;
  marketId: Market['id'];
  marketSlug: Market['slug'];
  marketNetworkId: Market['networkId'];
  marketState: Market['state'];
  userVote: { upvoted: boolean; downvoted: boolean };
  initialCounter: { up: number; down: number };
  initialSentiment: VoteArrowsSentiment;
};

function VoteModal({
  show,
  onHide,
  marketId,
  marketSlug,
  marketNetworkId,
  marketState,
  userVote,
  initialCounter,
  initialSentiment
}: VoteModalProps) {
  // Custom hooks
  const { network, networkConfig, userPolkBalance, userRequiredPolkBalance } =
    useVote();
  const { buyEc20Url } = network;

  const appDispatch = useAppDispatch();

  // Derivated state from props
  const isWrongNetwork = network.id !== `${marketNetworkId}`;
  const needsBuyPolk = userPolkBalance < userRequiredPolkBalance;

  const voteArrowsReducerInitalState: VoteArrowsState = {
    initialCounter,
    counter: initialCounter,
    initialSentiment,
    sentiment: initialSentiment,
    isLoading: false
  };

  const [state, dispatch] = useReducer(
    voteArrowsReducer,
    voteArrowsReducerInitalState
  );

  const { counter, sentiment, isLoading } = state;

  // Handlers
  const handleUpvote = useCallback(async () => {
    const { upvoted } = userVote;

    const polkamarketsService = new PolkamarketsService(networkConfig);
    const polkamarketsApiService = new PolkamarketsApiService();

    if (upvoted) {
      await removeUpvote({
        appDispatch,
        dispatch,
        polkamarketsService,
        marketId,
        polkamarketsApiService,
        marketSlug,
        marketState
      });
    } else {
      await upvote({
        appDispatch,
        dispatch,
        polkamarketsService,
        marketId,
        polkamarketsApiService,
        marketSlug,
        marketState
      });
    }
  }, [appDispatch, marketId, marketSlug, marketState, networkConfig, userVote]);

  const handleDownvote = useCallback(async () => {
    const { downvoted } = userVote;

    const polkamarketsService = new PolkamarketsService(networkConfig);
    const polkamarketsApiService = new PolkamarketsApiService();

    if (downvoted) {
      await removeDownvote({
        appDispatch,
        dispatch,
        polkamarketsService,
        marketId,
        polkamarketsApiService,
        marketSlug,
        marketState
      });
    } else {
      await downvote({
        appDispatch,
        dispatch,
        polkamarketsService,
        marketId,
        polkamarketsApiService,
        marketSlug,
        marketState
      });
    }
  }, [appDispatch, marketId, marketSlug, marketState, networkConfig, userVote]);

  const handleBuyPolk = useCallback(async () => {
    window.open(buyEc20Url, '_blank');
  }, [buyEc20Url]);

  return (
    <Modal show={show} className={{ dialog: VoteModalClasses.dialog }}>
      <ModalContent>
        <ModalHeader>
          <ModalHeaderHide onClick={onHide} />
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
        <ModalSection className={VoteModalClasses.section}>
          <ModalSectionText id={voteModalProps['aria-describedby']}>
            {`I'm baby mlkshk cornhole cray selvage vaporware pinterest typewriter
            tonx messenger bag chia leggings. Cronut affogato vinyl cold-pressed
            shaman fashion axe thundercats.`}
          </ModalSectionText>
        </ModalSection>
        <div className={VoteModalClasses.body}>
          <div
            className={cn(VoteModalClasses.arrows, {
              [VoteModalClasses.neutral]: sentiment === 'neutral',
              [VoteModalClasses.positive]: sentiment === 'positive',
              [VoteModalClasses.negative]: sentiment === 'negative',
              [VoteModalClasses.disabled]: isWrongNetwork || isLoading
            })}
          >
            <button
              type="button"
              className={VoteModalClasses.button}
              onClick={handleDownvote}
              disabled={isWrongNetwork || isLoading}
            >
              <ArrowDown className={VoteModalClasses.down} />
            </button>
            {isLoading ? (
              <span
                className="spinner--primary"
                style={{ width: 38, height: 38 }}
              />
            ) : (
              <Text
                className={VoteModalClasses.counter}
                as="span"
                fontWeight="extrabold"
                color="2"
              >
                {counter.up - counter.down}
              </Text>
            )}
            <button
              type="button"
              className={VoteModalClasses.button}
              onClick={handleUpvote}
              disabled={isWrongNetwork || isLoading}
            >
              <ArrowUp className={VoteModalClasses.up} />
            </button>
          </div>
          {isWrongNetwork ? (
            <NetworkSwitch targetNetworkId={marketNetworkId} />
          ) : null}
        </div>
        <ModalFooter className={VoteModalClasses.footer}>
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
                {`To be able to vote you need to have at least ${userRequiredPolkBalance} POLK`}
              </Text>
            </div>
            <Button size="xs" color="primary" onClick={handleBuyPolk}>
              Buy $POLK
            </Button>
          </div>
        </ModalContent>
      ) : null}
    </Modal>
  );
}

export default VoteModal;
