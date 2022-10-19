import { useCallback, useMemo, useState } from 'react';

import cn from 'classnames';
import { Market } from 'models/market';
import { PolkamarketsApiService, PolkamarketsService } from 'services';

import { ArrowDown, ArrowUp } from 'assets/icons/components/vote';

import { useAppSelector, useNetwork } from 'hooks';

import Text from '../new/Text';
import VoteArrowsClasses from './VoteArrows.module.scss';

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
  const [counter, setCounter] = useState(votes.up - votes.down);

  const isAMarketFromCurrentNetwork = marketNetworkId === network.id;
  const userHasVotedInCurrentMarket = Object.keys(userVotes).includes(marketId);

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
  const isNegative = userVoteInCurrentMarket.downvoted;

  const downvoteAction = useCallback(async () => {
    const { downvoted } = userVoteInCurrentMarket;

    const polkamarketsService = new PolkamarketsService(networkConfig);
    const polkamarketApiService = new PolkamarketsApiService();

    if (downvoted) {
      setCounter(counter + 1);
      await polkamarketsService.removeDownvoteItem(marketId);
      polkamarketApiService.reloadMarket(marketSlug);
    } else {
      setCounter(counter - 1);
      await polkamarketsService.downvoteItem(marketId);
      polkamarketApiService.reloadMarket(marketSlug);
    }
  }, [counter, marketId, marketSlug, networkConfig, userVoteInCurrentMarket]);

  const upvoteAction = useCallback(async () => {
    const { upvoted } = userVoteInCurrentMarket;

    const polkamarketsService = new PolkamarketsService(networkConfig);
    const polkamarketApiService = new PolkamarketsApiService();

    if (upvoted) {
      setCounter(counter - 1);
      await polkamarketsService.removeUpvoteItem(marketId);
      polkamarketApiService.reloadMarket(marketSlug);
    } else {
      setCounter(counter + 1);
      await polkamarketsService.upvoteItem(marketId);
      polkamarketApiService.reloadMarket(marketSlug);
    }
  }, [counter, marketId, marketSlug, networkConfig, userVoteInCurrentMarket]);

  return (
    <div
      className={cn(VoteArrowsClasses.root, {
        [VoteArrowsClasses.sm]: size === 'sm',
        [VoteArrowsClasses.md]: size === 'md',
        [VoteArrowsClasses.lg]: size === 'lg',
        [VoteArrowsClasses.fullwidth]: fullwidth,
        [VoteArrowsClasses.neutral]: isNeutral,
        [VoteArrowsClasses.positive]: isPositive,
        [VoteArrowsClasses.negative]: isNegative
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
