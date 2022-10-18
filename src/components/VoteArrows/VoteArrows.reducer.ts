import { VoteArrowsSentiment } from './VoteArrows.type';

export enum VoteArrowsActions {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
  REMOVE_UPVOTE = 'REMOVE_UPVOTE',
  REMOVE_DOWNVOTE = 'REMOVE_DOWNVOTE'
}

type VoteArrowsAction = {
  type: VoteArrowsActions;
};

export type VoteArrowsState = {
  initialCounter: number;
  counter: number;
  sentiment: VoteArrowsSentiment;
};

function voteArrowsReducer(
  state: VoteArrowsState,
  action: VoteArrowsAction
): VoteArrowsState {
  const { type } = action;

  switch (type) {
    case VoteArrowsActions.UPVOTE:
      return {
        ...state,
        counter: state.initialCounter + 1,
        sentiment:
          state.counter + 1 === state.initialCounter ? 'neutral' : 'positive'
      };
    case VoteArrowsActions.DOWNVOTE:
      return {
        ...state,
        counter: state.initialCounter - 1,
        sentiment:
          state.counter - 1 === state.initialCounter ? 'neutral' : 'negative'
      };
    case VoteArrowsActions.REMOVE_UPVOTE:
      return {
        ...state,
        counter: state.initialCounter,
        sentiment: 'neutral'
      };
    case VoteArrowsActions.REMOVE_DOWNVOTE:
      return {
        ...state,
        counter: state.initialCounter,
        sentiment: 'neutral'
      };
    default:
      return state;
  }
}

export default voteArrowsReducer;
