import { useCallback, useMemo, useReducer } from 'react';

import cn from 'classnames';
import { Market } from 'models/market';
import { PolkamarketsApiService, PolkamarketsService } from 'services';

import { ArrowDown, ArrowUp } from 'assets/icons/components/vote';

import { useAppSelector, useNetwork } from 'hooks';

import Text from '../new/Text';
import VoteArrowsClasses from './VoteArrows.module.scss';
import voteArrowsReducer, {
  upvote,
  removeUpvote,
  downvote,
  removeDownvote,
  VoteArrowsState
} from './VoteArrows.reducer';
import { VoteArrowsSentiment } from './VoteArrows.type';

type VoteArrowsProps = {
  marketId: Market['id'];
  marketSlug: Market['slug'];
  marketNetworkId: Market['networkId'];
  votes: Market['votes'];
  size?: 'sm' | 'md' | 'lg';
  fullwidth?: boolean;
};

function VoteArrows({
  marketId,
  marketSlug,
  marketNetworkId,
  votes,
  size = 'lg',
  fullwidth = false
}: VoteArrowsProps) {
  // Custom hooks
  const { network, networkConfig } = useNetwork();

  // Redux selectors
  const { votes: userVotes } = useAppSelector(state => state.polkamarkets);

  // Derivated state
  const isAMarketFromCurrentNetwork = marketNetworkId === network.id;
  const userHasVotedInCurrentMarket = Object.keys(userVotes).includes(
    marketId.toString()
  );

  const userVoteInCurrentMarket = useMemo(
    () =>
      isAMarketFromCurrentNetwork && userHasVotedInCurrentMarket
        ? userVotes[marketId]
        : { downvoted: false, upvoted: false },
    [
      isAMarketFromCurrentNetwork,
      marketId,
      userHasVotedInCurrentMarket,
      userVotes
    ]
  );

  const isNeutral =
    !userVoteInCurrentMarket.upvoted && !userVoteInCurrentMarket.downvoted;
  const isPositive = userVoteInCurrentMarket.upvoted;

  // Reducer initial state

  const initialCounter = { up: votes.up, down: votes.down };

  let initialSentiment: VoteArrowsSentiment;
  if (isNeutral) {
    initialSentiment = 'neutral';
  } else if (isPositive) {
    initialSentiment = 'positive';
  } else {
    initialSentiment = 'negative';
  }

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
    const { upvoted } = userVoteInCurrentMarket;

    const polkamarketsService = new PolkamarketsService(networkConfig);
    const polkamarketsApiService = new PolkamarketsApiService();

    if (upvoted) {
      await removeUpvote({
        dispatch,
        polkamarketsService,
        marketId,
        polkamarketsApiService,
        marketSlug
      });
    } else {
      await upvote({
        dispatch,
        polkamarketsService,
        marketId,
        polkamarketsApiService,
        marketSlug
      });
    }
  }, [marketId, marketSlug, networkConfig, userVoteInCurrentMarket]);

  const handleDownvote = useCallback(async () => {
    const { downvoted } = userVoteInCurrentMarket;

    const polkamarketsService = new PolkamarketsService(networkConfig);
    const polkamarketsApiService = new PolkamarketsApiService();

    if (downvoted) {
      await removeDownvote({
        dispatch,
        polkamarketsService,
        marketId,
        polkamarketsApiService,
        marketSlug
      });
    } else {
      await downvote({
        dispatch,
        polkamarketsService,
        marketId,
        polkamarketsApiService,
        marketSlug
      });
    }
  }, [marketId, marketSlug, networkConfig, userVoteInCurrentMarket]);

  return (
    <div
      className={cn(VoteArrowsClasses.root, {
        [VoteArrowsClasses.sm]: size === 'sm',
        [VoteArrowsClasses.md]: size === 'md',
        [VoteArrowsClasses.lg]: size === 'lg',
        [VoteArrowsClasses.fullwidth]: fullwidth,
        [VoteArrowsClasses.neutral]: sentiment === 'neutral',
        [VoteArrowsClasses.positive]: sentiment === 'positive',
        [VoteArrowsClasses.negative]: sentiment === 'negative'
      })}
    >
      <button
        type="button"
        className={VoteArrowsClasses.button}
        onClick={() => handleDownvote()}
        disabled={!isAMarketFromCurrentNetwork || isLoading}
      >
        <ArrowDown className={VoteArrowsClasses.down} />
      </button>
      <Text
        className={VoteArrowsClasses.counter}
        as="span"
        fontWeight="extrabold"
        color="2"
      >
        {counter.up - counter.down}
      </Text>
      <button
        type="button"
        className={VoteArrowsClasses.button}
        onClick={() => handleUpvote()}
        disabled={!isAMarketFromCurrentNetwork || isLoading}
      >
        <ArrowUp className={VoteArrowsClasses.up} />
      </button>
    </div>
  );
}

export default VoteArrows;
