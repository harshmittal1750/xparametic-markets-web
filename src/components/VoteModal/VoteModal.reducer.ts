import { Market } from 'models/market';
import { PolkamarketsApiService, PolkamarketsService } from 'services';

import { VoteArrowsSentiment } from './VoteModal.type';

export enum VoteArrowsActions {
  UPVOTE_REQUEST = 'UPVOTE_REQUEST',
  UPVOTE_SUCCESS = 'UPVOTE_SUCCESS',
  UPVOTE_FAILURE = 'UPVOTE_FAILURE',
  DOWNVOTE_REQUEST = 'DOWNVOTE_REQUEST',
  DOWNVOTE_SUCCESS = 'DOWNVOTE_SUCCESS',
  DOWNVOTE_FAILURE = 'DOWNVOTE_FAILURE',
  REMOVE_UPVOTE_REQUEST = 'REMOVE_UPVOTE_REQUEST',
  REMOVE_UPVOTE_SUCCESS = 'REMOVE_UPVOTE_SUCCESS',
  REMOVE_UPVOTE_FAILURE = 'REMOVE_UPVOTE_FAILURE',
  REMOVE_DOWNVOTE_REQUEST = 'REMOVE_DOWNVOTE_REQUEST',
  REMOVE_DOWNVOTE_SUCCESS = 'REMOVE_DOWNVOTE_SUCCESS',
  REMOVE_DOWNVOTE_FAILURE = 'REMOVE_DOWNVOTE_FAILURE',
  RESET = 'RESET'
}

type VoteArrowsAction = {
  type: VoteArrowsActions;
};

type VoteArrowsCounter = {
  up: number;
  down: number;
};

type UserVote = {
  upvoted: boolean;
  downvoted: boolean;
};

export type VoteArrowsState = {
  initialCounter: VoteArrowsCounter;
  counter: VoteArrowsCounter;
  initialSentiment: VoteArrowsSentiment;
  sentiment: VoteArrowsSentiment;
  userVote: UserVote;
  isLoading: boolean;
};

function voteArrowsReducer(
  state: VoteArrowsState,
  action: VoteArrowsAction
): VoteArrowsState {
  const { type } = action;

  switch (type) {
    case VoteArrowsActions.UPVOTE_REQUEST:
      return {
        ...state,
        counter:
          state.sentiment === 'neutral'
            ? {
                ...state.initialCounter,
                up: state.initialCounter.up + 1
              }
            : {
                up: state.initialCounter.up + 1,
                down: state.initialCounter.down - 1
              },
        sentiment: 'positive',
        isLoading: true
      };
    case VoteArrowsActions.UPVOTE_SUCCESS:
      return {
        ...state,
        userVote: { upvoted: true, downvoted: false },
        isLoading: false
      };
    case VoteArrowsActions.UPVOTE_FAILURE:
      return {
        ...state,
        counter: state.initialCounter,
        sentiment: state.initialSentiment,
        isLoading: false
      };
    case VoteArrowsActions.DOWNVOTE_REQUEST:
      return {
        ...state,
        counter:
          state.sentiment === 'neutral'
            ? { ...state.initialCounter, down: state.initialCounter.down + 1 }
            : {
                up: state.initialCounter.up - 1,
                down: state.initialCounter.down + 1
              },
        sentiment: 'negative',
        isLoading: true
      };
    case VoteArrowsActions.DOWNVOTE_SUCCESS:
      return {
        ...state,
        userVote: { upvoted: false, downvoted: true },
        isLoading: false
      };
    case VoteArrowsActions.DOWNVOTE_FAILURE:
      return {
        ...state,
        counter: state.initialCounter,
        sentiment: state.initialSentiment,
        isLoading: false
      };
    case VoteArrowsActions.REMOVE_UPVOTE_REQUEST:
      return {
        ...state,
        counter: { ...state.initialCounter, up: state.initialCounter.up - 1 },
        sentiment: 'neutral',
        isLoading: true
      };
    case VoteArrowsActions.REMOVE_UPVOTE_SUCCESS:
      return {
        ...state,
        userVote: { upvoted: false, downvoted: false },
        isLoading: false
      };
    case VoteArrowsActions.REMOVE_UPVOTE_FAILURE:
      return {
        ...state,
        counter: state.initialCounter,
        sentiment: state.initialSentiment,
        isLoading: false
      };
    case VoteArrowsActions.REMOVE_DOWNVOTE_REQUEST:
      return {
        ...state,
        counter: {
          ...state.initialCounter,
          down: state.initialCounter.down - 1
        },
        sentiment: 'neutral',
        isLoading: true
      };
    case VoteArrowsActions.REMOVE_DOWNVOTE_SUCCESS:
      return {
        ...state,
        userVote: { upvoted: false, downvoted: false },
        isLoading: false
      };
    case VoteArrowsActions.REMOVE_DOWNVOTE_FAILURE:
      return {
        ...state,
        counter: state.initialCounter,
        sentiment: state.initialSentiment,
        isLoading: false
      };
    case VoteArrowsActions.RESET:
      return {
        ...state,
        initialCounter: state.counter,
        initialSentiment: state.sentiment,
        isLoading: false
      };
    default:
      return state;
  }
}

