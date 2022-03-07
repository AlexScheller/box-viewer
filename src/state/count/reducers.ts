import { makeReducer } from "../../minidux/toolkit";
import type {
  TReducerHandlers,
  TAction,
  TEmptyPayload,
} from "../../minidux/typedefs";
import type { TStateCounts } from "./typedefs";

const kDefaultCountsState: TStateCounts = {
  count: 0,
};

const countsHandlers: TReducerHandlers<TStateCounts> = {
  increment: (state: TStateCounts, action: TAction<TEmptyPayload>) => {
    return {
      ...state,
      count: state.count + 1,
    };
  },
  decrement: (state: TStateCounts, action: TAction<TEmptyPayload>) => {
    return {
      ...state,
      count: state.count - 1,
    };
  },
};

const countsReducer = makeReducer<TStateCounts>({
  defaultState: kDefaultCountsState,
  handlers: countsHandlers,
});

export { countsReducer as counts, kDefaultCountsState };
