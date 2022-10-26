import { Market } from 'models/market';
import { reloadMarketBySlug } from 'redux/ducks/markets';
import { AppDispatch } from 'redux/store';
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

export type VoteArrowsState = {
  initialCounter: VoteArrowsCounter;
  counter: VoteArrowsCounter;
  initialSentiment: VoteArrowsSentiment;
  sentiment: VoteArrowsSentiment;
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
        counter: state.initialCounter,
        sentiment: 'neutral',
        isLoading: true
      };
    case VoteArrowsActions.REMOVE_UPVOTE_SUCCESS:
      return {
        ...state,
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
        counter: state.initialCounter,
        sentiment: 'neutral',
        isLoading: true
      };
    case VoteArrowsActions.REMOVE_DOWNVOTE_SUCCESS:
      return {
        ...state,
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
        counter: state.initialCounter,
        sentiment: state.initialSentiment,
        isLoading: false
      };
    default:
      return state;
  }
}

export default voteArrowsReducer;

type VoteArrowsActionArgs = {
  appDispatch: AppDispatch;
  dispatch: (value: VoteArrowsAction) => void;
  polkamarketsService: PolkamarketsService;
  marketId: Market['id'];
  polkamarketsApiService: PolkamarketsApiService;
  marketSlug: Market['slug'];
  marketState: Market['state'];
};

async function upvote({
  appDispatch,
  dispatch,
  polkamarketsService,
  marketId,
  polkamarketsApiService,
  marketSlug,
  marketState
}: VoteArrowsActionArgs) {
  dispatch({ type: VoteArrowsActions.UPVOTE_REQUEST });

  try {
    await polkamarketsService.upvoteItem(marketId);
    await polkamarketsApiService.reloadMarket(marketSlug);
    await appDispatch(reloadMarketBySlug(marketState, marketSlug));

    dispatch({ type: VoteArrowsActions.UPVOTE_SUCCESS });
  } catch (error) {
    dispatch({ type: VoteArrowsActions.UPVOTE_FAILURE });
  }
}

async function removeUpvote({
  appDispatch,
  dispatch,
  polkamarketsService,
  marketId,
  polkamarketsApiService,
  marketSlug,
  marketState
}: VoteArrowsActionArgs) {
  dispatch({ type: VoteArrowsActions.REMOVE_UPVOTE_REQUEST });

  try {
    await polkamarketsService.removeUpvoteItem(marketId);
    await polkamarketsApiService.reloadMarket(marketSlug);
    await appDispatch(reloadMarketBySlug(marketState, marketSlug));

    dispatch({ type: VoteArrowsActions.REMOVE_UPVOTE_SUCCESS });
  } catch (error) {
    dispatch({ type: VoteArrowsActions.REMOVE_UPVOTE_FAILURE });
  }
}

async function downvote({
  appDispatch,
  dispatch,
  polkamarketsService,
  marketId,
  polkamarketsApiService,
  marketSlug,
  marketState
}: VoteArrowsActionArgs) {
  dispatch({ type: VoteArrowsActions.DOWNVOTE_REQUEST });

  try {
    await polkamarketsService.downvoteItem(marketId);
    await polkamarketsApiService.reloadMarket(marketSlug);
    await appDispatch(reloadMarketBySlug(marketState, marketSlug));

    dispatch({ type: VoteArrowsActions.DOWNVOTE_SUCCESS });
  } catch (error) {
    dispatch({ type: VoteArrowsActions.DOWNVOTE_FAILURE });
  }
}

async function removeDownvote({
  appDispatch,
  dispatch,
  polkamarketsService,
  marketId,
  polkamarketsApiService,
  marketSlug,
  marketState
}: VoteArrowsActionArgs) {
  dispatch({ type: VoteArrowsActions.REMOVE_DOWNVOTE_REQUEST });

  try {
    await polkamarketsService.removeDownvoteItem(marketId);
    await polkamarketsApiService.reloadMarket(marketSlug);
    await appDispatch(reloadMarketBySlug(marketState, marketSlug));

    dispatch({ type: VoteArrowsActions.REMOVE_DOWNVOTE_SUCCESS });
  } catch (error) {
    dispatch({ type: VoteArrowsActions.REMOVE_DOWNVOTE_FAILURE });
  }
}

export { upvote, removeUpvote, downvote, removeDownvote };