export default voteArrowsReducer;

type VoteArrowsActionArgs = {
  dispatch: (value: VoteArrowsAction) => void;
  polkamarketsService: PolkamarketsService;
  marketId: Market['id'];
  polkamarketsApiService: PolkamarketsApiService;
  marketSlug: Market['slug'];
};

async function upvote({
  dispatch,
  polkamarketsService,
  marketId,
  polkamarketsApiService,
  marketSlug
}: VoteArrowsActionArgs) {
  dispatch({ type: VoteArrowsActions.UPVOTE_REQUEST });

  try {
    await polkamarketsService.upvoteItem(marketId);
    await polkamarketsApiService.reloadMarket(marketSlug);
    dispatch({ type: VoteArrowsActions.UPVOTE_SUCCESS });
    dispatch({ type: VoteArrowsActions.RESET });
  } catch (error) {
    dispatch({ type: VoteArrowsActions.UPVOTE_FAILURE });
  }
}

async function removeUpvote({
  dispatch,
  polkamarketsService,
  marketId,
  polkamarketsApiService,
  marketSlug
}: VoteArrowsActionArgs) {
  dispatch({ type: VoteArrowsActions.REMOVE_UPVOTE_REQUEST });

  try {
    await polkamarketsService.removeUpvoteItem(marketId);
    await polkamarketsApiService.reloadMarket(marketSlug);
    dispatch({ type: VoteArrowsActions.REMOVE_UPVOTE_SUCCESS });
    dispatch({ type: VoteArrowsActions.RESET });
  } catch (error) {
    dispatch({ type: VoteArrowsActions.REMOVE_UPVOTE_FAILURE });
  }
}

async function downvote({
  dispatch,
  polkamarketsService,
  marketId,
  polkamarketsApiService,
  marketSlug
}: VoteArrowsActionArgs) {
  dispatch({ type: VoteArrowsActions.DOWNVOTE_REQUEST });

  try {
    await polkamarketsService.downvoteItem(marketId);
    await polkamarketsApiService.reloadMarket(marketSlug);
    dispatch({ type: VoteArrowsActions.DOWNVOTE_SUCCESS });
    dispatch({ type: VoteArrowsActions.RESET });
  } catch (error) {
    dispatch({ type: VoteArrowsActions.DOWNVOTE_FAILURE });
  }
}

async function removeDownvote({
  dispatch,
  polkamarketsService,
  marketId,
  polkamarketsApiService,
  marketSlug
}: VoteArrowsActionArgs) {
  dispatch({ type: VoteArrowsActions.REMOVE_DOWNVOTE_REQUEST });

  try {
    await polkamarketsService.removeDownvoteItem(marketId);
    await polkamarketsApiService.reloadMarket(marketSlug);
    dispatch({ type: VoteArrowsActions.REMOVE_DOWNVOTE_SUCCESS });
    dispatch({ type: VoteArrowsActions.RESET });
  } catch (error) {
    dispatch({ type: VoteArrowsActions.REMOVE_DOWNVOTE_FAILURE });
  }
}

export { upvote, removeUpvote, downvote, removeDownvote };
