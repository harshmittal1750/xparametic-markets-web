import { useReducer } from 'react';

import cn from 'classnames';

import { ArrowDown, ArrowUp } from 'assets/icons/components/vote';

import Text from '../new/Text';
import VoteArrowsClasses from './VoteArrows.module.scss';
import voteArrowsReducer, {
  VoteArrowsActions,
  VoteArrowsState
} from './VoteArrows.reducer';

const voteArrowsReducerInitialState: VoteArrowsState = {
  initialCounter: 0,
  counter: 0,
  sentiment: 'neutral'
};

type VoteArrowsProps = {
  size?: 'sm' | 'md' | 'lg';
  fullwidth?: boolean;
};

function VoteArrows({ size = 'lg', fullwidth = false }: VoteArrowsProps) {
  const [state, dispatch] = useReducer(
    voteArrowsReducer,
    voteArrowsReducerInitialState
  );

  const { sentiment, counter } = state;

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
        onClick={() => dispatch({ type: VoteArrowsActions.DOWNVOTE })}
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
        onClick={() => dispatch({ type: VoteArrowsActions.UPVOTE })}
      >
        <ArrowUp className={VoteArrowsClasses.up} />
      </button>
    </div>
  );
}

export default VoteArrows;
