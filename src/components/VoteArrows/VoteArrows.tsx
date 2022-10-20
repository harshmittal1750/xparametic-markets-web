import { useCallback, useMemo, useReducer } from 'react';

import cn from 'classnames';
import { Market } from 'models/market';
import { PolkamarketsApiService, PolkamarketsService } from 'services';

import { ArrowDown, ArrowUp } from 'assets/icons/components/vote';

import { useAppSelector, useNetwork } from 'hooks';

import Text from '../new/Text';
import VoteArrowsClasses from './VoteArrows.module.scss';
import voteArrowsReducer, {
  VoteArrowsActions,
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
  const { network, networkConfig } = useNetwork();
  const { votes: userVotes } = useAppSelector(state => state.polkamarkets);

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

  let initalSentiment: VoteArrowsSentiment;
  if (isNeutral) {
    initalSentiment = 'neutral';
  } else if (isPositive) {
    initalSentiment = 'positive';
  } else {
    initalSentiment = 'negative';
  }

  const voteArrowsReducerInitalState: VoteArrowsState = {
    initialCounter: votes.up - votes.down,
    counter: votes.up - votes.down,
    sentiment: initalSentiment
  };

  const [state, dispatch] = useReducer(
    voteArrowsReducer,
    voteArrowsReducerInitalState
  );

  const { counter, sentiment } = state;

  const downvoteAction = useCallback(async () => {
    const { downvoted } = userVoteInCurrentMarket;

    const polkamarketsService = new PolkamarketsService(networkConfig);
    const polkamarketApiService = new PolkamarketsApiService();

    if (downvoted) {
      await polkamarketsService.removeDownvoteItem(marketId);
      polkamarketApiService.reloadMarket(marketSlug);
      dispatch({ type: VoteArrowsActions.REMOVE_DOWNVOTE });
    } else {
      await polkamarketsService.downvoteItem(marketId);
      polkamarketApiService.reloadMarket(marketSlug);
      dispatch({ type: VoteArrowsActions.DOWNVOTE });
    }
  }, [marketId, marketSlug, networkConfig, userVoteInCurrentMarket]);

  const upvoteAction = useCallback(async () => {
    const { upvoted } = userVoteInCurrentMarket;

    const polkamarketsService = new PolkamarketsService(networkConfig);
    const polkamarketApiService = new PolkamarketsApiService();

    if (upvoted) {
      await polkamarketsService.removeUpvoteItem(marketId);
      polkamarketApiService.reloadMarket(marketSlug);
      dispatch({ type: VoteArrowsActions.REMOVE_UPVOTE });
    } else {
      await polkamarketsService.upvoteItem(marketId);
      polkamarketApiService.reloadMarket(marketSlug);
      dispatch({ type: VoteArrowsActions.UPVOTE });
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
        onClick={() => downvoteAction()}
      >
        <ArrowDown className={VoteArrowsClasses.down} />
      </button>
      <Text
        className={VoteArrowsClasses.counter}
        as="span"
        fontWeight="extrabold"
        color="2"
      >
        {counter}
      </Text>
      <button
        type="button"
        className={VoteArrowsClasses.button}
        onClick={() => upvoteAction()}
      >
        <ArrowUp className={VoteArrowsClasses.up} />
      </button>
    </div>
  );
}

export default VoteArrows;
